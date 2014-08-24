'use strict';

var fs = require('fs');
var React = require('react');

var i = require('../index.js');

var text = fs.readFileSync('README.md', 'utf-8');

var app = i.buildReactApp(text);

// outputs the Markdown in README to static html
console.log(React.renderComponentToStaticMarkup(app));
