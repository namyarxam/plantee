const React = require('react');
const ReactDOM = require('react-dom');
const auth = require('../helpers/auth')


const Plantee = React.createClass({
  render : function() {
    return (

<div>

      <h1>I'm Plantee. Thank you for buying me!</h1>

      <div><img src={'images/plantee.jpg'} alt="plantee" className=""/><span>Hello</span></div>;
    )
</div>

    )
  }
})

module.exports = Plantee;
