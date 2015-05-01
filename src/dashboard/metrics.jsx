var React = require('react');
var d3 = require('d3');

module.exports = React.createClass({
  render: function() {
    return (
    	<div>
        <p>Daily average distance {this.metric("avg_distance_in_a_day_meters")}</p>
        <p>Max distance {this.metric("max_in_a_day_meters")}</p>
        <p>Min distance {this.metric("min_in_a_day_meters")}</p>
    	</div>
    );
  },
  metric : function (name) {
    return d3.format(".1f")(this.props.metrics[name] / 1000) + "km";
  }
});