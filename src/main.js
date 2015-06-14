var React = require('react');
var DashboardMainComponent = require("./dashboard/DashboardMainComponent.jsx");
var store = require('./store/store');

store.init();

window.clearInterval(window._initialLoadingAnimation);

store.register(function(state) {
	React.render(React.createElement(DashboardMainComponent, state), document.querySelector(".pageContainer"));
});