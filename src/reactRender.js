/** @jsx React.DOM */
var React = require('react');

var EL = require('./markdownElements');


var Header = React.createClass({
  render: function () {
    var html;
    var values = this.props.builder.buildValues(this.props.component.values);
    switch (this.props.component.level) {
      case 1:
        html = (<h1>{values}</h1>);
        break;
      case 2:
        html = (<h2>{values}</h2>);
        break;
      default:
        html = (<h3>{values}</h3>);
        break;
    }
    return (
      html
    );
  }
});


var Link = React.createClass({
  render: function () {
    var link = this.props.builder.references[this.props.component.ref].href;
    var values = this.props.builder.buildValues(this.props.component.values);

    return (
      <a href={link}>{values}</a>
    );
  }
});


function createReactClass(element) {
  return React.createClass({
    render: function () {
      var values = this.props.builder.buildValues(this.props.component.values);
      return (
        <element>
          {values}
        </element>
      );
    }
  });
}


function ReactBuilder(elements) {
  this.elements = elements;
}


ReactBuilder.prototype.build = function(top) {
  this.references = top.references;
  return this.buildElement(top.section);
}


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
      return <element component={component} builder={this} />;
    } else {
      return <div>NOOOO</div>;
    }
  } else {
    return <div>AARRRGGGH</div>;
  }

}


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
}


var elements = {}
elements[EL.BLOCKQUOTE] = createReactClass(React.DOM.blockquote);
elements[EL.BULLETLIST] = createReactClass(React.DOM.ul);
elements[EL.EM] = createReactClass(React.DOM.em);
elements[EL.HEADER] = Header;
elements[EL.INLINECODE] = createReactClass(React.DOM.pre);
elements[EL.LISTITEM] = createReactClass(React.DOM.li);
elements[EL.LINKREF] = Link;
elements[EL.NUMBERLIST] = createReactClass(React.DOM.ol);
elements[EL.PARA] = createReactClass(React.DOM.p);
elements[EL.SECTION] = createReactClass(React.DOM.section);
elements[EL.STRONG] = createReactClass(React.DOM.strong);


exports.elements = elements;
exports.ReactBuilder = ReactBuilder;
