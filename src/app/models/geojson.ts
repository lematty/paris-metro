export class GeoJson {
    type: 'FeatureCollection';
    constructor(public features: Feature[]) {}
}

export interface Feature {
    type: 'Feature';
    geometry: Geometry;
    properties?: any;
}

export interface Geometry {
    type: string;
    coordinates: number[];
}
