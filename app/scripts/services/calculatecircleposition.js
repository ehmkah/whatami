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

      if (positions.length === 0) {
        return [];
      }
      var result = [];
      result.push({cx: 50, xy:50, r:10})

      return result;
    }

    // Public API here
    return {
      calc: function (positions) {
        return _calc(positions);
      }
    };
  });
