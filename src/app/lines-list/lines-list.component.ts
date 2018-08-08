import { Component, OnInit } from '@angular/core';
import { Line } from '../shared/line.model';
import { LineService } from '../services/line.service';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.css']
})
export class LinesListComponent implements OnInit {

  public lines = [];
  public coords = [];

  constructor(private _lineService: LineService) { }

  ngOnInit() {
    this._lineService.getLines()
      .subscribe(data => {
        for (let i = 0; i < data['features'].length; i++) {
          this.lines.push(data['features'][i]['properties']['line']);
          for (let j = 0; j < data['features'][i]['geometry']['coordinates'].length; j++) {
            this.coords.push(data['features'][i]['geometry']['coordinates'][j]);
          }
        }
      });
  }
}
