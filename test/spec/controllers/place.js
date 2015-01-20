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

  afterEach(function() {
  localStorage.clear();
  });

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });

  it('should check whether offline cache is available', function() {
    scope.checkOfflineStorage();
    expect(scope.isGeolocating).toBe(true);
  });

  it('should add a value to location storage', function() {
    scope.currentPosition = 'eins';
    scope.storeIt();
    expect(JSON.parse(localStorage.places)).toEqual(['eins']);
  });

  it('should add two value to location storage', function() {
    scope.currentPosition = 'eins';
    scope.storeIt();
    scope.currentPosition = 'zwei';
    scope.storeIt();
    expect(JSON.parse(localStorage.places)).toEqual(['eins', 'zwei']);
  });

  it('should clean localstorage', function() {
    localStorage.setItem('places', 'huhu');
    scope.clean();
    expect(localStorage.places).not.toBeDefined();
    expect(scope.positions).toBe(null);
  });

  it('should return empty cluster', function() {
    expect(scope.cluster([])).toEqual([]);
  });


  it('should return empty cluster with one entry', function() {
    expect(scope.cluster([
      {"timestamp":1421607999536,"coords":{"speed":null,"heading":null,"altitudeAccuracy":null,"accuracy":20,"altitude":null,"longitude":7.439919799999999,"latitude":46.9374629}}
      ])).toEqual([{latitude: 46, longitude: 7, counter: 1}]);
  });


  it('should return empty cluster with two entry', function() {
    expect(scope.cluster([
      {"timestamp":1421607999536,"coords":{"speed":null,"heading":null,"altitudeAccuracy":null,"accuracy":20,"altitude":null,"longitude":7.439919799999999,"latitude":46.9374629}},
      {"timestamp":1421607999536,"coords":{"speed":null,"heading":null,"altitudeAccuracy":null,"accuracy":20,"altitude":null,"longitude":7.439919799999999,"latitude":46.9374629}}
      ])).toEqual([{latitude: 46, longitude: 7, counter: 2}]);
  });

});
