var React = require('react');
var TimeFiltersComponent = require('./timeFilters.jsx');
var MetricsComponent = require('./metrics.jsx');
var EntriesTableComponent = require('./entriesTable.jsx');

module.exports = React.createClass({
  render: function() {
    return (
    	<div>
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
		            <li><a href="#">Dashboard</a></li>
		            <li><a href="#">Settings</a></li>
		            <li><a href="#">Profile</a></li>
		            <li><a href="#">Help</a></li>
		          </ul>
		          <form className="navbar-form navbar-right">
		            <input type="text" className="form-control" placeholder="Search..." />
		          </form>
		        </div>
		      </div>
		    </nav>

	    	<p className="text-center">{this.props.loadedWalkingData ? '' : 'Loading...'}</p>

	    	{this.props.loadedWalkingData ?
				(<div className="container-fluid">
			  	  	<h2 className="sub-header">Time interval</h2>

				    <TimeFiltersComponent filters={this.props.filters} />

		    		<MetricsComponent metrics={this.props.metrics} />

					<EntriesTableComponent walkingData={this.props.walkingData} />
				</div>)
	    	: "" }
    	</div>
    );
  }
});