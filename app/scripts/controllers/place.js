'use strict';

/**
 * @ngdoc function
 * @name whatamiApp.controller:PlaceCtrl
 * @description
 * # PlaceCtrl
 * Controller of the whatamiApp
 */
angular.module('whatamiApp')
  .controller('PlaceCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.checkOfflineStorage = function() {
      if(Modernizr.applicationcache) {
        $scope.isAvailable = true;
      } else {
        $scope.isAvailable = false;
      }
    };

    $scope.storeIt = function() {
      if (localStorage.places === undefined) {
        localStorage.setItem('places', JSON.stringify([]));
      }
      var places = JSON.parse(localStorage.places);
      places.push('eins');
      localStorage.setItem('places', JSON.stringify(places));
    };


  });