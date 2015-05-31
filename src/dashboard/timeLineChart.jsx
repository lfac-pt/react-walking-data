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
	      width: 900,
	      height: 200,
	      defaultColor: "rgb(13, 143, 219)",
	      highlightedColor: "#d9534f",
	      marginLeft: 40,
	      marginRight: 40
	    }
	},
  	render: function() {
	    return (
	    	<div>
	    		<div className="lead text-right" style={{height: "21px", marginBottom: "0px"}}>
					{this.highlightedRangeLabel()}
	    		</div>

	    		<div className="text-center">
	    			<ChartComponent width={this.props.width} height={this.props.height}>
			    		<DataSeriesComponent transform={"translate(" + this.props.marginLeft + ",0)"} data={this.getChartData()} 
			    			width={this.props.width - (this.props.marginLeft + this.props.marginRight)} height={this.props.height} />
				    </ChartComponent>
	    		</div>

	    		<TimeLineSliderComponent filters={this.props.filters} />
	    	</div>
	    );
  	},
  	highlightedRangeLabel : function() {
  		var numericDateRef, formattedDate;

  		if (this.props.filters.highlightedDaysNumericRefs.length !== 1) {
  			return "";
  		}

  		numericDateRef = this.props.filters.highlightedDaysNumericRefs[0];

  		//Now thats how you hammer a nail!
  		formattedDate = numericDateRef.toString().slice(0, 4) + "-" + 
  			numericDateRef.toString().slice(4, 6) + "-" + numericDateRef.toString().slice(6, 8);

  		return (<small style={{color: this.props.highlightedColor}}>
  				&nbsp;&nbsp;
  				{d3.format(".1f")(this.getEntryForNumericDateRef(numericDateRef).distanceMeters / 1000) + "km, " + 
  				formattedDate}
  			</small>);
  	},
  	getChartData : function() {
	  	return this.props.walkingData.reduce(_.bind(function (memo, entry) {
	        if (entry.passesFilters) {
	            memo.push({
	            	value: entry.distanceMeters,
	            	color: entry.isHighlighted ? this.props.highlightedColor : this.props.defaultColor,
	            	numericDateRef: entry.numericDateRef,
	            	isHighlighted: entry.isHighlighted,
	            	unixTimestamp: entry.unixTimestamp
	            });
	        }

	        return memo;
	    }, this), []);
  	},
  	getEntryForNumericDateRef : function(numericDateRef) {
  		return _.findWhere(this.props.walkingData, {numericDateRef: numericDateRef});
  	}
});