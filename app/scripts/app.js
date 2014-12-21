'use strict';

/**
 * @ngdoc overview
 * @name whatamiApp
 * @description
 * # whatamiApp
 *
 * Main module of the application.
 */
angular
  .module('whatamiApp', [
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
              templateUrl: 'views/place.html',
              controller: 'PlaceCtrl'
            })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
