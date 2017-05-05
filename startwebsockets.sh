#!/bin/bash
cd websockets/websockify
start_port=5000
web_address=128.233.224.38
for i in {0..11}
do
    echo "nohup ./websockify.py $((start_port + i)) $web_address:$((start_port + i)) >/dev/null &"
done
