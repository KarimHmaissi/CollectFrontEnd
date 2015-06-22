'use strict';

/**
 * @ngdoc function
 * @name collectFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the collectFrontEndApp
 */
var module = angular.module('collectFrontEndApp');


 module.controller('CollectionsCtrl', function ($scope, Restangular) {
		var collections = Restangular.oneUrl("collections", "http://192.168.0.6:1337/api/v1/collections");
  		
  		collections.getList().then(function (collections) {
  			$scope.collections = collections;
  			console.log($scope.collections);

  		});
  });


module.controller('CollectionsSingleCtrl', function ($scope, Restangular, $routeParams) {
  		var collections = Restangular.oneUrl(
        "collections", "http://192.168.0.6:1337/api/v1/collections/" + $routeParams.id);

  		$scope.id = $routeParams.id;

  		collections.get().then(function (collection) {
  			console.log("hit CollectionsSingleCtrl");
  			console.log(collection);
  			$scope.collection = collection;
  		});
});


// http://www.ng-newsletter.com/posts/restangular.html