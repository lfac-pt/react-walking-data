var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
    	<div>
	    	<h1>Walking Data Viz</h1>
	    	<p>{this.props.loadedWalkingData ? 'Loaded' : 'Not Loaded'}</p>
    	</div>
    );
  }
});