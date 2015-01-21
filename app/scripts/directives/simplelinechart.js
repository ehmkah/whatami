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

              var data = [
                  {"label":"Category A", "value":20},
		              {"label":"Category B", "value":50},
		              {"label":"Category C", "value":30}];

              var vis = d3.select(element[0]).append('svg:svg')
                  .data([data]).attr("width", w)
                  .attr("height", h)
                  .append("svg:g")
                  .attr("transform", "translate(" + r + "," + r + ")");

            var pie = d3.layout.pie().value(function(d){return d.value;});

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
arcs.append("svg:text").attr("transform", function(d){
			d.innerRadius = 0;
			d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
    return data[i].label;}
		);

//
//            var margin = {top: 20, right: 20, bottom: 30, left: 50},
//              width = 600 - margin.left - margin.right,
//              height = 700 - margin.top - margin.bottom;
//
//            var parseDate = d3.time.format('%d-%b-%y').parse;
//
//            var x = d3.time.scale()
//              .range([0, width]);
//
//            var y = d3.scale.linear()
//              .range([height, 0]);
//
//            var xAxis = d3.svg.axis()
//              .scale(x)
//              .orient('bottom');
//
//            var yAxis = d3.svg.axis()
//              .scale(y)
//              .orient('left');
//
//            var line = d3.svg.line()
//              .x(function(d) { return x(d.date); })
//              .y(function(d) { return y(d.close); });
//
//            var svg = d3.select(element[0]).append('svg')
//             .attr('width', width + margin.left + margin.right)
//             .attr('height', height + margin.top + margin.bottom)
//             .append('g')
//             .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
//
//            // Hard coded data
//            scope.data = [
//              {date: '4-Apr-12', close: 34},
//              {date: '5-Apr-12', close: 45},
//              {date: '6-Apr-12', close: 37},
//              {date: '7-Apr-12', close: 56},
//              {date: '8-Apr-12', close: 50},
//              {date: '9-Apr-12', close: 77}
//            ];
//
//            scope.data.forEach(function(d) {
//              d.date = parseDate(d.date);
//              d.close = +d.close;
//            });
//
//            x.domain(d3.extent(scope.data, function(d) { return d.date; }));
//            y.domain(d3.extent(scope.data, function(d) { return d.close; }));
//
//            svg.append('g')
//              .attr('class', 'x axis')
//              .attr('transform', 'translate(0,' + height + ')')
//              .call(xAxis);
//
//            svg.append('g')
//              .attr('class', 'y axis')
//              .call(yAxis)
//              .append('text')
//              .attr('transform', 'rotate(-90)')
//              .attr('y', 6)
//              .attr('dy', '.71em')
//              .style('text-anchor', 'end')
//              .text('Price ($)');
//
//            svg.append('path')
//              .datum(scope.data)
//              .attr('class', 'line')
//              .attr('d', line);
          });
        }};
      }]);
