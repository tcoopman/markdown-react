/** @jsx React.DOM */
var React = require('react');

function buildValues(values) {
  var buildedValues;
  if (Array.isArray(values)) {
    buildedValues = values.map(item => {
      return buildComponent(item);
    });
  } else {
    buildedValues = buildComponent(values);
  }

  return buildedValues;
}

var Section = React.createClass({
  render: function () {
    var values = buildValues(this.props.values);
    return (
      <div className="Section">{values}</div>
    );
  }
});

var Header = React.createClass({
  render: function () {
    var html;
    switch (this.props.level) {
      case 1:
        html = (<h1>{this.props.value}</h1>);
        break;
      case 2:
        html = (<h2>{this.props.value}</h2>);
        break;
      default:
        html = (<h3>{this.props.value}</h3>);
        break;
    }
    return (
      html
    );
  }
});

var Para = React.createClass({
  render: function () {
    var values = buildValues(this.props.values);
    return (
      <p>{values}</p>
    );
  }
});

var Bulletlist = React.createClass({
  render: function () {
    var values = buildValues(this.props.values);
    return (
      <ul>
        {values}
      </ul>
    );
  }
});


var Numberlist = React.createClass({
  render: function () {
    var values = buildValues(this.props.values);
    return (
      <ol>
        {values}
      </ol>
    );
  }
});

var ListItem = React.createClass({
  render: function () {
    var values = buildValues(this.props.values);
    return (
      <li>{values}</li>
    );
  }
});

var Link = React.createClass({
  render: function () {
    var link = references[this.props.ref].href;
    var values = buildValues(this.props.values);

    return (
      <a href={link}>{this.props.values}</a>
    );
  }
});


var Blockquote = React.createClass({
  render: function () {
    var values = buildValues(this.props.values);

    return (
      <blockquote>
        {values}
      </blockquote>
    );
  }
});

var references;


var buildTop = function (top) {
  references = top.references;
  return buildComponent(top.section);
}

var buildComponent = function (component) {
  if (typeof component === 'undefined') {
    return (<div>undefined</div>);
  }

  if (typeof component === 'string') {
    return component;
  } else if (Array.isArray(component) && Array.length === 1) {
    return component[0];
  }
  if (component.id === 'Section') {
    return (<Section values={component.values} />);
  } else if (component.id === 'references') {
    references = component;
    return (<span></span>);
  } else if (component.id === 'header') {
    return (<Header level={component.level} value={component.values} />);
  } else if (component.id === 'para') {
    return (<Para values={component.values} />);
  } else if (component.id === 'bulletlist') {
    return (<Bulletlist values={component.values}/>);
  } else if (component.id === 'numberlist') {
    return (<Numberlist components={component.values} />);
  } else if (component.id === 'listitem') {
    return (<ListItem values={component.values} />);
  } else if (component.id === 'hr') {
    return (<hr />);
  } else if (component.id === 'em') {
    return (<em>{component.values}</em>);
  } else if (component.id === 'strong') {
    return (<strong>{component.values}</strong>);
  } else if (component.id === '') {
    return (<span>{component.values}</span>);
  } else if (component.id === 'blockquote') {
    return (<Blockquote values={component.values} />);
  } else if (component.id === 'link_ref') {
    return (<Link values={component.values} ref={component.ref} />);
  } else {
    console.log('BLOWUP');
    console.log('component');
    console.log(component);
    return (<div>BLOWUP {component.id} {component.values}</div>);
  }
};

exports.buildComponent = buildComponent;
exports.buildTop = buildTop;
