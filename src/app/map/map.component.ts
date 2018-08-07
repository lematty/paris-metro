import { Component, OnInit } from '@angular/core';
import { LineService } from '../services/line.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  latitude = 48.8566;
  longitude = 2.3522;
  zoom = 12;
  geoJsonObject: Object;

  constructor(private _lineService: LineService) { }

  getGeoJson(): void {
    this._lineService.getGeoJson()
      .subscribe(data => this.geoJsonObject = data);
  }
  ngOnInit(): void {
    this.getGeoJson();
  }


}
