var React = require('react');
var d3 = require('d3');
var moment = require('moment');
var store = require('../store/main');

module.exports = React.createClass({
  render: function() {
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
            <div className="metric" onMouseEnter={this.onMouseEnterTopDay} onMouseLeave={this.onMouseLeaveTopDay}>
              <span className="lead">{this.metric("max_in_a_day_meters")}</span>
            </div>
            <h4>Top day</h4>
            <span className="text-muted">
              {this.props.metrics.top_day}
            </span>
          </div>
          <div className="col-xs-6 col-sm-3 placeholder">
            <div className="metric">
              <span className="lead">{this.metric("total_meters")}</span>
            </div>
            <h4>Grand Total</h4>
          </div>
          <div className="col-xs-6 col-sm-3 placeholder">
            <div className="metric" onMouseEnter={this.onMouseEnterPlus5Km} onMouseLeave={this.onMouseLeavePlus5Km}>
              <span className="lead">{this.props.metrics.plus_5km_day_count + " of " + this.props.metrics.day_count}</span>
            </div>
            <h4>Days 5km+</h4>
          </div>
        </div>
    	</div>
    );
  },
  onMouseEnterTopDay : function() {
    store.actions.highlightDays([this.dateStringToNumericRef(this.props.metrics.top_day)]);
  },
  onMouseLeaveTopDay : function() {
    store.actions.highlightDays([]);
  },
  onMouseEnterPlus5Km : function() {
    store.actions.highlightDays(function(entry) {
      return entry.distanceMeters >= 5000;
    });
  },
  onMouseLeavePlus5Km : function() {
    store.actions.highlightDays([]);
  },
  metric : function (name) {
    return d3.format(".1f")(this.props.metrics[name] / 1000) + "km";
  },
  dateStringToNumericRef : function(dateString) {
    return store.momentToNumericDateRef(moment(dateString, "DD-MM-YYYY"));
  }
});