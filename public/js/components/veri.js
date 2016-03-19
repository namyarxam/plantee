var React = require('react');
var ReactDOM = require('react-dom');
var auth = require('../helpers/auth')




const Veri = React.createClass({




  render : function() {

    <div className="Detail">
        {this.props.children && React.cloneElement(this.props.children, {
          changeHPage: this.changeHPage
        })}
      </div>

    return(
  <div>
    <div>{this.props.text}{this.props.code}</div>


</div>
  )
  }
})

module.exports = Veri;
