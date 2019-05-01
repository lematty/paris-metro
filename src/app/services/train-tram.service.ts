import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeoJson } from '../models/geojson';

@Injectable({
  providedIn: 'root'
})

export class TrainTramService {

  private _url = '../../assets/geojson/rer-metro-tram.geojson';

  constructor(private http: HttpClient) { }

  getData(): Observable<GeoJson>  {
    return this.http.get<GeoJson>(this._url);
  }
}
