'use strict'

var React = require('react');
var ReactDOM = require('react-dom');
var auth = require('../helpers/auth')


const Logout = React.createClass({
  componentDidMount : function() {
    auth.logout()
  },

  render : function() {
    return <p>You are now logged out</p>
  }
})

module.exports = Logout;
