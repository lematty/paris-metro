import { Component, OnInit } from '@angular/core';
import { ILine } from '../shared/line.model';
import { LineService } from '../services/line.service';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.css']
})
export class LinesListComponent implements OnInit {

  lines: ILine[];

  constructor(private _lineService: LineService) { }

  ngOnInit() {
  }

}
