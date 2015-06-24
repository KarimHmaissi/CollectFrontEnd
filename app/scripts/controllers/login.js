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

        console.log($scope.email);
        console.log($scope.password);




        var handler = function (data) {
            console.log("success logging in!");
            console.log(data);

            $rootScope.session = data;

            $http({
              method: "GET",
              url: "http://192.168.0.6:1337/user/jwt"
            }).then(tokenHandler);
        };


        var tokenHandler = function (data) {
          console.log(data);
          $rootScope.session.token = data.data.token;
          if($rootScope.previousPath) {
            $location.path($rootScope.previousPath);

          } else {
            $location.path("/");
          }

        };


        $http({
          method: "POST",
          url: "http://192.168.0.6:1337/auth/login",
          data: $.param({email: $scope.email, password: $scope.password}),
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
        })
        .success(handler);
    };
});

