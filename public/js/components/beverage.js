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

const Beverage = React.createClass({
  handleEdit: function(event){
    event.preventDefault();
    this.props.details.edit = true;
    var beverage = {
      beverage_id: this.props.details.beverage_id,
      name: this.props.details.beverage_name,
      price: this.props.details.beverage_price,
      edit: this.props.details.edit
    }
    this.props.editBeverage(beverage)
  },
  handleDelete: function(event){
    event.preventDefault();
    this.props.deleteBeverage(this.props.index)
  },
  render: function(){
    return(
      <tr>
        <td><strong>{this.props.details.beverage_name}</strong></td>
        <td>{this.props.details.beverage_price}</td>
        <td id="btn">
          <button id="edit" className="button-primary" onClick={this.handleEdit}>Edit</button>
          <button id="delete" className="button-primary" onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    )
  }
});
