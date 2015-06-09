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

  var TheElement = this.elements[component.id];
  if (!TheElement) {
    return <div>NOOOO</div>;
  }
  // monkey punch, amirite?
  if (typeof TheElement === 'function') {
    return React.createElement(TheElement, {component, builder: this});
  }

  return <TheElement component={component} builder={this} />;

};


ReactBuilder.prototype.buildValues = function(values) {
  return Array.isArray(values) ?
    values.map(item => this.buildElement(item)) :
    this.buildElement(values);
};


exports.ReactBuilder = ReactBuilder;
