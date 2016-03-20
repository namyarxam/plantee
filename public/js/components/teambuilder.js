const React = require('react');
const ReactDOM = require('react-dom');
const auth = require('../helpers/auth')
const planteeMainPic = require('./veri.js');
const Veri = require('./veri.js');
const ReactRouter = require('react-router');
// 4 components pulled from ReactRouter:
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;


const TeamBuilder = React.createClass({
  getInitialState: function(){
    return {checked: true}
  },


  render : function() {





    return (

<div>


      <div><img src={'images/plantee.jpg'} alt="plantee" className=""/><span>Add Some Friends!</span></div>



</div>

    )
  }
})

module.exports = TeamBuilder;
