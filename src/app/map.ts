import {Point} from '@agm/core/services/google-maps-types';

export interface IGeometry {
  type: string;
  coordinates: any[];
}

export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  properties?: any;
}

export class GeoJson implements IGeoJson {
  type: 'Feature';
  geometry: IGeometry;

  constructor(coordinates, public properties?) {
    this.geometry = {
      type: 'MultiLineString',
      coordinates: coordinates
    };
  }
}

export class FeatureCollection {
  type: FeatureCollection;
  constructor(public features: Array<GeoJson>) {}
}
