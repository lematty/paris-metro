import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TrainTramService {

  private _url = '../../assets/geojson/rer-metro-tram.geojson';

  constructor(private http: HttpClient) { }

  getData(): Observable<any>  {
    return this.http.get(this._url);
  }
}
