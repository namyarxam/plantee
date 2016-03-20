var React = require('react');
var ReactDOM = require('react-dom');
var auth = require('../helpers/auth')

const ReactRouter = require('react-router');
// 4 components pulled from ReactRouter:
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;
const Planteeimg = require('./planteeimg.js');



const TeamBuilder = React.createClass({

  render: function(){
    return(

      <div>
      <Planteeimg />
      </div>
    )
  }
});

module.exports = TeamBuilder;
