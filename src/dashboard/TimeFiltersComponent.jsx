var React = require('react');
var store = require('../store/store');
var DateRangePicker = require('react-bootstrap-daterangepicker');

module.exports = React.createClass({
  render: function() {
    return (
    	<DateRangePicker 
            startDate={this.props.filters.start.day + "/" + this.props.filters.start.month + "/" + this.props.filters.start.year} 
            endDate={this.props.filters.end.day + "/" + this.props.filters.end.month + "/" + this.props.filters.end.year}

            minDate={this.props.filters.limits.start.day + "/" + this.props.filters.limits.start.month + "/" + this.props.filters.limits.start.year}
            maxDate={this.props.filters.limits.end.day + "/" + this.props.filters.limits.end.month + "/" + this.props.filters.limits.end.year}

            opens="left"
            format="DD/MM/YYYY" onApply={this.pleaseFilter} showDropdowns={true}
            >
          <button className="btn btn-default" type="button">
            <i className="glyphicon glyphicon-calendar"></i>
          </button>
        </DateRangePicker>
    );
  },
  pleaseFilter : function(event, picker) {
  	store.actions.updateFilters({
  		start: {
  			day: picker.startDate.date(),
  			month: picker.startDate.month() + 1,
  			year: picker.startDate.year()
  		},
  		end: {
  			day: picker.endDate.date(),
        month: picker.endDate.month() + 1,
        year: picker.endDate.year()
  		}
  	});
  }
});