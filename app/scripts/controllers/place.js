'use strict';

/**
 * @ngdoc function
 * @name whatamiApp.controller:PlaceCtrl
 * @description
 * # PlaceCtrl
 * Controller of the whatamiApp
 */
angular.module('whatamiApp')
  .controller('PlaceCtrl', function ($scope, calculateCirclePosition) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.checkOfflineStorage = function () {
      if (Modernizr.applicationcache) {
        //  $scope.isGeolocating = true;
      } else {
        //  $scope.isGeolocating = false;
      }
    };

    $scope.storeIt = function () {
      if ($scope.currentPosition === undefined) {
      } else {
        if (localStorage.places === undefined) {
          localStorage.setItem('places', JSON.stringify([]));
        }
        var places = JSON.parse(localStorage.places);
        var item = $scope.createItem($scope.currentPosition);
        places.push(item);
        localStorage.setItem('places', JSON.stringify(places));
        $scope.currentPosition = undefined;
      }
    };

    $scope.createItem = function (position) {
      var result = {};
      result.coords = {};
      result.coords.latitude = position.coords.latitude;
      result.coords.longitude = position.coords.longitude;
      result.timestamp = position.timestamp;
      result.coords.accuracy = position.coords.accuracy;

      return result;
    };


    $scope.giveMeThePosition = function () {
      $scope.isGeolocating = true;
      navigator.geolocation.getCurrentPosition(
        function (position) {
          $scope.isGeolocating = false;
          $scope.currentPosition = position;
          $scope.storeIt();
          $scope.$apply();
        },
        function (error) {
          $scope.isGeolocating = false;
          $scope.$apply();
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.log("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              console.log("An unknown error occurred.");
              break;
          }
        },
        {enableHighAccuracy: true}
      );
    };

    $scope.clean = function () {
      localStorage.removeItem('places');
      $scope.positions = null;
    };

    $scope.showAll = function () {
      $scope.positions = JSON.parse(localStorage.places);
    };

    $scope.dumpCluster = function () {
      $scope.positions = $scope.cluster(JSON.parse(localStorage.places));
    };

    $scope.display = function () {
      d3.select("svg").remove();

      var w = 400;
      var h = 400;
      var r = h / 2;
      var color = d3.scale.category20c();

      var theData = $scope.cluster(JSON.parse(localStorage.places));
      var vis = d3.select('#chart')
        .append('svg:svg')
        .data([theData]).attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + r + "," + r + ")");

      var pie = d3.layout.pie().value(function (d) {
        return d.counter;
      });

      // declare an arc generator function
      var arc = d3.svg.arc().outerRadius(r);

      // select paths, use arc generator to draw
      var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
      arcs.append("svg:path")
        .attr("fill", function (d, i) {
          return color(i);
        })
        .attr("d", function (d) {
          // log the result of the arc generator to show how cool it is :)
          console.log(arc(d));
          return arc(d);
        });

      // add the text
      arcs.append("svg:text")
        .attr("transform", function (d) {
          d.innerRadius = 0;
          d.outerRadius = r;
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle").text(function (d, i) {
          return '' + theData[i].latitude + ',' + theData[i].longitude + ',' + theData[i].counter;
        });
    };

    $scope.displayCircles = function () {
      d3.select("svg").remove();

      var w = 300;

      var theData = $scope.cluster(JSON.parse(localStorage.places));

      var theValues = calculateCirclePosition.calc(theData);


      var svgContainer = d3.select("#chart").append("svg")
        .attr("width", w)
        .attr("height", w)
        .style("border", "1px solid black");

      var circles = svgContainer.selectAll("circle")
        .data(theValues.domainData)
        .enter()
        .append("circle");


      var scaleAxes = d3.scale
        .linear()
        .range([0, w])
        .domain(
        [0, 100]);

      var scaleR = d3.scale
        .linear()
        .range([0, w / 10])
        .domain([0, 10]);

      circles
        .attr("cx", function (d) {
          return scaleAxes(d.cx);
        })
        .attr("cy", function (d) {
          return scaleAxes(d.cy);
        })
        .attr("r", function (d) {
          return scaleR(d.r);
        });
    };

    $scope.cluster = function (positions) {
      if (positions.length === 0) {
        return [];
      }
      var result = [];
      var latitude = 0;
      var longitude = 0;
      positions.forEach(function (position) {
        latitude = Math.floor(position.coords.latitude);
        longitude = Math.floor(position.coords.longitude);
        var foundResultEntry = null;
        result.forEach(function (resultEntry) {
          if (resultEntry.latitude === latitude && resultEntry.longitude === longitude) {
            foundResultEntry = resultEntry;
            foundResultEntry.counter = foundResultEntry.counter + 1;
          }
        });
        if (foundResultEntry === null) {
          result.push({latitude: latitude, longitude: longitude, counter: 1});
        }
      });
      return result;
    };

  });
