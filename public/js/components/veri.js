var React = require('react');
var ReactDOM = require('react-dom');
var auth = require('../helpers/auth')




const Veri = React.createClass({
    


  render : function() {
    return(
  <div>
    <h1>verification component</h1>
    <h3>{this.props.children}</h3>

</div>
  )
  }
})

module.exports = Veri;
