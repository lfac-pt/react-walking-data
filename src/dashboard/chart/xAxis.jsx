var React = require('react');
var d3 = require('d3');
var _ = require('underscore');

var BarComponent = require("./bar.jsx");

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      pathStyle: {
        fill: "none",
        stroke: "#000",
        shapeRendering: "crispEdges"
      }
    };
  },

  render: function() {
    var props = this.props;

    

    return (
      <g>
        <path transform={"translate(0," + (props.startY + 6) + ")"} d={this.getPathDirectives()} style={props.pathStyle}></path>
        <g transform={"translate(0," + (props.startY + 26) + ")"}>
          <text textAnchor="middle">{this.firstDayDate()}</text>
        </g>
        <g transform={"translate(" + (props.width) + "," + (props.startY + 26) + ")"}>
          <text textAnchor="middle">{this.lastDayDate()}</text>
        </g>
      </g>
    );
  },
  getPathDirectives : function() {
    return "M0,6V0H" + (this.props.width - 1) + "V6";
  },
  firstDayDate : function() {
    return this.props.data[0].dateRef;
  },
  lastDayDate : function() {
    return this.props.data[this.props.data.length - 1].dateRef;
  }
});