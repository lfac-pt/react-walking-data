var React = require('react');
var _ = require('underscore');
var moment = require('moment');
var ChartComponent = require("./chart/chart.jsx");
var DataSeriesComponent = require("./chart/dataSeries.jsx");

module.exports = React.createClass({
	getDefaultProps: function() {
	    return {
	      width: 800,
	      height: 300
	    }
	},
  	render: function() {
  		var startPercentage, endPercentage, filters;

  		filters = this.props.filters;
  		startPercentage = Math.abs(1 - ((filters.limits.end.startOfDayTimestamp - filters.start.startOfDayTimestamp) / (filters.limits.end.startOfDayTimestamp - filters.limits.start.startOfDayTimestamp))) * 100;
  		endPercentage = Math.abs(1 - ((filters.limits.end.startOfDayTimestamp - filters.end.startOfDayTimestamp) / (filters.limits.end.startOfDayTimestamp - filters.limits.start.startOfDayTimestamp))) * 100;
	    
	    return (
	    	<div>
	    		<h2 className="sub-header">Time Line</h2>

	    		<div className="text-center">
	    			<ChartComponent width={this.props.width} height={this.props.height}>
			    		<DataSeriesComponent data={this.getChartData()} width={this.props.width} height={this.props.height} color="rgb(13, 143, 219)" />
				    </ChartComponent>
	    		</div>

	    		<div className="progress" style={{height: "5px"}}>
				  <div className="progress-bar progress-bar-success" style={{width: startPercentage + "%", opacity: 0}}>
				    <span className="sr-only">35% Complete (success)</span>
				  </div>
				  <div className="progress-bar progress-bar-info" style={{width: (endPercentage - startPercentage) + "%"}}>
				    <span className="sr-only">20% Complete (warning)</span>
				  </div>
				</div>
	    	</div>
	    );
  	},
  	getChartData : function() {
	  	return this.props.walkingData.reduce(function (memo, entry) {
	        if (entry.passesFilters) {
	            memo.push(entry.distanceMeters);
	        }

	        return memo;
	    }, []);
  	}
});