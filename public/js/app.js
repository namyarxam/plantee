/* STRICT MODE: See `../../server.js` */
'use strict';

/* GLOBAL REACT REQUIRES */
// React.js
const React = require('react');
// React-DOM for HTML rendering
const ReactDOM = require('react-dom');
// React router for dynamic pathing. Has several component features that need to be required to use.
const ReactRouter = require('react-router');
// 4 components pulled from ReactRouter:
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;

/* Relative paths to external components */
const auth = require('./helpers/auth.js');
const requireAuth = require('./helpers/requireauth.js');
const About = require('./components/about.js');
const Login = require('./components/login.js');
const Logout = require('./components/logout.js');
const Signup = require('./components/signup.js');
const Header = require('./components/header.js');
const Create = require('./components/create.js');
const NotFound = require('./components/notfound.js');
const Veri = require('./components/veri.js');


/* React App Creation */
const App = React.createClass({
  // Declares the initial state when app is loaded
  getInitialState : function() {
    return {
      loggedIn: auth.loggedIn(),
      veri: false,
      phoneNumber: {}
    }
  },
  // Updates state when login is trigger
  updateAuth : function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },





  // Login even triggered and sent to back-end
  componentWillMount : function() {
    auth.onChange = this.updateAuth
    auth.login()
  },


  addNumber: function(phonenumber){

    this.state.phonenumber = phonenumber
    this.setState()

  },


  // Renders App and all of its children
  render : function() {
    return (
      <div className="row">
      <Veri> This is a child </Veri>
      <Header details="Hi, I'm Plantee"/>
        <section className="col s12">
        <ul>
            {this.state.loggedIn ? (
              <div>
                <li><Link to="/logout">Log out</Link> </li>
                <li><Link to="/create">Create Your Plantee</Link></li>
                {/*<Create> <Veri/> </Create>*/}
             </div>
            ) : (
              <div>
                <li><Link to="/login">Log In</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
             </div>
            )}
          <li><Link to="/about">About</Link></li>
        </ul>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
        </section>
      </div>
    )
  }
})

/* React router initialization */
var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
    <Route path="header" component={Header} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="create" component={Create} />
      <Route path="signup" component={Signup} />
      <Route path="about" component={About} />
      <Route path="very" component={Veri} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#container'))
