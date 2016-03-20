var React = require('react');
var ReactDOM = require('react-dom');
var auth = require('../helpers/auth')

const Veri = React.createClass({
  render : function() {
    return (
   			 <div>{this.props.text}{this.props.code}</div>
  	)
  }
})

module.exports = Veri;
