var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
    	<nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Walking Data Viz</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li className="active"><a href="#">Dashboard</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Source Code</a></li>
              </ul>
            </div>
          </div>
        </nav>
    );
  }
});