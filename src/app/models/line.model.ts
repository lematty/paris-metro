import { Feature, LineString, MultiLineString } from 'geojson';

export interface Line extends Feature {
    geometry: LineString | MultiLineString;
    properties: {
      line: string;
      color: string;
    };
  }
