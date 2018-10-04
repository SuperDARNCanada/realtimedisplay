#!/bin/bash
cd websockets/websockify
start_port=5000
web_address=chapman.usask.ca
for i in {0..15}
do
    nohup ./websockify.py $((start_port + 100 + i)) $web_address:$((start_port + i)) >/dev/null &
done
