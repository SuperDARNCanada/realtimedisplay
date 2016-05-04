#!/bin/bash
cd /home/superdarn/realtimedisplay/
python realtimedisplay.py tmain.usask.ca 1024 5000 &
python realtimedisplay.py rmain.usask.ca 1024 5001 &
python realtimedisplay.py bmain.usask.unbc.ca 1024 5002 &
python realtimedisplay.py cmain.usask.ca 1024 5003 &
python realtimedisplay.py imain.usask.ca 1024 5004 &
