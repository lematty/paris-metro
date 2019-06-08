import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TransportDataService } from '../services/transport-data.service';
import { MapboxFormat } from '../models/mapbox-format';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { METRO, LINES, STATIONS, NetworkType } from '../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  map: mapboxgl.Map;
  coordinates = [2.34, 48.8566];
  zoom = 10.7;
  network: NetworkType;
  lineName: string;
  lines: MapboxFormat;
  stations: MapboxFormat;
  color: mapboxgl.StyleFunction = {
    'type': 'identity',
    'property': 'color'
  };
  style = 'mapbox://styles/mapbox/dark-v9';
  firstLoad = true;

  constructor(private transportDataService: TransportDataService, private route: ActivatedRoute) {
    (mapboxgl as typeof mapboxgl).accessToken = environment.MAPBOX_API_KEY;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.buildMap();
    this.getParameters();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 11,
      center: this.coordinates
    });
  }

  async getParameters() {
    this.route.params.subscribe(params => {
      if (params['line'] || params['network']) {
        this.lineName = params['line'];
        this.network = params['network'];
        this.getLineInfo(this.lineName);
      } else {
        this.getMetroData();
      }
    });
  }

  async getMetroData(): Promise<void> {
    this.lines = await this.transportDataService.getAllLineCoords(METRO);
    this.stations = await this.transportDataService.getAllStationCoords(METRO);
    this.addLayer();
  }

  async getLineInfo(line: string) {
    if (this.map && (this.map.getLayer(LINES) || this.map.getLayer(STATIONS))) {
      this.removeLayer();
    }
    this.lines = await this.transportDataService.getOneLineInfo(this.network, line, LINES);
    this.stations = await this.transportDataService.getOneLineInfo(this.network, line, STATIONS);
    this.addLayer();
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
    if (this.firstLoad) {
      this.map.on('load', () => {
        this.map.addLayer(lineLayer);
        this.map.addLayer(stationLayer);
      });
      this.firstLoad = false;
    } else {
      this.map.addLayer(lineLayer);
      this.map.addLayer(stationLayer);
    }
  }

  removeLayer() {
    this.map.removeLayer(LINES);
    this.map.removeLayer(STATIONS);
    this.map.removeSource(LINES);
    this.map.removeSource(STATIONS);
  }

  // TODO: make generic search function
  // async getLines(network: NetworkType, type: SearchType) {
  //   this.lines = await this.transportDataService.getAllLineCoords(network, type);
  // }
}
