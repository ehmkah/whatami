'use strict';

/**
 * @ngdoc directive
 * @name whatamiApp.directive:simpleLineChart
 * @description
 * # simpleLineChart
 */
angular.module('whatamiApp')

  .directive('simpleLineChart', ['d3Service', function(d3Service) {
      return {
        restrict: 'EA',
        scope: {},

        link: function(scope, element, attrs) {
          d3Service.d3().then(function(d3) {

            var w = 400;
            var h = 400;
            var r = h/2;
            var color = d3.scale.category20c();

            var theData = [
                    {latitude: 46, longitude: 7, counter: 1},
                    {latitude: 47, longitude: 7, counter: 9},
                    {latitude: 47, longitude: 8, counter: 1},
                    {latitude: -48, longitude: 8, counter: 1}
            ];

              var vis = d3.select(element[0]).append('svg:svg')
                  .data([theData]).attr("width", w)
                  .attr("height", h)
                  .append("svg:g")
                  .attr("transform", "translate(" + r + "," + r + ")");

            var pie = d3.layout.pie().value(function(d){return d.counter;});

            // declare an arc generator function
            var arc = d3.svg.arc().outerRadius(r);

// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
arcs.append("svg:path")
    .attr("fill", function(d, i){
        return color(i);
    })
    .attr("d", function (d) {
        // log the result of the arc generator to show how cool it is :)
        console.log(arc(d));
        return arc(d);
    });

    // add the text
    arcs.append("svg:text")
      .attr("transform", function(d){
		    d.innerRadius = 0;
			  d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";})
      .attr("text-anchor", "middle").text(function(d, i) {
          return '' + theData[i].latitude + ',' + theData[i].longitude;
     }
		);

          });
        }};
      }]);
