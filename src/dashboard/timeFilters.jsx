var React = require('react');
var store = require('../store/main');

module.exports = React.createClass({
  render: function() {
    return (
    	<div>
    		<div>
    			<input type="number" onChange={this.pleaseFilter} ref="startDay" value={this.props.filters.start.day} /> 
    			/ <input type="number" onChange={this.pleaseFilter} ref="startMonth"  value={this.props.filters.start.month} /> 
    			/ <input type="number" onChange={this.pleaseFilter} ref="startYear"  value={this.props.filters.start.year} />
    		</div>
    		<p>to</p>
    		<div>
    			<input type="number" onChange={this.pleaseFilter} ref="endDay"  value={this.props.filters.end.day} /> 
    			/ <input type="number" onChange={this.pleaseFilter} ref="endMonth"  value={this.props.filters.end.month} /> 
    			/ <input type="number" onChange={this.pleaseFilter} ref="endYear"  value={this.props.filters.end.year} />
    		</div>
    	</div>
    );
  },
  pleaseFilter : function(event) {
  	store.actions.updateFilters({
  		start: {
  			day: parseInt(this.refs.startDay.getDOMNode().value, 10),
  			month: parseInt(this.refs.startMonth.getDOMNode().value, 10),
  			year: parseInt(this.refs.startYear.getDOMNode().value, 10)
  		},
  		end: {
  			day: parseInt(this.refs.endDay.getDOMNode().value, 10),
  			month: parseInt(this.refs.endMonth.getDOMNode().value, 10),
  			year: parseInt(this.refs.endYear.getDOMNode().value, 10)
  		}
  	})
  }
});