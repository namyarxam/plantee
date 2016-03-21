var React = require('react');
var ReactDOM = require('react-dom');

const Friend = React.createClass({
  render: function() {
    return (
      <li className="collection-item">
        <div>
          <strong>{this.props.details.name}</strong>
        </div>
      </li>
 		)
  }
});

module.exports = Friend;
