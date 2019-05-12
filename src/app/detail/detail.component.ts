import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransportDataService } from '../services/transport-data.service';
import { MapboxFormat, NetworkType, LINES, STATIONS } from '../models';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterViewInit {

  latitude = 48.8566;
  longitude = 2.34;
  zoom = 10.7;
  lineName: any;
  network: NetworkType;
  lineCoords: MapboxFormat;
  stations: MapboxFormat;
  style = 'mapbox://styles/mapbox/dark-v9';
  color: mapboxgl.StyleFunction = {
    'type': 'identity',
    'property': 'color'
  };
  map: mapboxgl.Map;


  constructor(private transportDataService: TransportDataService, private route: ActivatedRoute) {
    this.getParameters();
    (mapboxgl as typeof mapboxgl).accessToken = environment.MAPBOX_API_KEY;
  }

  ngOnInit() {}

  async getLineInfo(line: string) {
    if (this.map && (this.map.getLayer(LINES) || this.map.getLayer(STATIONS))) {
      this.removeLayer();
    }
    this.lineCoords = await this.transportDataService.getOneLineInfo(this.network, line, LINES);
    this.stations = await this.transportDataService.getOneLineInfo(this.network, line, STATIONS);
    this.addLayer();
  }

  async getParameters() {
    this.route.params.subscribe(params => {
      this.lineName = params['line'];
      this.network = params['network'];
      this.getLineInfo(this.lineName);
    });
  }

  ngAfterViewInit() {
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 11,
      center: [this.longitude, this.latitude]
    });
  }

  addLayer() {
    const lineLayer: mapboxgl.Layer = {
      id: LINES,
      type: 'line',
      source: this.lineCoords,
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
    this.map.addLayer(lineLayer);
    this.map.addLayer(stationLayer);
  }

  removeLayer() {
    this.map.removeLayer(LINES);
    this.map.removeLayer(STATIONS);
    this.map.removeSource(LINES);
    this.map.removeSource(STATIONS);
  }
}
