'use strict';

/**
 * @ngdoc function
 * @name whatamiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whatamiApp
 */
angular.module('whatamiApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
