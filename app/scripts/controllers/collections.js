'use strict';

/**
 * @ngdoc function
 * @name collectFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the collectFrontEndApp
 */
angular.module('collectFrontEndApp')
  .controller('CollectionsCtrl', ["$scope, Restangular"], function ($scope, Restangular) {
  		var collections = Restangular.oneUrl("collections", "http://192.168.0.6/api/v1/");
  		$scope.collections = collections.getList();

  });
