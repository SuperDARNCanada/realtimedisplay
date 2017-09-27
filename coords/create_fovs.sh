#!/bin/bash

radars=( bks cve cvw cly fhe fhw gbr inv kap pgr rkn sas )

bks_beams=24
bks_gates=110

cve_beams=24
cve_gates=75

cvw_beams=24
cvw_gates=75

cly_beams=16
cly_gates=100

fhe_beams=22
fhe_gates=110

fhw_beams=22
fhw_gates=110

gbr_beams=16
gbr_gates=100

inv_beams=16
inv_gates=100

kap_beams=16
kap_gates=100

pgr_beams=16
pgr_gates=75

rkn_beams=16
rkn_gates=100

sas_beams=16
sas_gates=75

for rad in "${radars[@]}"
do
	python create_geojson_fov.py ${rad} $(eval "echo \$${rad}_beams") $(eval "echo \$${rad}_gates")
done

for rad in "${radars[@]}"
do
	topojson -s -o ${rad}topojson15km.json -- topojson=${rad}geojson_15km.json 
	topojson -s -o ${rad}topojson45km.json -- topojson=${rad}geojson_45km.json 
done