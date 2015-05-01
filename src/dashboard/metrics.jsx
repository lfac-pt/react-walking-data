var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
    	<div>
        {this.props.metrics.avg_distance_in_a_day_meters}
    	</div>
    );
  }
});