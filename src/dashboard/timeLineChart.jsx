var React = require('react');
var _ = require('underscore');
var ChartComponent = require("./chart/chart.jsx");
var DataSeriesComponent = require("./chart/dataSeries.jsx");
var TimeLineSliderComponent = require("./timeLineSlider.jsx");

module.exports = React.createClass({
	getDefaultProps: function() {
	    return {
	      width: 800,
	      height: 300
	    }
	},
  	render: function() {
	    return (
	    	<div>
	    		<h2 className="sub-header">Time Line</h2>

	    		<div className="text-center">
	    			<ChartComponent width={this.props.width} height={this.props.height}>
			    		<DataSeriesComponent data={this.getChartData()} width={this.props.width} height={this.props.height} color="rgb(13, 143, 219)" />
				    </ChartComponent>
	    		</div>

	    		<TimeLineSliderComponent filters={this.props.filters} />
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