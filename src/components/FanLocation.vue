<template>
	<!-- <div class="map"><h1 id="name"></h1></div> -->
	<svg class="map" width="950" height="500"><h1 id="name"></h1></svg>
	<!-- <div class="map">
		<div id="tooltip-container"></div>

		<div id="canvas-svg"></div>
	</div> -->
</template>

<script src="http://d3js.org/d3.v4.min.js" charset="utf-8"></script>
<script src="https://d3js.org/d3-hexbin.v0.2.min.js"></script>
<script src="http://d3js.org/topojson.v2.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

<script>
import * as d3 from "d3";
import * as topojson from "topojson";

export default {
	name: 'FanLocation',
  props: {

  },
  data() {
    return {

    }
	},
	mounted() {
		this.renderMap();
	},
  methods: {
    renderMap() {
			// "https://unpkg.com/us-atlas@1/us/10m.json"



			// d3.csv("static/data/population.csv", function(err, data) {

			// 	var config = {"color1":"#d3e5ff","color2":"#08306B","stateDataColumn":"state_or_territory","valueDataColumn":"population_estimate_for_july_1_2013_number"}
				
			// 	var WIDTH = 800, HEIGHT = 500;
				
			// 	var COLOR_COUNTS = 9;
				
			// 	var SCALE = 0.7;
				
			// 	function Interpolate(start, end, steps, count) {
			// 			var s = start,
			// 					e = end,
			// 					final = s + (((e - s) / steps) * count);
			// 			return Math.floor(final);
			// 	}
				
			// 	function Color(_r, _g, _b) {
			// 			var r, g, b;
			// 			var setColors = function(_r, _g, _b) {
			// 					r = _r;
			// 					g = _g;
			// 					b = _b;
			// 			};
				
			// 			setColors(_r, _g, _b);
			// 			this.getColors = function() {
			// 					var colors = {
			// 							r: r,
			// 							g: g,
			// 							b: b
			// 					};
			// 					return colors;
			// 			};
			// 	}
				
			// 	function hexToRgb(hex) {
			// 			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			// 			return result ? {
			// 					r: parseInt(result[1], 16),
			// 					g: parseInt(result[2], 16),
			// 					b: parseInt(result[3], 16)
			// 			} : null;
			// 	}
				
			// 	function valueFormat(d) {
			// 		if (d > 1000000000) {
			// 			return Math.round(d / 1000000000 * 10) / 10 + "B";
			// 		} else if (d > 1000000) {
			// 			return Math.round(d / 1000000 * 10) / 10 + "M";
			// 		} else if (d > 1000) {
			// 			return Math.round(d / 1000 * 10) / 10 + "K";
			// 		} else {
			// 			return d;
			// 		}
			// 	}
				
			// 	var COLOR_FIRST = config.color1, COLOR_LAST = config.color2;
				
			// 	var rgb = hexToRgb(COLOR_FIRST);
				
			// 	var COLOR_START = new Color(rgb.r, rgb.g, rgb.b);
				
			// 	rgb = hexToRgb(COLOR_LAST);
			// 	var COLOR_END = new Color(rgb.r, rgb.g, rgb.b);
				
			// 	var MAP_STATE = config.stateDataColumn;
			// 	var MAP_VALUE = config.valueDataColumn;
				
			// 	var width = WIDTH,
			// 			height = HEIGHT;
				
			// 	var valueById = d3.map();
				
			// 	var startColors = COLOR_START.getColors(),
			// 			endColors = COLOR_END.getColors();
				
			// 	var colors = [];
				
			// 	for (var i = 0; i < COLOR_COUNTS; i++) {
			// 		var r = Interpolate(startColors.r, endColors.r, COLOR_COUNTS, i);
			// 		var g = Interpolate(startColors.g, endColors.g, COLOR_COUNTS, i);
			// 		var b = Interpolate(startColors.b, endColors.b, COLOR_COUNTS, i);
			// 		colors.push(new Color(r, g, b));
			// 	}
				
			// 	var quantize = d3.scaleQuantize()
			// 			.domain([0, 1.0])
			// 			.range(d3.range(COLOR_COUNTS).map(function(i) { return i }));
				
			// 	var path = d3.geoPath();
				
			// 	var svg = d3.select("#canvas-svg").append("svg")
			// 			.attr("width", width)
			// 			.attr("height", height);
				
			// 	d3.tsv("https://s3-us-west-2.amazonaws.com/vida-public/geo/us-state-names.tsv", function(error, names) {
				
			// 	var name_id_map = {};
			// 	var id_name_map = {};
				
			// 	for (var i = 0; i < names.length; i++) {
			// 		name_id_map[names[i].name] = names[i].id;
			// 		id_name_map[names[i].id] = names[i].name;
			// 	}
				
			// 	data.forEach(function(d) {
			// 		var id = name_id_map[d[MAP_STATE]];
			// 		valueById.set(id, +d[MAP_VALUE]); 
			// 	});
				
			// 	quantize.domain([d3.min(data, function(d){ return +d[MAP_VALUE] }),
			// 		d3.max(data, function(d){ return +d[MAP_VALUE] })]);
				
			// 	d3.json("https://s3-us-west-2.amazonaws.com/vida-public/geo/us.json", function(error, us) {
			// 		svg.append("g")
			// 				.attr("class", "states-choropleth")
			// 			.selectAll("path")
			// 				.data(topojson.feature(us, us.objects.states).features)
			// 			.enter().append("path")
			// 				.attr("transform", "scale(" + SCALE + ")")
			// 				.style("fill", function(d) {
			// 					if (valueById.get(d.id)) {
			// 						var i = quantize(valueById.get(d.id));
			// 						var color = colors[i].getColors();
			// 						return "rgb(" + color.r + "," + color.g +
			// 								"," + color.b + ")";
			// 					} else {
			// 						return "";
			// 					}
			// 				})
			// 				.attr("d", path)
			// 				.on("mousemove", function(d) {
			// 						var html = "";
				
			// 						html += "<div class=\"tooltip_kv\">";
			// 						html += "<span class=\"tooltip_key\">";
			// 						html += id_name_map[d.id];
			// 						html += "</span>";
			// 						html += "<span class=\"tooltip_value\">";
			// 						html += (valueById.get(d.id) ? valueFormat(valueById.get(d.id)) : "");
			// 						html += "";
			// 						html += "</span>";
			// 						html += "</div>";
									
			// 						$("#tooltip-container").html(html);
			// 						$(this).attr("fill-opacity", "0.8");
			// 						$("#tooltip-container").show();
									
			// 						var coordinates = d3.mouse(this);
									
			// 						var map_width = $('.states-choropleth')[0].getBoundingClientRect().width;
									
			// 						if (d3.event.layerX < map_width / 2) {
			// 							d3.select("#tooltip-container")
			// 								.style("top", (d3.event.layerY + 15) + "px")
			// 								.style("left", (d3.event.layerX + 15) + "px");
			// 						} else {
			// 							var tooltip_width = $("#tooltip-container").width();
			// 							d3.select("#tooltip-container")
			// 								.style("top", (d3.event.layerY + 15) + "px")
			// 								.style("left", (d3.event.layerX - tooltip_width - 30) + "px");
			// 						}
			// 				})
			// 				.on("mouseout", function() {
			// 								$(this).attr("fill-opacity", "1.0");
			// 								$("#tooltip-container").hide();
			// 						});
				
			// 		svg.append("path")
			// 				.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
			// 				.attr("class", "states")
			// 				.attr("transform", "scale(" + SCALE + ")")
			// 				.attr("d", path);
			// 	});
				
			// 	});
			// });

			// D3 Projection
			var projection = d3.geoAlbersUsa(); // scale things down so see entire US
			this.projection = projection;
			
			// D3 US States map
			fetch('https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/us-states.json')
				.then( response => response.json() )
				.then( (states) => {

				// Define path generator
				var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
				.projection(projection); // tell path generator to use albersUsa projection

				// Bind the data to the SVG and create one path per GeoJSON feature
				var svg = d3.select(".map");

				svg.selectAll("path")
					.data(states.features)
					.enter()
					.append("path")
					.attr("d", path);

				// svg.append("path")
				// 	.attr("class", "state-borders")
				// 	.attr("d", path(topojson.mesh(states, states.objects.states, function(a, b) { return a !== b; })));
			});

// 			fetch('https://d3js.org/us-10m.v1.json')
// 				.then( response => response.json() )
// 				.then( (us) => {

// 				var path = d3.geoPath().projection(projection);

// 				var svg = d3.select(".map"),
// 						width = +svg.attr("width"),
// 						height = +svg.attr("height");
// ;

// 				svg.append("g")
// 						.attr("fill", "#000")
// 					.selectAll("path")
// 					.data(topojson.feature(us, us.objects.states).features)
// 					.enter().append("path")
// 						.attr("d", path)
// 					.append("title")
// 						.text(function(d) { return d.id; });

// 				svg.append("path")
// 						.attr("stroke", "#fff")
// 						.attr("stroke-width", 0.5)
// 						.attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
// 			});


			// // var v = this;
			// var svg = d3.select('.map');
			// var width = svg.attr('width');
			// var height = svg.attr('height');

			// var projection = d3.geoAlbersUsa().scale([1500]);
			// var path = d3.geoPath().projection(projection);

			// d3.json("static/us.json", function(error, us) {
			// 	var g = svg.append('g');
			// 		g
			// 			.selectAll('.state')
			// 			.data(topojson.feature(us, us.objects.usStates).features)
			// 			.enter()
			// 			.append("path")
			// 			.attr("class", "state")
			// 			.attr("d", path)
			// 			// .on('mouseover', function(d) {
			// 			// 	v.$emit('stateSelected', d.properties.STATE_ABBR)
			// 			// })
			// 			// .on('mouseout', function(d) {
			// 			// 	v.$emit('stateDeselected', d.properties.STATE_ABBR)
			// 			// })
			// 	g.attr('transform', 'scale(0.57)')
			// });



			// var svg = d3.select("svg");

			// var path = d3.geoPath();

			// d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
			// 	if (error) throw error;

			// 	svg.append("g")
			// 			.attr("fill", "#000")
			// 		.selectAll("path")
			// 		.data(topojson.feature(us, us.objects.states).features)
			// 		.enter().append("path")
			// 			.attr("d", path)
			// 		.append("title")
			// 			.text(function(d) { return d.id; });

			// 	svg.append("path")
			// 			.attr("stroke", "#fff")
			// 			.attr("stroke-width", 0.5)
			// 			.attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
			// });

			// var width = 960,
			// height = 500;
		
			// var svg = d3.select('.map').append('svg')
			// 	.attr('width', width)
			// 	.attr('height', height);
			
			// var projection = d3.geoAlbersUsa()
			// 	.scale(100)
			// 	.translate([width / 2, height / 2]);
			
			// var path = d3.geoPath()
			// 	.projection(projection);
			
			// d3.json('https://d3js.org/us-10m.v1.json', function(error, us) {
			// 	svg.selectAll('.states')
			// 		.data(topojson.feature(us, us.objects.usStates).features)
			// 		.enter()
			// 		.append('path')
			// 		.attr('class', 'states')
			// 		.attr('d', path)
			// 		.on('mouseover', function(d){
			// 			var name = d.properties.STATE_ABBR;
			// 			return document.getElementById('name').innerHTML=name;
			// 		});
			// });


			// var svg = d3.select(".map");

			// var path = d3.geoPath();

			// d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
			// 	if (error) throw error;

			// 	svg.append("g")
			// 		.attr("class", "states")
			// 		.selectAll("path")
			// 		.data(topojson.feature(us, us.objects.states).features)
			// 		.enter().append("path")
			// 		.attr("d", path);

			// 	svg.append("path")
			// 		.attr("class", "state-borders")
			// 		.attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
			// });


			// var width = 960, height = 500;

			// var svg = d3.select('.map').append('svg')
			// 	.attr('width', width)
			// 	.attr('height', height);
			
			// var projection = d3.geoAlbersUsa()
			// 	.scale(1000)
			// 	.translate([width / 2, height / 2]);
			
			// var path = d3.geoPath()
			// 	.projection(projection);
			
			// d3.json('/static/us.json', function(error, us) {
			// 	svg.selectAll('.states')
			// 		.data(topojson.feature(us, us.objects.usStates).features)
			// 		.enter()
			// 		.append('path')
			// 		.attr('class', 'states')
			// 		.attr('d', path)
			// 		.on('mouseover', function(d){
			// 			var name = d.properties.STATE_ABBR;
			// 			return document.getElementById('name').innerHTML=name;
			// 		});
			// });
		}
	}
}
</script>

<style scoped>
h1 {
  font-family:arial;
  font-size:2em;
  color:#333;
}
#info {
  position:absolute;
  top: 10px;
  left: 10px;
}
.states {
	fill: #e5e5e5;
	stroke: #fff;
	stroke-width:2px;
}
.states :hover {
  fill: steelblue;
}
.state-borders {
  fill: none;
  stroke: #fff;
  stroke-width: 0.5px;
  stroke-linejoin: round;
  stroke-linecap: round;
  pointer-events: none;
}

path {
  fill: #ccc;
  stroke: #fff;
  stroke-width: .5px;
}

path:hover {
  fill: red;
}
</style>