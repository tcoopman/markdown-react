/** @jsx React.DOM */
'use strict';

var fs = require('fs');
var util = require('util');
var markdown = require('markdown').markdown;
var React = require('react');

var rBuildComponent = require('./reactRender').buildComponent;

var Section = {
  add: function (component) {
    if (component.id === 'Section' && component.level && component.level <= this.level) {
      this.parent.add(component);
    } else {
      this.components.push(component);
      component.parent = this;
    }
  }
};

function Section(level) {
  this.components = [];
  this.level = level;
}


var buildListItem = function (item, parent) {

}


var buildComponent = function (item, parent) {
  var section = Object.create(Section);
  var level;
  var id;
  if (item.references) {
    section.id = 'references';
    section.value = item.references;
    return section;
  }

  if (Array.isArray(item)) {
    var type = item[0];
    var args = item.slice(1);
  } else {
    var type = '';
    var args = item;
  }

  if (type === 'para' && args[0][0] === 'link_ref') {
    var toParse = args[0][2].split('@')[1].split('(');
    id = toParse[0];
    var props = toParse[1].substring(0, toParse[1].length-1);
    level = parent.level + 1;
    section.props = props;
    section.parent = parent;
    section.components = [];
  } else if (type === 'header') {
    id = 'header';
    section.level = args[0].level;
    var value = item[2];
    section.value = value;
  } else if (type === 'bulletlist' || type === 'numberlist') {
    id = type;
    section.components = args.map(function (listitem) {
      return buildComponent(listitem);
    });
  } else if (type === 'listitem') {
      //for some reason some items get wrapped in para
      section.value = (!Array.isArray(args[0])) ? args[0] : args[0][1];
      if (args.length === 1) {
        id = type;
      } else {
        id = type;
        section.components = args.slice(1).map(function (arg) {
          return buildComponent(arg);
        });
      }
  } else if (type === 'link_ref') {
    section.ref = args[0].ref;
    section.original = args[0].original;
    section.value = args[1];
    id = type;
  } else {
    if (args.length === 1 && Array.isArray(args)) {
      var items;
      if (Array.isArray(args[0])) {
        items = buildComponent(args[0]);
      } else {
        items = args[0];
      }
      section.value = items;
    } else if (Array.isArray(args)) {
      var items = args.map(arg => {
        return buildComponent(arg);
      });
      section.value = items;
    } else {
      section.value = args;
    }
    id = type;
  }

  section.id = id;

  return section;
}


function main() {
  var text = fs.readFileSync('text.md', 'utf-8');
  var syntax = markdown.parse(text);
  console.log(util.inspect(syntax, {depth: null}));

  var tree = Object.create(Section);
  tree.id = 'Section';
  tree.level = 0;
  tree.components = [];
  var node = tree;

  syntax.map(function (item) {
    var comp;
    if (item !== 'markdown') {
      comp = buildComponent(item, node);

      if (comp.id === 'header') {
        //create a new section.
        var section = Object.create(Section);
        section.id = 'Section';
        section.level = comp.level;
        section.parent = node;
        section.components = [];
        node.add(section);
        node = section;
      }
      node.add(comp);
    }
  });
  //console.log(util.inspect(tree, {depth: null}));
  //console.log(React.renderComponentToStaticMarkup(rBuildComponent(tree)));
}

main();
