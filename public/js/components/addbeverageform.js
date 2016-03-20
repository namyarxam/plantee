const React = require('react');
const ReactDOM = require('react-dom');
const auth = require('../helpers/auth')
const Veri = require('./veri.js');
const App = require('../app.js');

const ReactRouter = require('react-router');
// 4 components pulled from ReactRouter:
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;

const AddBeverageForm = React.createClass({
  handleSubmit: function(event){
    event.preventDefault();
    var beverage = {
      name:  this.refs.name.value,
      price: this.refs.price.value,
      edit: false,
      deleted: false
    }
    this.props.addBeverage(beverage);       // connection to addBeverage method in App Component
    this.refs.beverageForm.reset();         // clears Beverage Form input fields
  },
  render: function(){
    return(
      <form ref="beverageForm" onSubmit={this.handleSubmit}>
        <h5>Add New Beverage</h5>

        <div className="row">
          <div className="eight columns">
            <label htmlFor="drink_name">Coffee Name</label>
            <input className="u-full-width" type="text"  id="drink_name" ref="name" />
          </div>
          <div className="three columns">
            <label htmlFor="drink_price">Price</label>
            <input className="u-full-width" type="number" min="0" step="0.01" id="drink_price" ref="price" />
          </div>
        </div>

        <div className="row">
          <button className="button-primary" type="submit" name="action">Add Beverage</button>
        </div>
      </form>
    )
  }
});
