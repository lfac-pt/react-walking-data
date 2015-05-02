var React = require('react');
var TimeFiltersComponent = require('./timeFilters.jsx');

module.exports = React.createClass({
  render: function() {
    return (
    	<nav className="navbar navbar-default navbar-fixed-top">
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
                <li>
                  <form className="navbar-form navbar-left">
                    <TimeFiltersComponent filters={this.props.filters} />
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
  }
});