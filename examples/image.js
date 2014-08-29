'use strict';

var fs = require('fs');
var util = require('util');
var React = require('react');

var i = require('../index.js');


var text = '![Image](image.png)';

var app = i.buildReactApp(text);

// outputs the Markdown in README to static html
console.log(React.renderComponentToStaticMarkup(app));
