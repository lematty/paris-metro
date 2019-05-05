import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapboxFormat } from '../models/mapbox-format';
import { FeatureCollection } from 'geojson';

@Injectable({
  providedIn: 'root'
})
export class MetroService {
  LINES = 'lines';
  STATIONS = 'stations';

  constructor(private http: HttpClient) { }

  async getAllLineCoords(network: string): Promise<MapboxFormat> {
    const url = this.getUrl(network, this.LINES);
    const lines = await this.http.get<FeatureCollection>(url).toPromise();
    return { type: 'geojson', data: lines };
  }

  async getAllLineNames(network: string): Promise<string[]> {
    const url = this.getUrl(network, this.LINES);
    const data = await this.http.get<FeatureCollection>(url).toPromise();
    const lines = Array.from(new Set(data.features.map(line => line.properties.line)));
    return lines.sort();
  }

  async getOneLine(network: string, lineNumber): Promise<MapboxFormat> {
    const url = this.getUrl(network, this.LINES);
    const line: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    };
    const lines = await this.http.get<FeatureCollection>(url).toPromise();
    for (let i = 0; i < lines['features'].length; i++) {
      if (lines['features'][i]['properties']['name'] === lineNumber) {
        line['features'].push(lines['features'][i]);
        break;
      }
    }
    return { type: 'geojson', data: line };
  }

  async getAllStationCoords(network: string): Promise<MapboxFormat> {
    const url = this.getUrl(network, this.STATIONS);
    const stations = await this.http.get<FeatureCollection>(url).toPromise();
    return { type: 'geojson', data: stations };
  }

  async getStationsByLine(network: string, line): Promise<MapboxFormat> {
    const url = this.getUrl(network, this.STATIONS);
    const stationsOnLine: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    };
    const allStations = await this.http.get<FeatureCollection>(url).toPromise();
    for (let i = 0; i < allStations['features'].length; i++) {
      if (allStations['features'][i]['properties']['line'] === line) {
        stationsOnLine['features'].push(allStations['features'][i]);
      }
    }
    return { type: 'geojson', data: stationsOnLine };
  }

  getUrl(network: string, type: string) {
    return `../../assets/geojson/${network}/paris-${network}-${type}.geojson.json`;
  }
}
