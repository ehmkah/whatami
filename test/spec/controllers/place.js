'use strict';

describe('Controller: PlaceCtrl', function () {

  // load the controller's module
  beforeEach(module('whatamiApp'));

  var PlaceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlaceCtrl = $controller('PlaceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });

  it('should check whether offline cache is available', function() {
    scope.checkOfflineStorage();
    expect(scope.isAvailable).toBe(true);
  });

});
