const React = require('react');
const ReactDOM = require('react-dom');
const auth = require('../helpers/auth')
const Veri = require('./veri.js');
const App = require('../app.js');
const ReactRouter = require('react-router');

const Link = ReactRouter.Link;
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;



const Create = React.createClass({

  getInitialState: function(){
    return {checked: true}
  },


  handleClick: function(event) {
    event.preventDefault();
    this.setState({checked: !this.state.checked})

    let phonenumber = {
      phonenumber: this.refs.phonenumber.value
    }

    console.log(phonenumber);
  },

  showVerification : function(event) {
    event.preventDefault();

  },


  render : function(){

    var msg;
    {if(this.state.checked) {
      msg = <div><Veri text={'Your verification code is '}  code={'code'}/>

      <button><Link to="plantee">Plante Me</Link></button>

       </div>
    }
    else {
      msg = <Veri details={''}/>
    }}

    return (
      <div>

      <h1>Create Your Plantee</h1>

      <h2>Please Enter Your Phone Number</h2>
      <p>You will recieve a phone call in order to verify that you are capable of raising a plantee</p>



      <form className="telephoneNumber" onSubmit={this.handleClick}>
         <input id="phonenumber" ref="phonenumber" type="tel" />
         <input type="Submit" />
       </form>
       <div> {msg} </div>
       {/*<h3>{this.props.children}</h3>*/}
       </div>
    )
  }
})

module.exports = Create;
