const fs = require('fs');
const originalGeoJson: FeatureCollection = require('../assets/geojson/stations.geojson.json');
import { FeatureCollection, Feature } from 'geojson';

function searchForTransportType(type: string): FeatureCollection {
  const stations = originalGeoJson.features.filter((feature: Feature) => {
    if (feature.properties.reseau === type) {
      return feature;
    }
  });
  return {
    type: 'FeatureCollection',
    features: stations,
  };
}

function formatGeoJson(geojson: FeatureCollection): FeatureCollection {
  const formattedFeatureCollection: FeatureCollection = {
    type: 'FeatureCollection',
    features: geojson.features.map((feature: Feature) => {
      const formatFeature: Feature = {
        type: feature.type,
        geometry: feature.geometry,
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
  fs.writeFile('../assets/geojson/paris-rer-stations.geojson.json', JSON.stringify(data), err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('File has been created successfully');
  });
}

function main() {
  const data = searchForTransportType('RER');
  const newGeoJson = formatGeoJson(data);
  createOrRewriteFile(newGeoJson);
}

main();
