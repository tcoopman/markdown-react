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
    return (
      <p>{this.props.value}</p>
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

var ListItem = React.createClass({
  render: function () {
    return (
      <li>{this.props.value}</li>
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
  } else if (component.id === 'listitem') {
    return (<ListItem value={component.value}/>);
  } else {
    return (<div>abc</div>);
  }
};

exports.buildComponent = buildComponent;
