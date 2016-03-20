
var React = require('react');
var ReactDOM = require('react-dom');

const Friend = React.createClass({




  render:function() {
    return (
      <li className="collection-item">
        <div>
          <strong>{this.props.details.friend_name}</strong>
        </div>
      </li>
  )
  }
});
module.exports = Friend;
