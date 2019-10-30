'''Copyright (c) 2019 SuperDARN Canada

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'''

import socket
import select
import errno
import struct
import sys
import threading
import time
import datetime
import json
import colorgrads as cg
import zmq
import zlib

web_clients = []
timeout_counter = 0
noheader_counter = 0

def convert_power_to_css(pwr):
    pwr_css_values = cg.PWR_GRAD_VALUES

    if pwr < 0.0:
        return pwr_css_values[cg.PWR_GRAD_STEPS -1]
    elif pwr > (cg.PWR_GRAD_STEPS - 1.0):
        return pwr_css_values[0]
    else:
        return pwr_css_values[cg.PWR_GRAD_STEPS - 1 - int(round(pwr))]

def convert_width_to_css(width):
    width_css_values = cg.WIDTH_GRAD_VALUES

    if width < 0.0:
        return width_css_values[cg.WIDTH_GRAD_STEPS -1]
    elif width > (cg.WIDTH_GRAD_STEPS - 1.0):
        return width_css_values[0]
    else:
        return width_css_values[cg.WIDTH_GRAD_STEPS - 1 - int(round(width))]

def convert_velocity_to_css(vel,gflg):
    vel_css_values = cg.VEL_GRAD_VALUES

    if gflg == 1:
        return cg.GROUND_SCATTER
    elif vel < -(cg.VEL_GRAD_STEPS-1)/2.0:
        return vel_css_values[cg.VEL_GRAD_STEPS -1]
    elif vel > (cg.VEL_GRAD_STEPS-1)/2.0:
        return vel_css_values[0]
    else:
        return vel_css_values[cg.VEL_GRAD_STEPS - 1 - int(int(round(vel)) + (cg.VEL_GRAD_STEPS-1)/2)]

def convert_elevation_to_css(elev):
    elev_css_values = cg.ELEV_GRAD_VALUES

    if elev < 0.0:
        return elev_css_values[cg.ELEV_GRAD_STEPS -1]
    elif elev > (cg.ELEV_GRAD_STEPS - 1.0):
        return elev_css_values[0]
    else:
        return elev_css_values[cg.ELEV_GRAD_STEPS - 1 - int(round(elev))]

def convert_cp_to_text(cp):
    return{
        -26401: "stereoscan",
        -26009: "stereoscan",
        -26008: "stereoscan",
        -26007: "stereoscan",
        -26006: "stereoscan",
        -26005: "stereoscan",
        -26004: "stereoscan",
        -26002: "stereoscan",
        -6401: "stereoscan",
        152: "stereoscan",
        153: "stereoscan",
        157: "normalsound",
        3200: "risrscan",
        3250: "twotsg",
        3251: "twotsg",
        3252: "twotsg",
        3253: "twotsg",
        3333: "ddstest",
        3370: "epopsound",
        3375: "longsound",
        3380: "politescan",
        3400: "fivepulse",
        3450: "heatsound",
        3500: "twofsound",
        3501: "twofsound",
        3504: "twofsound",
        3505: "twofsound",
        3520: "uafsound",
        3521: "uafsound",
        3550: "twofonebm",
        3600: "tauscan_can",
        3601: "tauscan_can",
        8510: "ltuseqscan",
        8511: "ltuseqscan",
        9211: "pcpscan",
        150:    "normalscan",
        151:    "normalscan",
        155:    "normalsound",
        3300:   "themisscan",
        200:    "rbspscan",
        3502:   "twofsound",
        3503:   "twofsound",
        -3502:  "twofsound",
        -3503:  "twofsound",
        3350:   "ulfscan",
        -3350:  "ulfscan",
        }.get(cp,"unknown")




def create_json_packet(dmap_dict):
    try:
        pwr_css = ["transparent"] * dmap_dict['nrang']
        elev_css = ["transparent"] * dmap_dict['nrang']
        vel_css = ["transparent"] * dmap_dict['nrang']
        width_css = ["transparent"] * dmap_dict['nrang']

        slist = dmap_dict['slist']

        pwrs = dmap_dict['p_l']
        for pwr,s in zip(pwrs,slist):
            pwr_css[s] = convert_power_to_css(pwr)

        if 'elv' in dmap_dict:
            elevs = dmap_dict['elv']
            for elev,s in zip(elevs,slist):
                elev_css[s] = convert_elevation_to_css(elev)

        vels = dmap_dict['v']
        gsct = dmap_dict['gflg']
        for vel,s,g in zip(vels,slist,gsct):
            vel_css[s] = convert_velocity_to_css(vel,g)

        widths = dmap_dict['w_l']
        for width,s in zip(widths,slist):
            width_css[s] = convert_width_to_css(width)

        json_dict = {}

        hr,mt,sc = dmap_dict['time.hr'],dmap_dict['time.mt'],dmap_dict['time.sc']
        json_dict['time'] = "{0}:{1:02d}:{2:02d}".format(hr,mt,sc)
        json_dict['noise'] = int(dmap_dict['noise.search'])
        json_dict['rsep'] = dmap_dict['rsep']
        json_dict['frang'] = dmap_dict['frang']
        json_dict['nave'] = dmap_dict['nave']
        json_dict['nrang'] = dmap_dict['nrang']
        json_dict['stid'] = dmap_dict['stid']
        json_dict['beam'] = dmap_dict['bmnum']
        cp = dmap_dict['cp']
        json_dict['cp'] = "{0}({1})".format(convert_cp_to_text(cp),cp)
        json_dict['freq'] = dmap_dict['tfreq']
        json_dict['power'] = pwr_css
        json_dict['width'] = width_css
        json_dict['velocity'] = vel_css
        json_dict['elevation'] = elev_css

    except KeyError as k:
        print("CREATE_JSON_PACKET: Dmap packet has corrupted fields",k)
        return -1


    return json.dumps(json_dict)


    #print(slist,gsct,vel_css)


def client_connections(host_port):
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_info = ('',host_port)
    server_socket.bind(server_info)
    server_socket.listen(5)
    input_sockets = [server_socket]
    while True:
        print("in client connections")
        input_ready,output_ready,except_ready = select.select(input_sockets,[],[],60.0)

        for s in input_ready:
            if s is server_socket:
                client,address = server_socket.accept()
                input_sockets.append(client)
                web_clients.append(client)
            else:
                s.close()
                input_sockets.remove(s)
                web_clients.remove(s)


def radar_connection(radar_host,radar_port):
    context = zmq.Context.instance()
    sock = context.socket(zmq.SUB)
    sock.setsockopt_string(zmq.SUBSCRIBE,"")
    protocol = "tcp://{}:{}".format(radar_host, radar_port)
    sock.connect(protocol)
    while True:
        data = sock.recv()

        uncompress = zlib.decompress(data)
        deserialize = json.loads(uncompress)

        packet = create_json_packet(deserialize)
        if packet != -1:
            #print(packet)
            for wc in web_clients:
                wc.send(packet.encode('utf-8'))


if __name__ == '__main__':

    radar_host = sys.argv[1]
    radar_port = int(sys.argv[2])
    host_port = int(sys.argv[3])

    client_handler = threading.Thread(target=client_connections,args=(host_port,))
    client_handler.daemon = True
    radar_handler = threading.Thread(target=radar_connection,args=(radar_host,radar_port))
    radar_handler.daemon = True

    client_handler.start()
    radar_handler.start()

    while True:
        if not client_handler.is_alive():
            print("Client handler died")
            client_handler = threading.Thread(target=client_connections,args=(host_port,))
            client_handler.daemon = True
            client_handler.start()

        if not radar_handler.is_alive():
            print("Radar handler died")
            radar_handler = threading.Thread(target=radar_connection,args=(radar_host,radar_port))
            radar_handler.daemon = True
            radar_handler.start()


        time.sleep(5)








