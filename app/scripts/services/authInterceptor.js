"use strict";

var module = angular.module('collectFrontEndApp');

module.service('authInterceptor', function($rootScope) {

    var service = this;

    service.request = function(config) { 
        // console.log("interception!");
        // console.log($scope);
        // console.log($rootScope.auth);
        // console.log(config);

        // var currentUser = UserService.getCurrentUser(),
        //     access_token = currentUser ? currentUser.access_token : null;

        // if (access_token) {
        //     config.headers.authorization = access_token;
        // }
        return config;
    };

    service.responseError = function(response) {
        if (response.status === 401) {
            // $rootScope.$broadcast('unauthorized');
        }
        return response;
    };
})