'use strict';

/**
 * @ngdoc function
 * @name collectFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the collectFrontEndApp
 */
var module = angular.module('collectFrontEndApp');

var errorCodeRedirector = function ($location, statusCodeError) {
	
};


//index
module.controller("CollectionsIndexCtrl", function ($scope, apiCollectionsService) {
	
	apiCollectionsService.index().then(function (collections) {
		$scope.collections = collections;
	}, errorCodeRedirector);
});


//get
module.controller("CollectionsGetCtrl", function ($scope, $location, $routeParams, apiCollectionsService) {

	//stubbed 
	// $.getJSON("collections.json", function( data ) {
	//     // var parsedJson = JSON.parse(data);
	//     console.log(data);

	//     $scope.collection = data;
	// });

	if(typeof $routeParams.id === "string") {
		apiCollectionsService.get($routeParams.id).then(function (collection) {
			$scope.collection = collection;
		}, errorCodeRedirector)
	} else {
		errorCodeRedirector($location, 404);
	}
});


//submit - collections and links
module.controller("CollectionsSubmitCtrl", function ($scope, $location, apiCollectionsService, apiLinksService, urlUtilityService) {
	$scope.newCollection = {
	  title: "Title of your new collection",
	  description: "",
	  links: []
	};

	$scope.crawledLinks = [];

	$scope.submitLinks = function () {
		var linkArray = $scope.links.split("\n");

		var i;
		var length = linkArray.length;
		var processedLinks = [];

		for(i = 0; i < length; i++) {

			if(urlUtilityService.validUrl(linkArray[i])) {

				apiLinksService.submit(linkArray[i]).then(function (link) {
					console.log("got response from link submit");
					console.log(link);

					$scope.newCollection.links.push({
					  title: link.details.title,
					  description: link.details.description,
					  group: "misc",
					  linkUrl: link.details.id
					});

					$scope.crawledLinks.push(link.details);
				});

			}
		}

		$scope.links = "";
	};

	$scope.saveCollection = function () {
		apiCollectionsService.submit($scope.newCollection);
		console.log($scope.newCollection);
	};




});