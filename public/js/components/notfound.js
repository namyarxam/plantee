const React = require('react');
const ReactDOM = require('react-dom');
const auth = require('../helpers/auth')


const NotFound = React.createClass({
  render : function() {
    return (

<div>

      <h1>404 Error</h1>

</div>

    )
  }
})

module.exports = NotFound;
