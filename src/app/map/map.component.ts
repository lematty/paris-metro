import { Component, OnInit } from '@angular/core';
import { LineService } from '../services/line.service';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map;
  coordinates = [2.34, 48.8566];
  zoom = 10.7;
  lines: object;
  color = {
    'type': 'identity',
    'property': 'color'
  };

  constructor(private _lineService: LineService) { }

  ngOnInit() {
    this._lineService.getLines()
      .subscribe(data => {
        this.lines = {
          type: 'geojson',
          data: data
        };
      });
  }
}
