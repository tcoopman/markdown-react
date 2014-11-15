/** @jsx React.DOM */
var React = require('react');


function ReactBuilder(elements) {
  this.elements = elements;
}


ReactBuilder.prototype.build = function(top) {
  this.references = top.references;
  return this.buildElement(top.section);
};


ReactBuilder.prototype.buildElement = function(component) {
  // First return the easy cases;
  if (typeof component === 'undefined') {
    return <div>UNDEFINED</div>;
  }

  if (typeof component === 'string') {
    return component;
  } else if (Array.isArray(component) && Array.length === 1) {
    return component[0];
  }

  if (component.id) {
    var element = this.elements[component.id];
    if (element) {
      return React.createElement(element)({component: component, builder: this});
    } else {
      return <div>NOOOO</div>;
    }
  } else {
    return <div>AARRRGGGH</div>;
  }

};


ReactBuilder.prototype.buildValues = function(values) {
  var buildedValues;
  if (Array.isArray(values)) {
    buildedValues = values.map(item => {
      return this.buildElement(item);
    });
  } else {
    buildedValues = this.buildElement(values);
  }

  return buildedValues;
};


exports.ReactBuilder = ReactBuilder;
