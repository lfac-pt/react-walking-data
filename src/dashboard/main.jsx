var React = require('react');
var TimeFiltersComponent = require('./timeFilters.jsx');
var MetricsComponent = require('./metrics.jsx');
var EntriesTableComponent = require('./entriesTable.jsx');
var NavBarComponent = require('./navbar.jsx');

module.exports = React.createClass({
  render: function() {
    return (
    	<div>
    		<NavBarComponent />

	    	{this.props.loadedWalkingData ?
				(<div className="container-fluid">
			  	  	<h2 className="sub-header">Time interval</h2>

				    <TimeFiltersComponent filters={this.props.filters} />

		    		<MetricsComponent metrics={this.props.metrics} />

					<EntriesTableComponent walkingData={this.props.walkingData} />
				</div>)
	    	: (<div className="container-fluid">
	    		<br/>
	    		<br/>
	    		<p className="text-center">Loading data...</p>
	    		</div>) }
    	</div>
    );
  }
});