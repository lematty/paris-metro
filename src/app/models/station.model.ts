import { Feature, Point } from 'geojson';

export interface Station extends Feature {
  geometry: Point;
  properties: {
    line: string;
    station: string;
  };
}
