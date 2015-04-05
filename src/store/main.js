var d3 = require('d3');


var storeLocalData = {
	loadedWalkingData: false
};
var callbacks = [];

var store = {
	init: function () {
		d3.csv("walking_data.csv", store.actions.walkingDataChanged);
	},
	register : function(callback) {
		callbacks.push(callback);
		callback(storeLocalData);
	},
	dataChanged : function () {
		callbacks.forEach(function(fn) {
			fn.call(null, storeLocalData);
		});
	},
	actions : {
		walkingDataChanged : function (newData) {
			storeLocalData.walkingData = newData;
			storeLocalData.loadedWalkingData = true;
			store.dataChanged();
		}
	}
};

module.exports = store;