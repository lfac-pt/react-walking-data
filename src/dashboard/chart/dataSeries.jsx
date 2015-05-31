var React = require('react');
var d3 = require('d3');
var _ = require('underscore');

var BarComponent = require("./bar.jsx");
var XAxisComponent = require("./xAxis.jsx");
var YAxisComponent = require("./yAxis.jsx");

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      title: '',
      data: []
    }
  },

  render: function() {
    var availableHeightToBars, xAxisHeight;
    var props = this.props;

    xAxisHeight = 30;
    availableHeightToBars = this.props.height - xAxisHeight;

    var yScale = d3.scale.linear()
      .domain([0, d3.max(_.pluck(this.props.data, "value"))])
      .range([0, availableHeightToBars]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeBands([0, this.props.width]);

    var bars = _.map(this.props.data, function(point, i) {
      return (
        <BarComponent value={point.value} height={yScale(point.value)} width={xScale.rangeBand()} 
          offset={xScale(i)} availableHeight={availableHeightToBars} color={point.color} key={i} numericDateRef={point.numericDateRef}
          isHighlighted={point.isHighlighted}
          />
      )
    });

    return (
      <g transform={this.props.transform}>
        <g>{bars}</g>
        <XAxisComponent data={props.data} width={this.props.width} height={xAxisHeight} startY={availableHeightToBars - 6} />
        <YAxisComponent data={props.data} maxValue={this.props.maxValue} width={this.props.marginLeft} height={availableHeightToBars} startY={availableHeightToBars - 6} />
      </g>
    );
  }
});