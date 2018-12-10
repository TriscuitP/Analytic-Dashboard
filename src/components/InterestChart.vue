<template>
	<svg class="chart1"></svg>
</template>

<script src="https://d3js.org/d3.v5.min.js" charset="utf-8"></script>
<script>
import * as d3 from "d3";

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
	},
  methods: {
    renderChart() {
			var nums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			var arr = this.interests.slice(0, 10);
			for (let index = 1; index < 10; index++)
				nums[index] = arr[index].value;

			var width = 400,
					barHeight = 20;
					
			var x = d3.scaleLinear()
				.domain([0, d3.max(nums)])
				.range([0, width]);

			var chart = d3.select(".chart1")
				.attr("width", width)
				.attr("height", barHeight * nums.length);

			var bar = chart.selectAll("g")
				.data(nums)
				.enter().append("g")
				.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

			bar.append("rect")
				.attr("width", x)
				.attr("height", barHeight - 1)
				.style("fill", "#FD2D3A");

			bar.append("text")
				.attr("x", function(d) { return  x(d) - 115; })
				.attr("y", barHeight / 2)
				.attr("dy", ".35em")
				.attr("dx","0.3em")
				.text(function(d, i) { return "Category: " + d; })
		}
	},
	getTopVals(arr) {

	}
}
</script>

<style scoped>

</style>