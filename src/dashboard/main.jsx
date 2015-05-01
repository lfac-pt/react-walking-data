var React = require('react');
var TimeFiltersComponent = require('./timeFilters.jsx');
var MetricsComponent = require('./metrics.jsx');
var EntriesTableComponent = require('./entriesTable.jsx');

module.exports = React.createClass({
  render: function() {
    return (
    	<div>
	    	<h1>Walking Data Viz</h1>
	    	<p>{this.props.loadedWalkingData ? '' : 'Loading...'}</p>

	    	{this.props.loadedWalkingData ?
				(<div>
					<TimeFiltersComponent filters={this.props.filters} />
		    	
		    		<hr />

		    		<MetricsComponent metrics={this.props.metrics} />

		    		<hr />

					<EntriesTableComponent walkingData={this.props.walkingData} />
				</div>)
	    	: "" }
    	</div>
    );
  }
});