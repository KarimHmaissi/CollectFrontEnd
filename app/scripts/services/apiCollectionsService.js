"use strict";

var module = angular.module('collectFrontEndApp');

module.service("apiCollectionsService", function ($q, $http, $rootScope,  apiMainService) {

	return {

		index: function () {
			return $http({
				method: "GET",
				url: apiMainService.baseUrl + "/collections"
			}).then(apiMainService.successHandler, apiMainService.errorHandler);
		},

		get: function (id) {
				
			return $http({
				method: "GET",
				url: apiMainService.baseUrl + "/collections/" + id
			}).then(apiMainService.successHandler, apiMainService.errorHandler);

		},

		submit: function (newCollection) {

			// var xsrf = $.param(newCollection);

			var json = JSON.stringify(newCollection);

			return $http({
				method: "POST",
				url: apiMainService.baseUrl + "/collections?access_token=" + $rootScope.session.token,
				headers: apiMainService.postHeaders,
				data: json,
			}).then(apiMainService.successHandler, apiMainService.errorHandler);

		},

		update: function (req, res) {
			return $q(function (resolve, reject) {
				
				resolve("something");

			});
		},

		delete: function () {
			return $q(function (resolve, reject) {
				
				resolve("something");

			});
		},

		tag: function () {
			return $q(function (resolve, reject) {
				
				resolve("something");

			});
		}

	}

});