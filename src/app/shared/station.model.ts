import { Feature, Point, LineString, MultiLineString } from 'geojson';

export interface Station extends Feature {
  geometry: Point;
  properties: {
    line: string;
    station: string;
  };
}

export interface Line extends Feature {
  geometry: LineString | MultiLineString;
  properties: {
    line: string;
    color: string;
  };
}
