import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeatureCollection } from '../geojson';

@Injectable({
  providedIn: 'root'
})
export class MetroService {

  private _url = '../../assets/geojson/paris-metro-lines.geojson';
  private metroLinesCoords: any;
  private metroLineNames = [];
  private data: FeatureCollection;
  private source: any;
  private selectedLine = {
    'type' : 'FeatureCollection',
    'features' : []
  };

  constructor(private http: HttpClient) { }

  async getAllLineCoords(): Promise<FeatureCollection> {
    this.data = await this.http.get<FeatureCollection>(this._url).toPromise();
    this.metroLinesCoords = {
            type: 'geojson',
            data: this.data
          };
    return this.metroLinesCoords;
  }

  getAllLineNames() {
    this.http.get<FeatureCollection>(this._url)
      .subscribe(data => {
        for (let i = 0; i < data['features'].length; i++) {
          this.metroLineNames.push(data['features'][i]['properties']['name']);
        }
      });
    return this.metroLineNames;
  }

  async getOneLine(lineNumber): Promise<FeatureCollection> {
    this.data = await this.http.get<FeatureCollection>(this._url).toPromise();
    for (let i = 0; i < this.data['features'].length; i++) {
      // console.log(this.data['features'][i]['properties']['name']);
      if (this.data['features'][i]['properties']['name'] === lineNumber) {
        // console.log(this.data['features'][i]);
        this.selectedLine['features'].push(this.data['features'][i]);
        break;
      }
    }
    this.source = {
      type: 'geojson',
      data: this.selectedLine
    };
    return this.source;
  }
  getGeoJson(): string {
    return this._url;
  }
}
