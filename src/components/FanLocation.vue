<template>
	<div class="map"></div>
	<!-- <svg class="map" width="950" height="500"></svg> -->
  <!-- <svg class="map"></svg> -->
	<!-- <div class="map">
		<div id="tooltip-container"></div>

		<div id="canvas-svg"></div>
	</div> -->
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
    
    // d3.json("https://unpkg.com/us-atlas@1/us/10m.json", this.renderMap());
	},
  methods: {
    renderMap() {

      // Might use this: https://d3js.org/us-10m.v1.json

      var width = 560,
          height = 350;

      // var projection = d3.geoAlbersUsa()
      //                     // .translate([width/2, height/2])    // translate to center of screen
      //                     .scale(1000);          // scale things down so see entire US

      // var path = d3.geoPath()
      //   .projection(null) //albersUsa projection stated in Make file when creating the topojson data

      var radius = d3.scaleSqrt() 
        .domain([0, 3e6]) // INPUT domain-range of possible input data values
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
          .attr('fill', '#ccc')
          .attr('d', path);

        svg.selectAll('.states')
          // retrieve the features so that id is accessed
          .data(topojson.feature(usa, usa.objects.counties).features)
          .enter().append('path')
          .attr('id', function(d) { return d.id; })
          .attr("class", "states states-hover")
          .attr('fill', '#aec7e8')
          .attr('d', path)

          //add Tool Tip
          .on('mouseover', function(d){
            toolTip.transition()
              .style('opacity', .9)
              .style('left', (d3.event.pageX) + 'px')
              .style('top', (d3.event.pageY) + 'px')  
            this.tempColor = this.style.fill; //store current color

            // console.log(d.properties.name)
            
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
          .attr('stroke', '#fff')
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

      // ==============================

      // var width = 960,
      //     height = 600;

      // var formatNumber = d3.format(",.0f");

      // var path = d3.geoPath()
      //     .projection(null);

      // var radius = d3.scaleSqrt()
      //     .domain([0, 1e6])
      //     .range([0, 15]);

      // var svg = d3.select(".map").append("svg")
      //     .attr("width", width)
      //     .attr("height", height);

      // var legend = svg.append("g")
      //     .attr("class", "legend")
      //     .attr("transform", "translate(" + (width - 50) + "," + (height - 20) + ")")
      //   .selectAll("g")
      //     .data([1e6, 5e6, 1e7])
      //   .enter().append("g");

      // legend.append("circle")
      //     .attr("fill", "none")
      //     .attr("stroke", "#ccc")
      //     .attr("cy", function(d) { return -radius(d); })
      //     .attr("r", radius);

      // legend.append("text")
      //     .attr("fill", "black")
      //     .attr("font", "10px sans-serif")
      //     .attr("text-anchor", "middle")
      //     .attr("y", function(d) { return -2 * radius(d); })
      //     .attr("dy", "1.3em")
      //     .text(d3.format(".1s"));

      // d3.json('https://d3js.org/us-10m.v1.json').then(function(us) {

      //   svg.append("path")
      //       .datum(topojson.feature(us, us.objects.nation))
      //       .attr("class", "land")
      //       .attr("fill", "#ddd")
      //       .attr("d", path);

      //   svg.append("path")
      //       .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      //       .attr("class", "border border--state")
      //       .attr("fill", "none")
      //       .attr("stroke", "#fff")
      //       .attr("stroke-linejoin", "round")
      //       .attr("stroke-linecap", "round")
      //       .attr("d", path);

      //   // svg.append("g")
      //   //     .attr("class", "bubble")
      //   //     .attr("fill", "rgb(250, 49, 65)")
      //   //     .attr("fill-opacity", ".5")
      //   //   .selectAll("circle")
      //   //     .data(topojson.feature(us, us.objects.counties).features.sort(function(a, b) { return b.properties.population - a.properties.population; }))
      //   //   .enter().append("circle")
      //   //     .attr("transform", d => "translate(" + path.centroid(d) + ")")
      //   //     .attr("r", "1.9");

      //   svg.append("g")
      //       .attr("class", "bubble")
      //       .attr("fill", "rgb(250, 49, 65)")
      //       .attr("fill-opacity", ".5")
      //     .selectAll("circle")
      //       .data(topojson.feature(us, us.objects.counties).features.sort(function(a, b) { return b.properties.population - a.properties.population; }))
      //     .enter().append("circle")
      //       .attr("transform", d => "translate(" + path.centroid(d) + ")")
      //       .attr("r", d => radius(d.properties.population));
            
      // }).catch(function(error) {
      //   if (error) return console.log(error);
      // });

      // d3.select(self.frameElement).style("height", height + "px");

      // ================================

			// // D3 Projection
			// var projection = d3.geoAlbersUsa(); // scale things down so see entire US
			// this.projection = projection;
			
			// // D3 US States map
			// fetch('https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/us-states.json')
			// 	.then( response => response.json() )
			// 	.then( (states) => {

			// 	// Define path generator
			// 	var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
			// 	.projection(projection); // tell path generator to use albersUsa projection

			// 	// Bind the data to the SVG and create one path per GeoJSON feature
			// 	var svg = d3.select(".map");

			// 	svg.selectAll("path")
			// 		.data(states.features)
			// 		.enter()
			// 		.append("path")
			// 		.attr("d", path);
      // });
      
      // ================================
			
		}
	}
}
</script>

<style scoped>

</style>