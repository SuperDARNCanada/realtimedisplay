import geojson
import os
from davitpy import pydarn
from datetime import datetime
import sys

def main():
	radar = sys.argv[1]
	nbeams = int(sys.argv[2])
	ngates = int(sys.argv[3])

	date = datetime.now() 

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
			coords.append((myFov.lonFull[beam+1,gate+1],myFov.latFull[beam+1,gate+1]))
			coords.append((myFov.lonFull[beam,gate+1],myFov.latFull[beam,gate+1]))
			coords.append((myFov.lonFull[beam,gate],myFov.latFull[beam,gate]))

			polys.append(geojson.Feature(geometry=geojson.Polygon([coords]),id=str(beam).zfill(2)+str(gate).zfill(2)))
		
	featureCollection = geojson.FeatureCollection(polys)
	validation = geojson.is_valid(featureCollection)

	filename = sys.argv[4]
	with open(filename,'w') as outfile:
		geojson.dump(featureCollection,outfile)

if __name__ == "__main__":
	main()
