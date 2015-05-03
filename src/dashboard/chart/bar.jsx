var React = require('react');
var _ = require('underscore');

var store = require('../../store/main');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      width: 0,
      height: 0,
      offset: 0
    }
  },

  render: function() {
    return (
      <rect fill={this.props.color}
        width={this.props.width} height={this.props.height} 
        x={this.props.offset} y={this.props.availableHeight - this.props.height}
          onMouseEnter={_.partial(this.onMouseEnterDay, this.props.numericDateRef)} 
          onMouseLeave={_.partial(this.onMouseLeaveDay, this.props.numericDateRef)}
         />
    );
  },

  onMouseEnterDay : function(numericDateRef) {
    store.actions.highlightDays([numericDateRef]);
  },
  onMouseLeaveDay : function() {
    store.actions.highlightDays([]);
  }
});