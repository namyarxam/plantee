const React = require('react');
const ReactDOM = require('react-dom');
const auth = require('../helpers/auth')
const planteeMainPic = require('./veri.js');
const Veri = require('./veri.js');
const NotFoundd = require('./notfound.js');

const ReactRouter = require('react-router');
// 4 components pulled from ReactRouter:
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;




module.exports = NotFound;


const TeamBuilder = React.createClass({
  getInitialState: function(){
    return {friends: {}}
  },


  componentDidMount: function(){
    // get list of all beverages from db
    $.get('/plantee/gardeners')
     .done((data)=>{
        data.forEach((el)=>{
          this.state.friends[el.friend_name] = el
        })
        this.setState({ friends: this.state.friends })
     })
  },

  addFriend: function(newFriend, event){
    console.log("Invite Friend Pressed");

  },

  handleSubmit: function(event){
    event.preventDefault();
    var friend = {
      name:  this.refs.friend_name.value,
      phone: this.refs.phone.value
    }

    var that = this
    $.post('/plantee/gardeners', friend)
      .done((data)=>{
        that.state.friends[data.friend_name] = data;
        that.setState({ friends: that.state.friends })
      })
    // this.props.addBeverage(beverage);       // connection to addBeverage method in App Component
    // this.refs.beverageForm.reset();         // clears Beverage Form input fields
  },






  render : function() {





    return (

<div>


      <div><img src={'images/plantee.jpg'} alt="plantee" className=""/><span>Add Some Friends!</span></div>


      <form ref="beverageForm" onSubmit={this.handleSubmit}>
            <h5>Invite Friends</h5>

            <div className="row">
              <div className="eight columns">
                <label htmlFor="friend_name">Friend Name</label>
                <input className="u-full-width" type="text"  id="friend_name" ref="friend_name" />
              </div>
              <div className="three columns">
                <label htmlFor="phone">Phone Number</label>
                <input className="u-full-width" type="number" min="0" step="0.01" id="phone" ref="phone" />
              </div>
            </div>

            <div className="row">
              <button className="button-primary" type="submit" name="action">Send Invite</button>
            </div>
          </form>
</div>

    )
  }
})

module.exports = TeamBuilder;
