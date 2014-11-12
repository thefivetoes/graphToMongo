$(function(){

  var width = 960,
    height = 600;

var rateById = d3.map();

var quantize = d3.scale.quantize()
    .domain([0, .15])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
//
// var projection = d3.geo.albersUsa()
//     .scale(1280)
//     .translate([width / 2, height / 2]);
var projection = d3.geo.conicConformal()
    .rotate([98, 0])
    .center([0, 38])
    .parallels([29.5, 45.5])
    .scale(1000)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

queue()
    .defer(d3.json, "/data/us.json")
    .await(ready);

function ready(error, us) {
  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("county-id", "test")
      .attr("d", path);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);

  svg.append("circle")
    .attr("cx", projection([-81.5741,41.4179])[0])
    .attr("cy", projection([-81.5741,41.4179])[1])
    .attr("r", 2)

}

d3.select(self.frameElement).style("height", height + "px");

// d3.select("svg").on("mousedown.log", function() {
//   console.log(projection.invert(d3.mouse(this)));
// });
});
