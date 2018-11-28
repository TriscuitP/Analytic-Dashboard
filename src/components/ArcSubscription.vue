<template>
	<div class="donut"></div>
</template>

<script src="http://d3js.org/d3.v5.min.js" charset="utf-8"></script>
<script src="http://d3js.org/topojson.v2.min.js"></script>

<script>
import * as d3 from "d3";
import * as topojson from "topojson";

export default {
	name: 'ArcSubscription',
  props: {

  },
  data() {
    return {
      
    }
	},
	mounted() {
    this.renderArc();
    
	},
  methods: {
    renderArc() {

			var width = 350,
					height = 350,
					radius = Math.min(width, height) / 2;

			var color = d3.scaleOrdinal()
					.range(["#6fc9e1", "#00627d"]);

			var bigarc = d3.arc()
					.outerRadius(radius - 100)
					.innerRadius(radius - 60);

			var smallarc = d3.arc()
					.outerRadius(radius - 100)
					.innerRadius(radius - 50);

			var pie = d3.pie()
					.sort(null)
					
					.value(function (d) {
					return d.percent;
			});
			
			var svg = d3.select(".donut").append("svg")
				.attr("width", width)
				.attr("height", height)
				.append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			var data = [{
						"label": "Big",
						"name": "Free membership",
						"percent": 75
						}, {
						"label": "Small",
						"name": "Paid membership",
						"percent": 25
						}];

			var piedata = pie(data);

			var g = svg.selectAll(".arc")
					.data(piedata)
					.enter().append("g")
					.attr("class", "arc");

			g.append("path")
					.attr("d", function (d) {
					
					if (d.data.label == "Big") {
							return bigarc(d);
					} else {	
							return smallarc(d);
					}})
					.style("fill", function (d) { return color(d.data.label); });
					// .attr("stroke", "#fff");

			var labels = g.append('g').classed('labels', true);

			labels.selectAll("text").data(piedata)
					.enter()
					.append("text")
					.attr("font-size", "12px")
					.attr("text-anchor", "middle")
					.attr("x", function(d) {
							var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
							d.cx = Math.cos(a) * (radius - 75);
							return d.x = Math.cos(a) * (radius - 20);
					})
					.attr("y", function(d) {
							var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
							d.cy = Math.sin(a) * (radius - 75);
							return d.y = Math.sin(a) * (radius - 20);
					})
					.text(function(d) { return d.data.name; })
					.each(function(d) {
							var bbox = this.getBBox();
							d.sx = d.x - bbox.width/2 - 2;
							d.ox = d.x + bbox.width/2 + 2;
							d.sy = d.oy = d.y + 5;
					});

			labels.selectAll("path.pointer").data(piedata).enter()
				.append("path")
				.attr("class", "pointer")
				.style("fill", "none")
				.style("stroke", "black")
				.attr("marker-end", "url(#circ)")
				.attr("d", function(d) {
						if(d.cx > d.ox) {
								return "M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy;
						} else {
								return "M" + d.ox + "," + d.oy + "L" + d.sx + "," + d.sy + " " + d.cx + "," + d.cy;
						}
				});


			// var svg = d3.select(".donut")
			// 	.append("svg")
			// 	.append("g")

			// svg.append("g")
			// 	.attr("class", "slices");
			// svg.append("g")
			// 	.attr("class", "labels");
			// svg.append("g")
			// 	.attr("class", "lines");

			// var width = 960,
			// 		height = 450,
			// 		radius = Math.min(width, height) / 2;

			// var pie = d3.pie()
			// 	.sort(null)
			// 	.value(function(d) {
			// 		return d.value;
			// 	});

			// var arc = d3.arc()
			// 	.outerRadius(radius * 0.8)
			// 	.innerRadius(radius * 0.4);

			// var outerArc = d3.arc()
			// 	.innerRadius(radius * 0.9)
			// 	.outerRadius(radius * 0.9);

			// svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			// var key = function(d){ return d.data.label; };

			// var color = d3.scaleOrdinal()
			// 	.domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
			// 	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

			// function randomData (){
			// 	var labels = color.domain();
			// 	return labels.map(function(label){
			// 		return { label: label, value: Math.random() }
			// 	});
			// }

			

			// function change(data) {

			// 	/* ------- PIE SLICES -------*/
			// 	var slice = svg.select(".slices").selectAll("path.slice")
			// 		.data(pie(data), key);

			// 	slice.enter()
			// 		.insert("path")
			// 		.style("fill", function(d) { return color(d.data.label); })
			// 		.attr("class", "slice");

			// 	slice		
			// 		.transition().duration(1000)
			// 		.attrTween("d", function(d) {
			// 			this._current = this._current || d;
			// 			var interpolate = d3.interpolate(this._current, d);
			// 			this._current = interpolate(0);
			// 			return function(t) {
			// 				return arc(interpolate(t));
			// 			};
			// 		})

			// 	slice.exit()
			// 		.remove();

			// 	/* ------- TEXT LABELS -------*/

			// 	var text = svg.select(".labels").selectAll("text")
			// 		.data(pie(data), key);

			// 	text.enter()
			// 		.append("text")
			// 		.attr("dy", ".35em")
			// 		.text(function(d) {
			// 			return d.data.label;
			// 		});
				
			// 	function midAngle(d){
			// 		return d.startAngle + (d.endAngle - d.startAngle)/2;
			// 	}

			// 	text.transition().duration(1000)
			// 		.attrTween("transform", function(d) {
			// 			this._current = this._current || d;
			// 			var interpolate = d3.interpolate(this._current, d);
			// 			this._current = interpolate(0);
			// 			return function(t) {
			// 				var d2 = interpolate(t);
			// 				var pos = outerArc.centroid(d2);
			// 				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
			// 				return "translate("+ pos +")";
			// 			};
			// 		})
			// 		.styleTween("text-anchor", function(d){
			// 			this._current = this._current || d;
			// 			var interpolate = d3.interpolate(this._current, d);
			// 			this._current = interpolate(0);
			// 			return function(t) {
			// 				var d2 = interpolate(t);
			// 				return midAngle(d2) < Math.PI ? "start":"end";
			// 			};
			// 		});

			// 	text.exit()
			// 		.remove();

			// 	/* ------- SLICE TO TEXT POLYLINES -------*/

			// 	var polyline = svg.select(".lines").selectAll("polyline")
			// 		.data(pie(data), key);
				
			// 	polyline.enter()
			// 		.append("polyline");

			// 	polyline.transition().duration(1000)
			// 		.attrTween("points", function(d){
			// 			this._current = this._current || d;
			// 			var interpolate = d3.interpolate(this._current, d);
			// 			this._current = interpolate(0);
			// 			return function(t) {
			// 				var d2 = interpolate(t);
			// 				var pos = outerArc.centroid(d2);
			// 				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
			// 				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			// 			};			
			// 		});
				
			// 	polyline.exit()
			// 		.remove();
			// };

			// change(randomData());


		}

	}
}
</script>

<style scoped>

</style>