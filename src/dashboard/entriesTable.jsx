var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
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
    );
  }
});