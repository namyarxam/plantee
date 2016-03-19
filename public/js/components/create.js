const React = require('react');
const ReactDOM = require('react-dom');
const auth = require('../helpers/auth')
const Veri = require('./veri.js');
const App = require('../app.js');

const ReactRouter = require('react-router');
// 4 components pulled from ReactRouter:
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;


const Create = React.createClass({

  contextTypes: { // set context type and name
      change: React.PropTypes.bool
    },

  getInitialState: function(){
    return {checked: false}
  },
  handleClick: function(event) {
    event.preventDefault();
    this.setState({checked: !this.state.checked})

    let phonenumber = {
      phonenumber: this.refs.phonenumber.value
    }

  },

  showVerification : function(event) {
    event.preventDefault();

  },


  // remove(e) {
  //   e.preventDefault();
  //   this.props.params. changeHPage(this.props.params.change)
  //   console.log(this.props);
  // },

  changeHPage: function(event) {
    event.preventDefault();
    this.setState({
      change: !this.state.change
    });
    console.log("changePage On HomePage Pressed");
  },

  render : function(){




    var msg;
    {if(this.state.checked) {
      msg = <div>

      <Veri text={'Your verification code is '}  code={'code'}/>

       <form className="gotIt" onSubmit={this.changeHPage} >
      <input type="Submit" value="Got It" />
       </form> </div>
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

       <h3>{this.props.children}</h3>


       </div>
    )
  }
})

module.exports = Create;
