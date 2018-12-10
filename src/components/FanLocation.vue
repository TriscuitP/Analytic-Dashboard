<template>
	<div class="map"></div>
</template>

<script src="http://d3js.org/d3.v5.min.js" charset="utf-8"></script>
<script src="http://d3js.org/topojson.v2.min.js"></script>

<script>
import * as d3 from "d3";
import * as topojson from "topojson";

export default {
	name: 'FanLocation',
  props: {

  },
  data() {
    return {
      // us: null
      tempColor: null
    }
	},
	mounted() {
    this.renderMap();
	},
  methods: {
    renderMap() {
      var width = 560,
          height = 350;

      var radius = d3.scaleSqrt() 
        .domain([0, 6e6]) // INPUT domain-range of possible input data values
        //To avoid distortion, make sure that the minimum "domain" and "range" values are both 0
        .range([0, 60]); // OUTPUT range of possible output values

      var arc = d3.arc()
        .outerRadius(radius)	

      var svg = d3.select('.map').append('svg')
        .attr('height', height)
        .attr('width', width);

      var toolTip = d3.select('.map')
        .append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'white')
        .style('opacity', 0)
        .style('font-family', 'Open Sans')
        .style('z-index', 1000);


      d3.json('https://raw.githubusercontent.com/ameliapower/d3BubbleMap/master/builds/development/js/json/poverty/us.json').then(function(usa) {
        
        var featureCollection = topojson.feature(usa, usa.objects.nation);

        // need to scale down the map but may hinder performance
        var projection = d3.geoIdentity()
                           .fitSize([width,height], featureCollection);

        var path = d3.geoPath()
                     .projection(projection)

        //build the main land area
        svg.append('path')
          .datum(topojson.feature(usa, usa.objects.nation))
          .attr('class', 'land')
          .attr('fill', '#000000')
          .attr('d', path);

        svg.selectAll('.states')
          // retrieve the features so that id is accessed
          .data(topojson.feature(usa, usa.objects.counties).features)
          .enter().append('path')
          .attr('id', function(d) { return d.id; })
          .attr("class", "states states-hover")
          .attr('fill', '#000000')
          .attr('d', path)

          //add Tool Tip
          .on('mouseover', function(d){
            toolTip.transition()
              .style('opacity', .9)
              .style('left', (d3.event.pageX) + 'px')
              .style('top', (d3.event.pageY) + 'px')  
            this.tempColor = this.style.fill; //store current color
            
            if(d.properties.name != null || d.properties.name != undefined){
              toolTip.html(
                "<div style='background-color:#FD2D3A; color:white'>" + 
                  d.properties.name + 
                "</div>" +
                "<div>" + 
                  "<font size='6' color='black'>" + d.properties.population + " </font>" +
                  "<font size='3' color='black'>" + "FANS" + "</font>" +
                "</div>")	
            } else {
              toolTip.html("???")	
            }
          })
          .on('mouseout', function(){
            d3.select(this)
            .transition().delay(400).duration(800)
            .style('opacity', 1)
            .style('fill', this.tempColor)
          })

          //build internal state lines
        svg.append('path')
          .datum(topojson.mesh(usa, usa.objects.states, function(a, b) { 
            return a !== b; 
          })) //topojson.mesh
          .attr('class', 'border-states')
          .attr('stroke', '#383838')
          .attr('fill', 'none')
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('d', path);


        //show data as layered bubbles
        svg.append("g")
          .attr("class", "bubble")
          .attr('fill', 'red')
          .attr('fill-opacity', '.5')
          .selectAll("circle")
          .data(topojson.feature(usa, usa.objects.counties).features
            .sort(function(a, b) { //sort population low to high
              return b.properties.population - a.properties.population; 
            }) //sort
          ) //data
          .enter().append("circle") 
        .on('mouseover', function(d, i){
            d3.select(this).attr('class', 'hover')
          })
          .on('mouseout', function(d, i){
            d3.select(this).attr('class', '')
          })
          .attr("transform", function(d) { 
            return "translate(" + path.centroid(d) + ")"; //Computes the projected centroid
          })
          .attr("r", function(d) { 
            return radius(d.properties.population); //radius var with input (domain) and output (range)
          })

      }).catch(function(error) {
        if (error) return console.log(error);
      });
			
		}
	}
}
</script>

<style scoped>

</style>