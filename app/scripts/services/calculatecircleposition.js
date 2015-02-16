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
    function calculateBoundaries(positions, centerPosition) {
      var maxLongitude = centerPosition.longitude + 5;
      var minLongitude = centerPosition.longitude - 5;
      var minLatitude = centerPosition.latitude - 5;
      var maxLatitude = centerPosition.latitude + 5;

      positions.forEach(function (position) {
       while (position.longitude >= maxLongitude || position.longitude <= minLongitude) {
          maxLongitude = maxLongitude + 5;
          minLongitude = minLongitude - 5;
        }
        while (position.latitude >= maxLatitude || position.latitude <= minLatitude) {
          maxLatitude = maxLatitude + 5;
          minLatitude = minLatitude - 5;
        }
      });

      return {
        maxX: maxLongitude,
        minX: minLongitude,
        maxY: maxLatitude,
        minY: minLatitude
      };

    }

    function calculateCy(position, boundaries) {
      var result = ((-1 * (position.latitude - boundaries.minY)) * 100 / (boundaries.maxY - boundaries.minY)) + 100;
      return roundToTwoDigitsBehindComma(result);

    }

    function calculateCx(position, boundaries) {
      var result = (position.longitude - boundaries.minX) * (100 / (boundaries.maxX - boundaries.minX));
      return roundToTwoDigitsBehindComma(result);
    }

    var _calc = function (positions, width, height) {

      if (positions.length === 0) {
        return [];
      }
      var domainValues = [];
      var countMax = 0;
      var centerPosition = positions[0];


      positions.forEach(function (position) {
        countMax = countMax + position.counter;
        if (position.counter > centerPosition.counter) {
          centerPosition = position;
        }
        ;
      });

      var boundaries = calculateBoundaries(positions, centerPosition);

      positions.forEach(function (position) {
        domainValues.push({
          cx: calculateCx(position, boundaries),
          cy: calculateCy(position, boundaries),
          r: calculateRadius(position.counter, countMax)
        })
      });

      var result = {
        domainData: domainValues,
        boundaries: boundaries
      };


      return result;
    };

    function roundToTwoDigitsBehindComma(percentage) {
      return Math.round(percentage * 100).toFixed(2) / 100;
    }

    function calculateRadius(counter, countMax) {
      var percentage = counter / countMax * 10;
      var radius = roundToTwoDigitsBehindComma(percentage);
      return radius;
    }


    // Public API here
    return {
      calc: function (positions) {
        return _calc(positions);
      }
    };
  });
