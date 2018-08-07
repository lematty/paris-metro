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

  constructor(private _lineService: LineService) { }

  ngOnInit() {
    this._lineService.getLines()
      .subscribe(data => {
        this.lines = data['features'];
        console.log(this.lines);
      });
  }

}
