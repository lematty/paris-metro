import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeatureCollection } from '../feature-collection';
import { IMapboxSource } from '../mapbox-source';

@Injectable({
  providedIn: 'root'
})
export class MetroService {

  private _metroLinesUrl = '../../assets/geojson/paris-metro-lines.geojson';
  private _metroStopsUrl = '../../assets/geojson/paris-metro-stops.geojson';

  constructor(private http: HttpClient) { }

  async getAllLineCoords(): Promise<IMapboxSource> {
    const lines = await this.http.get<FeatureCollection>(this._metroLinesUrl).toPromise();
    return { type: 'geojson', data: lines };
  }

  async getAllLineNames(): Promise<string[]> {
    const lines = [];
    const data = await this.http.get<FeatureCollection>(this._metroLinesUrl).toPromise();
    for (let i = 0; i < data['features'].length; i++) {
      lines.push(data['features'][i]['properties']['name']);
    }
    return lines;
  }

  async getOneLine(lineNumber): Promise<IMapboxSource> {
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

  async getAllStationCoords(): Promise<IMapboxSource> {
    const stations = await this.http.get<FeatureCollection>(this._metroStopsUrl).toPromise();
    return { type: 'geojson', data: stations };
  }

  async getStationsByLine(line): Promise<IMapboxSource> {
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
