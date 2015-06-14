var React = require('react');
var d3 = require('d3');
var _ = require('underscore');
var moment = require('moment');

var BarComponent = require("./BarComponent.jsx");

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

        <g transform={"translate(-10," + (props.startY + 11) + ")"}>
          <text textAnchor="end">{this.valueAtFraction(0)}</text>
        </g>

        <g transform={"translate(-10," + (6) + ")"}>
          <text textAnchor="end">{this.valueAtFraction(1)}</text>
        </g>

      </g>
    );
  },
  getPathDirectives : function() {
    return "M-6,0H0V" + (- this.props.height) +"H-6";
  },
  valueAtFraction : function(percent) {
    return d3.format(".1f")(Math.floor(this.props.maxValue * percent) / 1000) + "km";
  }
});