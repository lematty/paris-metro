import { FeatureCollection } from 'geojson';

export interface MapboxFormat {
  type: 'geojson';
  data: FeatureCollection;
}
