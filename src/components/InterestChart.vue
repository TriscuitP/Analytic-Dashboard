<template>
	<svg class="chart"></svg>
	<!-- <div>
		<div v-for="item in interests">
			<p>{{item.name}}: {{item.value}}</p>
		</div>
	</div> -->
</template>

<script src="https://d3js.org/d3.v5.min.js" charset="utf-8"></script>
<script>
import * as d3 from "d3";

// const d3 = require("d3");

export default {
	name: 'InterestChart',
  props: {
    interests: [],
  },
  data() {
    return {
			
    }
	},
	mounted() {
		this.renderChart();
			// var width = 420, barHeight = 20;

			// var x = d3.scale.linear()
			// 	.domain([0, d3.max(nums)])
			// 	.range([0, width]);

			// var chart = d3.select('.chart');

			// chart.attr('width',width)
			// 	.attr('height',barHeight * data.length)
			// 	.style('color', 'red');

			// var bar = chart.selectAll('g')

			// bar.data(nums)
			// 	.enter().append('g')
			// 		.attr('transform', function(d, i) { return 'translate(0,' + i * barHeight + ')'; });
		
			// bar.append('rect')
			// 	.attr('width', x)
			// 	.attr('height', barHeight - 1);

			// bar.append('text')
			// 	.attr('x', function(d) { return x(d) - 3; })
			// 	.attr('y', barHeight / 2)
			// 	.attr('dy', '.35em')
			// 	.text(function(d) { return d; });
	},
  methods: {
    renderChart() {
			var nums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			var arr = this.interests.slice(0, 10);
			for (let index = 1; index < 10; index++)
				nums[index] = arr[index].value;

			// var nums = [4, 8, 15, 16, 23, 42];
			var width = 500,
					barHeight = 20;
					
			var x = d3.scaleLinear()
				.domain([0, d3.max(nums)])
				.range([0, width]);

			// d3.select(".chart")
      //   .append("text")
      //   .attr("x", 250)
      //   .attr("y", 20)
			// 	.style("text-anchor", "center")
			// 	.style("color", "white")
      //   .text("Popular Interests:")

			var chart = d3.select(".chart")
				.attr("width", width)
				.attr("height", barHeight * nums.length);

			var bar = chart.selectAll("g")
				.data(nums)
				.enter().append("g")
				.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

			bar.append("rect")
				.attr("width", x)
				.attr("height", barHeight - 1)
				.style("fill", "rgb(250, 49, 65)");

			bar.append("text")
				.attr("x", function(d) { return  x(d) - 115; })
				.attr("y", barHeight / 2)
				.attr("dy", ".35em")
				.attr("dx","0.5em")
				.text(function(d) { return "Category: " + d; })
		}
		// 	const svg = 
		// 	d3.select('#chart').append('svg')
				// .attr('width',500)
				// .attr('height',400);

		// 	svg.append('rect')
		// 		.attr('x',0)
		// 		.attr('y',0)
		// 		.attr('width',500)
		// 		.attr('height',400)
		// 		.style('fill','red')
		// }

			// var nums = [4, 8, 15, 16, 23, 42];

			// var width = 420,
			// 		barHeight = 20;

			// var x = d3.scale.linear()
			// 		.domain([0, d3.max(nums)])
			// 		.range([0, width]);

			// var chart = d3.select("chart")
			// 		.attr("width", width)
			// 		.attr("height", barHeight * nums.length)
			// 		.style('fill','red');

			// var bar = chart.selectAll("g")
			// 		.data(nums)
			// 	.enter().append("g")
			// 		.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

			// bar.append("rect")
			// 		.attr("width", x)
			// 		.attr("height", barHeight - 1);

			// bar.append("text")
			// 		.attr("x", function(d) { return x(d) - 3; })
			// 		.attr("y", barHeight / 2)
			// 		.attr("dy", ".35em")
			// 		.text(function(d) { return d; });
			// 		}
	},
	getTopVals(arr) {

	}
}
</script>

<style scoped>
/* .chart div {
  font: 10px sans-serif;
  background-color: steelblue;
  text-align: right;
  padding: 3px;
  margin: 1px;
  color: white;
} */

/* .chart rect {
  fill: rgb(203, 16, 16);
}
.chart text {
  fill: white;
  font: 10px sans-serif;
  text-anchor: end;
} */
</style>