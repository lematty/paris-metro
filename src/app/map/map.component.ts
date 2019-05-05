import { Component, OnInit } from '@angular/core';
import { MetroService } from '../services/metro.service';
import { Map } from 'mapbox-gl';
import { MapboxFormat } from '../models/mapbox-format';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map;
  coordinates = [2.34, 48.8566];
  zoom = 10.7;
  lines: MapboxFormat;
  stations: MapboxFormat;
  color = {
    'type': 'identity',
    'property': 'color'
  };

  constructor(private _metroService: MetroService) { }

  ngOnInit() {
    this.getMetroLines();
    this.getMetroStations();
  }

  async getLines(network: string, type: string) {
    this.lines = await this._metroService.getAllLineCoords(network);
  }

  async getMetroLines() {
    this.lines = await this._metroService.getAllLineCoords('metro');
  }

  async getMetroStations() {
    this.stations = await this._metroService.getAllStationCoords('metro');
  }
}
