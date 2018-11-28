<template>
	<div class="chart"></div>
</template>

<script src="https://d3js.org/d3.v5.min.js" charset="utf-8"></script>
<script>
import * as d3 from "d3";

export default {
	name: 'NewFansChart',
  props: {

  },
  data() {
    return {
			fans: [
				{name: "JAN", value: 200},
				{name: "FEB", value: 300},
				{name: "MAR", value: 220},
				{name: "APR", value: 800},
				{name: "MAY", value: 670},
				{name: "JUN", value: 930},
				{name: "JUL", value: 1150},
				{name: "AUG", value: 1234},
				{name: "SEP", value: 2000},
				{name: "OCT", value: 2500},
				{name: "NOV", value: 2575},
				{name: "DEC", value: 2375}
			]
    }
	},
	mounted() {
		this.renderChart();
		
	},
  methods: {
    renderChart() {

			var margin = {top: 20, right: 0, bottom: 30, left: 40},
					width = 960,
					height = 500;

			var x = d3.scaleBand()
				.domain(this.fans.map(d => d.name))
				.range([margin.left, width - margin.right])
				.padding(0.1)

			var y = d3.scaleLinear()
				.domain([0, d3.max(this.fans, d => d.value)]).nice()
				.range([height - margin.bottom, margin.top])

			var xAxis = g => g
				.attr("transform", `translate(0,${height - margin.bottom})`)
				.call(d3.axisBottom(x)
						.tickSizeOuter(0))

			var yAxis = g => g
				.attr("transform", `translate(${margin.left},0)`)
				.call(d3.axisLeft(y))
				.call(g => g.select(".domain").remove())

			var svg = d3.select(".chart").append("svg")

			svg.append("g")
					.attr("fill", "steelblue")
				.selectAll("rect").data(this.fans).enter().append("rect")
					.attr("x", d => x(d.name))
					.attr("y", d => y(d.value))
					.attr("height", d => y(0) - y(d.value))
					.attr("width", x.bandwidth());

			svg.append("g")
					.call(xAxis);
			
			svg.append("g")
					.call(yAxis);
			
			return svg.node();
			
		}
	}
}
</script>

<style scoped>

</style>