import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetroService } from '../services/metro.service';
import { IMapboxSource } from '../mapbox-source';

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
  line: string;
  source: IMapboxSource;

  constructor(private _metroService: MetroService, private route: ActivatedRoute) {
    this.getParameters();
    this.latitude = 48.8566;
    this.longitude = 2.34;
    this.getLineInfo(this.line);
  }

  ngOnInit() {}

  async getLineInfo(line) {
    this.source = await this._metroService.getOneLine(line);
  }

  async getParameters() {
    await this.route.params
      .subscribe(params => { this.line = params['id']; });
  }
}
