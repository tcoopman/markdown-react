/** @jsx React.DOM */
'use strict';


var BULLETLIST = 'bulletlist';
var BLOCKQUOTE = 'blockquote';
var EM = 'em';
var HEADER = 'header';
var LINKREF = 'link_ref';
var LISTITEM = 'listitem';
var PARA = 'para';
var STRONG = 'strong';

/**
 * Builder - Build object
 *
 * @param  {Object} builders map of spefic build functions
 */
function Builder(builders) {
  this.builders = builders;
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

  tokens.map(token => {
    if (token.references) {
      top.references = token.references;
    } else {
      top.section.values.push(this.build(token));
    }
  });

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
  var id = LISTITEM;
  console.log(tokens);
  if (tokens[0] === PARA) {
    tokens = tokens.slice(1);
  }
  if (tokens[0][0] === PARA) {
    tokens[0] = tokens[0].slice(1);
  }

  var values = tokens.map(token => {
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
  var id = HEADER;
  var level = tokens[0].level;

  var values = tokens.slice(1).map(token => {
    return builder.build(token);
  });

  return {id: id, level: level, values: values};
}


function buildLinkRef(tokens, builder) {
  console.log('building ref');
  var id = LINKREF;
  var ref = tokens[0].ref;
  var original = tokens[0].original;
  var values = tokens.slice(1).map(token => {
    return builder.build(token);
  });

  return {id: id, ref: ref, original: original, values: values};
}



/**
 * customBuildFactory - Builds a custom build functions
 *
 * @param  {string} id the id of the custom function
 * @return {function}    custom build function
 */
function customBuildFactory(id) {
  return function(tokens, builder) {
    var values = tokens.map(token => {
      return builder.build(token);
    });

    return {id: id, values: values};
  }
}


exports.buildLinkRef = buildLinkRef;
exports.buildListitem = buildListitem;
exports.buildHeader = buildHeader;
exports.Builder = Builder;
exports.customBuildFactory = customBuildFactory;

exports.BULLETLIST = BULLETLIST;
exports.BLOCKQUOTE = BLOCKQUOTE;
exports.EM = EM;
exports.HEADER = HEADER;
exports.LINK_REF = LINKREF;
exports.LISTITEM = LISTITEM;
exports.PARA = PARA;
exports.STRONG = STRONG;
