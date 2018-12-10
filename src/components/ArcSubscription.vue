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

			var width = 225,
					height = 225,
					radius = Math.min(width, height) / 2;

			var color = d3.scaleOrdinal()
					.range(["#FFFDDE", "#FD2D3A"]);

			var bigarc = d3.arc()
					.outerRadius(radius - 75)
					.innerRadius(radius - 50);

			var smallarc = d3.arc()
					.outerRadius(radius - 75)
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
						"percent": 81
						}, {
						"label": "Small",
						"name": "Paid membership",
						"percent": 19
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
					.attr("font-size", "10px")
					.attr("text-anchor", "middle")
					// .style("stroke", "white")
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
				.style("stroke", "#515356")
				.attr("marker-end", "url(#circ)")
				.attr("d", function(d) {
						if(d.cx > d.ox) {
								return "M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy;
						} else {
								return "M" + d.ox + "," + d.oy + "L" + d.sx + "," + d.sy + " " + d.cx + "," + d.cy;
						}
				});
		}

	}
}
</script>

<style scoped>

</style>