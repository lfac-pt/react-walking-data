var React = require('react');
var MetricsComponent = require('./metrics.jsx');
var EntriesTableComponent = require('./entriesTable.jsx');
var NavBarComponent = require('./navbar.jsx');
var TimeLineChartComponent = require('./timeLineChart.jsx');

module.exports = React.createClass({
  render: function() {
    return (
    	<div>
	    	{this.props.loadedWalkingData ?
				(<div className="container-fluid">
					<NavBarComponent filters={this.props.filters} />

					<TimeLineChartComponent filters={this.props.filters} walkingData={this.props.walkingData} />

		    		<MetricsComponent metrics={this.props.metrics} />

					{/*<EntriesTableComponent walkingData={this.props.walkingData} /> */}
				</div>)
	    	: (<div className="rwd-custom-loading" style={{textAlign: "center", fontSize: "50px"}}>Loading data...</div>) }
    	</div>
    );
  }
});