import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapboxFormat } from '../models/mapbox-format';
import { FeatureCollection } from 'geojson';

@Injectable({
  providedIn: 'root'
})
export class MetroService {

  private _metroLinesUrl = '../../assets/geojson/metro/paris-metro-lines.geojson';
  private _metroStopsUrl = '../../assets/geojson/metro/paris-metro-stops.geojson';
  private _rerLinesUrl = '../../assets/geojson/rer/paris-rer-lines.geojson.json';
  private _rerStopsUrl = '../../assets/geojson/rer/paris-rer-stations.geojson.json';

  constructor(private http: HttpClient) { }

  async getAllLineCoords(): Promise<MapboxFormat> {
    const lines = await this.http.get<FeatureCollection>(this._metroLinesUrl).toPromise();
    return { type: 'geojson', data: lines };
  }

  async getAllLineNames(network: string): Promise<string[]> {
    const url = network === 'metro' ? this._metroLinesUrl : this._rerLinesUrl;
    const lines = [];
    const data = await this.http.get<FeatureCollection>(url).toPromise();
    for (let i = 0; i < data['features'].length; i++) {
      lines.push(data['features'][i]['properties']['name']);
    }
    return lines;
  }

  async getOneLine(lineNumber): Promise<MapboxFormat> {
    const line: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    };
    const lines = await this.http.get<FeatureCollection>(this._metroLinesUrl).toPromise();
    for (let i = 0; i < lines['features'].length; i++) {
      if (lines['features'][i]['properties']['name'] === lineNumber) {
        line['features'].push(lines['features'][i]);
        break;
      }
    }
    return { type: 'geojson', data: line };
  }

  async getAllStationCoords(network: string): Promise<MapboxFormat> {
    const url = network === 'metro' ? this._metroStopsUrl : this._rerStopsUrl;
    const stations = await this.http.get<FeatureCollection>(url).toPromise();
    return { type: 'geojson', data: stations };
  }

  async getStationsByLine(line): Promise<MapboxFormat> {
    const stationsOnLine: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    };
    const allStations = await this.http.get<FeatureCollection>(this._metroStopsUrl).toPromise();
    for (let i = 0; i < allStations['features'].length; i++) {
      if (allStations['features'][i]['properties']['line'] === line) {
        stationsOnLine['features'].push(allStations['features'][i]);
      }
    }
    return { type: 'geojson', data: stationsOnLine };
  }
}
