import { FeatureCollection, Feature } from 'geojson';
import fs from 'fs';


const NETWORK_NAME = process.argv[2];
const NETWORK_TYPE = process.argv[3];

const SOURCE_FILE: any[] = require('../assets/geojson/source/bus-lines-geojson2.json');
const OUTPUT_FILE = `src/assets/geojson/${NETWORK_NAME}/paris-${NETWORK_NAME}-${NETWORK_TYPE}.geojson.json`;
const colors = [];

function searchForTransportType(): FeatureCollection {
  // console.log(SOURCE_FILE);
  const format: Feature[] = SOURCE_FILE.map(line => {

    const alreadyAppears = colors.some(color => color.name === line.id);
    if (!alreadyAppears) {
      colors.push({ name: line.id, color: line.color_bg });
    }
    const feat: Feature = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: line.snap.map(coords => [coords.lng, coords.lat]),
      },
      properties: delete line.snap && { ...line },
    };

    return feat;
  });
  console.log(colors);
  return {
    type: 'FeatureCollection',
    features: format,
  };
}

function createOrRewriteFile(data: FeatureCollection) {
  // console.log(OUTPUT_FILE);
  fs.writeFile(OUTPUT_FILE, JSON.stringify(colors), err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('File has been created successfully');
  });
}





function main() {
    const data = searchForTransportType();
    createOrRewriteFile(data);
  }

  main();
