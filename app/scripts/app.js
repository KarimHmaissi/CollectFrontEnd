'use strict';

/**
 * @ngdoc overview
 * @name collectFrontEndApp
 * @description
 * # collectFrontEndApp
 *
 * Main module of the application.
 */
angular
  .module('collectFrontEndApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    // 'restangular',
    'angular-storage',
    'slugifier',
    'angular-images-loaded',
    'angularMoment',
    'ui.tree',
    'angular-velocity',
    'zumba.angular-waypoints'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/collections.html',
        controller: 'CollectionsIndexCtrl'
      })

      .when('/collection/:id', {
        templateUrl: 'views/collection.html',
        controller: 'CollectionsGetCtrl'
      })

      .when('/collection/:id/:title', {
        templateUrl: 'views/collection.html',
        controller: 'CollectionsGetCtrl'
      })


      .when('/incoming/:id/:title', {
        templateUrl: 'views/incoming.html',
        controller: 'IncomingGetCtrl'
      })


      .when('/new', {
        templateUrl: 'views/new.html',
        controller: 'CollectionsSubmitCtrl'
      })


      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })



      .otherwise({
        redirectTo: '/'
      });


      $locationProvider.html5Mode(true);

      $httpProvider.defaults.withCredentials = true;

      $httpProvider.interceptors.push("authInterceptor");

      


  }).run(function (store, $rootScope, $location, $http) {
    $rootScope.session = store.get("user"); 
    $rootScope.logout = function () {
        var handler = function (result) {
            $rootScope.session = null;
            store.remove('user');
            $location.path("/");
        }

        $http({
            method: "GET",
            url: "http://192.168.0.4:1337/auth/logout"
        }).success(handler);
    };

    //when the route is changed scroll to the proper element.
      $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        $location.hash($routeParams.scrollTo);
        $anchorScroll();  
      });
  })
  // .config(function (RestangularProvider) {
  //   RestangularProvider.setDefaultRequestParams('jsonp', {callback: 'JSON_CALLBACK'});
  // });
