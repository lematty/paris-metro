import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeatureCollection } from '../geojson';

@Injectable({
  providedIn: 'root'
})

export class TrainTramService {

  private _url = '../../assets/geojson/rer-metro-tram.geojson';

  constructor(private http: HttpClient) { }

  getData(): Observable<FeatureCollection>  {
    return this.http.get<FeatureCollection>(this._url);
  }
}
