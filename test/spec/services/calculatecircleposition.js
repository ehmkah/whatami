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
      {latitude: 50, longitude: 7, counter: 14}
    ];
    var expectedData = {
      domainData: [{cx: 50, cy: 50, r: 10}],
      boundaries: {
        maxY: 55,
        minY: 45,
        maxX: 12,
        minX: 2
      }
    };
    expect(calculateCirclePosition.calc(testData, 100, 100)).toEqual(expectedData);
  });

  it('should do something', function () {
    var theData = [
      {latitude: 50, longitude: 7, counter: 14},
      {latitude: 47, longitude: 7, counter: 4},
      {latitude: 40, longitude: 9, counter: 20}
    ];

    var expectedData = {
      domainData: [
        {cx: 30, cy: 16.67, r: 3.68},
        {cx: 30, cy: 26.67, r: 1.05},
        {cx: 50, cy: 50, r: 5.26}],
      boundaries: {
        maxY: 55,
        minY: 25,
        maxX: 14,
        minX: 4
      }
    };
    expect(calculateCirclePosition.calc(theData)).toEqual(expectedData)
  });

});
