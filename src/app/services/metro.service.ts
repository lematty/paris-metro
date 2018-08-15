import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeatureCollection } from '../geojson';

@Injectable({
  providedIn: 'root'
})
export class MetroService {

  private _url = '../../assets/geojson/paris-metro-lines.geojson';

  constructor(private http: HttpClient) { }

  getLines(): Observable<FeatureCollection> {
    return this.http.get<FeatureCollection>(this._url);
  }
  getGeoJson(): string {
    return this._url;
  }
}
