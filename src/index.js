'use strict';

var fs = require('fs');
var util = require('util');

var markdown = require('markdown').markdown;
var React = require('react');

var build = require('./buildMarkdownTree');
var rBuildTop = require('./reactRender').buildTop;


function main() {
  var builders = {};
  builders[build.BULLETLIST] = build.customBuildFactory(build.BULLETLIST);
  builders[build.BLOCKQUOTE] = build.customBuildFactory(build.BLOCKQUOTE);
  builders[build.EM] = build.customBuildFactory(build.EM);
  builders[build.HEADER] = build.buildHeader;
  builders[build.LINKREF] = build.buildLinkRef;
  builders[build.LISTITEM] = build.buildListitem;
  builders[build.PARA] = build.customBuildFactory(build.PARA);
  builders[build.STRONG] = build.customBuildFactory(build.STRONG);
  var builder = new build.Builder(builders);


  var text = fs.readFileSync('text.md', 'utf-8');
  var syntax = markdown.parse(text);
  console.log(util.inspect(syntax, {depth: 10}));

  var top = builder.buildTop(syntax.slice(1));

  console.log('XXXXXXXXXXXX');
  console.log(util.inspect(top, {depth: null}));


  console.log(React.renderComponentToStaticMarkup(rBuildTop(top)));
}

main();
