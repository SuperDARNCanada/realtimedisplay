<!-- Author: Bo Ericsson, bo@boe.net -->
<!-- Inspiration from numerous examples by Mike Bostock, http://bl.ocks.org/mbostock, -->
<!-- and example by Andy Aiken, http://blog.scottlogic.com/2014/09/19/interactive.html -->
'use strict';



var radars = {"saskatoon": {
                        "name": "Saskatoon",
                        "maxBeams": 16,                            
                        "maxRangeGates": 75,
                        "address" : 'wss://chapman.usask.ca:5100'
                        },

             "rankin": {
                        "name": "Rankin Inlet",
                        "maxBeams": 16,
                        "maxRangeGates": 100, 
                        "address" : 'wss://chapman.usask.ca:5101'
                        },

             "princegeorge": {
                        "name": "Prince George",
                        "maxBeams": 16,
                        "maxRangeGates": 75,
                        "address" : "wss://chapman.usask.ca:5102"
                        },

             "clyde": {
                        "name": "Clyde River",
                        "maxBeams": 16,
                        "maxRangeGates": 66,
                        "address" : "wss://chapman.usask.ca:5103"
                        },

             "inuvik": {
                        "name": "Inuvik",
                        "maxBeams": 16,
                        "maxRangeGates": 100,
                        "address" : "wss://chapman.usask.ca:5104"
                        },

             "blackstone": {
                        "name": "Blackstone",
                        "maxBeams": 24,
                        "maxRangeGates": 110,
                        "address" : "wss://chapman.usask.ca:5105"
                        },

             "forthayseast": {
                        "name": "Forth Hays East",
                        "maxBeams": 22,
                        "maxRangeGates": 110,
                        "address" : "wss://chapman.usask.ca:5106"
                        },

             "forthayswest": {
                        "name": "Forth Hays West",
                        "maxBeams": 22,
                        "maxRangeGates": 110,
                        "address" : "wss://chapman.usask.ca:5107"
                        },

             "kapuskasing": {
                        "name": "Kapuskasing",
                        "maxBeams": 16,
                        "maxRangeGates": 100,
                        "address" : "wss://chapman.usask.ca:5108"
                        },

             "goosebay": {
                        "name": "Goosebay",
                        "maxBeams": 16,
                        "maxRangeGates": 100,
                        "address" : "wss://chapman.usask.ca:5109"
                        },

             "christmasvalleyeast": {
                        "name": "Christmas Valley East",
                        "maxBeams": 24,
                        "maxRangeGates": 75,
                        "address" : "wss://chapman.usask.ca:5110"
                        },

             "christmasvalleywest": {
                        "name": "Christmas Valley West",
                        "maxBeams": 24,
                        "maxRangeGates": 75,
                        "address" : "wss://chapman.usask.ca:5111"
                        }
              };
// This function is use to setup the charts need for plotting noise, 
// nave, and frequency  

//function realTimeChartLine() {
//    var version = "0.1.0",
//      datum, data, // time Mulitplier controlls the time scale spanned and the Navigation bar is controlled by maxseconds 
//      timeDelay = 30000, timeMultiplier = 7000, maxSeconds = 1400, pixelsPerSecond = 1, // pixelsPerSeconds changes the speed the chart moves... create some function to calculate what this should be? 
//      svgWidth = 700, svgHeight = 300,
//      margin = { top: 20, bottom: 20, left: 100, right: 30},
//      dimension = { chartTitle: 20, xAxis: 20, yAxis: 60, xTitle: 20, yTitle: 20},
//      maxY = 75, minY = 0,
//      chartTitle, yTitle, xTitle,
//      drawXAxis = true, drawYAxis = true,
//      border,
//      selection,
//      barId = 0,
//      yDomain = d3.range(maxY),
//      debug = false,
//      barWidth = 5,
//      halted = false,
//      x, y,
//      width, height,
//      xAxisG, yAxisG,
//      xAxis, yAxis,
//      svg;
//
//  // create the chart
//  var chart = function(s) {
//    selection = s;
//    if (selection == undefined) {
//      console.error("selection is undefined");
//      return;
//    };
//
//    // process titles
//    chartTitle = chartTitle || "";
//    xTitle = xTitle || "";
//    yTitle = yTitle || "";
//
//    // compute component dimensions
//    var chartTitleDim = chartTitle == "" ? 0 : dimension.chartTitle,
//        xTitleDim = xTitle == "" ? 0 : dimension.xTitle,
//        yTitleDim = yTitle == "" ? 0 : dimension.yTitle,
//        xAxisDim = !drawXAxis ? 0 : dimension.xAxis,
//        yAxisDim = !drawYAxis ? 0 : dimension.yAxis;
//
//    // compute dimension of main and nav charts, and offsets
//    var marginTop = margin.top + chartTitleDim;
//    
//    //height = svgHeight - - margin.bottom - chartTitleDim - xTitleDim - xAxisDim - navChartDim + 30 ;
//    height = svgHeight - marginTop - margin.bottom - chartTitleDim - xTitleDim - xAxisDim + 30;
//    width = svgWidth - margin.left - margin.right;
//
//    // append the svg
//    svg = selection.append("svg")
//        .attr("width", svgWidth)
//        .attr("height", svgHeight)
//        .style("border", function(d) { 
//          if (border) return "1px solid lightgray"; 
//          else return null;
//        });
//
//    // create main group and translate
//    var main = svg.append("g")
//        .attr("transform", "translate (" + margin.left + "," + marginTop + ")");
//
//    // define clip-path
//    main.append("defs").append("clipPath")
//        .attr("id", "myClip")
//      .append("rect")
//        .attr("x", 0)
//        .attr("y", 0)
//        .attr("width", width)
//        .attr("height", height);
//
//    // create chart background
//    main.append("rect")
//        .attr("x", 0)
//        .attr("y", 0)
//        .attr("width", width)
//        .attr("height", height)
//        .style("fill", "#f5f5f5");
//
//    // note that two groups are created here, the latter assigned to barG;
//    // the former will contain a clip path to constrain objects to the chart area; 
//    // no equivalent clip path is created for the nav chart as the data itself
//    // is clipped to the full time domain
//    var barG = main.append("g")
//        .attr("class", "barGroup")
//        .attr("transform", "translate(0, 0)")
//        .attr("clip-path", "url(#myClip")
//      .append("g");
//
//    // add group for x axis
//    xAxisG = main.append("g")
//        .attr("class", "x axis")
//        .attr("transform", "translate(0," + height + ")");
//
//    // add group for y axis
//    yAxisG = main.append("g")
//        .attr("class", "y axis");
//
//    // in x axis group, add x axis title
//    xAxisG.append("text")
//        .attr("class", "title")
//        .attr("x", width / 2)
//        .attr("y", 25)
//        .attr("dy", ".71em")
//        .text(function(d) { 
//          var text = xTitle == undefined ? "" : xTitle;
//          return text; 
//        });
//
//    // in y axis group, add y axis title
//    yAxisG.append("text")
//        .attr("class", "title")
//        .attr("transform", "rotate(-90)")
//        .attr("x", - height / 2)
//        .attr("y", -margin.left + 15) //-35
//        .attr("dy", ".71em")
//        .text(function(d) { 
//          var text = yTitle == undefined ? "" : yTitle;
//          return text; 
//        });
//
//    // in main group, add chart title
//    main.append("text")
//        .attr("class", "chartTitle")
//        .attr("x", width / 2)
//        .attr("y", -20)
//        .attr("dy", ".71em")
//        .text(function(d) { 
//          var text = chartTitle == undefined ? "" : chartTitle;
//          return text; 
//        });
//
//    // define main chart scales
//    x = d3.time.scale.utc().range([0, width]); 
//    //x = d3.time.scale().range([0, width]);
//    
//    y = d3.scale.linear().domain([maxY, minY]).range([0,height]);
//    //y = d3.scale.ordinal().domain(yDomain).rangeRoundPoints([height, 0], 1)
//
//    // define main chart axis
//    xAxis = d3.svg.axis()
//        .tickFormat(d3.time.format.utc("%H:%M"))
//        .orient("bottom");
//    yAxis = d3.svg.axis().orient("left");
//
//    // compute initial time domains...
//    var ts = new Date().getTime();
//    // first, the full time domain
//    var endTime = new Date(ts);
//    var startTime = new Date(endTime.getTime() - maxSeconds * timeMultiplier);
//    var interval = endTime.getTime() - startTime.getTime();
//
//    // then the viewport time domain (what's visible in the main chart and the viewport in the nav chart)
//    var endTimeViewport = new Date(ts);
//    var startTimeViewport = new Date(endTime.getTime() - width / pixelsPerSecond * timeMultiplier);
//    var intervalViewport = endTimeViewport.getTime() - startTimeViewport.getTime();
//    var offsetViewport = startTimeViewport.getTime() - startTime.getTime();
//
//    // set the scale domains for main and nav charts
//    x.domain([startTimeViewport, endTimeViewport]);
//    
//    // update axis with modified scale
//    xAxis.scale(x)(xAxisG);
//    yAxis.scale(y)(yAxisG);
//
//
//    // initial invocation; update display
//    data = [];
//    refresh();
//
//    // function to refresh the viz upon changes of the time domain 
//    // (which happens constantly), or after arrival of new data, or at init
//    function refresh() {
//
//      // process data to remove too late data items 
//      data = data.filter(function(d) {
//        if (d.time.getTime() > startTime.getTime()) return true;
//      }) 
//
//      // determine number of categories
//      var categoryCount = yDomain.length;
//
//      // here we bind the new data to the main chart
//      // note: no key function is used here; therefore the data binding is
//      // by index, which effectivly means that available DOM elements
//      // are associated with each item in the available data array, from 
//      // first to last index; if the new data array contains fewer elements
//      // than the existing DOM elements, the LAST DOM elements are removed;
//      // basically, for each step, the data items "walks" leftward (each data 
//      // item occupying the next DOM element to the left);
//      // This data binding is very different from one that is done with a key 
//      // function; in such a case, a data item stays "resident" in the DOM
//      // element, and such DOM element (with data) would be moved left, until
//      // the x position is to the left of the chart, where the item would be 
//      // exited
//      var updateSel = barG.selectAll(".bar")
//          .data(data);
//      // remove items
//      updateSel.exit().remove();
//      // add items
//      updateSel.enter()
//          .append(function(d) { 
//            if (d.type == undefined) console.error(JSON.stringify(d))
//            var type = "rect";
//            var node = document.createElementNS("http://www.w3.org/2000/svg", type);
//            return node; 
//          })
//          .attr("class", "bar")
//          .attr("id", function() { 
//            return "bar-" + barId++; 
//          })
//          .attr("x", function(d) { 
//            var size = d.size;
//            return Math.round(x(d.time) - size / 2); 
//          })
//           .attr("y", function(d) { 
//            var size = d.size;
//            return y(d.category) - size / 2;; 
//          })
//           .attr("cx", function(d) { 
//            return Math.round(x(d.time)); 
//          })
//          .attr("cy", function(d) { 
//            return y(d.category); 
//          })
//          .attr("r", function(d) { 
//            return d.size / 2; 
//          })
//          .attr("width", function(d) {
//            return d.size; 
//          })
//          .attr("height", function(d) { 
//            return d.size; 
//          })
//          .style("fill", function(d) { return d.color || "transparent"; })
//          .style("fill-opacity", function(d) { return d.opacity || 1; });
//
//
//
//      // update items; added items are now part of the update selection
//      updateSel
//          .attr("x", function(d) { 
//            var size = d.size;
//            return Math.round(x(d.time) - size / 2); 
//      //    })
//      //     .attr("y", function(d) { 
//      //      var size = d.size;
//      //      return y(d.category) - size / 2;; 
//          })
//           .attr("cx", function(d) { 
//            return Math.round(x(d.time)); 
//          });
//      //    .attr("cy", function(d) { 
//      //      return y(d.category); 
//      //    })
//      //    .attr("r", function(d) { 
//      //      return d.size / 2; 
//      //    })
//      //    .attr("width", function(d) {
//      //      return d.size; 
//      //    })
//      //    .attr("height", function(d) { 
//      //      return d.size; 
//      //    })
//      //    .style("fill", function(d) { return d.color || "transparent"; })
//      //    .style("fill-opacity", function(d) { return d.opacity || 1; });
//
//    
//    } // end refreshChart function
//
//
//    function getTagName(that) {
//      var tagName = d3.select(that).node().tagName;
//      return (tagName);
//    }
//
//
//    // function to keep the chart "moving" through time (right to left) 
//    setInterval(function() {
//
//      if (halted) return;
//
//      // compute new nav extents
//      endTime = new Date();
//      startTime = new Date(endTime.getTime() - maxSeconds * timeMultiplier);
//     
//      // compute new viewport times 
//      startTimeViewport = new Date(startTime.getTime());
//      endTimeViewport = new Date(startTime.getTime() + interval);
//
//      // update scales
//      x.domain([startTimeViewport, endTimeViewport]);
//   
//        
//      // update axis
//      xAxis.scale(x)(xAxisG);
//      xAxis.scale(xAxisG);
//
//      // refresh svg
//      refresh();
//
//    }, timeDelay)
//
//    // end setInterval function
//
//    return chart;
//
//  } // end chart function


  // chart getters/setters

  // new data item (this most recent item will appear 
  // on the right side of the chart, and begin moving left)
//  chart.datum = function(_) {
//    if (arguments.length == 0) return datum;
//    datum = _;
//    data.push(datum);
//    return chart;
//  }
//
//
//  // clears chart data
//  chart.clear = function(_) {
//    data = [];
//    return chart; 
//  }
//  // svg width
//  chart.width = function(_) {
//    if (arguments.length == 0) return svgWidth;
//    svgWidth = _;
//    return chart;
//  }
//
//  // svg height
//  chart.height = function(_) {
//    if (arguments.length == 0) return svgHeight;
//    svgHeight = _;
//    return chart;
//  }
//
//  // svg border
//  chart.border = function(_) {
//    if (arguments.length == 0) return border;
//    border = _;
//    return chart;       
//  }
//
//  // chart title
//  chart.title = function(_) {
//    if (arguments.length == 0) return chartTitle;
//    chartTitle = _;
//    return chart;   
//  }
//
//  // x axis title
//  chart.xTitle = function(_) {
//    if (arguments.length == 0) return xTitle;
//    xTitle = _;
//    return chart;       
//  }
//
//  // y axis title
//  chart.yTitle = function(_) {
//    if (arguments.length == 0) return yTitle;
//    yTitle = _;
//    return chart;       
//  }
//
//  // yItems (can be dynamically added after chart construction)
//  chart.yDomain = function(_) {
//    if (arguments.length == 0) return yDomain;
//    yDomain = _;
//    if (svg) {
//      // update the y ordinal scale
//      maxY = d3.max(yDomain)
//      y = d3.scale.linear().domain([maxY, minY]).range([0,height]);
//      //y = d3.scale.ordinal().domain(yDomain).rangeRoundPoints([height, 0],1);
//      // update the y axis
//      yAxis.scale(y)(yAxisG);
//      // update the y ordinal scale for the nav chart
//    }
//    return chart;       
//  }
//
//  // debug
//  chart.debug = function(_) {
//    if (arguments.length == 0) return debug;
//    debug = _;
//    return chart;       
//  }  
//
//  // halt
//  chart.halt = function(_) {
//    if (arguments.length == 0) return halted;
//    halted = _;
//    return chart;       
//  }
//
//  // version
//  chart.version = version;
//  
//  return chart;
//
//} // end realTimeChart function




function realTimeChartMulti() {
    var version = "0.1.0",
      datum, data, // time Mulitplier controlls the time scale spanned and the Navigation bar is controlled by maxseconds 
      timeDelay = 30000, timeMultiplier = 7000, maxSeconds = 1400, pixelsPerSecond = 1, // pixelsPerSeconds changes the speed the chart moves... create some function to calculate what this should be? 
      svgWidth = 700, svgHeight = 300,
      margin = { top: 20, bottom: 20, left: 100, right: 30},
      dimension = { chartTitle: 20, xAxis: 20, yAxis: 60, xTitle: 20, yTitle: 20},
      maxY = 75, minY = 0,
      chartTitle, yTitle, xTitle,
      drawXAxis = true, drawYAxis = true,
      border,
      selection,
      barId = 0,
      yDomain = d3.range(maxY),
      debug = false,
      barWidth = 5,
      halted = false,
      x, y,
      width, height,
      xAxisG, yAxisG,
      xAxis, yAxis,
      svg;

  // create the chart
  var chart = function(s) {
    selection = s;
    if (selection == undefined) {
      console.error("selection is undefined");
      return;
    };

    // process titles
    chartTitle = chartTitle || "";
    xTitle = xTitle || "";
    yTitle = yTitle || "";

    // compute component dimensions
    var chartTitleDim = chartTitle == "" ? 0 : dimension.chartTitle,
        xTitleDim = xTitle == "" ? 0 : dimension.xTitle,
        yTitleDim = yTitle == "" ? 0 : dimension.yTitle,
        xAxisDim = !drawXAxis ? 0 : dimension.xAxis,
        yAxisDim = !drawYAxis ? 0 : dimension.yAxis;

    // compute dimension of main and nav charts, and offsets
    var marginTop = margin.top + chartTitleDim;
    
    //height = svgHeight - - margin.bottom - chartTitleDim - xTitleDim - xAxisDim - navChartDim + 30 ;
    height = svgHeight - marginTop - margin.bottom - chartTitleDim - xTitleDim - xAxisDim + 30;
    width = svgWidth - margin.left - margin.right;

    // append the svg
    svg = selection.append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .style("border", function(d) { 
          if (border) return "1px solid lightgray"; 
          else return null;
        });

    // create main group and translate
    var main = svg.append("g")
        .attr("transform", "translate (" + margin.left + "," + marginTop + ")");

    // define clip-path
    main.append("defs").append("clipPath")
        .attr("id", "myClip")
      .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height);

    // create chart background
    main.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .style("fill", "#f5f5f5");

    // note that two groups are created here, the latter assigned to barG;
    // the former will contain a clip path to constrain objects to the chart area; 
    // no equivalent clip path is created for the nav chart as the data itself
    // is clipped to the full time domain
    var barG = main.append("g")
        .attr("class", "barGroup")
        .attr("transform", "translate(0, 0)")
        .attr("clip-path", "url(#myClip")
      .append("g");

    // add group for x axis
    xAxisG = main.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")");

    // add group for y axis
    yAxisG = main.append("g")
        .attr("class", "y axis");

    // in x axis group, add x axis title
    xAxisG.append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", 25)
        .attr("dy", ".71em")
        .text(function(d) { 
          var text = xTitle == undefined ? "" : xTitle;
          return text; 
        });

    // in y axis group, add y axis title
    yAxisG.append("text")
        .attr("class", "title")
        .attr("transform", "rotate(-90)")
        .attr("x", - height / 2)
        .attr("y", -margin.left + 15) //-35
        .attr("dy", ".71em")
        .text(function(d) { 
          var text = yTitle == undefined ? "" : yTitle;
          return text; 
        });

    // in main group, add chart title
    main.append("text")
        .attr("class", "chartTitle")
        .attr("x", width / 2)
        .attr("y", -20)
        .attr("dy", ".71em")
        .text(function(d) { 
          var text = chartTitle == undefined ? "" : chartTitle;
          return text; 
        });

    // define main chart scales
    x = d3.time.scale.utc().range([0, width]); 
    //x = d3.time.scale().range([0, width]);
    
    y = d3.scale.linear().domain([maxY, minY]).range([0,height]);
    //y = d3.scale.ordinal().domain(yDomain).rangeRoundPoints([height, 0], 1)

    // define main chart axis
    xAxis = d3.svg.axis()
        .tickFormat(d3.time.format.utc("%H:%M"))
        .orient("bottom");
    yAxis = d3.svg.axis().orient("left");

    // compute initial time domains...
    var ts = new Date().getTime();
    // first, the full time domain
    var endTime = new Date(ts);
    var startTime = new Date(endTime.getTime() - maxSeconds * timeMultiplier);
    var interval = endTime.getTime() - startTime.getTime();

    // then the viewport time domain (what's visible in the main chart and the viewport in the nav chart)
    var endTimeViewport = new Date(ts);
    var startTimeViewport = new Date(endTime.getTime() - width / pixelsPerSecond * timeMultiplier);
    var intervalViewport = endTimeViewport.getTime() - startTimeViewport.getTime();
    var offsetViewport = startTimeViewport.getTime() - startTime.getTime();

    // set the scale domains for main and nav charts
    x.domain([startTimeViewport, endTimeViewport]);
    
    // update axis with modified scale
    xAxis.scale(x)(xAxisG);
    yAxis.scale(y)(yAxisG);


    // initial invocation; update display
    data = [];
    refresh();

    // function to refresh the viz upon changes of the time domain 
    // (which happens constantly), or after arrival of new data, or at init
    function refresh() {

      // process data to remove too late data items 
      data = data.filter(function(d) {
        if (d.time.getTime() > startTime.getTime()) return true;
      }) 

      // determine number of categories
      var categoryCount = yDomain.length;

      // here we bind the new data to the main chart
      // note: no key function is used here; therefore the data binding is
      // by index, which effectivly means that available DOM elements
      // are associated with each item in the available data array, from 
      // first to last index; if the new data array contains fewer elements
      // than the existing DOM elements, the LAST DOM elements are removed;
      // basically, for each step, the data items "walks" leftward (each data 
      // item occupying the next DOM element to the left);
      // This data binding is very different from one that is done with a key 
      // function; in such a case, a data item stays "resident" in the DOM
      // element, and such DOM element (with data) would be moved left, until
      // the x position is to the left of the chart, where the item would be 
      // exited
      var updateSel = barG.selectAll(".bar")
          .data(data);
      // remove items
      updateSel.exit().remove();
      // add items
      updateSel.enter()
          .append(function(d) { 
            if (d.type == undefined) console.error(JSON.stringify(d))
            var type = "rect";
            var node = document.createElementNS("http://www.w3.org/2000/svg", type);
            return node; 
          })
          .attr("class", "bar")
          .attr("id", function() { 
            return "bar-" + barId++; 
          })
          .attr("x", function(d) { 
            var size = d.size;
            return Math.round(x(d.time) - size / 2); 
          })
           .attr("y", function(d) { 
            var size = d.size;
            return y(d.category) - size / 2;; 
          })
           .attr("cx", function(d) { 
            return Math.round(x(d.time)); 
          })
          .attr("cy", function(d) { 
            return y(d.category); 
          })
          .attr("r", function(d) { 
            return d.size / 2; 
          })
          .attr("width", function(d) {
            return d.size; 
          })
          .attr("height", function(d) { 
            return d.size; 
          })
          .style("fill", function(d) { return d.color || "transparent"; })
          .style("fill-opacity", function(d) { return d.opacity || 1; });



      // update items; added items are now part of the update selection
      updateSel
          .attr("x", function(d) { 
            var size = d.size;
            return Math.round(x(d.time) - size / 2); 
      //    })
      //     .attr("y", function(d) { 
      //      var size = d.size;
      //      return y(d.category) - size / 2;; 
          })
           .attr("cx", function(d) { 
            return Math.round(x(d.time)); 
          });
      //    .attr("cy", function(d) { 
      //      return y(d.category); 
      //    })
      //    .attr("r", function(d) { 
      //      return d.size / 2; 
      //    })
      //    .attr("width", function(d) {
      //      return d.size; 
      //    })
      //    .attr("height", function(d) { 
      //      return d.size; 
      //    })
      //    .style("fill", function(d) { return d.color || "transparent"; })
      //    .style("fill-opacity", function(d) { return d.opacity || 1; });

    
    } // end refreshChart function


    function getTagName(that) {
      var tagName = d3.select(that).node().tagName;
      return (tagName);
    }


    // function to keep the chart "moving" through time (right to left) 
    setInterval(function() {

      if (halted) return;

      // compute new nav extents
      endTime = new Date();
      startTime = new Date(endTime.getTime() - maxSeconds * timeMultiplier);
     
      // compute new viewport times 
      startTimeViewport = new Date(startTime.getTime());
      endTimeViewport = new Date(startTime.getTime() + interval);

      // update scales
      x.domain([startTimeViewport, endTimeViewport]);
   
        
      // update axis
      xAxis.scale(x)(xAxisG);
      xAxis.scale(xAxisG);

      // refresh svg
      refresh();

    }, timeDelay)

    // end setInterval function

    return chart;

  } // end chart function


  // chart getters/setters

  // new data item (this most recent item will appear 
  // on the right side of the chart, and begin moving left)
  chart.datum = function(_) {
    if (arguments.length == 0) return datum;
    datum = _;
    data.push(datum);
    return chart;
  }


  // clears chart data
  chart.clear = function(_) {
    data = [];
    return chart; 
  }
  // svg width
  chart.width = function(_) {
    if (arguments.length == 0) return svgWidth;
    svgWidth = _;
    return chart;
  }

  // svg height
  chart.height = function(_) {
    if (arguments.length == 0) return svgHeight;
    svgHeight = _;
    return chart;
  }

  // svg border
  chart.border = function(_) {
    if (arguments.length == 0) return border;
    border = _;
    return chart;       
  }

  // chart title
  chart.title = function(_) {
    if (arguments.length == 0) return chartTitle;
    chartTitle = _;
    return chart;   
  }

  // x axis title
  chart.xTitle = function(_) {
    if (arguments.length == 0) return xTitle;
    xTitle = _;
    return chart;       
  }

  // y axis title
  chart.yTitle = function(_) {
    if (arguments.length == 0) return yTitle;
    yTitle = _;
    return chart;       
  }

  // yItems (can be dynamically added after chart construction)
  chart.yDomain = function(_) {
    if (arguments.length == 0) return yDomain;
    yDomain = _;
    if (svg) {
      // update the y ordinal scale
      maxY = d3.max(yDomain)
      y = d3.scale.linear().domain([maxY, minY]).range([0,height]);
      //y = d3.scale.ordinal().domain(yDomain).rangeRoundPoints([height, 0],1);
      // update the y axis
      yAxis.scale(y)(yAxisG);
      // update the y ordinal scale for the nav chart
    }
    return chart;       
  }

  // debug
  chart.debug = function(_) {
    if (arguments.length == 0) return debug;
    debug = _;
    return chart;       
  }  

  // halt
  chart.halt = function(_) {
    if (arguments.length == 0) return halted;
    halted = _;
    return chart;       
  }

  // version
  chart.version = version;
  
  return chart;

} // end realTimeChart function


// mean and deviation for generation of time intervals
var tX = 5; // time constant, multiple of one second
var meanMs = 1000 * tX, // milliseconds
    dev = 200 * tX; // std dev
//
//// define time scale
var timeScale = d3.scale.linear()
    .domain([300 * tX, 1700 * tX])
    .range([300 * tX, 1700 * tX])
    .clamp(true);


class RadarCharts {

    constructor() {
        // Create realtime charts
        this.chartvel = realTimeChartMulti()
            .title("Velocity")
            .yTitle("Range Gates")
            .xTitle("UTC Time")
            .border(true)
            .width(900)
            .height(350); 
         this.chartsnr = realTimeChartMulti()
            .title("Signal to Noise")
            .yTitle("Range Gates")
            .xTitle("UTC Time")
            .border(true)
            .width(900)
            .height(350); 
         this.chartspect = realTimeChartMulti()
            .title("Spectral Width")
            .yTitle("Range Gates")
            .xTitle("UTC Time")
            .border(true)
            .width(900)
            .height(350); 
         this.chartelev = realTimeChartMulti()
            .title("Elevation")
            .yTitle("Range Gates")
            .xTitle("UTC Time")
            .border(true)
            .width(900)
            .height(350); 
		//this.chartfreqnave = realTimeLineChart("Freq","nave")
		//	.title("Frequency and Nave")
		//	.yTitle("MHz")
		//	.xTitle("UTC Time")
		//	.border(true)
		//	.width(900)
		//	.height(350);
        
        var chartDiv = d3.select("#viewDiv").append("div")
            .attr("id","chartDiv")
            .call(this.chartvel);
 
        //var chartLineDiv = d3.select("#viewDiv").append("div")
        //    .attr("id","chartDiv")
        //    .call(this.chartfreqnave);
       
        this.chartsnr(chartDiv);
        this.chartspect(chartDiv);
        this.chartelev(chartDiv);
		//this.chartfreqnave(chartDiv);
    }

    setRadarChartsyDomain(radar) {
        // Set the charts y domain based on the radar passed in 
        // (selected in the gui front)
        this.chartvel.yDomain(d3.range(radars[radar]["maxRangeGates"]))
        this.chartsnr.yDomain(d3.range(radars[radar]["maxRangeGates"]))
        this.chartspect.yDomain(d3.range(radars[radar]["maxRangeGates"]))
        this.chartelev.yDomain(d3.range(radars[radar]["maxRangeGates"]))
    }
    

    // Push data to the charts
    pushData(data) {
        // encapsulating the processing of data to push to the chart
        function processData(data) {
            var now = new Date();
            var data_obj = {
                time: now,
                color: data[i],
                opacity: 1,
                category: i,
                type: "rect",
                size: 5,
            };
            return data_obj;
        }
       
        // only need to call one chart for the for loop
        // since all charts have the same yDomain length
        for (var i=1; i <= this.chartsnr.yDomain().length; i++) {
            if(data.velocity[i] == 'transparent'){
                continue;
            }
            // Push the processed data object to the given charts
            this.chartvel.datum(processData(data.velocity));
            this.chartsnr.datum(processData(data.power));
            this.chartspect.datum(processData(data.width));
            this.chartelev.datum(processData(data.elevation));
        }
    }

    pushInitialData(dataCollection) {
        function processData(time, data) {
            var dataTime = new Date();
            var UTChour = time.slice(0,2);
            var UTCminute = time.slice(3,5);
            var UTCseconds = time.slice(6,8);
            dataTime.setUTCHours(UTChour);
            dataTime.setUTCMinutes(UTCminute);
            dataTime.setUTCSeconds(UTCseconds);
            var data_obj = {
                time: dataTime,
                color: data[i],
                opacity: 1,
                category: i,
                type: "rect",
                size: 5,
            };
            return data_obj;
        }
        // only need to call one chart for the for loop
        // since all charts have the same yDomain length
        for(var j=0; j < dataCollection.length; j++) {
            for (var i=0; i < this.chartsnr.yDomain().length; i++) {
                if( dataCollection[j].velocity[i] == 'transparent') {
                    continue;
                }
                // Push the processed data object to the given charts
                this.chartvel.datum(processData(dataCollection[j].time, dataCollection[j].velocity));
                this.chartsnr.datum(processData(dataCollection[j].time, dataCollection[j].power));
                this.chartspect.datum(processData(dataCollection[j].time, dataCollection[j].width));
                this.chartelev.datum(processData(dataCollection[j].time, dataCollection[j].elevation));
            }
        }    
    }

	clearCharts() {
	    this.chartvel.clear();
        this.chartsnr.clear();
        this.chartspect.clear();
        this.chartelev.clear();
	
	}

}


/**
Creating new websocket connections to the server for the field of view data.
CSS color codes for range cells are grabbed from the server and then range
cells are updated
*/

class RadarConnection { 
   constructor() {
       this.dataCollection = new Map();
       this.currentRadar = "saskatoon";
       this.currentBeam = 1;
       this.socket = new WebSocket(radars[this.currentRadar]["address"],['binary', 'base64']);
       this.charts = new RadarCharts();
       this.initializeDataCollection(radars[this.currentRadar]["maxBeams"]);
       this.socket.onmessage = this.getRadarData.bind(this);
   }
   
    initializeDataCollection(maxBeams) {
        for (var i=0; i < maxBeams; i++) {
            this.dataCollection.set(i,[]);
        }
    }

    // Setters Radar and beam selection: invoke by onchange with selection of 
    // a radar/beam in the realtime-chart html 
    setRadar(radar) {
        // Set the new Radar and beam
        // uncomment line below if we want to use the actual maxgate ranges in
        // the charts
        // this.charts.setRardarChatsyDomain(radar);
        this.currentRadar = radar;
        this.currentBeam = 1;
        this.controlProgram = '';
        this.frequency = 0;
        // Clear any data from the old radar selection
        this.dataCollection.clear();
        this.initializeDataCollection(radars[this.currentRadar]["maxBeams"]);
        this.charts.clearCharts(); //TODO: need to rethink how to apply 1 function to multiple charts        
        
        //reset sockets and switch to the new radar
        this.socket.close()
        this.socket = new WebSocket(radars[this.currentRadar]["address"],['binary', 'base64']);
        this.socket.onmessage = this.getRadarData.bind(this);
    }

    setBeam(beam) {
        this.currentBeam = beam;
        this.charts.clearCharts();
        this.charts.pushInitialData(this.dataCollection.get(parseInt(beam)));
        
    }

    // retrieves data from socket to store in the data collection map and 
    // push it to the chart
    getRadarData(evt) {
        // read in the socket message 
        var reader = new FileReader();
        // parse on loading the file 
        reader.onload = () => {
            // convert json string to an object 
            var received_data = reader.result;
            var radar_data = JSON.parse(received_data);
            // store data in the data collection map
            // this allows for storage on all beams 
            // so if we switch beams we can load the same amount of data
            // and not start from the begining again... semi persistant 
            // data storage. 
            // TODO: This idea could be expanded to opening sockets 
            // on all radars and doing the same thing... something to consider 
            var radar_beam = radar_data.beam;
            this.controlProgram = radar_data.cp;
            this.frequency = radar_data.freq;
            //console.log(radar_data);
            document.getElementById("radar-frequency").innerHTML = this.frequency;
            document.getElementById("radar-control-program").innerHTML = this.controlProgram; 
            this.dataCollection.get(radar_data.beam).push(radar_data);
            if (radar_beam == this.currentBeam) {
                this.charts.pushData(radar_data);
        
            }
        }
        reader.readAsText(evt.data)
    }

    trimDataCollection() {
        for (var i=0; i  < radars[this.currentRadar]["maxBeams"]; i++)
        {
            this.dataCollection.get(this.currentBeam).filter( function(data) {
                var now = new Date();
                var dataTime = new Date();
                var UTChour = time.slice(0,2);
                var UTCminute = time.slice(3,5);
                var UTCseconds = time.slice(6,8);
                dataTime.setUTCHours(UTChour);
                dataTime.setUTCMinutes(UTCminute);
                dataTime.setUTCSeconds(UTCseconds);
                var diff = Math.abs(now.getTime() - dataTime.getTime())/3600000;
                return diff < 3;
            });
        }
    
    }

}


var radarConnection = new RadarConnection();

function PopulateRadarSelection() {
    var radarList = document.getElementById("radar-list");
    for (var radar in radars) {
        var radar_name = new Option(radars[radar]["name"],radar);
        radarList.options.add(radar_name); 
    }
    var radarList = document.getElementById("radar-list");
    var selectedRadar = radarList.options[radarList.selectedIndex].value; 
	var beamList = document.getElementById("beam-list");
	// populate beam list with the correct number of maxBeams 
	for (var i=0; i < radars[selectedRadar]["maxBeams"]; i++) {
		var beam_num = new Option(i,i);
        beamList.options.add(beam_num); 
	}
}

function RadarChange() {
    var radarList = document.getElementById("radar-list");
    var selectedRadar = radarList.options[radarList.selectedIndex].value; 
	var beamList = document.getElementById("beam-list");
	//radarConnection.setBeam(1); // Default beam number
	radarConnection.setRadar(selectedRadar);
	// clear old beam list
	while (beamList.options.length) {
		beamList.remove(0);
	}
	// populate beam list with the correct number of maxBeams 
	for (var i=0; i < radars[selectedRadar]["maxBeams"]; i++) {
		var beam_num = new Option(i,i);
        beamList.options.add(beam_num); 
	}
	//BeamChange();

}

function BeamChange() {	
 	var beamList = document.getElementById("beam-list");
    var selectedBeam = beamList.options[beamList.selectedIndex].value; 
	radarConnection.setBeam(selectedBeam);
}

