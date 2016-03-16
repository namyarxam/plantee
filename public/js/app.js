// 'use strict'

const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;

const auth = require('./helpers/auth.js')
const requireAuth = require('./helpers/requireauth.js')
const About = require('./components/about.js')
const Dashboard = require('./components/dashboard.js')
const Login = require('./components/login.js')
const Logout = require('./components/logout.js')
const Signup = require('./components/signup.js')



const App = React.createClass({
  getInitialState : function() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth : function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount : function() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render : function() {
    return (
      <div className="row">
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



var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <Route path="login" component={Login} />

      <Route path="logout" component={Logout} />
      <Route path="signup" component={Signup} />

      <Route path="about" component={About} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
)
ReactDOM.render(routes, document.querySelector('#container'))
