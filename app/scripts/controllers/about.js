'use strict';

/**
 * @ngdoc function
 * @name collectFrontEndApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the collectFrontEndApp
 */
angular.module('collectFrontEndApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
