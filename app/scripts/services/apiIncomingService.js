"use strict";

var module = angular.module('collectFrontEndApp');

module.service("apiCollectionsService", function ($q, $http, $rootScope, apiMainService) {

	return {

		get: function (id) {
				
			return $http({
				method: "GET",
				url: apiMainService.baseUrl + "/incoming/" + id
			}).then(apiMainService.successHandler, apiMainService.errorHandler);

		},

	}

});