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
    'restangular'
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


      // $locationProvider.html5Mode(true);

      $httpProvider.defaults.withCredentials = true;


  })
  .config(function (RestangularProvider) {
    RestangularProvider.setDefaultRequestParams('jsonp', {callback: 'JSON_CALLBACK'});
  });
