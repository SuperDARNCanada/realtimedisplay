#!/bin/bash
cd /home/superdarn/realtimedisplay/

declare -A radars
declare -A radar
radar_codes=()

radar_name="sas"
radar_codes+=($radar_name)
radar[addr]=tmain.usask.ca
radar[in_port]=1024
radar[out_port]=5000
for key in "${!radar[@]}"; do
  radars[$radar_name,$key]=${radar[$key]}
done

radar_name="rkn"
radar_codes+=($radar_name)
radar[addr]=rmain.usask.ca
radar[in_port]=1024
radar[out_port]=5001
for key in "${!radar[@]}"; do
  radars[$radar_name,$key]=${radar[$key]}
done

radar_name=pgr
radar_codes+=($radar_name)
radar[addr]=localhost
radar[in_port]=33643
radar[out_port]=5002
for key in "${!radar[@]}"; do
  radars[$radar_name,$key]=${radar[$key]}
done

radar_name=cly
radar_codes+=($radar_name)
radar[addr]=cmain.usask.ca
radar[in_port]=1024
radar[out_port]=5003
for key in "${!radar[@]}"; do
  radars[$radar_name,$key]=${radar[$key]}
done

radar_name=inv
radar_codes+=($radar_name)
radar[addr]=imain.usask.ca
radar[in_port]=1024
radar[out_port]=5004
for key in "${!radar[@]}"; do
  radars[$radar_name,$key]=${radar[$key]}
done

radar_name=bks
radar_codes+=($radar_name)
radar[addr]=sd-software.ece.vt.edu
radar[in_port]=1045
radar[out_port]=5005
for key in "${!radar[@]}"; do
  radars[$radar_name,$key]=${radar[$key]}
done

radar_name=fhe
radar_codes+=($radar_name)
radar[addr]=sd-software.ece.vt.edu
radar[in_port]=1050
radar[out_port]=5006
for key in "${!radar[@]}"; do
  radars[$radar_name,$key]=${radar[$key]}
done

radar_name=fhw
radar_codes+=($radar_name)
radar[addr]=sd-software.ece.vt.edu
radar[in_port]=1051
radar[out_port]=5007
for key in "${!radar[@]}"; do
  radars[$radar_name,$key]=${radar[$key]}
done

radar_name=kap
radar_codes+=($radar_name)
radar[addr]=sd-software.ece.vt.edu
radar[in_port]=1048
radar[out_port]=5008
for key in "${!radar[@]}"; do
  radars[$radar_name,$key]=${radar[$key]}
done

radar_name=gbr
radar_codes+=($radar_name)
radar[addr]=sd-software.ece.vt.edu
radar[in_port]=1049
radar[out_port]=5009
for key in "${!radar[@]}"; do
  radars[$radar_name,$key]=${radar[$key]}
done

for i in "${radar_codes[@]}"
do
    nohup python realtimedisplay.py ${radars[$i,addr]} ${radars[$i,in_port]} ${radars[$i,out_port]} >/dev/null &
done

