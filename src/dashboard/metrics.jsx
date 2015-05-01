var React = require('react');
var d3 = require('d3');

module.exports = React.createClass({
  render: function() {
    //Weekly Average, Top week, Days 10km+
    return (
    	<div>
        <h2 className="sub-header">Metrics</h2>

        <div className="row placeholders">
          <div className="col-xs-6 col-sm-3 placeholder">
            <div className="metric">
              <span className="lead">{this.metric("avg_distance_in_a_day_meters")}</span>
            </div>
            <h4>Daily Average</h4>
            <span className="text-muted">Std dev...</span>
          </div>
          <div className="col-xs-6 col-sm-3 placeholder">
            <div className="metric">
              <span className="lead">{this.metric("max_in_a_day_meters")}</span>
            </div>
            <h4>Top day</h4>
            <span className="text-muted">{this.props.metrics.top_day}</span>
          </div>
          <div className="col-xs-6 col-sm-3 placeholder">
            <div className="metric">
              <span className="lead">{this.metric("total_meters")}</span>
            </div>
            <h4>Grand Total</h4>
          </div>
          <div className="col-xs-6 col-sm-3 placeholder">
            <div className="metric">
              <span className="lead">{this.props.metrics.plus_5km_day_count + " of " + this.props.metrics.day_count}</span>
            </div>
            <h4>Days 5km+</h4>
          </div>
        </div>
    	</div>
    );
  },
  metric : function (name) {
    return d3.format(".1f")(this.props.metrics[name] / 1000) + "km";
  }
});