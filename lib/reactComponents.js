/** @jsx React.DOM */
var React = require('react');

var EL = require('./markdownElements');


var Header = React.createClass({displayName: 'Header',
  render: function () {
    var html;
    var values = this.props.builder.buildValues(this.props.component.values);
    var level = this.props.component.level;
    if (level && level > 0 && level < 7) {
      var h = React.DOM['h' + level];
      html = (h(null, values));
    } else {
      html = (React.DOM.div(null, "\"ERROR incorrect level\""));
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
      if (this.props.builder.references &&
            this.props.builder.references.hasOwnProperty(this.props.component.ref)) {
        link = this.props.builder.references[this.props.component.ref].href;
      } else {
        link = '';
      }
    }
    var values = this.props.builder.buildValues(this.props.component.values);

    return (
      React.DOM.a({href: link}, values)
    );
  }
});


var Image =  React.createClass({displayName: 'Image',
  render: function () {
    return React.DOM.img({alt: this.props.component.alt, href: this.props.component.href}, null);
  }
});


function createReactClass(element) {
  return React.createClass({
    render: function () {
      var values = this.props.builder.buildValues(this.props.component.values);
      return (
        element(null, values)
      );
    }
  });
}


exports[EL.BLOCKQUOTE] = createReactClass(React.DOM.blockquote);
exports[EL.BULLETLIST] = createReactClass(React.DOM.ul);
exports[EL.EM] = createReactClass(React.DOM.em);
exports[EL.HEADER] = Header;
exports[EL.IMAGE] = Image;
exports[EL.INLINECODE] = createReactClass(React.DOM.code);
exports[EL.LISTITEM] = createReactClass(React.DOM.li);
exports[EL.LINK] = Link;
exports[EL.LINKREF] = Link;
exports[EL.NUMBERLIST] = createReactClass(React.DOM.ol);
exports[EL.PARA] = createReactClass(React.DOM.p);
exports[EL.SECTION] = createReactClass(React.DOM.section);
exports[EL.STRONG] = createReactClass(React.DOM.strong);
