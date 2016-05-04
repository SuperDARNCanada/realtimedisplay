#!/bin/bash
cd websockets/websockify
./websockify.py 5005 128.233.224.43:5000 &
./websockify.py 5006 128.233.224.43:5001 &
./websockify.py 5007 128.233.224.43:5002 &
./websockify.py 5008 128.233.224.43:5003 &
./websockify.py 5009 128.233.224.43:5004 &

