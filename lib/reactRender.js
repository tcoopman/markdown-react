/** @jsx React.DOM */
var React = require('react');

var EL = require('./markdownElements');


var Header = React.createClass({displayName: 'Header',
  handleClick: function () {
    console.log('clicked');
  },


  render: function () {
    var html;
    var values = this.props.builder.buildValues(this.props.component.values);
    var level = this.props.component.level;
    if (level && level > 0 && level < 7) {
      var h = React.DOM['h' + level];
      html = (h({onClick: this.handleClick}, values));
    } else {
      html = (React.DOM.div(null, "ERROR incorrect level"));
    }
    return (
      html
    );
  }
});


var Link = React.createClass({displayName: 'Link',
  render: function () {
    var link;
    if (this.props.component.href) {
      link = this.props.component.href;
    } else {
      link = this.props.builder.references[this.props.component.ref].href;
    }
    var values = this.props.builder.buildValues(this.props.component.values);

    return (
      React.DOM.a({href: link}, values)
    );
  }
});


function createReactClass(element) {
  return React.createClass({
    handleClick: function () {
        console.log('clicked element');
    },


    render: function () {
      var values = this.props.builder.buildValues(this.props.component.values);
      return (
        element({onClick: this.handleClick}, 
          values
        )
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
    return React.DOM.div(null, "UNDEFINED");
  }

  if (typeof component === 'string') {
    return component;
  } else if (Array.isArray(component) && Array.length === 1) {
    return component[0];
  }

  if (component.id) {
    var element = this.elements[component.id];
    if (element) {
      return element({component: component, builder: this});
    } else {
      return React.DOM.div(null, "NOOOO");
    }
  } else {
    return React.DOM.div(null, "AARRRGGGH");
  }

}


ReactBuilder.prototype.buildValues = function(values) {
  var buildedValues;
  if (Array.isArray(values)) {
    buildedValues = values.map(function(item)  {
      return this.buildElement(item);
    }.bind(this));
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
elements[EL.INLINECODE] = createReactClass(React.DOM.code);
elements[EL.LISTITEM] = createReactClass(React.DOM.li);
elements[EL.LINK] = Link;
elements[EL.LINKREF] = Link;
elements[EL.NUMBERLIST] = createReactClass(React.DOM.ol);
elements[EL.PARA] = createReactClass(React.DOM.p);
elements[EL.SECTION] = createReactClass(React.DOM.section);
elements[EL.STRONG] = createReactClass(React.DOM.strong);


exports.elements = elements;
exports.ReactBuilder = ReactBuilder;
