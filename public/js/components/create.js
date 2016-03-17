const React = require('react');
const ReactDOM = require('react-dom');
const auth = require('../helpers/auth')
const Verification = require('./verification.js');


const Create = React.createClass({

  showVerification : function() {
    return (<Verification />)
  },

  render : function(){
    return (

      <div>
      <h1>Create Your Plantee</h1>

      <h2>Please Enter Your Phone Number</h2>
      <p>You will recieve a phone call in order to verify that you are capable of raising a plantee</p>


      <form className="telephoneNumber" onSubmit={this.showVerification}>
         <input type="tel" />
         <input type="Submit" />
       </form>

       </div>
    )
  }
})

module.exports = Create;
