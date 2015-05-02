var React = require('react');
var _ = require('underscore');
var d3 = require('d3');
var moment = require('moment');

var ChartComponent = require("./chart/chart.jsx");
var DataSeriesComponent = require("./chart/dataSeries.jsx");
var TimeLineSliderComponent = require("./timeLineSlider.jsx");

module.exports = React.createClass({
	getDefaultProps: function() {
	    return {
	      width: 800,
	      height: 300,
	      defaultColor: "rgb(13, 143, 219)",
	      highlightedColor: "#d9534f"
	    }
	},
  	render: function() {
	    return (
	    	<div>
	    		<h2 className="sub-header">
	    			Time Line
	    			{this.highlightedRangeLabel()}
	    		</h2>

	    		<div className="text-center">
	    			<ChartComponent width={this.props.width} height={this.props.height}>
			    		<DataSeriesComponent data={this.getChartData()} width={this.props.width} height={this.props.height} />
				    </ChartComponent>
	    		</div>

	    		<TimeLineSliderComponent filters={this.props.filters} />
	    	</div>
	    );
  	},
  	highlightedRangeLabel : function() {
  		if (this.props.filters.highlightedRange.start.numericDateRef > this.props.filters.highlightedRange.end.numericDateRef) {
  			return "";
  		}

  		//In the future we can support ranges
  		if (this.props.filters.highlightedRange.start.numericDateRef !== this.props.filters.highlightedRange.end.numericDateRef) {
  			return "";
  		}

  		return (<small style={{color: this.props.highlightedColor}}>
  				&nbsp;&nbsp;
  				{d3.format(".1f")(this.getEntryForNumericDateRef(this.props.filters.highlightedRange.start.numericDateRef).distanceMeters / 1000) + "km, " + 
  				moment.unix(this.props.filters.highlightedRange.start.startOfDayTimestamp).format("DD-MM-YYYY")}
  			</small>)
  	},
  	getChartData : function() {
	  	return this.props.walkingData.reduce(_.bind(function (memo, entry) {
	        if (entry.passesFilters) {
	            memo.push({
	            	value: entry.distanceMeters,
	            	color: this.isInsideSelectionRange(entry) ? this.props.highlightedColor : this.props.defaultColor,
	            	numericDateRef: entry.numericDateRef
	            });
	        }

	        return memo;
	    }, this), []);
  	},
  	isInsideSelectionRange : function(entry) {
  		return entry.numericDateRef >= this.props.filters.highlightedRange.start.numericDateRef && 
  			entry.numericDateRef <= this.props.filters.highlightedRange.end.numericDateRef;
  	},
  	getEntryForNumericDateRef : function(numericDateRef) {
  		return _.findWhere(this.props.walkingData, {numericDateRef: numericDateRef});
  	}
});