const React = require('react');
const ReactDOM = require('react-dom');
const auth = require('../helpers/auth')
const Veri = require('./veri.js');
const Friend = require('./friend.js');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;


const TeamBuilder = React.createClass({
  getInitialState: function() {
    return { 
    	friends: {} 
    }
  },
  
  componentDidMount: function() {
    $.get('plantee/gardeners').done((data) => {
      data.forEach((el) => {
        this.state.friends[el.name] = el;
      });
      this.setState({ friends: this.state.friends })
    })
  },

  addFriend : function(newFriend) {
      var updateData = (data) => {
        var newID = data.friend_name;
        this.state.friends[newID] = newFriend;
        this.setState({friends: this.state.friends});
      }

      $.post('/plantee/gardeners', newFriend)
      .done(updateData)
  },

  handleSubmit: function(event){
    event.preventDefault()

    var name = this.refs.friend_name.value;
    var phone = this.refs.phone_number.value;

    if(phone.toString().length === 10) {
    	var friend = {
    		name: name,
    		phone: phone
    	}
    	this.addFriend(friend);
    }
  },

	renderFriend: function(key) {
	  return (
	    <Friend index={key} key={key} details={this.state.friends[key]} />
	  )
	},

  clickHandler: function(e) {
    $.get('/plantee/initiatePlanteeGrow');
    $('.initiate').remove();
  },

  render: function() {
    return (
			<div>
				<div>
					<ul className="collection with-header">
            <li className="collection-header"><h4>Friends </h4></li>
            <Friend details={this.state.friends} />
            {Object.keys(this.state.friends).map(this.renderFriend)}
          </ul>
     		</div>
      	<div>
     			 <img src={'images/plantee.png'} alt="plantee" className=""/><span>Add Some Friends!</span></div>
					 <form ref="friendForm" onSubmit={this.handleSubmit} >
             <h5>Invite Friends</h5>
             <div className="row">
                <div className="eight columns">
                  <label htmlFor="friend_name">Friend Name</label>
                  <input className="u-full-width" type="text"  id="friend_name" ref="friend_name" />
                </div>
                <div className="three columns">
                  <label htmlFor="phone_number">Phone Number</label>
                  <input className="u-full-width" type="tel" min="0" step="0.01" id="phone_number" ref="phone_number" />
                </div>
  	       	 </div>
  	         <div className="row">
  	           <button className="button-primary" type="submit" >Send Invite</button>
  	         </div>
	         </form>
           <button className="button-primary initiate" onClick={this.clickHandler} >Plant me!</button>
			</div>
    )
  }
})

module.exports = TeamBuilder;