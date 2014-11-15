'use strict';
var util = require('util');
var React = require('react');

var i = require('../index.js');

var text = '| t1: test\n| t2: test2\n#Transform\n\n* one\n* two\n* three';

var ast = i.buildMarkdownAST(text);
console.log(util.inspect(ast, {depth:null}));
var components = i.getDefaultReactComponents();

var ReactBuilder = i.ReactBuilder;
var reactBuilder = new ReactBuilder(components);
var app = reactBuilder.build(ast);


// outputs the Markdown in README to static html
console.log(React.renderComponentToStaticMarkup(app));
