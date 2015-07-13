"use strict";

var module = angular.module('collectFrontEndApp');

module.service("apiMainService", function ($q, $http) {

	var baseUrl = "http://46.101.53.219:1337/api/v1";

	var postHeaders = {
		"Content-Type": "application/json"
	};


	var successHandler = function (data, status, headers, config) {
		// console.log("success! " + status);
		console.log(data);
		// if(status === 200) {

			return data.data;
		// } else {
			// $q.reject(status);
		// }
	};

	var errorHandler = function (data, status, headers, config) {
		console.log("error! " + status);
		return $q.reject(status);
	};


	return {

		successHandler: successHandler,
		errorHandler: errorHandler,
		baseUrl: baseUrl,
		postHeaders: postHeaders

	};

});