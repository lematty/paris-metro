const fs = require('fs');
import { FeatureCollection, Feature, Point, LineString, MultiLineString } from 'geojson';
import { Station, Line } from 'src/app/shared/station.model';

const LINES_SOURCE: FeatureCollection = require('../assets/geojson/rer-metro-tram.geojson.json');
const STATIONS_SOURCE: FeatureCollection = require('../assets/geojson/stations.geojson.json');
const PARAMETERS = {
  metro: {
    name: 'Metro',
    stations: '../assets/geojson/metro/paris-metro-stations.geojson.json',
    lines: '../assets/geojson/metro/paris-metro-lines.geojson.json',
  },
  rer: {
    name: 'RER',
    stations: '../assets/geojson/rer/paris-rer-stations.geojson.json',
    lines: '../assets/geojson/rer/paris-rer-lines.geojson.json',
  },
  tram: {
    name: 'Tramway',
    stations: '../assets/geojson/tram/paris-tram-stations.geojson.json',
    lines: '../assets/geojson/tram/paris-tram-lines.geojson.json',
  }
};

const NETWORK_NAME = process.argv[2];
const NETWORK_TYPE = process.argv[3];
const OUTPUT_FILE = PARAMETERS[NETWORK_NAME][NETWORK_TYPE];
const SEARCH_PARAMETER = PARAMETERS[NETWORK_NAME].name;
const isStations = process.argv[3] === 'stations';
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
      const formatFeature: Line = {
        type: feature.type,
        geometry: feature.geometry as LineString | MultiLineString,
        properties: {
          line: feature.properties.res_com,
          color: !feature.properties.color ? '#FFFFFF' : feature.properties.color,
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
  const data = searchForTransportType(SEARCH_PARAMETER);
  const newGeoJson = isStations ? formatStations(data) : formatLines(data);
  console.log(newGeoJson.features[0]);
  // createOrRewriteFile(newGeoJson);
}

main();
