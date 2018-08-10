import { Component, OnInit } from '@angular/core';
import {TrainTramService} from '../services/train-tram.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  latitude = 0;
  longitude = 0;
  zoom = 12;
  selectedVal: string;
  selectedLines = [];
  constructor(private trainTramService: TrainTramService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.selectedVal = id.replace('%20', ' ');
    this.trainTramService.getData()
      .subscribe(data => {
        for (let i = 0; i < data['features'].length; i++) {
          if (data['features'][i]['properties']['res_com'] === this.selectedVal) {
            this.selectedLines.push(data['features'][i]['geometry']['coordinates']);
            this.latitude += data['features'][i]['properties']['geo_point_2d'][0];
            this.longitude += data['features'][i]['properties']['geo_point_2d'][1];
          }
          if (data['features'][i]['properties']['res_com'] === this.selectedVal) {
            this.selectedLines.push(data['features'][i]['geometry']['coordinates']);
            this.latitude += data['features'][i]['properties']['geo_point_2d'][0];
            this.longitude += data['features'][i]['properties']['geo_point_2d'][1];
          }
        }
        this.longitude = this.longitude / this.selectedLines.length;
        this.latitude = this.latitude / this.selectedLines.length;
      });
  }
}
