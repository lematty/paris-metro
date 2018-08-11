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

  constructor(coordinates, type, public properties?) {
    this.geometry = {
      type: type,
      coordinates: coordinates
    };
  }
}

export class FeatureCollection {
  type: 'FeatureCollection';
  constructor(public features: Array<GeoJson>) {}
}
