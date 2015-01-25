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

});
