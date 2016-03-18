const React = require('react');
const ReactDOM = require('react-dom');
const auth = require('../helpers/auth')
const Veri = require('./veri.js');


const Create = React.createClass({

  getInitialState: function(){
    return {checked: false}
  },
  handleCheck: function(event) {
    event.preventDefault();
    this.setState({checked: !this.state.checked})
  },



  showVerification : function(event) {
    event.preventDefault();
    let phonenumber = {
      phonenumber: this.refs.phonenumber.value
    }

    console.log(phonenumber);
    this.props.showVer(phonenumber)
    this.refs.showVerification.reset()
  },

  render : function(){

    var msg;
    {if(this.state.checked) {
      msg = <Veri text={'Your verification code is '} code={'code'}/>
    }
    else {
      msg = <Veri details={''}/>
    }}

    return (

      <div>
      <h1>Create Your Plantee</h1>

      <h2>Please Enter Your Phone Number</h2>
      <p>You will recieve a phone call in order to verify that you are capable of raising a plantee</p>


      <form className="telephoneNumber" onSubmit={this.handleCheck}>
         <input id="phonenumber" ref="phonenumber" type="tel" />
         <input type="Submit" />
       </form>
       <div> {msg} </div>

       <h3>{this.props.children}</h3>


       </div>
    )
  }
})

module.exports = Create;
