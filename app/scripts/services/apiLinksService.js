"use strict";

var module = angular.module('collectFrontEndApp');

var limiter = new Bottleneck(2, 1000);

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

			var options = {
				method: "POST",
				url: apiMainService.baseUrl + "/links?access_token=" + $rootScope.session.token,
				headers: apiMainService.postHeaders,
				data: json,
			};

			return $q(function (resolve, reject) {
				limiter.submit(function (cb) {
					$http(options).success(function (data, status, headers, config) {
						cb();
						resolve(data);
					});
				});
			});
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