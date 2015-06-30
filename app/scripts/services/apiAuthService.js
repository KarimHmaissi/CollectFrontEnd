/*"use strict";

var module = angular.module('collectFrontEndApp');

module.service("apiAuthService", function ($q, $http, apiMainService) {
		

	var baseUrl = "http://192.168.0.4:1337";

	// var saveSession = function () {
		
	// };

	// var saveToken = function () {
		
	// };

	// var getToken =  function () {
	// 	return $http({
	// 		method: "GET", 
	// 		url: baseUrl + "/user/jwt"
	// 	}).success(function (data) {
	// 		saveToken(data.data.token);
	// 		return getToken();
	// 	})
	// };


	return {

		login: function (email, password) {
			return $http({
				method: "POST",
				url: baseUrl + "/auth/login",
				data: $.param(email: email. password: password),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function (user) {
				//save user to local storage and get token
				saveSession(user);
				return getToken();
			});
		},

		

		

		getSession: function () {
			
		}


	}
});

return {
	login: function () {

		//check if already logged in

		//else
		return getSession.then(function (user) {
			return getToken();
		});
	},

	logout: function () {
		//remove all session from localstorage
	}

	


}*/