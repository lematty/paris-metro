import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeatureCollection } from '../geojson';
import { MetroService } from '../services/metro.service';

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
  selectedLine: string;
  source: object;

  constructor(private _metroService: MetroService, private route: ActivatedRoute) {
    route.params
      .subscribe(params => {
        this.selectedLine = params['id'];
      });
    this.latitude = 48.8566;
    this.longitude = 2.34;
    this.getLineInfo(this.selectedLine);
  }

  ngOnInit() {
  }

  async getLineInfo(line) {
    this.source = await this._metroService.getOneLine(line);
  }
}
