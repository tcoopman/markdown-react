'use strict';

var fs = require('fs');
var React = require('react');

var i = require('../index.js');


var counter = 0;

/**
 * A react class that returns an upperCaseList and counts all the list items.
 *
 * You should always build the values so nested values can be turned into proper
 * components. After the values are build, it's possible to transform the value
 * any way you want.
 *
 * This is a trival example and there are probably better ways to do this,
 * but using react makes it possible to do much complexer things.
 */
var UpperCaseList =  React.createClass({
  render: function () {
    var values = this.props.builder.buildValues(this.props.component.values);
    values = values.map(function (value) {
      if (typeof value === 'string') {
        return value.toLocaleUpperCase();
      }
    });

    counter += 1;

    return React.DOM.li({className: 'test'}, values);
  }
});


var text = '#Transform\n\n* one\n* two\n* three';

var ast = i.buildMarkdownAST(text);
var components = i.getDefaultReactComponents();

components[i.EL.LISTITEM] = UpperCaseList;

var ReactBuilder = i.ReactBuilder;
var reactBuilder = new ReactBuilder(components);
var app = reactBuilder.build(ast);


// outputs the Markdown in README to static html
console.log(React.renderComponentToStaticMarkup(app));
console.log('There are ' + counter + ' list items');
