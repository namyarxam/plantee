
var React = require('react');
var ReactDOM = require('react-dom');
var auth = require('../helpers/auth')


const Header = React.createClass({
  render : function() {
    return <h1>{this.props.details}</h1>
  }
})

module.exports = Header;
