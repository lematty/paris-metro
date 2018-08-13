import { Component, OnInit } from '@angular/core';
import { LineService } from '../services/line.service';
import { Map, LngLat } from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map;
  coordinates = [2.34, 48.8566];
  zoom = 11;
  lines = [];

  constructor(private _lineService: LineService) { }

  ngOnInit() {
    this._lineService.getGeoJson()
      .subscribe(data => {
        for (let i = 0; i < data['features'].length; i++) {
          this.lines.push({
            'coords': data['features'][i]['geometry']['coordinates'],
            'color': data['features'][i]['properties']['color']
          });
        }
      });
  }
}
