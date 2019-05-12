import { FeatureCollection, Feature, Point, LineString, MultiLineString } from 'geojson';
import { Station, Line } from 'src/app/models';


const fs = require('fs');
const colors = require('../assets/colors/color-palette.json');

enum SearchName {
  metro = 'Metro',
  rer = 'RER',
  tram = 'Tramway',
  bus = 'Bus',
  noctilien = 'Noctilien',
}

const NETWORK_NAME = process.argv[2];
const NETWORK_TYPE = process.argv[3];
const LINES_SOURCE: FeatureCollection = require('../assets/geojson/rer-metro-tram.geojson.json');
const STATIONS_SOURCE: FeatureCollection = require('../assets/geojson/stations.geojson.json');
const OUTPUT_FILE = `src/assets/geojson/${NETWORK_NAME}/paris-${NETWORK_NAME}-${NETWORK_TYPE}.geojson.json`;
const isStations = NETWORK_TYPE === 'stations';
const SOURCE_FILE = isStations ? STATIONS_SOURCE : LINES_SOURCE;


function searchForTransportType(network: string): FeatureCollection {
  const filtered = SOURCE_FILE.features.filter((feature: Feature) => {
    if (feature.properties.mode === network) {
      return feature;
    }
  });
  return {
    type: 'FeatureCollection',
    features: filtered,
  };
}

function formatStations(geojson: FeatureCollection): FeatureCollection {
  const formattedFeatureCollection: FeatureCollection = {
    type: 'FeatureCollection',
    features: geojson.features.map((feature: Feature) => {
      const formatFeature: Station = {
        type: feature.type,
        geometry: feature.geometry as Point,
        properties: {
          line: feature.properties.res_com,
          station: feature.properties.nomlong,
        }
      };
      return formatFeature;
    })
  };
  return formattedFeatureCollection;
}

function formatLines(geojson: FeatureCollection): FeatureCollection {
  const formattedFeatureCollection: FeatureCollection = {
    type: 'FeatureCollection',
    features: geojson.features.map((feature: Feature) => {
      const lineName = feature.properties.res_com;
      const colorSearch = colors[NETWORK_NAME].find(line => line.name === lineName);
      const formatFeature: Line = {
        type: feature.type,
        geometry: feature.geometry as LineString | MultiLineString,
        properties: {
          line: lineName,
          color: !colorSearch ? '#FFFFFF' : colorSearch.color,
        }
      };
      return formatFeature;
    })
  };
  return formattedFeatureCollection;
}

function createOrRewriteFile(data: FeatureCollection) {
  console.log(OUTPUT_FILE);
  fs.writeFile(OUTPUT_FILE, JSON.stringify(data), err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('File has been created successfully');
  });
}

function main() {
  const data = searchForTransportType(SearchName[NETWORK_NAME]);
  const newGeoJson = isStations ? formatStations(data) : formatLines(data);
  createOrRewriteFile(newGeoJson);
}

main();
