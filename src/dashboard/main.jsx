var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
    	<div>
	    	<h1>Walking Data Viz</h1>
	    	<p>{this.props.loadedWalkingData ? 'Loaded' : 'Not Loaded'}</p>
	    	<table  className="table">
	    		<thead>
	    			<tr>
	    				<th>Date</th>
	    				<th>Steps</th>
    				</tr>
	    		</thead>
	    		<tbody>
    				{this.props.walkingData.map(function(day) {
    					return (
    						<tr key={day.Date}>
	    						<td>{day.Date}</td>
	    						<td>{day.Steps}</td>
    						</tr>
    					);
    				})};
	    		</tbody>
	    	</table>
    	</div>
    );
  }
});