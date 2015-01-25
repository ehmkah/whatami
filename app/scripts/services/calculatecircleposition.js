'use strict';

/**
 * @ngdoc service
 * @name whatamiApp.calculateCirclePosition
 * @description
 * # calculateCirclePosition
 * Factory in the whatamiApp.
 */
angular.module('whatamiApp')
  .factory('calculateCirclePosition', function () {
    // Service logic
    // ...
    var _calc = function(positions) {
      return [1];
    }


    var meaningOfLife = 42;

    // Public API here
    return {
      calc: function (positions) {
        return _calc();
      }
    };
  });
