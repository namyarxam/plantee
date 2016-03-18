var React = require('react');
var ReactDOM = require('react-dom');
var auth = require('../helpers/auth')




const Veri = React.createClass({



  render : function() {
    return(
  <div>
    <div>verification component</div>
    <div>{this.props.children}</div>
    <div>{this.props.stuff}</div>


</div>
  )
  }
})

module.exports = Veri;
