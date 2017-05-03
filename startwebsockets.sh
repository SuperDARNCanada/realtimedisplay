#!/bin/bash
cd websockets/websockify
nohup ./websockify.py 5100 128.233.224.38:5000 >/dev/null &
nohup ./websockify.py 5101 128.233.224.38:5001 >/dev/null &
nohup ./websockify.py 5102 128.233.224.38:5002 >/dev/null &
nohup ./websockify.py 5103 128.233.224.38:5003 >/dev/null &
nohup ./websockify.py 5104 128.233.224.38:5004 >/dev/null &
nohup ./websockify.py 5105 128.233.224.38:5005 >/dev/null &
nohup ./websockify.py 5106 128.233.224.38:5006 >/dev/null &
nohup ./websockify.py 5107 128.233.224.38:5007 >/dev/null &
