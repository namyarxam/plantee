// 'use strict'

var React = require('react');
var ReactDOM = require('react-dom');
var auth = require('../helpers/auth')


const Signup = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState : function() {
    return {
      error: false
    }
  },

  handleSubmit : function(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

      $.post('/users', {email: email, password: pass})
        .done((data)=>{
          cb({
            status: 201,
            success: true
          })
        })
        .fail((data)=>{
          cb({
            status: 202,
            data: data
          })
        })
        const { location } = this.props

        if (location.state && location.state.nextPathname) {
          this.context.router.replace(location.state.nextPathname)
        } else {
          this.context.router.replace('/')
        }



  },

  render : function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="email@email.com" /></label>
        <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
        <button type="submit">Sign Up</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }
})

module.exports = Signup;
