# realtimedisplay
A full-stack web application to view radar data in realtime


##Details
This display was designed for the SuperDARN Canada website and associated radars, but other institutions can modify it for their sites as well. This is a full stack project with both a front end and backend component.

###Server
The server is responsible for acting as a proxy to the radars, so that clients don't have direct connections to the radars. This is partly to hide the ip addresses from the clients, and partly to offload the connection and reconnection logic, and value-to-color translation from the browser. The server maintains connections to the radars, and translates the dmap records into associated CSS color values for radar field of view range cells in the browser. It does this by mapping a gradient of colors to values in a range, and creating a JSON packet which it sends out to the clients. The server is written in Python and requires a copy of pydmap in the directory as well.The original backend to this application was written in C, but after finding many bugs, I wrote the server in Python after creating pydmap. This has led to a drastically more reliable backend. Increased error checking is done in the dmap routine which prevents crashes from corrupted socket data, which does happen.

Each instance of the server program controls a single radar so that if a crash happens, it doesnt affect the other radars. Each instance has two threads of controlling logic. One thread controls the connections to the radars, and another controls connections from web clients. 

The thread that controls connections to the radar is responsible for several things. It's quite likely to have disconnects due to bad internet connections so the thread continually will try connect back to the radar if a connection is dropped. I also found that systematic timeout errors can occurs, so after several consecutive timeouts, this thread forces a reconnect that usually fixes the issues. It's also possible due to unstable connections to have missalligned bytes which cause the packet header to be shifted. This means that in this scenario, the server will never see a packet. This thread has a threshold counter for the number of missed headers it tries to obtain before forcing a reconnect. Once a sucessful packet is obtained, the values for velocity, spectral width, SNR, and elevation are converted to a CSS color value for each range. These values are then repacked into a JSON object and sent to any connected we clients.

The thread that controls connections to clients is much simpler. Its simply responsible for adding newly connected clients to a list that the radar thread sends out on and to remove them from the list once they disconnect.

, the start of radar packets is given by the 4 byte header, [0x49,0x08,0x1e,0x00], if acquiring realtime data using rtserver from ROS. The next 4 bytes indicate the length of the dmap record. We read bytes from the socket until we have the full record. We parse the stream using the new python dmap tool. If any errors are encountered, we scrap this record and move to the next one. If it is successful we attempt to build a json packet for the web server. It is possible that dmap fields could still corrupted if they were the right length so we again try, but discard on failures. Once a packet is successfully converted, it is sent to all web clients who are connected.

**to prevent systematic timeout errors, once a certain number of timeouts occur the connection is dropped and a new one is started. I found that problematic connections could timeout indefinitely for some reason without this check.

**It is possible for bad connections to have misalligned bytes so that a packet header is never properly read. I have a threshold counter which will reset the connection if a header is not read within a certain number of bytes. This threshold
is set quite high, so there needs to be big problems for this to trigger.

**I've tried to safely handle has many errors as possible, but should an unknown exception trigger and kill a thread, the main thread acts as a watchdog to restart any dead threads.
