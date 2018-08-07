import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Line } from '../shared/line.model';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  private _url = '../../assets/geojson/paris-metro-lines.geojson';

  constructor(private http: HttpClient) { }

  getLines(): Observable<Line[]> {
    return this.http.get<Line[]>(this._url);
  }
  getGeoJson() {
    return this.http.get(this._url);
  }
}
