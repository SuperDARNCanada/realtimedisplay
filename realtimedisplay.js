/*Copyright (c) 2016 SuperDARN Canada

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

var sites = {"saskatoon": {
                        "coords" : [-106.53,52.16],
                        "color" : "green",
                        "link" : {"15km" : "http://chapman.usask.ca/jsondata/sastopojson15km.json",
                                  "45km" : "http://chapman.usask.ca/jsondata/sastopojson45km.json"
                                 },
                        "address" : 'ws://128.233.224.38:5100'
                        },

             "rankin": {
                        "coords" : [-93.11,62.82],
                        "color" : "blue",
                        "link" : {"15km" : "http://chapman.usask.ca/jsondata/rkntopojson15km.json",
                                  "45km" : "http://chapman.usask.ca/jsondata/rkntopojson45km.json",
                                 },
                        "address" : 'wss://chapman.usask.ca:5102'
                        },

             "princegeorge": {
                        "coords" : [-122.59,53.98],
                        "color" : "red",
                        "link" : {"15km" : "http://chapman.usask.ca/jsondata/pgrtopojson15km.json",
                                  "45km" : "http://chapman.usask.ca/jsondata/pgrtopojson45km.json"
                                 },
                        "address" : "wss://chapman.usask.ca:5103"
                        },

             "clyde": {
                        "coords" : [-68.50,70.49],
                        "color" : "purple",
                        "link" : {"15km" : "http://chapman.usask.ca/jsondata/clytopojson15km.json",
                                  "45km" : "http://chapman.usask.ca/jsondata/clytopojson45km.json"
                                 },
                        "address" : "wss://chapman.usask.ca:5104"
                        },

             "inuvik": {
                        "coords" : [-133.772,68.414],
                        "color" : "orange",
                        "link" : {"15km" : "http://chapman.usask.ca/jsondata/invtopojson15km.json",
                                  "45km" : "http://chapman.usask.ca/jsondata/invtopojson45km.json"
                                 },
                        "address" : "wss://chapman.usask.ca:5105"
                        },

             "blackstone": {
                        "coords" : [-77.950,37.100],
                        "color" : "cyan",
                        "link" : {"15km" : "http://chapman.usask.ca/jsondata/bkstopojson15km.json",
                                  "45km" : "http://chapman.usask.ca/jsondata/bkstopojson45km.json"
                                 },
                        "address" : "wss://chapman.usask.ca:5106"
                        },

             "forthayseast": {
                        "coords" : [-99.700,38.859],
                        "color" : "brown",
                        "link" : {"15km" : "http://chapman.usask.ca/jsondata/fhetopojson15km.json",
                                  "45km" : "http://chapman.usask.ca/jsondata/fhetopojson45km.json"
                                 },
                        "address" : "wss://chapman.usask.ca:5107"
                        },

             "forthayswest": {
                        "coords" : [-99.300,38.859],
                        "color" : "midnightblue",
                        "link" : {"15km" : "http://chapman.usask.ca/jsondata/fhwtopojson15km.json",
                                  "45km" : "http://chapman.usask.ca/jsondata/fhwtopojson45km.json"
                                 },
                        "address" : "wss://chapman.usask.ca:5108"
                        },

             "kapuskasing": {
                        "coords" : [-82.32,49.39],
                        "color" : "coral",
                        "link" : {"15km" : "http://chapman.usask.ca/jsondata/kaptopojson15km.json",
                                  "45km" : "http://chapman.usask.ca/jsondata/kaptopojson45km.json"
                                 },
                        "address" : "wss://chapman.usask.ca:5109"
                        },

             "goosebay": {
                        "coords" : [-60.46,53.32],
                        "color" : "chartreuse",
                        "link" : {"15km" : "http://chapman.usask.ca/jsondata/gbrtopojson15km.json",
                                  "45km" : "http://chapman.usask.ca/jsondata/gbrtopojson45km.json"
                                 },
                        "address" : "wss://chapman.usask.ca:5110"
                        },

             "christmasvalleyeast": {
                        "coords" : [-120.660,43.27],
                        "color" : "palegreen",
                        "link" : {"15km" : "http://chapman.usask.ca/jsondata/cvetopojson15km.json",
                                  "45km" : "http://chapman.usask.ca/jsondata/cvetopojson45km.json"
                                 },
                        "address" : "wss://chapman.usask.ca:5111"
                        },

             "christmasvalleywest": {
                        "coords" : [-120.060,43.27],
                        "color" : "firebrick",
                        "link" : {"15km" : "http://chapman.usask.ca/jsondata/cvwtopojson15km.json",
                                  "45km" : "http://chapman.usask.ca/jsondata/cvwtopojson45km.json"
                                 },
                        "address" : "wss://chapman.usask.ca:5112"
                        }
              };


/*Adding a function to the string prototype to format strings*/
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function GlobeSVG() {
  this.lat_lon = [99,-60];
  this.divContainer = "#globediv"
  this.width = $(this.divContainer).width();
  this.height = $(this.divContainer).height();
  this.gpos0;
  this.o0;
  this.projection;
  this.path;
  this.drag;
  this.zoom;
  this.svg;
  this.svgGroup;

  this.createProjection();
  this.createPath();
  this.createDragBehavior();
  this.createZoomBehavior();
  this.createSVG();
  this.createSVGGroup();
  this.defineResizeBehavior();

  this.createMap("http://chapman.usask.ca/jsondata/topoworld.json");
}

GlobeSVG.prototype.createProjection = function() {
  this.projection = d3.geo.orthographic()
    .scale(this.height*.45)
    .translate([this.width / 2, this.height / 2])
    .clipAngle(90)
    .rotate(this.lat_lon)
    .precision(.1);
}

GlobeSVG.prototype.createPath = function() {
  this.path = d3.geo.path()
      .projection(this.projection);

}

GlobeSVG.prototype.createDragBehavior = function() {
  var self = this;
  this.drag = d3.behavior.drag()
    .on("dragstart", this.dragStarted.bind(this))
    .on("drag", this.dragged.bind(this))
    .on("dragend", this.dragEnded.bind(this));
}

GlobeSVG.prototype.dragStarted =function() {
  this.gpos0 = this.projection.invert(d3.mouse(this.svg.node()));
  this.o0 = this.projection.rotate();

}

/*TODO: fix drawPoints, make rotation package*/
GlobeSVG.prototype.dragged = function(){

  var gpos1 = this.projection.invert(d3.mouse(this.svg.node()));

  this.o0 = this.projection.rotate();

  var o1 = RotationMath.eulerAngles(this.gpos0, gpos1, this.o0);
  if(typeof o1 != 'undefined'){
    this.projection.rotate(o1);
  }

}

GlobeSVG.prototype.dragEnded = function(){}

GlobeSVG.prototype.createZoomBehavior = function() {
  this.zoom = d3.behavior.zoom(true)
    .translate([0,0])
    .scale(this.projection.scale())
    .scaleExtent([this.height * .45, this.height * .9])
    .on("zoom",this.zoomFunction.bind(this));
}

GlobeSVG.prototype.zoomFunction = function (){

    this.projection.scale(d3.event.scale);

    this.svgGroup.selectAll(".land")
      .attr("d", this.path);
    this.svgGroup.selectAll(".boundary")
      .attr("d", this.path);
    for (site in sites) {
      this.svgGroup.selectAll("." + site)
        .attr("d", this.path);
      this.svgGroup.selectAll("." + site + "FOV")
        .attr("d", this.path);
    }
    this.svgGroup.selectAll("#sphere")
      .attr("d", this.path);
    this.svgGroup.selectAll(".points")
      .attr("d", this.path);

}

GlobeSVG.prototype.createSVG = function() {
  this.svg = d3.select(this.divContainer).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox","0 0 " + this.width + " " + this.height)
    .attr("preserveAspectRatio","xMidYMid")
    .call(this.drag)
    .call(this.zoom);
}

GlobeSVG.prototype.createSVGGroup = function() {
  this.svgGroup = this.svg.append("g");

  this.svgGroup.append("defs").append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", this.path);

  this.svgGroup.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");

  this.svgGroup.append("use")
    .attr("class", "fill")
    .attr("xlink:href", "#sphere");
}

GlobeSVG.prototype.defineResizeBehavior = function() {
  $().on("resize",function(){
    var targetWidth = $("svg").parent().width();
    this.svg.attr("width", targetWidth);
    this.svg.attr("height", targetWidth / aspect);
  });
}

GlobeSVG.prototype.createMap = function(mapLink){
  var self = this;
  d3.json(mapLink, function(error, topo_world) {
    if (error) throw error;

    self.svgGroup.append("path")
        .datum(topojson.feature(topo_world, topo_world.objects.world))
        .attr("class", "land")
        .attr("d",self.path);

    self.svgGroup.append("path")
        .datum(topojson.mesh(topo_world, topo_world.objects.world, function(a, b) { return a !== b; }))
        .attr("class", "boundary")
        .attr("d", self.path);

    self.drawPoints();

  }.bind(this));

}


GlobeSVG.prototype.drawPoints = function() {
  var self = this;
    for(var site in sites){
      if(!sites.hasOwnProperty(site)) continue;

      this.svgGroup.append("path")
        .datum({"type": "Point","coordinates":sites[site]["coords"]})
        .attr("d",this.path.pointRadius(3))
        .attr("class","points")
        .style("fill",sites[site]["color"]);
  }

}

function Topology() {
  this.topologies = {};
  this.current_topology = {};
  this.d3_call_complete = false;

  for(var site in sites){
    for (var rsep in sites[site]["link"]){
      this.getTopologyData(sites[site]["link"][rsep],site,rsep);
    }
  }


}

Topology.prototype.setTopology = function(site,rsep,data){
  this.topologies[site] = this.topologies[site] || {};
  this.topologies[site][rsep] = data;
}

Topology.prototype.getTopologyData = function(link,site,rsep){

  d3.json(link, function(error,json_data) {
    if (error) throw error;
    this.setTopology(site,rsep,json_data);
    if (rsep == "45km") {
	this.current_topology[site] = this.topologies[site]["45km"];
    }
  }.bind(this));
}



/***** ALL MATH FUNCTIONS ****/

function RotationMath(){
/***** MAP ROTATION CODE TAKEN FROM
http://bl.ocks.org/ivycodes/7c94cb5a3accd9913263
***/
}

// Helper function: cross product of two vectors v0&v1
RotationMath.cross = function(v0, v1) {
    return [v0[1] * v1[2] - v0[2] * v1[1], v0[2] * v1[0] - v0[0] * v1[2], v0[0] * v1[1] - v0[1] * v1[0]];
}

//Helper function: dot product of two vectors v0&v1
RotationMath.dot = function(v0, v1) {
    for (var i = 0, sum = 0; v0.length > i; ++i) sum += v0[i] * v1[i];
    return sum;
}

// This function converts a [lon, lat] coordinates into a [x,y,z] coordinate
// the [x, y, z] is Cartesian, with origin at lon/lat (0,0) center of the earth
RotationMath.lonlat2xyz = function( coord ){

  var to_radians = Math.PI / 180;

  var lon = coord[0] * to_radians;
  var lat = coord[1] * to_radians;

  var x = Math.cos(lat) * Math.cos(lon);

  var y = Math.cos(lat) * Math.sin(lon);

  var z = Math.sin(lat);

  return [x, y, z];
}

// This function computes a quaternion representation for the rotation between to vectors
// https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
RotationMath.quaternion = function(v0, v1) {

  if (v0 && v1) {

      var w = RotationMath.cross(v0, v1),  // vector pendicular to v0 & v1
          w_len = Math.sqrt(RotationMath.dot(w, w)); // length of w

        if (w_len == 0)
          return;

        var theta = .5 * Math.acos(Math.max(-1, Math.min(1, RotationMath.dot(v0, v1)))),

          qi  = w[2] * Math.sin(theta) / w_len;
          qj  = - w[1] * Math.sin(theta) / w_len;
          qk  = w[0]* Math.sin(theta) / w_len;
          qr  = Math.cos(theta);

      return theta && [qr, qi, qj, qk];
  }
}

// This functions converts euler angles to quaternion
// https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
RotationMath.euler2quat = function(e) {

  var to_radians = Math.PI / 180;
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
RotationMath.quatMultiply = function(q1, q2) {
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
RotationMath.quat2euler = function(t){

  var to_degrees = 180 / Math.PI;
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
RotationMath.eulerAngles = function(v0, v1, o0) {

  /*
    The math behind this:
    - first calculate the quaternion rotation between the two vectors, v0 & v1
    - then multiply this rotation onto the original rotation at v0
    - finally convert the resulted quat angle back to euler angles for d3 to rotate
  */

  var t = RotationMath.quatMultiply( RotationMath.euler2quat(o0), RotationMath.quaternion(RotationMath.lonlat2xyz(v0), RotationMath.lonlat2xyz(v1) ) );
  return RotationMath.quat2euler(t);
}





function ColorGradient(){
  this.createColorGradient();
  this.createGradient();
}

ColorGradient.prototype.createColorGradient = function(){
  this.colorgrad = d3.select("#colorgrad").append("svg:svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("align", "center");

  this.colorgrad.append("svg:rect")
      .attr("width", "415px")
      .attr("height", "50%")
      .style("fill", "url(#gradient)");
}


ColorGradient.prototype.createGradient = function(){
  this.gradient = this.colorgrad.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("y1", "0%")
    .attr("x1","0%")
    .attr("y2", "0%")
    .attr("x2","100%");
}





/**
Functions related to checkboxes and radio buttons. Will
display or remove radars if checkboxes are changed. Will update
color legend and which parameter is being displayed if radio buttons
change
*/

function Interactivity(gradient,globeSVG,topology){
  this.displayType = "velocity";
  this.gradientObj = gradient;
  this.globeSVG = globeSVG;
  this.topologyObj = topology;

  this.displayColorLegend(this.gradientObj);
  $("#description").text("Plasma drift velocity along the beam direction (blue – towards the radar; red – away from the radar; grey for ground scatter).");
  this.defineParameterTypeSwitching();

  for(site in sites){
    this.defineRadarButtonAction(site);
  }

}



Interactivity.prototype.defineParameterTypeSwitching = function() {
  var self = this;

    $('input[type=radio][name=distype]').change(function() {
      self.displayType = this.value;
      self.displayColorLegend(self.gradientObj);
      for (site in sites){
        self.globeSVG.svgGroup.selectAll("." + site)
          .style("fill","transparent");
      }
/*       self.globeSVG.svgGroup.selectAll(".saskatoon")
          .style("fill","transparent");
       self.globeSVG.svgGroup.selectAll(".rankin")
          .style("fill","transparent");
       self.globeSVG.svgGroup.selectAll(".clyde")
          .style("fill","transparent");
       self.globeSVG.svgGroup.selectAll(".princegeorge")
          .style("fill","transparent");
       self.globeSVG.svgGroup.selectAll(".inuvik")
          .style("fill","transparent");
       self.globeSVG.svgGroup.selectAll(".blackstone")
       .style("fill","transparent");
       self.globeSVG.svgGroup.selectAll(".forthayseast")
       .style("fill","transparent");
       self.globeSVG.svgGroup.selectAll(".forthayswest")
       .style("fill","transparent");
              self.globeSVG.svgGroup.selectAll(".kapuskasing")
       .style("fill","transparent");
              self.globeSVG.svgGroup.selectAll(".goosebay")
       .style("fill","transparent");
              self.globeSVG.svgGroup.selectAll(".christmasvalleyeast")
       .style("fill","transparent");
              self.globeSVG.svgGroup.selectAll(".christmasvalleywest")
       .style("fill","transparent");*/

       switch(self.displayType){
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

}

Interactivity.prototype.displayColorLegend = function(gradientObj){
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

  var color_data;

  switch(this.displayType){
    case "velocity": color_data = velocity_color_data; break;
    case "pwr": color_data = power_color_data; break;
    case "elevation": color_data = elevation_color_data; break;
    case "width": color_data = width_color_data; break;
  }


  gradientObj.gradient.selectAll('stop')
          .remove();

  gradientObj.colorgrad.selectAll('g')
           .remove();

  if(this.displayType == "velocity"){

    gradientObj.gradient.append('stop')
      .attr('offset',"0%")
      .style('stop-color',color_data[0].color)
      .style('stop-opacity',.9);

    gradientObj.gradient.append('stop')
      .attr('offset',"25%")
      .style('stop-color',color_data[1].color)
      .style('stop-opacity',.9);

    gradientObj.gradient.append('stop')
      .attr('offset',"50%")
      .style('stop-color',"rgb(255,255,255)")
      .style('stop-opacity',.9);

    gradientObj.gradient.append('stop')
      .attr('offset',"75%")
      .style('stop-color',color_data[2].color)
      .style('stop-opacity',.9);

    gradientObj.gradient.append('stop')
      .attr('offset',"100%")
      .style('stop-color',color_data[3].color)
      .style('stop-opacity',.9);
  }
  else{
    gradientObj.gradient.selectAll('stop')
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

  var g = gradientObj.colorgrad.append('g')
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

Interactivity.prototype.displayRadar = function(name){
  this.globeSVG.svgGroup.append("path")
      .datum(topojson.feature(this.topologyObj.current_topology[name], this.topologyObj.current_topology[name].objects.topojsondata))
      .attr("class", name)
      .attr("d", this.globeSVG.path);
  this.globeSVG.svgGroup.selectAll("." + name)
      .data(topojson.feature(this.topologyObj.current_topology[name], this.topologyObj.current_topology[name].objects.topojsondata).features)
    .enter().append("path")
      .attr("class",name)
      .attr("id",function(d){return name + d.id;})
      .attr("d",this.globeSVG.path);
 this.globeSVG. svgGroup.append("path")
      .datum(topojson.mesh(this.topologyObj.current_topology[name], this.topologyObj.current_topology[name].objects.topojsondata, function(a, b) { return a !== b; }))
      .attr("class", name + "FOV")
      .attr("d", this.globeSVG.path);

}

Interactivity.prototype.removeRadar = function(name){
  this.globeSVG.svgGroup.selectAll("." + name)
    .remove();
  this.globeSVG.svgGroup.selectAll("." + name + "FOV")
    .remove();
}

Interactivity.prototype.defineRadarButtonAction = function(name){
    var jQuerySelector = "input[type=checkbox][name={0}]".format(name);
    var self = this;

    $(jQuerySelector).change(function() {
      var topology = self.topologyObj.current_topology[name];
      if($(this).is(":checked")) {
        self.displayRadar(name,topology);
      }
      else{
        self.removeRadar(name);
      }
   });
}

/**
Creating new websocket connections to the server for the field of view data.
CSS color codes for range cells are grabbed from the server and then range
cells are updated
*/
function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function RadarConnections(interactivityObj,globeSVG, topologyObj){
  this.radarConnections = {};
  var self = this;

  var onMessageFunctions = {};

  /*IFFE to correctly rectify scope of the loop variable in a closure*/
  for(var site in sites){
    (function(i){
      onMessageFunctions[i] = function(evt){self.on_message(evt,i,interactivityObj,globeSVG,topologyObj);};
    })(site);
  }

  for(var site in sites){
    this.createWebsocket(site,sites[site]["address"]);
    this.radarConnections[site].onmessage = onMessageFunctions[site];
  }


}

RadarConnections.prototype.createWebsocket = function(name,websocketAddress){
  this.radarConnections[name] = new WebSocket(websocketAddress,['binary', 'base64']);
}

RadarConnections.prototype.on_message = function(evt,radar,interactivityObj,globeSVG,topologyObj){
  var reader = new FileReader();
  reader.onload = function(){
    var received_data = reader.result;
    json_data = JSON.parse(received_data);
    radar_ranges = json_data.nrang;

    var data_array = [];
    switch(interactivityObj.displayType){
        case "pwr": data_array = json_data.power; break;
        case "width": data_array = json_data.width; break;
        case "velocity": data_array = json_data.velocity; break;
        case "elevation": data_array = json_data.elevation; break;
    }

    /*Clears the range cells if the cp changes*/
    current_cp = $("#" + radar + "cp").text();
    if(json_data.cp != current_cp){
      globeSVG.svgGroup.selectAll("." + radar)
        .style("fill","transparent");
    }


    for(i=0;i<radar_ranges;i++){
      var color = data_array[i];
      globeSVG.svgGroup.select("path#" + radar + zeroPad(json_data.beam,2) + zeroPad(i,2))
        .style("fill",color);

    }

    $("#" + radar + "freq").text(json_data.freq);
    $("#" + radar + "cp").text(json_data.cp);
    $("#" + radar + "noise").text(json_data.noise);
    $("#" + radar + "ave").text(json_data.nave);
    $("#" + radar + "rsep").text(json_data.rsep);
    $("#" + radar + "frang").text(json_data.frang);
    $("#" + radar + "time").text(json_data.time);


    if((json_data.rsep == 15 || json_data.rsep == 45) && topologyObj.current_topology[radar] != topologyObj.topologies[radar][json_data.rsep + "km"]){
      topologyObj.current_topology[radar] = topologyObj.topologies[radar][json_data.rsep + "km"];
    }

  };
  reader.readAsText(evt.data)
}

/*Dynamically resize height of the globe window*/
$("#globediv").height($(window).height()-$("#options").height());

var topology = new Topology();
var globeSVG = new GlobeSVG();

d3.select(self.frameElement).style("height", globeSVG.height + "px");

var colorGrad = new ColorGradient();
var interactivity;
var radarConnections;

$(document).ready(function() {
  interactivity = new Interactivity(colorGrad,globeSVG,topology);
  radarConnections = new RadarConnections(interactivity,globeSVG,topology);
});







