import geojson
import os
from davitpy import pydarn
from datetime import datetime
import sys

def main():
	radar = sys.argv[1]
	nbeams = int(sys.argv[2])
	ngates = int(sys.argv[3])

	date = datetime.now() # or whatever time you want it for

	radId = pydarn.radar.network().getRadarByCode(radar).id
	site = pydarn.radar.site(radId=radId, dt=date)

	myFov = pydarn.radar.radFov.fov(site=site, rsep=45, ngates=ngates, nbeams=nbeams, coords = 'geo', date_time=date)


	polys = []
	cs = []

	for beam in range(nbeams):
		for gate in range(ngates):
			coords = []
	        #print beam, gate,myFov.latFull[beam,gate],myFov.latFull[beam+1,gate],myFov.latFull[beam,gate+1], myFov.latFull[beam+1,gate+1],myFov.lonFull[beam,gate],myFov.lonFull[beam+1,j],myFov.lonFull[i,j+1], myFov.lonFull[i+1,gate+1]
			coords.append((myFov.lonFull[beam,gate],myFov.latFull[beam,gate]))
			coords.append((myFov.lonFull[beam+1,gate],myFov.latFull[beam+1,gate]))
			coords.append((myFov.lonFull[beam,gate+1],myFov.latFull[beam,gate+1]))
			coords.append((myFov.lonFull[beam+1,gate+1],myFov.latFull[beam+1,gate+1]))
			coords.append((myFov.lonFull[beam,gate],myFov.latFull[beam,gate]))

			polys.append(geojson.Feature(geometry=geojson.Polygon(coords),id=str(beam).zfill(2)+str(gate).zfill(2)))
	# sask_polys = []
	# cs = []


	# def transform(tup):
	# 	if tup[0] > 180:
	# 		return (tup[0]-360,tup[1])
	# 	else:
	# 		return tup

	# with open("gate_coords_66.txt") as coords:
	# 	flag = 0
	# 	for line in coords:
	# 		sask_coords = []
	# 		if flag == 0:
	# 			flag = 1
	# 			continue

	# 		words = line.split()
	# 		# print(line)
	# 		for x in range(8,12):
	# 			# print(words[x-6],words[x])
	# 			sask_coords.append((float(words[x]),float(words[x-4])))
	# 			cs.append((words[x-4], words[x]))
	# 		sask_coords.append((float(words[8]),float(words[4])))

	# 		sask_coords = [transform(x) for x in sask_coords]

	# 		sask_polys.append(geojson.Feature(geometry=geojson.Polygon([sask_coords]),id=str(words[0].zfill(2))+str(words[1].zfill(2))))
			
	featureCollection = geojson.FeatureCollection(polys)
	validation = geojson.is_valid(featureCollection)

	# with open("coords.txt",'w') as outfile:
	# 	for c in cs:
	# 		outfile.write(c[1]+ ',' + c[0]+"\n")

	filename = sys.argv[4]
	with open(filename,'w') as outfile:
		geojson.dump(featureCollection,outfile)

if __name__ == "__main__":
	main()