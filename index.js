'use strict';


var build = require('./lib/markdownjs/buildMarkdownTree');
var EL = require('./lib/markdownElements');
var ReactBuilder = require('./lib/reactBuilder').ReactBuilder;
var reactComponents = require('./lib/reactComponents');


function getDefaultReactComponents() {
  var components = {};
  components[EL.BLOCKQUOTE] = reactComponents[EL.BLOCKQUOTE];
  components[EL.BULLETLIST] = reactComponents[EL.BULLETLIST];
  components[EL.EM] = reactComponents[EL.EM];
  components[EL.HEADER] = reactComponents[EL.HEADER];
  components[EL.IMAGE] = reactComponents[EL.IMAGE];
  components[EL.INLINECODE] = reactComponents[EL.INLINECODE];
  components[EL.LISTITEM] = reactComponents[EL.LISTITEM];
  components[EL.LINK] = reactComponents[EL.LINK];
  components[EL.LINKREF] = reactComponents[EL.LINKREF];
  components[EL.NUMBERLIST] = reactComponents[EL.NUMBERLIST];
  components[EL.PARA] = reactComponents[EL.PARA];
  components[EL.SECTION] = reactComponents[EL.SECTION];
  components[EL.STRONG] = reactComponents[EL.STRONG];
  return components;
}


function buildMarkdownAST(text) {
  var builder = new build.Builder();
  var syntax = build.parseMarkdown(text);
  var ast = builder.buildTop(syntax.slice(1));
  return ast;
}


function buildReactApp(text) {
  var ast = buildMarkdownAST(text);
  var reactBuilder = new ReactBuilder(getDefaultReactComponents());

  return reactBuilder.build(ast);
}

exports.buildMarkdownAST = buildMarkdownAST;
exports.buildReactApp = buildReactApp;
exports.ReactBuilder = ReactBuilder;
exports.getDefaultReactComponents = getDefaultReactComponents;
exports.EL = EL;
