var React = require('react');
var _ = require('underscore');

var store = require('../../store/store');

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
      <g>
      <rect fill={this.props.color}
        width={this.props.width} height={this.props.height} 
        x={this.props.offset} y={this.props.availableHeight - this.props.height}
          onMouseEnter={_.partial(this.onMouseEnterDay, this.props.numericDateRef)} 
          onMouseLeave={_.partial(this.onMouseLeaveDay, this.props.numericDateRef)}
         />

         </g>
    );
  },

  //Not used for now because the tooltips need to be drawn after the bars so they
  //do not appear bellow them...
  renderTooltip : function() {
    return <text x={this.props.offset + this.props.width / 2} 
      y={this.props.availableHeight - this.props.height + (this.props.width > 50 ? 20 : -5)} height="40" width={this.props.width} 
      fill={this.props.width > 50 ? "white" : "black"} textAnchor="middle" >{this.props.isHighlighted || this.props.width > 50 ? this.formatedValue() : ""}</text>;
  },

  onMouseEnterDay : function(numericDateRef) {
    store.actions.highlightDays([numericDateRef]);
  },
  onMouseLeaveDay : function() {
    store.actions.highlightDays([]);
  },
  formatedValue : function () {
    return d3.format(".1f")(this.props.value / 1000);
  }
});