import { FeatureCollection } from './feature-collection';

export interface IMapboxSource {
  type: 'geojson';
  data: FeatureCollection;
}
