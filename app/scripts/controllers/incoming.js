'use strict';


/**
 * @ngdoc function
 * @name collectFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the collectFrontEndApp
 */
var module = angular.module('collectFrontEndApp');


//get
module.controller("IncomingGetCtrl", function ($scope, $location, $routeParams, apiIncomingService, $rootScope) {


	if(typeof $routeParams.id === "string") {
		$rootScope.previousPath = "/incoming/" + $routeParams.id;

		apiIncomingService.get($routeParams.id).then(function (collection) {

			$scope.collection = collection;
			console.log($scope.collection);

		}, errorCodeRedirector)
	} else {
		errorCodeRedirector($location, 404);
	}
});
