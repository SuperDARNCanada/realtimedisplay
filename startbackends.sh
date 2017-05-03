#!/bin/bash
cd /home/superdarn/realtimedisplay/
nohup python realtimedisplay.py tmain.usask.ca 1024 5000 >/dev/null &
nohup python realtimedisplay.py rmain.usask.ca 1024 5001 >/dev/null &
nohup python realtimedisplay.py localhost 33643 5002 >/dev/null &
nohup python realtimedisplay.py cmain.usask.ca 1024 5003 >/dev/null &
nohup python realtimedisplay.py imain.usask.ca 1024 5004 >/dev/null &
nohup python realtimedisplay.py sd-software.ece.vt.edu 1045 5005 >/dev/null &
nohup python realtimedisplay.py sd-software.ece.vt.edu 1050 5006 >/dev/null &
nohup python realtimedisplay.py sd-software.ece.vt.edu 1051 5007 >/dev/null &
