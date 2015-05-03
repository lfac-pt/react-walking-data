var d3 = require('d3');
var _ = require('underscore');
var moment = require('moment');
var metrics = require('./metrics');

var STEP_SIZE_METERS = 0.76415021;
var FLOOR_SIZE_METERS = 2.5;

var storeLocalData = {
	loadedWalkingData: false,
	walkingData: [],
	filters: {},
	metrics: {}
};
var callbacks = [];

var store = {
	init: function () {
		d3.csv("walking_data.csv", store.actions.masterWalkingDataChanged);
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
	preProcessMasterData : function (rawMasterData) {
		return _.sortBy(_.map(rawMasterData, function (dailyEntry) {
			var momentObject, month;

			momentObject = moment(dailyEntry.Date, "DD/MM/YY");
			month = momentObject.month() + 1;

			return {
				day: momentObject.date(),
				weekDayNumber: momentObject.day(),
				weekDayName: momentObject.weekday(),
				month: month,
				year: momentObject.year(),
				dateRef: momentObject.format("DD-MM-YYYY"),
				numericDateRef: store.momentToNumericDateRef(momentObject),
				steps: parseInt(dailyEntry.Steps, 10),
				distanceMeters: parseInt(dailyEntry.Steps, 10) * STEP_SIZE_METERS, //This is just an aproximation
				heightMeters: parseInt(dailyEntry["Total Floors"], 10) * FLOOR_SIZE_METERS,
				passesFilters: true,
				isHighlighted: false
			};
		}), "numericDateRef");
	},
	buildNumericDateRef : function (day, month, year) {
		return day + (month * 100) + (year * 10000)
	},
	momentToNumericDateRef : function(momentObject) {
		return store.buildNumericDateRef(momentObject.date(), momentObject.month() + 1, momentObject.year())
	},
	buildInitialFilters: function () {
		var walkingData, lastEntryIndex;

		walkingData = storeLocalData.walkingData; 
		lastEntryIndex = walkingData.length - 1;

		return {
			start : {
				day: walkingData[0].day,
				month: walkingData[0].month,
				year: walkingData[0].year
			},
			end : {
				day: walkingData[lastEntryIndex].day,
				month: walkingData[lastEntryIndex].month,
				year: walkingData[lastEntryIndex].year
			},
			limits: {
				start : {
					day: walkingData[0].day,
					month: walkingData[0].month,
					year: walkingData[0].year
				},
				end : {
					day: walkingData[lastEntryIndex].day,
					month: walkingData[lastEntryIndex].month,
					year: walkingData[lastEntryIndex].year
				}
			},
			highlightedDaysNumericRefs: []
		};
	},
	mutateFiltersToAddNumericRefs : function () {
		var lastEntryIndex, start, end;

		start = storeLocalData.filters.start;
		end = storeLocalData.filters.end;

		storeLocalData.filters.start.numericDateRef = store.buildNumericDateRef(start.day, start.month, start.year);
		storeLocalData.filters.end.numericDateRef = store.buildNumericDateRef(end.day, end.month, end.year);
		storeLocalData.filters.start.startOfDayTimestamp = moment(start.day + "/" + start.month + "/" + start.year, "DD-MM-YYYY").unix();
		storeLocalData.filters.end.startOfDayTimestamp = moment(end.day + "/" + end.month + "/" + end.year, "DD-MM-YYYY").unix();

		//Do it for the limits now
		start = storeLocalData.filters.limits.start;
		end = storeLocalData.filters.limits.end;

		storeLocalData.filters.limits.start.numericDateRef = store.buildNumericDateRef(start.day, start.month, start.year);
		storeLocalData.filters.limits.end.numericDateRef = store.buildNumericDateRef(end.day, end.month, end.year);
		storeLocalData.filters.limits.start.startOfDayTimestamp = moment(start.day + "/" + start.month + "/" + start.year, "DD-MM-YYYY").unix();
		storeLocalData.filters.limits.end.startOfDayTimestamp = moment(end.day + "/" + end.month + "/" + end.year, "DD-MM-YYYY").unix();
	},
	entryPassesFilter : function (entry) {
		var start, end;

		start = storeLocalData.filters.start;
		end = storeLocalData.filters.end;

		return entry.numericDateRef >= start.numericDateRef && entry.numericDateRef <= end.numericDateRef;
	},
	mutableFilterMasterData : function() {
		var i, entry, walkingData;

		walkingData = storeLocalData.walkingData;

		for (i = 0; i < walkingData.length; i++) {
			entry = walkingData[i];
			entry.passesFilters = store.entryPassesFilter(entry);
		}
	},
	entryShouldBeHighlighted : function (entry) {
		return _.indexOf(storeLocalData.filters.highlightedDaysNumericRefs, entry.numericDateRef, /*bin search = */ true) !== -1;
	},
	mutableHighlightMasterData : function() {
		var i, entry, walkingData;

		walkingData = storeLocalData.walkingData;

		for (i = 0; i < walkingData.length; i++) {
			entry = walkingData[i];
			entry.isHighlighted = store.entryShouldBeHighlighted(entry);
		}
	},
	filtersAreValid : function (filters) {
		if (filters.start.day < 1 || filters.start.day > 31) {
			return false;
		}
		if (filters.start.month < 1 || filters.start.month > 12) {
			return false;
		}

		if (filters.end.day < 1 || filters.end.day > 31) {
			return false;
		}
		if (filters.end.month < 1 || filters.end.month > 12) {
			return false;
		}

		return true;
	},
	actions : {
		masterWalkingDataChanged : function (newRawData) {
			storeLocalData.walkingData = store.preProcessMasterData(newRawData);
			storeLocalData.filters = store.buildInitialFilters(storeLocalData.walkingData);
			store.mutateFiltersToAddNumericRefs();
			store.mutableFilterMasterData();
			storeLocalData.metrics = metrics.calculate(storeLocalData.walkingData);
			storeLocalData.loadedWalkingData = true;
			store.dataChanged();
		},
		updateFilters : function(newFilters) {
			if (!store.filtersAreValid(newFilters)) {
				return;
			}

			newFilters = _.clone(newFilters);

			_.extend(storeLocalData.filters, _.pick(newFilters, "start", "end"));
			
			store.mutateFiltersToAddNumericRefs();
			store.mutableFilterMasterData();
			storeLocalData.metrics = metrics.calculate(storeLocalData.walkingData);
			store.dataChanged();
		},
		highlightDays : function(numericDateRefs) {
			var predicateFn;
			if (_.isFunction(numericDateRefs)) {
				predicateFn = numericDateRefs;
				numericDateRefs = _.reduce(storeLocalData.walkingData, function(memo, entry) {
					if (predicateFn(entry)) {
						memo.push(entry.numericDateRef);
					}

					return memo;
				}, []);
			}

			storeLocalData.filters.highlightedDaysNumericRefs = numericDateRefs.sort();

			store.mutateFiltersToAddNumericRefs();
			store.mutableHighlightMasterData();
			store.dataChanged();
		}
	}
};

module.exports = store;