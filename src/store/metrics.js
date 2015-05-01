var _ = require('underscore');

var STEP_SIZE_METERS = 0.83;

module.exports = {
	calculate: function (walkingData) {
		var i, entry, avg_distance_in_a_day_meters;

		for (i = 0; i < walkingData.length; i++) {
			entry = walkingData[i];
			avg_distance_in_a_day_meters += walkingData.steps * STEP_SIZE_METERS;
		}

		avg_distance_in_a_day_meters /= walkingData.length;

		return {
			avg_distance_in_a_day_meters: avg_distance_in_a_day_meters
		};
	}
};