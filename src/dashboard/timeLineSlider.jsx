var React = require('react');
var moment = require('moment');
var store = require('../store/main');

module.exports = React.createClass({
    render: function() {
    	var filterPercentages;

    	filterPercentages = this.getCurrentPercentages();

    	return (
    		<div onDoubleClick={this.resetFilters} ref="progressBar" onClick={this.onClickSlider} className="progress" style={{height: "5px", cursor: "pointer"}}>
    		  <div className="progress-bar progress-bar-success" style={{width: filterPercentages.start + "%", opacity: 0}}>
    		    <span className="sr-only">35% Complete (success)</span>
    		  </div>
    		  <div className="progress-bar progress-bar-info" style={{width: (filterPercentages.end - filterPercentages.start) + "%"}}>
    		    <span className="sr-only">20% Complete (warning)</span>
    		  </div>
    		</div>
    	);
    },
    resetFilters : function() {
      store.actions.updateFilters(this.props.filters.limits);
    },
  	getCurrentPercentages : function () {
  		var startPercentage, endPercentage, filters;

  		filters = this.props.filters;
  		startPercentage = Math.abs(1 - ((filters.limits.end.startOfDayTimestamp - filters.start.startOfDayTimestamp) / (filters.limits.end.startOfDayTimestamp - filters.limits.start.startOfDayTimestamp))) * 100;
  		endPercentage = Math.abs(1 - ((filters.limits.end.startOfDayTimestamp - filters.end.startOfDayTimestamp) / (filters.limits.end.startOfDayTimestamp - filters.limits.start.startOfDayTimestamp))) * 100;

  		return {
  			start: startPercentage,
  			end: endPercentage
  		}
  	},
  	onClickSlider : function(ev) {
  		var percentage, filterPercentages, filters, newStartTimestamp, newEndTimestamp, newStartDate, newEndDate, node;

  		filterPercentages = this.getCurrentPercentages();

  		//Get the percentage clicked
  		//This method is not very precise and probably does work across browsers. Oh well...
  		node = this.refs.progressBar.getDOMNode();
  		percentage = (ev.clientX - node.offsetLeft) / ((node.clientWidth + node.offsetLeft) - node.offsetLeft);
  		percentage *= 100;
  		percentage = Math.min(100, percentage);
  		percentage = Math.max(0, percentage);

  		//Find out which end of the range to change
  		if (percentage < filterPercentages.start) {
  			filterPercentages.start = percentage;
  		} else if (percentage > filterPercentages.end) {
  			filterPercentages.end = percentage;
  		} else if (percentage < 50) {
  			filterPercentages.start = percentage;
  		} else {
  			filterPercentages.end = percentage;
  		}

  		//Convert percentages to [0, 1]
  		filterPercentages.start /= 100;
  		filterPercentages.end /= 100;

  		//Calculate the new range timestamps
  		filters = this.props.filters;
  		newStartTimestamp = ((filters.limits.end.startOfDayTimestamp - filters.limits.start.startOfDayTimestamp) * filterPercentages.start) + filters.limits.start.startOfDayTimestamp;
  		newEndTimestamp = ((filters.limits.end.startOfDayTimestamp - filters.limits.start.startOfDayTimestamp) * filterPercentages.end) + filters.limits.start.startOfDayTimestamp;

  		//`startOfDayTimestamp` are expressed in seconds sinse Epoch so we need to use the `moment.unix` constructor
  		newStartDate = moment.unix(newStartTimestamp);
  		newEndDate = moment.unix(newEndTimestamp);

  		//Update the filters in the store
  		store.actions.updateFilters({
	  		start: {
	  			day: newStartDate.date(),
	  			month: newStartDate.month() + 1,
	  			year: newStartDate.year()
	  		},
	  		end: {
	  			day: newEndDate.date(),
		        month: newEndDate.month() + 1,
		        year: newEndDate.year()
	  		}
	  	});

	  	//Ufffff! That was a lot!
  	}
});