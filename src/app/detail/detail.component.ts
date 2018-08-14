import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeatureCollection } from '../geojson';
import { LineService } from '../services/line.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom = 11;
  color = {
    'type': 'identity',
    'property': 'color'
  };
  selectedVal: string;
  source: object;
  selectedLines: FeatureCollection;
  constructor(private _lineService: LineService, private route: ActivatedRoute) {
    route.params
      .subscribe(params => {
        this.selectedLines = {
          'type' : 'FeatureCollection',
          'features' : []
        };
        this.latitude = 48.8566;
        this.longitude = 2.34;
        this.selectedVal = params['id'];
        this._lineService.getLines()
          .subscribe(data => {
            for (let i = 0; i < data['features'].length; i++) {
              if (data['features'][i]['properties']['line'] === this.selectedVal) {
                this.selectedLines['features'].push(data['features'][i]);
                break;
              }
            }
          });
        this.source = {
          type: 'geojson',
          data: this.selectedLines
        };
        }
      );
  }

  ngOnInit() {
  }
}
