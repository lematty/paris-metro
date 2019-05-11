import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetroService } from '../services/metro.service';
import { MapboxFormat, NetworkType, LINES, STATIONS } from '../models';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  @Input() network: NetworkType = 'metro';

  latitude = 48.8566;
  longitude = 2.34;
  zoom = 10.7;
  color = {
    'type': 'identity',
    'property': 'color'
  };
  lineName: string;
  lineCoords: MapboxFormat;
  stations: MapboxFormat;

  constructor(private metroService: MetroService, private route: ActivatedRoute) {
    this.getParameters();
    this.getLineInfo(this.lineName);
  }

  ngOnInit() {}

  async getLineInfo(line: string) {
    this.lineCoords = await this.metroService.getOneLineInfo(this.network, line, LINES);
    this.stations = await this.metroService.getOneLineInfo(this.network, line, STATIONS);
  }

  async getParameters() {
    await this.route.params
      .subscribe(params => { this.lineName = params['line']; });
  }
}
