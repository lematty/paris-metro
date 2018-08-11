import { Component, OnInit } from '@angular/core';
import { TrainTramService } from '../services/train-tram.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom = 12;
  selectedVal: string;
  selectedLines: Array<Array<Array<number>>>;
  constructor(private _trainTramService: TrainTramService, private route: ActivatedRoute) {
    route.params
      .subscribe(params => {
        this.selectedLines = [];
        this.latitude = 0;
        this.longitude = 0;
        this.selectedVal = params['id'].replace('%20', ' ');
        this._trainTramService.getData()
          .subscribe(data => {
            console.log(data);
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
      );
  }

  ngOnInit() {
  }
}
