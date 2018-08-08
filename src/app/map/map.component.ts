import { Component, OnInit } from '@angular/core';
import { LineService } from '../services/line.service';
import {forEach} from '@angular/router/src/utils/collection';
import {element} from 'protractor';

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
  lines = [];

  constructor(private _lineService: LineService) { }

  getGeoJson() {
    this._lineService.getGeoJson()
      .subscribe(data => {
        for (let i = 0; i < data['features'].length; i++) {
          // this.lines.push(data['features'][i]);
          this.lines.push({
            'coords': data['features'][i]['geometry']['coordinates'],
            'color': data['features'][i]['properties']['color']
          });
          // console.log(data['features'][i]['properties']['color']);
        }

        this.lines.forEach(el => {
          el.coords.forEach(outer => {
            outer.forEach(inner => {
              // console.log(inner[0]);
            });
          });
        });
      });
  }
  ngOnInit() {
    this.getGeoJson();
    console.log(this.lines);
  }
}
