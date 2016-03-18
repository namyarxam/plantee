var React = require('react');
var ReactDOM = require('react-dom');
var auth = require('../helpers/auth')




const Veri = React.createClass({




  render : function() {
    return(
  <div>
    <div>{this.props.text}{this.props.code}</div>
    

</div>
  )
  }
})

module.exports = Veri;
