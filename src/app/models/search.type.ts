export type SearchType = 'lines' | 'stations';

export enum SearchName {
    metro = 'Metro',
    rer = 'RER',
    tram = 'Tramway',
    bus = 'Bus',
    noctilien = 'Noctilien',
}

export enum LineSource {
  metro = '../assets/geojson/source/lines.geojson.json',
  rer = '../assets/geojson/source/lines.geojson.json',
  tram = '../assets/geojson/source/lines.geojson.json',
  bus = '../assets/geojson/source/bus-lines.geojson.json',
  noctilien = '../assets/geojson/source/noctilien-lines.geojson.json',
}

export enum StationSource {
  metro = '../assets/geojson/source/stations.geojson.json',
  rer = '../assets/geojson/source/stations.geojson.json',
  tram = '../assets/geojson/source/stations.geojson.json',
  bus = '../assets/geojson/source/stations.geojson.json',
  noctilien = '../assets/geojson/source/stations.geojson.json',
}

export enum LineNameSearch {
  metro = 'res_com',
  rer = 'res_com',
  tram = 'res_com',
  bus = 'id',
  noctilien = 'name',
}
