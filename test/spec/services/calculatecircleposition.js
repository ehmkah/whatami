'use strict';

describe('Service: calculateCirclePosition', function () {

  // load the service's module
  beforeEach(module('whatamiApp'));

  // instantiate service
  var calculateCirclePosition;
  beforeEach(inject(function (_calculateCirclePosition_) {
    calculateCirclePosition = _calculateCirclePosition_;
  }));

  it('should do something', function () {
    expect(!!calculateCirclePosition).toBe(true);
  });

  it('should calculate for empty input', function () {
    expect(calculateCirclePosition.calc([])).toEqual([]);
  });

  it('should calculate it correctly for one entry', function () {
    var testData = [
          {latitude:50, longitude:7, counter: 14}
        ];
    expect(calculateCirclePosition.calc(testData)).toEqual([{cx: 50, xy: 50, r: 10}]);
  });

//    it('should do something', function () {
//      var theData = [
//          {latitude:50, longitude:7, counter: 14},//, percentage: 3.6},
//          {latitude:47, longitude:7, counter: 4},//, percentage: 1.05},
//          {latitude:40, longitude:9, counter: 20},//, percentage: 5.26}
//        ];
//
//        expect(calculateCirclePosition.calc([])).toEqual([])
//    });

});
