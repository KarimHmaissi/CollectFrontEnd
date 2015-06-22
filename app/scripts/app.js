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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/collections.html',
        controller: 'CollectionCtrl'
      })
      .when('/links', {
        templateUrl: 'views/links.html',
        controller: 'LinksCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
