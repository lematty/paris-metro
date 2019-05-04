const fs = require('fs');
import { FeatureCollection, Feature, Point } from 'geojson';
import { Station } from 'src/app/shared/station.model';

enum Output {
  METRO_STATIONS = '../assets/geojson/metro/paris-metro-stations.geojson.json',
  METRO_LINES = '../assets/geojson/metro/paris-metro-lines.geojson.json',
  RER_STATIONS = '../assets/geojson/rer/paris-rer-stations.geojson.json',
  RER_LINES = '../assets/geojson/rer/paris-rer-lines.geojson.json',
}
const SOURCE_FILE: FeatureCollection = require('../assets/geojson/rer-metro-tram.geojson.json');
const OUTPUT_FILE = Output[process.argv[2]];
console.log(process.argv[2]);
console.log(OUTPUT_FILE);

function searchForTransportType(type: string): FeatureCollection {
  const stations = SOURCE_FILE.features.filter((feature: Feature) => {
    if (feature.properties.reseau === type) {
      return feature;
    }
  });
  return {
    type: 'FeatureCollection',
    features: stations,
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

function titleCaseName(name: string): string {
  console.log(name);
  const lowercase = name.toLowerCase();
  const splitWords = lowercase.split(' '); // Adapt for names with dash
  const capitalize = splitWords.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1));
  console.log(capitalize.join(' '));
  return capitalize.join(' ');
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
  const data = searchForTransportType('RER');
  const newGeoJson = formatStations(data);
  createOrRewriteFile(newGeoJson);
}

// main();
