const React = require('react');
const ReactDOM = require('react-dom');
const auth = require('../helpers/auth')
const Veri = require('./veri.js');
const cronJob = require('../cron.js');

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

  changePage: function(event) {
    event.preventDefault();
    this.setState({change: !this.state.change})
    
    cronJob.planteePing(function() {
      let caretakerNumbers = [];
      let caretakerNames = [];

      // what if the cron job already exists will things break
      // THIS JUST UPDATES A GLOBAL VARIABLE THT GETS CALLED FROM IN THE RUNNING CRONJOB YESSS
      // if x.length =!= phone number dont push
      $.ajax({
        url: '/plantee/gardeners',
        type: 'GET',
      }).done((data) => {
        data.forEach((el) => {
          caretakerNames.push(el.name);
          caretakerNumbers.push(el.phone);
        })
      })


    });
   
  },

  render : function(){

    var msg;
    {if(this.state.checked) {
      msg = <div><Veri text={'Your verification code is '}  code={this.state.code}/> <form className="gotIt" onSubmit={this.changePage} >
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
      <p>You will recieve a phone call soon enough to verify that you are capable of raising a plantee</p>



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
