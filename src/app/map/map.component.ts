import { Component, OnInit } from '@angular/core';
import { MetroService } from '../services/metro.service';
import { Map } from 'mapbox-gl';
import { MapboxFormat } from '../models/mapbox-format';
import { NetworkType } from '../models/network.type';
import { SearchType } from '../models/search.type';

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

  constructor(private metroService: MetroService) { }

  ngOnInit() {
    this.getMetroLines();
    this.getMetroStations();
  }

  // TODO: make generic search function
  // async getLines(network: NetworkType, type: SearchType) {
  //   this.lines = await this.metroService.getAllLineCoords(network, type);
  // }

  async getMetroLines() {
    this.lines = await this.metroService.getAllLineCoords('metro');
  }

  async getMetroStations() {
    this.stations = await this.metroService.getAllStationCoords('metro');
  }
}
