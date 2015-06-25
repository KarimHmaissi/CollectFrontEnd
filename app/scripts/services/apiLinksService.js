"use strict";

var module = angular.module('collectFrontEndApp');

module.service("apiLinksService", function ($q, $http, $rootScope, apiMainService) {

	return {
		

		get: function (id) {
			return $http({
				method: "GET",
				url: apiMainService.baseUrl + "/links/" + id
			}).then(apiMainService.successHandler, apiMainService.errorHandler);
		},


		submit: function (url) {

			// var xsrf = $.param({url: url});

			var json = JSON.stringify({url: url});

			return $http({
				method: "POST",
				url: apiMainService.baseUrl + "/links?access_token=" + $rootScope.session.token,
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