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
      //  $scope.isGeolocating = true;
      } else {
      //  $scope.isGeolocating = false;
      }
    };

    $scope.storeIt = function() {
      if ($scope.currentPosition === undefined) {
      } else {
        if (localStorage.places === undefined) {
          localStorage.setItem('places', JSON.stringify([]));
        }
        var places = JSON.parse(localStorage.places);
        var item = $scope.createItem($scope.currentPosition);
        places.push(item);
        localStorage.setItem('places', JSON.stringify(places));
        $scope.currentPosition = undefined;
      }
    };

    $scope.createItem = function(position) {
      var result = new Object();
      result.coords = new Object();
      result.coords.latitude = position.coords.latitude;
      result.coords.longitude = position.coords.longitude;
      result.timestamp = position.timestamp;
      result.coords.accuracy = position.coords.accuracy;

      return result;
    };


    $scope.giveMeThePosition = function() {
      $scope.isGeolocating = true;
      navigator.geolocation.getCurrentPosition(
      function(position) {
        $scope.isGeolocating = false;
        $scope.currentPosition = position;
        $scope.storeIt();
        $scope.$apply();
      },
      function (error) {
       $scope.isGeolocating = false;
        $scope.$apply();
          switch(error.code) {
              case error.PERMISSION_DENIED:
                  console.log("User denied the request for Geolocation.");
                  break;
              case error.POSITION_UNAVAILABLE:
                  console.log("Location information is unavailable.");
                  break;
              case error.TIMEOUT:
                  console.log("The request to get user location timed out.");
                  break;
              case error.UNKNOWN_ERROR:
                  console.log("An unknown error occurred.");
                  break;
          }
      },
      {enableHighAccuracy: true}

      );
    };

    $scope.clean = function() {
      localStorage.removeItem('places');
      $scope.positions = null;
    };

    $scope.showAll = function() {
      $scope.positions = JSON.parse(localStorage.places);
    };

  });
