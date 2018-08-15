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
  selectedVal: string;
  source: object;
  selectedLines: FeatureCollection;

  constructor(private _metroService: MetroService, private route: ActivatedRoute) {
    route.params
      .subscribe(params => {
        this.selectedVal = params['id'];
      });
    this.latitude = 48.8566;
    this.longitude = 2.34;
    this.selectedLines = {
      'type' : 'FeatureCollection',
      'features' : []
    };
    this._metroService.getLines()
      .subscribe(data => {
        console.log(this.selectedVal);
        for (let i = 0; i < data['features'].length; i++) {
          console.log(data['features'][i]['properties']['name']);
          if (data['features'][i]['properties']['name'] === this.selectedVal) {
            console.log(data['features'][i]);
            this.selectedLines['features'].push(data['features'][i]);
            break;
          }
        }
        this.source = {
          type: 'geojson',
          data: this.selectedLines
        };
      });
  }

  ngOnInit() {
  }
}
