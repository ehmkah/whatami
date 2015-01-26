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
      var maxX = centerPosition.longitude + 5;
      var minX = centerPosition.longitude - 5;
      var minY = centerPosition.latitude + 5;
      var maxY = centerPosition.latitude - 5;

      positions.forEach(function (position) {
        while (position.longitude >= maxX || position.longitude <= minX) {
          maxX = maxX + 5;
          minX = minY - 5;
        }
        while (position.latitude >= maxY || position.latitude <= minY) {
          maxY = maxY + 5;
          minY = minY - 5;
        }
      });

      return {
        maxX: maxX,
        minX: minX,
        maxY: maxY,
        minY: minY
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

      console.log(boundaries);
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
