var dataset = _.map(_.range(75), function (i ) {
  return Math.random() * 5000;
});
var margin = {top: 25, right: 0, bottom: 20, left: 40};
var w = 400 - margin.left - margin.right,
  h = 300 - margin.top - margin.bottom;

var svg = d3.select('#chartArea').append('svg')
  .attr('width', w + margin.left + margin.right)
  .attr('height', h + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top +')');

var yScale = d3.scale.linear()
.domain([0, d3.max(dataset) * 1.1])
.range([0, h]);


var xScale = d3.scale.ordinal()
  .domain(dataset)
  .rangeBands([0, w], 0.1, 0.3);
// Second argument above is padding between bands, Third argument is padding outside the bands

var colorScale = d3.scale.quantile()
  .domain([0, 10, dataset.length - 10, dataset.length])
  .range(['yellow', 'orange', 'green']);

var multiplier = 3;

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', function (d, i) {
    return xScale(d);
  })
  .attr('y', function (d) {
    return h - yScale(d)
  })
  .attr('width', xScale.rangeBand())
  .attr('height', function (d) {
    return yScale(d);
  })
  .attr('fill', function (d, i) {
    return colorScale(i);
  });