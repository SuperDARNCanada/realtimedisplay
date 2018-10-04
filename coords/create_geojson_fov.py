import geojson
import os
from davitpy import pydarn
from datetime import datetime
import sys

def make_geojson(nbeams,ngates,myFov):
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
#	validation = geojson.is_valid(featureCollection)

	return featureCollection

def main():
	radar = sys.argv[1]
	nbeams = int(sys.argv[2])
	ngates = int(sys.argv[3])

	date = datetime.now()

	radId = pydarn.radar.network().getRadarByCode(radar).id
	site = pydarn.radar.site(radId=radId, dt=date)

	myFov_15km = pydarn.radar.radFov.fov(site=site, rsep=15, ngates=ngates, nbeams=nbeams, coords = 'geo', date_time=date)
	myFov_45km = pydarn.radar.radFov.fov(site=site, rsep=45, ngates=ngates, nbeams=nbeams, coords = 'geo', date_time=date)

	geo_15km = make_geojson(nbeams,ngates,myFov_15km)
	geo_45km = make_geojson(nbeams,ngates,myFov_45km)

	filename_1 = radar + "geojson_15km.json"
	filename_2 = radar + "geojson_45km.json"

	with open(filename_1,'w') as outfile:
		geojson.dump(geo_15km,outfile)

	with open(filename_2,'w') as outfile:
		geojson.dump(geo_45km,outfile)

if __name__ == "__main__":
	main()
