var React = require('react');
var MetricsComponent = require('./MetricsComponent.jsx');
var EntriesTableComponent = require('./EntriesTableComponent.jsx');
var NavBarComponent = require('./NavBarComponent.jsx');
var TimeLineChartComponent = require('./TimeLineChartComponent.jsx');

module.exports = React.createClass({
  render: function() {
    return (
    	<div>
	    	{this.props.loadedWalkingData ?
				(<div className="container-fluid">
					<NavBarComponent filters={this.props.filters} />

					<TimeLineChartComponent filters={this.props.filters} walkingData={this.props.walkingData} maxValue={this.props.metrics.max_in_a_day_meters} />

		    		<MetricsComponent metrics={this.props.metrics} />

					{/*<EntriesTableComponent walkingData={this.props.walkingData} /> */}
				</div>)
	    	: (<div className="rwd-custom-loading" style={{textAlign: "center", fontSize: "50px"}}>Loading data...</div>) }
    	</div>
    );
  }
});