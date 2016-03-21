const React = require('react');
const ReactDOM = require('react-dom');
const auth = require('../helpers/auth')
const planteeMainPic = require('./veri.js');
const Veri = require('./veri.js');
const ReactRouter = require('react-router');

const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;

const Plantee = React.createClass({
  getInitialState: function() {
    return {checked: true}
  },

  render : function() {

    let plantee = {
      height: '15em',
      width: '15em'
    }


    var team;
    {if(this.state.checked) {
      team = <div>
     					  <button><Link to="teambuilder">Invite Friends</Link></button>
     		 	   </div>
    } else {
      team = <Veri details={'Here'}/>
    }}


    return (
			<div>
     		 <h1>I'm Plantee. Thank you for buying me!</h1>
				 <div><img style={plantee} src={'images/plantee.png'} alt="plantee" className=""/><span>Hello</span></div>
     	   <div>{team}</div>
	  	</div>
    )
  }
})

module.exports = Plantee;
