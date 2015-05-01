var React = require('react');
var d3 = require('d3');

module.exports = React.createClass({
  render: function() {
    return (
        <div>
            <h2 className="sub-header">Data Points</h2>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Distance</th>
                            <th>Steps</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.walkingData.reduce(function (memo, entry) {
                            if (entry.passesFilters) {
                                memo.push((
                                    <tr key={entry.numericDateRef}>
                                        <td>{entry.dateRef}</td>
                                        <td>{d3.format(".1f")(entry.distanceMeters / 1000) + "km"}</td>
                                        <td>{entry.steps}</td>
                                    </tr>
                                ));
                            }

                            return memo;
                        }, [])}
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
});