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

const EditBeverage = React.createClass({
  handleSubmit: function(event){
    event.preventDefault();
    var beverage = {
      beverage_id: this.props.details.beverage_id,
      name:  this.refs.name.value,
      price: this.refs.price.value,
      edit: false,
      deleted: false
    }
    this.props.editBeverage(beverage);       // connection to addBeverage method in App Component
  },
  render: function(){
    return(
      <tr>
        <td><input className="u-full-width" type="text"  id="drink_name" ref="name" placeholder={this.props.details.beverage_name} /></td>
        <td><input className="u-full-width" type="number" min="0" step="0.01" id="drink_price" ref="price" placeholder={this.props.details.beverage_price} /></td>
        <td id="btn">
          <button id="update" className="button-primary" onClick={this.handleSubmit}>Submit Edit</button>
        </td>
      </tr>
    )
  }
});
