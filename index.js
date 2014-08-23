'use strict';

var markdown = require('markdown').markdown;
var React = require('react');

var build = require('./lib/buildMarkdownTree');
var EL = require('./lib/markdownElements');
var r = require('./lib/reactRender');

function app(text) {
  var builders = {};
  builders[EL.BULLETLIST] = build.customBuildFactory(EL.BULLETLIST);
  builders[EL.BLOCKQUOTE] = build.customBuildFactory(EL.BLOCKQUOTE);
  builders[EL.EM] = build.customBuildFactory(EL.EM);
  builders[EL.HEADER] = build.buildHeader;
  builders[EL.INLINECODE] = build.customBuildFactory(EL.INLINECODE);
  builders[EL.LINK] = build.buildLink;
  builders[EL.LINKREF] = build.buildLinkRef;
  builders[EL.LISTITEM] = build.buildListitem;
  builders[EL.NUMBERLIST] = build.customBuildFactory(EL.NUMBERLIST);
  builders[EL.PARA] = build.customBuildFactory(EL.PARA);
  builders[EL.STRONG] = build.customBuildFactory(EL.STRONG);
  var builder = new build.Builder(builders);

  var syntax = markdown.parse(text);

  var top = builder.buildTop(syntax.slice(1));

  var reactBuilder = new r.ReactBuilder(r.elements);

  var comp = reactBuilder.build(top);

  return comp;
}

exports.app = app;
