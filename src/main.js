var React = require('react');
var DashboardMain = require("./dashboard/main.jsx");
var store = require('./store/main');

store.init();

window.clearInterval(window._initialLoadingAnimation);

store.register(function(state) {
	React.render(React.createElement(DashboardMain, state), document.querySelector(".pageContainer"));
});