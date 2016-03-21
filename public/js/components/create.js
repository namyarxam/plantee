const React = require('react');
const ReactDOM = require('react-dom');
const auth = require('../helpers/auth')
const Veri = require('./veri.js');
const App = require('../app.js');
const cronJob = require('../cron.js');
const ReactRouter = require('react-router');

const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;

const Create = React.createClass({
  getInitialState: function(){
    return {
      checked: false,
      code: ''
    }
  },

  handleClick: function(event) {
    event.preventDefault();
    let num = this.refs.phonenumber.value;
    let name = this.refs.planteename.value;

    if(num && name) {
      this.setState({checked: !this.state.checked})
      $.ajax({
        url:'/plantee/verify',
        type: 'GET',
        data: {
          name: name,
          num: num
        }
      }).done((data) => {
        this.state.code = data;
        this.setState({ code: this.state.code });
      })
    }
  },

  showVerification : function(event) {
    event.preventDefault();

  },


  render : function(){

    let create = {
      position: 'relative',
      color:'green',
      top: '150px',
      textAlign: 'center'
    }


    var msg;
    {if(this.state.checked) {
      msg = <div>
              <Veri text={'Your verification code is '}  code={this.state.code}/>
              <button><Link to="plantee">Im feeling Plantee</Link></button>
            </div>
    }
    else {
      msg = <Veri details={''}/>
    }}

    return (

      <div style={create}>

      <p>Please Enter Your Phone Number.</p>
      <p>You will recieve a phone call and your verification number will appear below.</p>
      <form className="telephoneNumber" onSubmit={this.handleClick}>
         <input id="planteename" placeholder="Plantee Name" ref="planteename" type="text" />
         <input id="phonenumber" placeholder="Phone #" ref="phonenumber" type="tel" />
         <input type="Submit" />
      </form>
      <div> {msg} </div>
      <h3>{this.props.children}</h3>
      </div>
    )
  }
})

module.exports = Create;
