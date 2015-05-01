var _ = require('underscore');

module.exports = {
	calculate: function (walkingData) {
		var i, entry, distanceMeters, 
			avg_distance_in_a_day_meters, max_in_a_day_meters, min_in_a_day_meters;

		avg_distance_in_a_day_meters = 0;
		max_in_a_day_meters = -Infinity;
		min_in_a_day_meters = Infinity;

		for (i = 0; i < walkingData.length; i++) {
			entry = walkingData[i];

			if (!entry.passesFilters) {
				continue;
			}

			distanceMeters = entry.distanceMeters;

			avg_distance_in_a_day_meters += distanceMeters;
			max_in_a_day_meters = Math.max(max_in_a_day_meters, distanceMeters);
			min_in_a_day_meters = Math.min(min_in_a_day_meters, distanceMeters);
		}

		avg_distance_in_a_day_meters /= walkingData.length;

		return {
			avg_distance_in_a_day_meters: avg_distance_in_a_day_meters,
			max_in_a_day_meters: max_in_a_day_meters,
			min_in_a_day_meters: min_in_a_day_meters
		};
	}
};