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
const auth = require('./helpers/auth.js')
const requireAuth = require('./helpers/requireauth.js')
const About = require('./components/about.js')
const Dashboard = require('./components/dashboard.js')
const Login = require('./components/login.js')
const Logout = require('./components/logout.js')
const Signup = require('./components/signup.js')
const Header = require('./components/header.js')

/* React App Creation */
const App = React.createClass({
  // Declares the initial state when app is loaded
  getInitialState : function() {
    return {
      loggedIn: auth.loggedIn()
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
  // Renders App and all of its children
  render : function() {
    return (
      <div className="row">
      <Header />
        <section className="col s12">
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
          <li><Link to="/signup">Sign up</Link></li>

          <li><Link to="/about">About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link> (authenticated)</li>
        </ul>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
        </section>
      </div>
    )
  }
})


// ReactRouter initialization and configuration. 
var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
    <Route path="header" component={Header} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="signup" component={Signup} />
      <Route path="about" component={About} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
)
ReactDOM.render(<App />, document.querySelector('#container'))
