import { FeatureCollection, Feature, Point, LineString, MultiLineString } from 'geojson';
import { Station, Line, SearchName, Color, LineSource, StationSource, LineNameSearch } from './../app/models';
import colors from '../assets/colors/color-palette.json';
import fs from 'fs';


const NETWORK_NAME = process.argv[2];
const NETWORK_TYPE = process.argv[3];

const isStations = NETWORK_TYPE === 'stations';
const LINES_SOURCE: FeatureCollection = require(LineSource[NETWORK_NAME]);
const STATIONS_SOURCE: FeatureCollection = require(StationSource[NETWORK_NAME]);
const SOURCE_FILE = isStations ? STATIONS_SOURCE : LINES_SOURCE;
const OUTPUT_FILE = `src/assets/geojson/${NETWORK_NAME}/paris-${NETWORK_NAME}-${NETWORK_TYPE}.geojson.json`;


function searchForTransportType(network: string): FeatureCollection {
  const filtered = SOURCE_FILE.features.filter((feature: Feature) => {
    if (feature.properties.mode === network || feature.properties.operated_by_name === network || NETWORK_NAME === 'bus') {
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
      const lineName =  feature.properties[LineNameSearch[NETWORK_NAME]];
      const searchName = (NETWORK_NAME === 'noctilien') ? 'ALL' : lineName;
      const color = colors[NETWORK_NAME].find((line: Color) => line.name === searchName);
      const formatFeature: Line = {
        type: feature.type,
        geometry: feature.geometry as LineString | MultiLineString,
        properties: {
          line: lineName,
          color: !color ? '#FFFFFF' : color.color,
        }
      };
      return formatFeature;
    })
  };
  return formattedFeatureCollection;
}

function createOrRewriteFile(data: FeatureCollection) {
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
