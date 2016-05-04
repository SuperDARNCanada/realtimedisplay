import geojson
import os

sask_polys = []
cs = []
def transform(tup):
	if tup[0] > 180:
		return (tup[0]-360,tup[1])
	else:
		return tup

with open("gate_coords_66.txt") as coords:
	flag = 0
	for line in coords:
		sask_coords = []
		if flag == 0:
			flag = 1
			continue

		words = line.split()
		# print(line)
		for x in range(8,12):
			# print(words[x-6],words[x])
			sask_coords.append((float(words[x]),float(words[x-4])))
			cs.append((words[x-4], words[x]))
		sask_coords.append((float(words[8]),float(words[4])))

		sask_coords = [transform(x) for x in sask_coords]

		sask_polys.append(geojson.Feature(geometry=geojson.Polygon([sask_coords]),id=str(words[0].zfill(2))+str(words[1].zfill(2))))
		
featureCollection = geojson.FeatureCollection(sask_polys)
validation = geojson.is_valid(featureCollection)

with open("coords.txt",'w') as outfile:
	for c in cs:
		outfile.write(c[1]+ ',' + c[0]+"\n")

with open("cly_geojsondata.json",'w') as outfile:
	geojson.dump(featureCollection,outfile)