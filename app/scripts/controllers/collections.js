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


//get
module.controller("CollectionsGetCtrl", function ($scope, $location, $routeParams, apiCollectionsService, $rootScope) {


	//stubbed 
	// $.getJSON("collections.json", function( data ) {
	//     // var parsedJson = JSON.parse(data);
	//     console.log(data);

	//     $scope.collection = data;
	// });

	if(typeof $routeParams.id === "string") {
		$rootScope.previousPath = "/collections/" + $routeParams.id;

		apiCollectionsService.get($routeParams.id).then(function (collection) {
			$scope.collection = collection;
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
	  links: []
	};

	$scope.updatedLink = {
		title: "",
		description: ""
	}

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

					if(link.details) {
						$scope.newCollection.links.push({
						  title: link.details.title,
						  description: link.details.description,
						  group: "misc",
						  linkUrl: link.details.id
						});

						$scope.crawledLinks.push(link.details);

					}
				});

			}
		}

		$scope.links = "";
	};

	$scope.saveCollection = function () {
		apiCollectionsService.submit($scope.newCollection).then(function (newCollection) {
			console.log("built new collection");
			console.log(newCollection);
			console.log(newCollection.id);
			$location.path("/collections/" + newCollection.id);
		});
		console.log($scope.newCollection);
	};





	$scope.removeLink = function (event) {

		// var index = parseInt(event.currentTarget.closest(".link").attr("link-index"), 10);
		var $el = $(event.currentTarget);

		console.log(event.currentTarget);
		console.log($el.closest(".link"));

		var index = parseInt($el.closest(".link").attr("data-link-index"), 10);
		console.log("removing: " + index)
		$scope.newCollection.links.splice(index, 1);
		$scope.crawledLinks.splice(index, 1);



		//update indexes
		$(".link").each(function (index) {
			var $el = $(this);
			$el.attr("data-link-index", index);
		});
	};




	// editing

	$scope.editLink = function (event) {
		console.log("editLink clicked");

		var $link = $(event.currentTarget).closest(".link");


		//hide all edits
		// $(".link").each(function (argument) {
		// 	var $contentEdit = $(this).find(".content-edit");
		// 	var $content = $(this).find(".content");

		// 	if(!$contentEdit.hasClass("hide")) {
		// 		$contentEdit.addClass("hide");
		// 	}

		// 	if($content.hasClass("hide")) {
		// 		$content.removeClass("hide");
		// 	}
		// });

		// var index = $link.attr("data-link-index");

		// var linkInfo = $scope.newCollection.links[index];
		// console.log("got link");
		// console.log(linkInfo);
		// $scope.updatedLink.linkEditTitle = linkInfo.title;
		// $scope.updatedLink.linkEditDescription = linkInfo.description;

		// //show this edit
		// $link.find(".content").addClass("hide");
		// $link.find(".content-edit").removeClass("hide");

		$link.find(".content-edit").toggleClass("hide");
	};

	// $scope.closeEdit = function (event) {
	// 	console.log("edit submit");
	// 	var $link = $(event.currentTarget).closest(".link");
	// 	$link.find(".content-edit").toggleClass("hide");

		// console.log($scope.updatedLink.linkEditTitle);	
		// console.log($scope.updatedLink.linkEditDescription);	

		// var $form = $(event.currentTarget);
		// var index = $form.closest(".link").attr("data-link-index");

		// $scope.newCollection.links[index].title = $scope.updatedLink.linkEditTitle;
		// $scope.newCollection.links[index].description = $scope.updatedLink.linkEditDescription;

		// console.log($scope.newCollection.links[index]);

		// $scope.updatedLink.linkEditDescription = "";
		// $scope.updatedLink.linkEditTitle= "";

		// $form.closest(".content-edit").addClass("hide");
		// $form.find(".content").removeClass("hide");
	// };




});