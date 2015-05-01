var React = require('react');
var TimeFilters = require('./timeFilters.jsx');

module.exports = React.createClass({
  render: function() {
    return (
    	<div>
	    	<h1>Walking Data Viz</h1>
	    	<p>{this.props.loadedWalkingData ? 'Loaded' : 'Not Loaded'}</p>
	    	<TimeFilters filters={this.props.filters} />
	    	<table  className="table">
	    		<thead>
	    			<tr>
	    				<th>Date</th>
	    				<th>Steps</th>
    				</tr>
	    		</thead>
	    		<tbody>
    				{this.props.walkingData.reduce(function (memo, entry) {
    					if (entry.passesFilters) {
    						memo.push((
	    						<tr key={entry.numericDateRef}>
		    						<td>{entry.dateRef}</td>
		    						<td>{entry.steps}</td>
	    						</tr>
    						));
    					}

    					return memo;
    				}, [])}
	    		</tbody>
	    	</table>
    	</div>
    );
  }
});