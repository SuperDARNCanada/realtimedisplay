/*Copyright (c) 2016 SuperDARN Canada

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

var radar_coords = {"saskatoon":[-106.53,52.16],
					"rankin":[-93.11,62.82],
					"princegeorge":[-122.59,53.98],
					"clyde":[-68.50,70.49],
					"inuvik":[-133.772,68.414]};

/**
Creating a new svg and projection for the globe
*/
var width = $("#globediv").width();
var height = $("#globediv").height();

/* Default view */
var lat_lon = [99,-60];

var projection = d3.geo.orthographic()
	  .scale(width * .35)
	  .translate([width / 2, height / 2])
	  .clipAngle(90)
	  .rotate(lat_lon)
	  .precision(.1);

var path = d3.geo.path()
  	  .projection(projection);

var zoom = d3.behavior.zoom(true)
	  .translate([0,0])
	  .scale(projection.scale())
	  .scaleExtent([width * .35, width * .7])
	  .on("zoom", zoomed);

var drag = d3.behavior.drag()
	  .on("dragstart", dragstarted)
	  .on("drag", dragged)
	  .on("dragend", dragended);

var svg = d3.select("#globediv").append("svg")
	  .attr("width", "100%")
	  .attr("height", "100%")
	  .attr("viewBox","0 0 " + width + " " + height)
	  .attr("preserveAspectRatio","xMidYMid")
	  .call(drag)
	  .call(zoom);


/*TODO  Perhaps put this foreignObject underneath the gradient object? along with other instructions */
/*d3.select("#globediv").append("foreignObject")

			.attr("width","150px")
			.attr("height","40px")
			.append("xhtml:body")
			.style("font-size","12px")
			.html("<p>Hold and drag to rotate<br>Scroll to zoom</p>");*/

/* Group the globe objects all together into an svg group and call zoom to draw initial globe */
var svgGroup = svg.append("g");

svgGroup.append("defs").append("path")
	  .datum({type: "Sphere"})
	  .attr("id", "sphere")
	  .attr("d", path);

svgGroup.append("use")
	  .attr("class", "stroke")
	  .attr("xlink:href", "#sphere");

svgGroup.append("use")
	  .attr("class", "fill")
	  .attr("xlink:href", "#sphere");



$().on("resize",function(){
    var targetWidth = $("svg").parent().width();
    svg.attr("width", targetWidth);
    svg.attr("height", targetWidth / aspect);
})

/**
Grabbing the topojson objects for the globe
*/
d3.json("http://superdarn.usask.ca/jsondata/topoworld.json", function(error, topo_world) {
  if (error) throw error;

  svgGroup.append("path")
      .datum(topojson.feature(topo_world, topo_world.objects.world))
      .attr("class", "land")
      .attr("d", path);

  svgGroup.append("path")
      .datum(topojson.mesh(topo_world, topo_world.objects.world, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path);

});

var sask_topology,rkn_topology,pgr_topology,cly_topology,inv_topology;
d3.json("http://superdarn.usask.ca/jsondata/sastopojson.json", function(error, json_data) {
  if (error) throw error;

  sask_topology = json_data;

});

d3.json("http://superdarn.usask.ca/jsondata/rkntopojson.json", function(error, json_data) {
  if (error) throw error;

  rkn_topology = json_data;

});

d3.json("http://superdarn.usask.ca/jsondata/pgrtopojson.json", function(error, json_data) {
  if (error) throw error;

  pgr_topology = json_data;

});

d3.json("http://superdarn.usask.ca/jsondata/clytopojson.json", function(error, json_data) {
  if (error) throw error;

  cly_topology = json_data;

});

d3.json("http://superdarn.usask.ca/jsondata/invtopojson.json", function(error, json_data) {
  if (error) throw error;

  inv_topology = json_data;

});


/**
Creating a new svg for the color gradient legend
*/
var colorgrad = d3.select("#colorgrad").append("svg:svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("align", "center");

var gradient = colorgrad.append("svg:defs")
  .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("y1", "0%")
    .attr("x1","0%")
    .attr("y2", "0%")
    .attr("x2","100%");

colorgrad.append("svg:rect")
	    .attr("width", "415px")
	    .attr("height", "50%")
	    .style("fill", "url(#gradient)");


/**
Functions related to the zooming and rotating of the map
*/

d3.select(self.frameElement).style("height", height + "px");

/*d3.select(window)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);*/



function zoomed() {


  	projection.scale(d3.event.scale);

    svgGroup.selectAll(".land")
      .attr("d", path);
    svgGroup.selectAll(".boundary")
      .attr("d", path);
    svgGroup.selectAll(".saskatoon")
      .attr("d", path);
    svgGroup.selectAll(".saskatoonFOV")
      .attr("d", path);
    svgGroup.selectAll(".princegeorge")
      .attr("d", path);
    svgGroup.selectAll(".princegeorgeFOV")
      .attr("d", path);
    svgGroup.selectAll(".clyde")
      .attr("d", path);
    svgGroup.selectAll(".clydeFOV")
      .attr("d", path);
    svgGroup.selectAll(".rankin")
      .attr("d", path);
    svgGroup.selectAll(".rankinFOV")
      .attr("d", path);
    svgGroup.selectAll(".inuvik")
      .attr("d", path);
    svgGroup.selectAll(".inuvikFOV")
      .attr("d", path);
    svgGroup.selectAll("#sphere")
      .attr("d", path);

    
}

/*var m0,
    o0,
    o1=lat_lon;


function mousedown() {
	console.log("mousedown called");
  d3.event.preventDefault();
  m0 = [d3.event.pageX, d3.event.pageY];
  o0 = o1;
}

function mousemove() {
	console.log("mousemove called");
  if (m0) {
    var m1 = [d3.event.pageX, d3.event.pageY];
        o1 = [o0[0] - (m0[0] - m1[0]) / 8, o0[1] - (m1[1] - m0[1]) / 8];
    projection.rotate(o1);


  }
}

function mouseup() {
	console.log("mouseup called");
  if (m0) {
    mousemove();
    m0 = null;
  }
}*/


/***** MAP ROTATION CODE TAKEN FROM 
http://bl.ocks.org/ivycodes/7c94cb5a3accd9913263
***/


/***** ALL MATH FUNCTIONS ****/

var to_radians = Math.PI / 180;
var to_degrees = 180 / Math.PI;


// Helper function: cross product of two vectors v0&v1
function cross(v0, v1) {
    return [v0[1] * v1[2] - v0[2] * v1[1], v0[2] * v1[0] - v0[0] * v1[2], v0[0] * v1[1] - v0[1] * v1[0]];
}

//Helper function: dot product of two vectors v0&v1
function dot(v0, v1) {
    for (var i = 0, sum = 0; v0.length > i; ++i) sum += v0[i] * v1[i];
    return sum;
}

// Helper function: 
// This function converts a [lon, lat] coordinates into a [x,y,z] coordinate 
// the [x, y, z] is Cartesian, with origin at lon/lat (0,0) center of the earth
function lonlat2xyz( coord ){

	var lon = coord[0] * to_radians;
	var lat = coord[1] * to_radians;

	var x = Math.cos(lat) * Math.cos(lon);

	var y = Math.cos(lat) * Math.sin(lon);

	var z = Math.sin(lat);

	return [x, y, z];
}

// Helper function: 
// This function computes a quaternion representation for the rotation between to vectors
// https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
function quaternion(v0, v1) {

	if (v0 && v1) {
		
	    var w = cross(v0, v1),  // vector pendicular to v0 & v1
	        w_len = Math.sqrt(dot(w, w)); // length of w     

        if (w_len == 0)
        	return;

        var theta = .5 * Math.acos(Math.max(-1, Math.min(1, dot(v0, v1)))),

	        qi  = w[2] * Math.sin(theta) / w_len; 
	        qj  = - w[1] * Math.sin(theta) / w_len; 
	        qk  = w[0]* Math.sin(theta) / w_len;
	        qr  = Math.cos(theta);

	    return theta && [qr, qi, qj, qk];
	}
}

// Helper function: 
// This functions converts euler angles to quaternion
// https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
function euler2quat(e) {

	if(!e) return;
    
    var roll = .5 * e[0] * to_radians,
        pitch = .5 * e[1] * to_radians,
        yaw = .5 * e[2] * to_radians,

        sr = Math.sin(roll),
        cr = Math.cos(roll),
        sp = Math.sin(pitch),
        cp = Math.cos(pitch),
        sy = Math.sin(yaw),
        cy = Math.cos(yaw),

        qi = sr*cp*cy - cr*sp*sy,
        qj = cr*sp*cy + sr*cp*sy,
        qk = cr*cp*sy - sr*sp*cy,
        qr = cr*cp*cy + sr*sp*sy;

    return [qr, qi, qj, qk];
}

// This functions computes a quaternion multiply
// Geometrically, it means combining two quant rotations
// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/arithmetic/index.htm
function quatMultiply(q1, q2) {
	if(!q1 || !q2) return;

    var a = q1[0],
        b = q1[1],
        c = q1[2],
        d = q1[3],
        e = q2[0],
        f = q2[1],
        g = q2[2],
        h = q2[3];

    return [
     a*e - b*f - c*g - d*h,
     b*e + a*f + c*h - d*g,
     a*g - b*h + c*e + d*f,
     a*h + b*g - c*f + d*e];

}

// This function computes quaternion to euler angles
// https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
function quat2euler(t){

	if(!t) return;

	return [ Math.atan2(2 * (t[0] * t[1] + t[2] * t[3]), 1 - 2 * (t[1] * t[1] + t[2] * t[2])) * to_degrees, 
			 Math.asin(Math.max(-1, Math.min(1, 2 * (t[0] * t[2] - t[3] * t[1])))) * to_degrees, 
			 Math.atan2(2 * (t[0] * t[3] + t[1] * t[2]), 1 - 2 * (t[2] * t[2] + t[3] * t[3])) * to_degrees
			]
}

/*  This function computes the euler angles when given two vectors, and a rotation
	This is really the only math function called with d3 code.

	v0 - starting pos in lon/lat, commonly obtained by projection.invert
	v1 - ending pos in lon/lat, commonly obtained by projection.invert
	o0 - the projection rotation in euler angles at starting pos (v0), commonly obtained by projection.rotate
*/

function eulerAngles(v0, v1, o0) {

	/*
		The math behind this:
		- first calculate the quaternion rotation between the two vectors, v0 & v1
		- then multiply this rotation onto the original rotation at v0
		- finally convert the resulted quat angle back to euler angles for d3 to rotate
	*/

	var t = quatMultiply( euler2quat(o0), quaternion(lonlat2xyz(v0), lonlat2xyz(v1) ) );
	return quat2euler(t);	
}


/**************end of math functions**********************/

var gpos0, o0;

function dragstarted(){

	gpos0 = projection.invert(d3.mouse(this));
	o0 = projection.rotate();

/*	svg.insert("path")
             .datum({type: "Point", coordinates: gpos0})
             .attr("class", "point")
             .attr("d", path); */
}

function dragged(){

	var gpos1 = projection.invert(d3.mouse(this));

	o0 = projection.rotate();

	var o1 = eulerAngles(gpos0, gpos1, o0);
	if(typeof o1 != 'undefined'){
		projection.rotate(o1);
	}

/*	svg.selectAll(".point")
	 		.datum({type: "Point", coordinates: gpos1});
  svg.selectAll("path").attr("d", path);*/

}

function dragended(){
	/*svg.selectAll(".point").remove();*/
}





/**
Functions related to checkboxes and radio buttons. Will
display or remove radars if checkboxes are changed. Will update
color legend and which parameter is being displayed if radio buttons
change
*/
var display_type = "velocity"
displayColorLegend("velocity");
$("#description").text("Plasma drift velocity along the beam direction (blue – towards the radar; red – away from the radar; grey for ground scatter).");

$(document).ready(function() {
    $('input[type=radio][name=distype]').change(function() {
       displayColorLegend(this.value);
       display_type = this.value;
       svgGroup.selectAll(".saskatoon")
       		.style("fill","transparent");
       svgGroup.selectAll(".rankin")
       		.style("fill","transparent");
       svgGroup.selectAll(".clyde")
       		.style("fill","transparent");
       svgGroup.selectAll(".princegeorge")
       		.style("fill","transparent");
       svgGroup.selectAll(".inuvik")
       		.style("fill","transparent");

       switch(display_type){
       		case "velocity": 
       			$("#description").text("Plasma drift velocity along the beam direction (blue – towards the radar; red – away from the radar; grey for ground scatter)."); 
       			break;
       		case "pwr":
       			$("#description").text("Ratio of the radar echo power to that of the atmospheric noise."); 
       			break;
       		case "width":
       			$("#description").text("Larger spectral width usually indicates more perturbed plasma."); 
       			break;
       		case "elevation":
       		    $("#description").text("Vertical angle of arrival of the radar echoes measured from the horizon."); 
       			break;
       }

    });

		
		$('input[type=checkbox][name=saskatoon]').change(function() {
        if($(this).is(":checked")) {
        	displayRadar("saskatoon",sask_topology);
        }
        else{
        	removeRadar("saskatoon");
        }     
    });

    
		$('input[type=checkbox][name=princegeorge]').change(function() {
        if($(this).is(":checked")) {
        	displayRadar("princegeorge",pgr_topology);
        }
        else{
        	removeRadar("princegeorge");
        }     
    });

   
		$('input[type=checkbox][name=rankin]').change(function() {
        if($(this).is(":checked")) {
        	displayRadar("rankin",rkn_topology);
        }
        else{
        	removeRadar("rankin");
        }     
    });

   
		$('input[type=checkbox][name=clyde]').change(function() {
        if($(this).is(":checked")) {
        	displayRadar("clyde",cly_topology);
        }
        else{
        	removeRadar("clyde");
        }     
    });

    
		$('input[type=checkbox][name=inuvik]').change(function() {
        if($(this).is(":checked")) {
        	displayRadar("inuvik",inv_topology);
        }
        else{
        	removeRadar("inuvik");
        }     
    });
});

function displayRadar(name,topology){
	svgGroup.append("path")
	    .datum(topojson.feature(topology, topology.objects.geojsondata))
	    .attr("class", name)
	    .attr("d", path);
  svgGroup.selectAll("." + name)
      .data(topojson.feature(topology, topology.objects.geojsondata).features)
    .enter().append("path")
      .attr("class",name)
      .attr("id",function(d){return name + d.id;})
      .attr("d",path);
  svgGroup.append("path")
      .datum(topojson.mesh(topology, topology.objects.geojsondata, function(a, b) { return a !== b; }))
      .attr("class", name + "FOV")
      .attr("d", path);
}

function removeRadar(name){
	svgGroup.selectAll("." + name)
    .remove();
  svgGroup.selectAll("." + name + "FOV")
    .remove();
}

/* TODO: Look into analytical way of generating these colours/gradients and labels? */
function displayColorLegend(type){
	var power_color_data = [{color:"#11064F",label:"0dB"},
										{color:"#1FF0D1",label:"13dB"},
										{color:"#FFF700",label:"27dB"},
										{color:"#FF0505",label:"40dB"}
										];

	var width_color_data = [{color:"#11064F",label:"0m/s"},
										{color:"#1FF0D1",label:"67m/s"},
										{color:"#FFF700",label:"133m/s"},
										{color:"#FF0505",label:"200m/s"}
										];

	var elevation_color_data = [{color:"#11064F",label:"0\u00B0"},
										{color:"#1FF0D1",label:"13\u00B0"},
										{color:"#FFF700",label:"27\u00B0"},
										{color:"#FF0505",label:"40\u00B0"}
										];
  var velocity_color_data = [{color:"#F00909",label:"-600m/s"},
                    {color:"#FAAEAE",label:"-300m/s"},
                    {color:"#B0AAFF",label:"300m/s"},
                    {color:"#1E0AFF",label:"600m/s"}
                    ];
/*	var velocity_color_data = [{color:"#DE830B",label:"-600m/s"},
										{color:"#BC8E5C",label:"-300m/s"},
										{color:"#9B9AAD",label:"300m/s"},
										{color:"#7AA6FF",label:"600m/s"}
										];*/

	var color_data;

	switch(type){
		case "velocity": color_data = velocity_color_data; break;
		case "pwr": color_data = power_color_data; break;
		case "elevation": color_data = elevation_color_data; break;
		case "width": color_data = width_color_data; break;
	}


	gradient.selectAll('stop')
					.remove();

	colorgrad.selectAll('g')
					 .remove();

  if(type == "velocity"){         
/*  	gradient.selectAll('stop')
  		      .data(color_data)
  		      .enter()
  		      .append('stop')
  		      .attr('offset', function(d, i) {
              if((i == 2) || (i == 3)){
  		          return (i) * 25 + 25 + '%';
              }
              else{
                return (i) * 25 + '%';
              }
  		      })
  		      .style('stop-color', function(d) {
  		        return d.color;
  		      })
  		      .style('stop-opacity', 0.9);*/

    gradient.append('stop')
      .attr('offset',"0%")
      .style('stop-color',color_data[0].color)
      .style('stop-opacity',.9);

    gradient.append('stop')
      .attr('offset',"25%")
      .style('stop-color',color_data[1].color)
      .style('stop-opacity',.9);

    gradient.append('stop')
      .attr('offset',"50%")
      .style('stop-color',"rgb(255,255,255)")
      .style('stop-opacity',.9);

    gradient.append('stop')
      .attr('offset',"75%")
      .style('stop-color',color_data[2].color)
      .style('stop-opacity',.9);

    gradient.append('stop')
      .attr('offset',"100%")
      .style('stop-color',color_data[3].color)
      .style('stop-opacity',.9);
  }
  else{
        gradient.selectAll('stop')
            .data(color_data)
            .enter()
            .append('stop')
            .attr('offset', function(d, i) {
                return (i) * 33 + '%';
            })
            .style('stop-color', function(d) {
              return d.color;
            })
            .style('stop-opacity', 0.9);
  }

	var g = colorgrad.append('g')
	      .selectAll('.label')  
	      .data(color_data)
	      .enter();
	    
	g.append('line')
	  .style('stroke', function(d) {
	    return d.color;
	  })
	  .style('stroke-width', 4)
	  .attr('x1',function(d,i){
	    return xPos(i);
	  })
	  .attr('x2',function(d,i){
	    return xPos(i);
	  })
	  .attr('y1',function(d,i){
	    return document.getElementById("colorgrad").clientHeight / 2;
	  })
	   .attr('y2',function(d,i){
	    return document.getElementById("colorgrad").clientHeight;
	  });
	      
	  
	g.append('text')
	  .text(function(d){
	    return d.label;
	  })
	  .attr('transform',function(d,i){
	    return 'translate(' + (xPos(i) + 3) + ',' + (document.getElementById("colorgrad").clientHeight - 7) + ')';
	  })
	      
	  function xPos(i){
	  	switch(i){
	  		case 0: return 2
	  		case 1: return 415 * .33;
	  		case 2: return 415 * .66;
	  		case 3: return 413;
	  	}
	  }   
}


/**
Creating new websocket connections to the server for the field of view data.
CSS color codes for range cells are grabbed from the server and then range
cells are updated
*/

var sask_connection = new WebSocket('ws://128.233.224.43:5005',['binary', 'base64']);
var pgr_connection = new WebSocket('ws://128.233.224.43:5007',['binary', 'base64']);
var cly_connection = new WebSocket('ws://128.233.224.43:5008',['binary', 'base64']);
var rkn_connection = new WebSocket('ws://128.233.224.43:5006',['binary', 'base64']);
var inv_connection = new WebSocket('ws://128.233.224.43:5009',['binary', 'base64']);

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function on_message(evt,radar){ 
  var reader = new FileReader();

  reader.onload = function(){
    var received_data = reader.result;
    json_data = JSON.parse(received_data);
    radar_ranges = json_data.nrang;
    
    var data_array = [];
    switch(display_type){
    		case "pwr": data_array = json_data.power; break;
    		case "width": data_array = json_data.width; break;
    		case "velocity": data_array = json_data.velocity; break;
    		case "elevation": data_array = json_data.elevation; break;
    }

    for(i=0;i<radar_ranges;i++){
		var color = data_array[i];
      	svgGroup.select("path#" + radar + zeroPad(json_data.beam,2) + zeroPad(i,2))
     		.style("fill",color);
    }
    
    $("#" + radar + "freq").text(json_data.freq);
    $("#" + radar + "cp").text(json_data.cp);
    $("#" + radar + "noise").text(json_data.noise);
    $("#" + radar + "ave").text(json_data.nave);
    $("#" + radar + "rsep").text(json_data.rsep);
    $("#" + radar + "frang").text(json_data.frang);
    $("#" + radar + "time").text(json_data.time);

  };
  reader.readAsText(evt.data)
  };

sask_connection.onmessage = function(evt){on_message(evt,"saskatoon");};

pgr_connection.onmessage = function(evt){on_message(evt,"princegeorge");};

rkn_connection.onmessage = function(evt){on_message(evt,"rankin");};

cly_connection.onmessage = function(evt){on_message(evt,"clyde");};

inv_connection.onmessage = function(evt){on_message(evt,"inuvik");};





