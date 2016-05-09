# realtimedisplay
A full-stack web application to view radar data in realtime


##Details
This display was designed for the SuperDARN Canada website and associated radars, but other institutions can modify it for their sites as well. This is a full stack project with both a front end and backend component.

###Server
The server is responsible for acting as a proxy to the radars, so that clients don't have direct connections to the radars. This is partly to hide the ip addresses from the clients, and partly to offload the connection and reconnection logic, and value-to-color translation from the browser. The server maintains connections to the radars, and translates the dmap records into associated CSS color values for radar field of view range cells in the browser. It does this by mapping a gradient of colors to values in a range, and creating a JSON packet which it sends out to the clients. The server is written in Python and requires a copy of pydmap in the directory as well.The original backend to this application was written in C, but after finding many bugs, I wrote the server in Python after creating pydmap. This has led to a drastically more reliable backend. Increased error checking is done in the dmap routine which prevents crashes from corrupted socket data, which does happen.

Each instance of the server program controls a single radar so that if a crash happens, it doesnt affect the other radars. Each instance has two threads of controlling logic. One thread controls the connections to the radars, and another controls connections from web clients. 

The thread that controls connections to the radar is responsible for several things. It's quite likely to have disconnects due to bad internet connections so the thread continually will try connect back to the radar if a connection is dropped. I also found that systematic timeout errors can occur, so after several consecutive timeouts, this thread forces a reconnect that usually fixes the issues. It's also possible due to unstable connections to have missalligned bytes which cause the packet header to be shifted. This means that in this scenario, the server will never see a packet. This thread has a threshold counter for the number of missed headers it tries to obtain before forcing a reconnect. Once a sucessful packet is obtained, the values for velocity, spectral width, SNR, and elevation are converted to a CSS color value for each range. These values are then repacked into a JSON object and sent to any connected web clients.

The thread that controls connections to clients is much simpler. Its simply responsible for adding newly connected web clients to a list that the radar thread sends out on and to remove them from the list once they disconnect.

When decoding data sent from rtserver in ROS, the start of radar packets is given by the 4 byte header, [0x49,0x08,0x1e,0x00]. DMAP records are sents in chunks so this header indicates a new one is about to be sent. The next 4 bytes indicate the length of the dmap record. This allows us to read bytes from the socket until we have the full record. We parse the stream using the python DMAP tool. If any errors are encountered, we scrap this record and move to the next one. If it is successful we attempt to build a JSON packet for the web server. It is possible that even if the DMAP record is correctly parsed, the DMAP fields could still be corrupted if they were the right length. We again try, but discard on failures. Once a packet is successfully converted, it is sent to all web clients who are connected.

I've tried to safely handle has many errors as possible, but should an unknown exception trigger and kill a thread, the main thread acts as a watchdog to restart any dead threads.

###Client

The real time display client heavily uses the framework [D3.js](https://d3js.org/) to display data, so understanding how that framework works is critical. I mainly use the map display capabilities of D3.js to build an interactive globe that shows the radar fields of view. 

The first thing required is a set of polygons representing geographic structures in order for D3.js to be able to provide a map. To build a map projection, D3.js requires polygons in a format known as [GeoJSON](http://geojson.org/) or [TopoJSON](https://github.com/mbostock/topojson) formats. GeoJSON is simply a format which builds a collection of polygons made up of vertices of geographic coordinates. TopoJSON is just an extension that simplifies the data and also builds a mesh of the borders between polygons.

I was able to find a GeoJSON world map and I had to manually convert the radar field of view coordinate polygons into GeoJSON representation. I then converted all of these structures to TopoJSON which gave me the countries and their borders
as well as the field of view and its outline. I supply the -s argument to the TopoJSON conversion to simplify the polygons as much as possible for performance.

I then used D3.js to create an orthographic map projection of my TopoJSON polygon data for the world map and radar field of view. D3.js then creates a scalar vector graphic that can be added to the webpage. I added aditional javascript logic that 
would interactively show or remove the different radar fields of view, depending on what the user wants to see. Logic was added to be able redraw the graphic from different angles which allows a user to rotate the map around. Likewise, similar 
logic was added to be able to scale the graphic allowing for a zoom feature.

With the map created, the client then makes socket connections back to the web server for range cell data. The client grabs JSON objects filled with CSS color values for all of the data types. When the client grabs new color data, it then colors in the corresponding range cells of each field of view that is displayed on the map. There is logic to allow the user to be able to switch what parameter they are viewing. If a parameter is switched, all range cells are cleared and they begin to fill with the colors corresponding to the new parameter.

###Extending the realtime display

Extending the realtime display is very possible. It would require some work, but to add a new radar is a matter of adding new connections to the web server, converting its field of view coordinates into TopoJSON objects using the procedure
outlined above, and then updating the client to create a new socket connection and display the new radar.


###Improving the realtime display

The rendering of the globe on zoom or rotate requires quite a bit of performance.The more radars displayed, the more choppy the zoom or rotation. D3.js is quitegood at working on sets of data or objects at once, so I think one area of 
improvement would be to better class together radar field of view polygons so that it can optimize the redraw and coloring better.

Instead of having D3.js create a projection for a set of data, projection information can be added directly to the TopoJSON polygons during conversion. This may add a performance benefit if a new projection is created before a redraw
of the graphic. It might introduce issues with rotation though if rotation is done using a projection object.

The app needs better optimization for browser compatibility. Elements on the page should scale better given different window sizes to account for different screens and devices. The app also needs support for mobile to account for screen rotation and touch displays.
