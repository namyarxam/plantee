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


const Planteeimg = React.createClass({
  getInitialState: function() {
    return {checked: true}
  },

  render : function() {
    return (
			  <div>
				  <img src={'images/plantee.jpg'} alt="plantee" className=""/>
	 		  </div>
    )
  }
})

module.exports = Planteeimg;
