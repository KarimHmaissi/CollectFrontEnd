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
module.controller("CollectionsIndexCtrl", function ($scope, apiCollectionsService, $rootScope) {

	$rootScope.previousPath = "/colelctions";
	
	apiCollectionsService.index().then(function (collections) {
		$scope.collections = collections;
	}, errorCodeRedirector);
});
-

//get
module.controller("CollectionsGetCtrl", function ($scope, $location, $routeParams, apiCollectionsService, $rootScope, $anchorScroll) {


	//stubbed 
	// $.getJSON("collections.json", function( data ) {
	//     // var parsedJson = JSON.parse(data);
	//     console.log(data);

	//     $scope.collection = data;
	// });

	// $scope.scrollTo = function(event, id) {
	// 	event.preventDefault();
	// 	$location.hash(id);
	// 	console.log($location.hash());
	// 	$anchorScroll();
	// };

	if(typeof $routeParams.id === "string") {
		$rootScope.previousPath = "/collections/" + $routeParams.id;

		apiCollectionsService.get($routeParams.id).then(function (collection) {

			$scope.collection = collection;
			console.log($scope.collection);

		}, errorCodeRedirector)
	} else {
		errorCodeRedirector($location, 404);
	}
});


//submit - collections and links
module.controller("CollectionsSubmitCtrl", function ($scope, $location, apiCollectionsService, apiLinksService, urlUtilityService, $rootScope) {


	$rootScope.previousPath = "/new";

	if(!$rootScope.session) {
		$location.path("/login");
	}

	$scope.newCollection = {
	  title: "Title of your new collection",
	  description: "Description for your new collection. Limited to 200 characters",

	  groups: []
	};

	$scope.updatedLink = {
		title: "",
		description: ""
	};


	$scope.submitLinks = function () {
		var linkArray = $scope.links.split("\n");

		var i;
		var length = linkArray.length;
		var processedLinks = [];


		//add a new group if there are no groups

		if($scope.newCollection.groups.length < 1) {
			var miscGroup = {
				name: "misc",
				order: 1,
				ownedLinks: []
			};

			$scope.newCollection.groups.push(miscGroup);
		}

		
		for(i = 0; i < length; i++) {

			if(urlUtilityService.validUrl(linkArray[i])) {

				apiLinksService.submit(linkArray[i]).then(function (link) {
					console.log("got response from link submit");
					console.log(link);

					if(link.details && $scope.newCollection.groups.length > 0) {

						$scope.newCollection.groups[0].ownedLinks.push({
						  title: link.details.title,
						  description: link.details.description,
						  linkUrl: link.details.id,
						  linkDetails: link.details
						});

						// $scope.crawledLinks.push(link.details);

					}
				});

			}
		}

		$scope.links = "";
	};


	$scope.saveCollection = function () {

		console.log("about to send collection");
		console.log($scope.newCollection);


		apiCollectionsService.submit($scope.newCollection).then(function (newCollection) {
			console.log("built new collection");
			console.log(newCollection);
			console.log(newCollection.id);
			$location.path("/collections/" + newCollection.id);
		});
	};




	// TODO
	$scope.removeLink = function (event) {



/*		// var index = parseInt(event.currentTarget.closest(".link").attr("link-index"), 10);
		var $el = $(event.currentTarget);

		console.log(event.currentTarget);
		console.log($el.closest(".link"));

		var index = parseInt($el.closest(".link").attr("data-link-index"), 10);
		console.log("removing: " + index)
		$scope.newCollection.links.splice(index, 1);
		// $scope.crawledLinks.splice(index, 1);



		//update indexes
		$(".link").each(function (index) {
			var $el = $(this);
			$el.attr("data-link-index", index);
		});*/
	};




	// editing

	$scope.editLink = function (event) {
		console.log("editLink clicked");

		var $link = $(event.currentTarget).closest(".link");

		$link.find(".content-edit").toggleClass("hide");
	};




});