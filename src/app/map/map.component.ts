import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TransportDataService } from '../services/transport-data.service';
import { Map } from 'mapbox-gl';
import { MapboxFormat } from '../models/mapbox-format';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { METRO, LINES, STATIONS } from '../models';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  map: Map;
  coordinates = [2.34, 48.8566];
  zoom = 10.7;
  lines: MapboxFormat;
  stations: MapboxFormat;
  color: mapboxgl.StyleFunction = {
    'type': 'identity',
    'property': 'color'
  };
  style = 'mapbox://styles/mapbox/dark-v9';

  constructor(private transportDataService: TransportDataService) {
    (mapboxgl as typeof mapboxgl).accessToken = environment.MAPBOX_API_KEY;
  }

  ngOnInit() {}

  // TODO: make generic search function
  // async getLines(network: NetworkType, type: SearchType) {
  //   this.lines = await this.transportDataService.getAllLineCoords(network, type);
  // }

  async getMetroData(): Promise<void> {
    this.lines = await this.transportDataService.getAllLineCoords(METRO);
    this.stations = await this.transportDataService.getAllStationCoords(METRO);
    this.addLayer();
  }

  ngAfterViewInit() {
    this.buildMap();
    this.getMetroData();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 11,
      center: this.coordinates
    });
  }

  addLayer() {
    const lineLayer: mapboxgl.Layer = {
      id: LINES,
      type: 'line',
      source: this.lines,
      paint: {
        'line-color': this.color,
        'line-width': 2,
      }
    };
    const stationLayer: mapboxgl.Layer = {
      id: STATIONS,
      type: 'circle',
      source: this.stations,
    };
    this.map.on('load', () => {
      this.map.addLayer(lineLayer);
      this.map.addLayer(stationLayer);
    });
  }
}
