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
    const data = await this.http.get<FeatureCollection>(this._metroLinesUrl).toPromise();
    return { type: 'geojson', data: data };
  }

  getAllLineNames() {
    const metroLineNames = [];
    this.http.get<FeatureCollection>(this._metroLinesUrl)
      .subscribe(data => {
        for (let i = 0; i < data['features'].length; i++) {
          metroLineNames.push(data['features'][i]['properties']['name']);
        }
      });
    return metroLineNames;
  }

  async getOneLine(lineNumber): Promise<IMapboxSource> {
    const line: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    };
    const data = await this.http.get<FeatureCollection>(this._metroLinesUrl).toPromise();
    for (let i = 0; i < data['features'].length; i++) {
      if (data['features'][i]['properties']['name'] === lineNumber) {
        line['features'].push(data['features'][i]);
        break;
      }
    }
    return { type: 'geojson', data: line };
  }

  async getAllStationCoords(): Promise<IMapboxSource> {
    const data = await this.http.get<FeatureCollection>(this._metroStopsUrl).toPromise();
    return { type: 'geojson', data: data };
  }
}
