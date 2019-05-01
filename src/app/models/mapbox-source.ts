import { GeoJson } from './geojson';

export interface IMapboxSource {
  type: 'geojson';
  data: GeoJson;
}
