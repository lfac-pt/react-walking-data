var React = require('react');
var d3 = require('d3');
var _ = require('underscore');
var moment = require('moment');

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
          <text textAnchor="middle">{this.dateAtFraction(0)}</text>
        </g>


        <g transform={"translate(" + (props.width * 0.25) + "," + (props.startY + 26) + ")"}>
          <line className="tick" x2="0" y1="-20" y2="-15" style={props.pathStyle}></line>
          <text textAnchor="middle">{this.dateAtFraction(0.25)}</text>
        </g>

        <g transform={"translate(" + (props.width * 0.50) + "," + (props.startY + 26) + ")"}>
          <line className="tick" x2="0" y1="-20" y2="-15" style={props.pathStyle}></line>
          <text textAnchor="middle">{this.dateAtFraction(0.5)}</text>
        </g>

        <g transform={"translate(" + (props.width * 0.75) + "," + (props.startY + 26) + ")"}>
          <line className="tick" x2="0" y1="-20" y2="-15" style={props.pathStyle}></line>
          <text textAnchor="middle">{this.dateAtFraction(0.75)}</text>
        </g>

        <g transform={"translate(" + (props.width) + "," + (props.startY + 26) + ")"}>
          <text textAnchor="middle">{this.dateAtFraction(1)}</text>
        </g>
      </g>
    );
  },
  getPathDirectives : function() {
    return "M0,6V0H" + (this.props.width - 1) + "V6";
  },
  dateAtFraction : function(percent) {
    var index;

    index = Math.floor((this.props.data.length - 1) * percent);

    return moment.unix(this.props.data[index].unixTimestamp).format("ll");
  }
});