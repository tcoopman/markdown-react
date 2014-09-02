/** @jsx React.DOM */
'use strict';

var markdown = require('markdown').markdown;
var EL = require('../markdownElements');


/**
 * getDefaultBuilders - returns the default element builders for the markdown
 *                      AST. Normally there is no reason to change these.
 * @private
 *
 * @return {Object} map with the default builders.
 */
function getDefaultBuilders() {
  var builders = {};
  builders[EL.BULLETLIST] = customBuildFactory(EL.BULLETLIST);
  builders[EL.BLOCKQUOTE] = customBuildFactory(EL.BLOCKQUOTE);
  builders[EL.EM] = customBuildFactory(EL.EM);
  builders[EL.HEADER] = buildHeader;
  builders[EL.IMAGE] = buildImage;
  builders[EL.INLINECODE] = customBuildFactory(EL.INLINECODE);
  builders[EL.LINK] = buildLink;
  builders[EL.LINKREF] = buildLinkRef;
  builders[EL.LISTITEM] = buildListitem;
  builders[EL.NUMBERLIST] = customBuildFactory(EL.NUMBERLIST);
  builders[EL.PARA] = customBuildFactory(EL.PARA);
  builders[EL.STRONG] = customBuildFactory(EL.STRONG);
  return builders;
}


/**
 * Builder - creates a new markdown AST builder.
 * @constructor
 *
 */
function Builder() {
  this.builders = getDefaultBuilders();
}


/**
 * build - builds from tokens
 *
 * @param {Array} tokens - the tokens to parse. The first argument is the id
 *                         used to search the specific build function.
 * @return {Array} a build item or the list of tokens if no build function could
                   be found
 */
Builder.prototype.build = function(tokens) {
  if (Array.isArray(tokens)) {
    var build = this.builders[tokens[0]];
    if (build) {
      return build(tokens.splice(1), this);
    } else {
      if (typeof tokens === 'string') {
        return [tokens];
      } else if (Array.isArray(tokens) && tokens.length === 1) {
        return tokens;
      } else {
        return tokens.splice(1);
      }
    }
  } else {
    return tokens;
  }
}


Builder.prototype.buildTop = function(tokens) {
  var top = {};
  top.section = {
    id: 'Section',
    values: []
  };

  tokens.map(function(token)  {
    if (token.references) {
      top.references = token.references;
    } else {
      top.section.values.push(this.build(token));
    }
  }.bind(this));

  return top;
}


/**
 * buildListitem - builds a listitem
 *
 * @param  {Array} tokens - the tokens to parse.
 * @param  {Builder} builder - the builder to recursive build items.
 * @return {Object}      a list item.
 */
function buildListitem(tokens, builder) {
  var id = EL.LISTITEM;
  if (tokens[0] === EL.PARA) {
    tokens = tokens.slice(1);
  }
  if (tokens[0][0] === EL.PARA) {
    tokens[0] = tokens[0].slice(1);
  }

  var values = tokens.map(function(token)  {
    return builder.build(token);
  });

  return {id: id, values: values};
}


/**
 * buildHeader - builds a header
 *
 * @param  {Array} tokens - the tokens to parse.
 * @param  {Builder} builder - the builder to recursive build items.
 * @return {Object}      a header item.
 */
function buildHeader(tokens, builder) {
  var id = EL.HEADER;
  var level = tokens[0].level;

  var values = tokens.slice(1).map(function(token)  {
    return builder.build(token);
  });

  return {id: id, level: level, values: values};
}


function buildImage(tokens, builder) {
  var id = EL.IMAGE;
  var alt = tokens[0].alt;
  var href = tokens[0].href;

  var values = tokens.slice(1).map(function(token)  {
    return builder.build(token);
  });

  return {id: id, alt: alt, href: href};
}


function buildLink(tokens, builder) {
  var id = EL.LINK;
  var href = tokens[0].href;
  var values = tokens.slice(1).map(function(token)  {
    return builder.build(token);
  });

  return {id: id, href: href, values: values};
}


function buildLinkRef(tokens, builder) {
  var id = EL.LINKREF;
  var ref = tokens[0].ref;
  var original = tokens[0].original;
  var values = tokens.slice(1).map(function(token)  {
    return builder.build(token);
  });

  return {id: id, ref: ref, original: original, values: values};
}



/**
 * customBuildFactory - Builds a custom build function
 *
 * @param  {string} id the id of the custom function
 * @return {function}    custom build function
 */
function customBuildFactory(id) {
  return function(tokens, builder) {
    var values = tokens.map(function(token)  {
      return builder.build(token);
    });

    return {id: id, values: values};
  }
}


function parseMarkdown(text) {
  return markdown.parse(text);
}


exports.buildLink = buildLink;
exports.buildLinkRef = buildLinkRef;
exports.buildListitem = buildListitem;
exports.buildHeader = buildHeader;
exports.Builder = Builder;
exports.customBuildFactory = customBuildFactory;
exports.parseMarkdown = parseMarkdown;
