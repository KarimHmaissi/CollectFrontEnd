'use strict';

/**
 * @ngdoc function
 * @name collectFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the collectFrontEndApp
 */
var module = angular.module('collectFrontEndApp');


module.controller('LoginCtrl', function ($scope, $http, $rootScope, $location) {

		$scope.loginFormSubmit = function () {
        $http({
          method: "POST",
          url: "/auth/login",
          data: {email: $scope.email, password: $scope.password},
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
        })
        .sucess(function (data) {
            console.log("success logging in!");
            console.log(data);
        });
    };
});

