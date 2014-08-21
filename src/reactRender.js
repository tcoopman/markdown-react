/** @jsx React.DOM */
var React = require('react');

var Section = React.createClass({
  render: function () {
    var components = this.props.components.map(component => {
      return buildComponent(component);
    });
    return (
      <div className="Section">{components}</div>
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
    var value;
    if (Array.isArray(this.props.value)) {
      value = this.props.value.map(item => {
        return buildComponent(item);
      });
    } else {
      value = this.props.value;
    }
    return (
      <p>{value}</p>
    );
  }
});

var Bulletlist = React.createClass({
  render: function () {
    var components = this.props.components.map(component => {
      return buildComponent(component);
    });
    return (
      <ul>
        {components}
      </ul>
    );
  }
});


var Numberlist = React.createClass({
  render: function () {
    var components = this.props.components.map(component => {
      return buildComponent(component);
    });
    return (
      <ol>
        {components}
      </ol>
    );
  }
});

var ListItem = React.createClass({
  render: function () {
    var nested = this.props.components && this.props.components.map(component => {
      return buildComponent(component);
    });
    return (
      <li>{this.props.value}{nested}</li>
    );
  }
});


var Blockquote = React.createClass({
  render: function () {
    var value;
    if (Array.isArray(this.props.value)) {
      value = this.props.value.map(item => {
        return buildComponent(item);
      });
    } else {
      value = buildComponent(this.props.value);
    }

    return (
      <blockquote>
        {value}
      </blockquote>
    );
  }
});

var buildComponent = function (component) {
  if (component.id === 'Section') {
    return (<Section components={component.components} />);
  } else if (component.id === 'header') {
    return (<Header level={component.level} value={component.value} />);
  } else if (component.id === 'para') {
    return (<Para value={component.value} />);
  } else if (component.id === 'bulletlist') {
    return (<Bulletlist components={component.components}/>);
  } else if (component.id === 'numberlist') {
    return (<Numberlist components={component.components} />);
  } else if (component.id === 'listitem') {
    return (<ListItem value={component.value} components={component.components}/>);
  } else if (component.id === 'hr') {
    return (<hr />);
  } else if (component.id === 'em') {
    return (<em>{component.value}</em>);
  } else if (component.id === 'strong') {
    return (<strong>{component.value}</strong>);
  } else if (component.id === '') {
    return (<span>{component.value}</span>);
  } else if (component.id === 'blockquote') {
    return (<Blockquote value={component.value} />);
  } else {
    return (<div>BLOWUP {component.id} {component.value}</div>);
  }
};

exports.buildComponent = buildComponent;
