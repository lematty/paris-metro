import { Component, OnInit } from '@angular/core';
import { MetroService } from '../services/metro.service';
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

  constructor(private _metroService: MetroService) { }

  ngOnInit() {
    this.getLines();
  }

  async getLines() {
    this.lines = await this._metroService.getAllLineCoords();
  }
}
