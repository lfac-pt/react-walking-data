var React = require('react');
var d3 = require('d3');
var _ = require('underscore');

var BarComponent = require("./bar.jsx");

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      title: '',
      data: []
    }
  },

  render: function() {
    var props = this.props;

    var yScale = d3.scale.linear()
      .domain([0, d3.max(_.pluck(this.props.data, "value"))])
      .range([0, this.props.height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeBands([0, this.props.width]);

    var bars = _.map(this.props.data, function(point, i) {
      return (
        <BarComponent height={yScale(point.value)} width={xScale.rangeBand()} 
          offset={xScale(i)} availableHeight={props.height} color={point.color} key={i} numericDateRef={point.numericDateRef}
          />
      )
    });

    return (
      <g>{bars}</g>
    );
  }
});