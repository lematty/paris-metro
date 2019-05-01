import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetroService } from '../services/metro.service';
import { MapboxFormat } from '../models/mapbox-format';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom = 10.7;
  color = {
    'type': 'identity',
    'property': 'color'
  };
  lineName: string;
  lineCoords: MapboxFormat;
  stations: MapboxFormat;

  constructor(private _metroService: MetroService, private route: ActivatedRoute) {
    this.getParameters();
    this.latitude = 48.8566;
    this.longitude = 2.34;
    this.getLineInfo(this.lineName);
  }

  ngOnInit() {}

  async getLineInfo(line) {
    this.lineCoords = await this._metroService.getOneLine(line);
    this.stations = await this._metroService.getStationsByLine(line);
  }

  async getParameters() {
    await this.route.params
      .subscribe(params => { this.lineName = params['id']; });
  }
}
