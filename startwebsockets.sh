#!/bin/bash
cd websockets/websockify
./websockify.py 5100 128.233.224.43:5000 &
./websockify.py 5101 128.233.224.43:5001 &
./websockify.py 5102 128.233.224.43:5002 &
./websockify.py 5103 128.233.224.43:5003 &
./websockify.py 5104 128.233.224.43:5004 &
./websockify.py 5105 128.233.224.43:5005 &
./websockify.py 5106 128.233.224.43:5006 &
./websockify.py 5107 128.233.224.43:5007 &
