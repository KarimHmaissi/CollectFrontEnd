"use strict";

var module = angular.module('collectFrontEndApp');

module.filter("collectionToGroup", function () {
	
	return function (input, attribute) {
		
		// console.log(input);
		// var groupedCollection = _.groupBy(input, "group");

		// console.log(groupedCollection);

		// return groupedCollection;

		return input;
	};

});