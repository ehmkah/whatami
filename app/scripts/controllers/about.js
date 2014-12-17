'use strict';

/**
 * @ngdoc function
 * @name whatamiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the whatamiApp
 */
angular.module('whatamiApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
