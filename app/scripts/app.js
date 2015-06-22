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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/collections.html',
        controller: 'CollectionsCtrl'
      })

      .when('/:id', {
        templateUrl: 'views/collection.html',
        controller: 'CollectionsSingleCtrl'
      })

      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })



      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function (RestangularProvider) {
    RestangularProvider.setDefaultRequestParams('jsonp', {callback: 'JSON_CALLBACK'});
  });
