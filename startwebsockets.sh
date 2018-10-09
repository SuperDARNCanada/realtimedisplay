#!/bin/bash
cd websockets/websockify
start_port=5000
web_address=chapman.usask.ca
for i in {0..15}
do
    nohup ./websockify.py -v --cert=/etc/certbot/live/chapman.usask.ca/fullchain.pem --key=/etc/certbot/live/chapman.usask.ca/privkey.pem $((start_port + 100 + i)) $web_address:$((start_port + i)) >>/dev/null &

done
