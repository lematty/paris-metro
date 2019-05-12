import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeatureCollection } from 'geojson';
import { NetworkType, MapboxFormat, SearchType, LINES, STATIONS } from '../models';


@Injectable({
  providedIn: 'root'
})
export class TransportDataService {

  constructor(private http: HttpClient) { }

  async getAllLineCoords(network: NetworkType): Promise<MapboxFormat> {
    const url = this.getUrl(network, LINES);
    const lines = await this.http.get<FeatureCollection>(url).toPromise();
    return { type: 'geojson', data: lines };
  }

  async getAllLineNames(network: NetworkType): Promise<string[]> {
    const url = this.getUrl(network, LINES);
    const lines = await this.http.get<FeatureCollection>(url).toPromise();
    const lineNames: string[] = Array.from(new Set(lines.features.map(line => line.properties.line)));
    return lineNames.sort();
  }

  async getAllStationCoords(network: NetworkType): Promise<MapboxFormat> {
    const url = this.getUrl(network, STATIONS);
    const stations = await this.http.get<FeatureCollection>(url).toPromise();
    return { type: 'geojson', data: stations };
  }

  async getOneLineInfo(network: NetworkType, lineName: string, type: SearchType): Promise<MapboxFormat> {
    const url = this.getUrl(network, type);
    const data = await this.http.get<FeatureCollection>(url).toPromise();
    const line: FeatureCollection = {
      type: 'FeatureCollection',
      features: Array.from(new Set(data.features.filter(feature => feature.properties.line === lineName))),
    };
    return { type: 'geojson', data: line };
  }

  getUrl(network: NetworkType, type: SearchType) {
    return `../../assets/geojson/${network}/paris-${network}-${type}.geojson.json`;
  }
}
