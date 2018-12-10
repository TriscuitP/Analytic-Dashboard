<template>
  <svg class="chart2" viewBox='0 0 750 400'/>
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
				{name: "JAN", value: 20},
				{name: "FEB", value: 30},
				{name: "MAR", value: 22},
				{name: "APR", value: 45},
				{name: "MAY", value: 67},
				{name: "JUN", value: 55},
				{name: "JUL", value: 50},
				{name: "AUG", value: 34},
				{name: "SEP", value: 85},
				{name: "OCT", value: 65},
				{name: "NOV", value: 75},
				{name: "DEC", value: 70}
			]
    }
	},
	mounted() {
		this.renderChart();
		
	},
  methods: {
    renderChart() {
			var svg = d3.select('.chart2');

			const margin = 80;
			const width = 750 - 2 * margin;
			const height = 400 - 2 * margin;

			const chart = svg.append('g')
				.attr('transform', `translate(${margin}, ${margin})`);

			const xScale = d3.scaleBand()
				.range([0, width])
				.domain(this.fans.map((s) => s.name))
				.padding(0.3)
			
			const yScale = d3.scaleLinear()
				.range([height, 0])
				.domain([0, 100]);

			const makeYLines = () => d3.axisLeft()
				.scale(yScale)

			chart.append('g')
				.attr('transform', `translate(0, ${height})`)
				.call(d3.axisBottom(xScale));

			chart.append('g')
				.call(d3.axisLeft(yScale));

			const barGroups = chart.selectAll()
				.data(this.fans)
				.enter()
				.append('g')

			barGroups
				.append('rect')
				.attr('class', 'bar')
				.attr('fill', '#B0231C')
				.attr('x', (g) => xScale(g.name))
				.attr('y', (g) => yScale(g.value))
				.attr('height', (g) => height - yScale(g.value))
				.attr('width', xScale.bandwidth())
				.on('mouseover', function (actual, i) {
					d3.selectAll('.value')
						.attr('opacity', 0)

					d3.select(this)
						.transition()
						.duration(300)
						.attr('opacity', 0.6)
						.attr('x', (a) => xScale(a.name) - 5)
						.attr('width', xScale.bandwidth() + 10)

					const y = yScale(actual.value)

					var line = chart.append('line')
						.attr('id', 'limit')
						.transition()
						.duration(300)
						.attr('stroke', '#FFFDDE')
						.attr('stroke-dasharray', '3 6')
						.attr('x1', 0)
						.attr('y1', y)
						.attr('x2', width)
						.attr('y2', y)

					barGroups 
						.append('text')
						.attr('class', 'value')
						.transition()
						.duration(300)
						.attr('x', (a) => xScale(a.name) + xScale.bandwidth() / 2)
						.attr('y', (a) => yScale(a.value) + 30)
						.attr('text-anchor', 'middle')
						.attr('fill', 'white')
						.text((a) => `${a.value}%`)

				})
				.on('mouseout', function () {
					d3.selectAll('.value')
						.attr('opacity', 1)

					d3.select(this)
						.transition()
						.duration(300)
						.attr('opacity', 1)
						.attr('x', (a) => xScale(a.name))
						.attr('width', xScale.bandwidth())

					chart.selectAll('#limit').remove()
					chart.selectAll('.value').remove()
				})

			svg.append('text')
				.attr('class', 'title')
				.attr('x', width)
				.attr('y', 40)
				.attr('text-anchor', 'middle')
				.attr('fill', 'white')
				.text('NEW PAID FANS by month')
			
		}
	}
}
</script>

<style scoped>

</style>