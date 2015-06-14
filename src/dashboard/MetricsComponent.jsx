var React = require('react');
var d3 = require('d3');
var moment = require('moment');
var _ = require('underscore');

var store = require('../store/store');

module.exports = React.createClass({
  render: function() {
    return (
    	<div>
        <div className="row placeholders">
          <div className="col-xs-6 col-sm-3 placeholder">
            <div className="metric">
              <span className="lead">{this.metric("avg_distance_in_a_day_meters")}</span>
            </div>
            <h4>Daily Average</h4>
            <span className="text-muted">{this.metric("avg_distance_in_a_day_std_dev_meters")}</span>
          </div>
          <div className="col-xs-6 col-sm-3 placeholder">
            <div className="metric highlightOnHover" onMouseEnter={this.onMouseEnterTopDay} onMouseLeave={this.onMouseLeave}>
              <span className="lead">{this.metric("max_in_a_day_meters")}</span>
            </div>
            <h4>Top day</h4>
            <span className="text-muted">
              {this.props.metrics.top_day}
            </span>
          </div>
          <div className="col-xs-6 col-sm-3 placeholder">
            <div className="metric highlightOnHover" onMouseEnter={this.onMouseEnterTotal} onMouseLeave={this.onMouseLeave}>
              <span className="lead">{this.metric("total_meters")}</span>
            </div>
            <h4>Grand Total</h4>
          </div>
          <div className="col-xs-6 col-sm-3 placeholder">
            <div className="metric highlightOnHover" onMouseEnter={this.onMouseEnterPlus5Km} onMouseLeave={this.onMouseLeave}>
              <span className="lead">{this.props.metrics.plus_5km_day_count + " of " + this.props.metrics.day_count}</span>
            </div>
            <h4>Days 5km+</h4>
          </div>
        </div>

        <div className="row placeholders">
          <div className="col-xs-6 col-sm-3 placeholder">
            <div className="metric highlightOnHover" onMouseEnter={this.onMouseEnterPlus10Km} onMouseLeave={this.onMouseLeave}>
              <span className="lead">{this.props.metrics.plus_10km_day_count + " of " + this.props.metrics.day_count}</span>
            </div>
            <h4>Days 10km+</h4>
          </div>
          <div className="col-xs-6 col-sm-3 placeholder">
            <div className="metric highlightOnHover" onMouseEnter={this.onMouseEnterPlus20Km} onMouseLeave={this.onMouseLeave}>
              <span className="lead">{this.props.metrics.plus_20km_day_count + " of " + this.props.metrics.day_count}</span>
            </div>
            <h4>Days 20km+</h4>
          </div>
        </div>
    	</div>
    );
  },
  onMouseEnterTopDay : function() {
    store.actions.highlightDays([this.dateStringToNumericRef(this.props.metrics.top_day)]);
  },
  onMouseEnterTotal : function() {
    store.actions.highlightDays(_.constant(true));
  },
  onMouseEnterPlus5Km : function() {
    store.actions.highlightDays(function(entry) {
      return entry.distanceMeters >= 5000;
    });
  },
  onMouseEnterPlus10Km : function() {
    store.actions.highlightDays(function(entry) {
      return entry.distanceMeters >= 10000;
    });
  },
  onMouseEnterPlus20Km : function() {
    store.actions.highlightDays(function(entry) {
      return entry.distanceMeters >= 20000;
    });
  },
  onMouseLeave : function() {
    store.actions.highlightDays([]);
  },
  metric : function (name) {
    return d3.format(".1f")(this.props.metrics[name] / 1000) + "km";
  },
  dateStringToNumericRef : function(dateString) {
    return store.momentToNumericDateRef(moment(dateString, "DD-MM-YYYY"));
  }
});