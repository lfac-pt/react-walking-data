var _ = require('underscore');

module.exports = {
	calculate: function (walkingData) {
		var i, entry, distanceMeters, total_meters, plus_5km_day_count, day_count,
			avg_distance_in_a_day_meters, max_in_a_day_meters, min_in_a_day_meters, top_day;

		total_meters = 0;
		max_in_a_day_meters = -Infinity;
		min_in_a_day_meters = Infinity;
		plus_5km_day_count = 0;
		day_count = 0;

		for (i = 0; i < walkingData.length; i++) {
			entry = walkingData[i];

			if (!entry.passesFilters) {
				continue;
			}

			day_count++;
			distanceMeters = entry.distanceMeters;

			total_meters += distanceMeters;

			if (distanceMeters > max_in_a_day_meters) {
				max_in_a_day_meters = distanceMeters;
				top_day = entry.dateRef;
			}
			min_in_a_day_meters = Math.min(min_in_a_day_meters, distanceMeters);

			if (distanceMeters > 5000) {
				plus_5km_day_count++;
			}
		}

		avg_distance_in_a_day_meters = total_meters / day_count;

		return {
			day_count: day_count,
			plus_5km_day_count: plus_5km_day_count,
			total_meters: total_meters,
			avg_distance_in_a_day_meters: avg_distance_in_a_day_meters,
			max_in_a_day_meters: max_in_a_day_meters,
			min_in_a_day_meters: min_in_a_day_meters,
			top_day: top_day
		};
	}
};