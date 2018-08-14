import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineService } from '../services/line.service';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.css']
})
export class LinesListComponent implements OnInit {

  public metroLines = [];
  public rerLines = [];

  constructor(private _lineService: LineService, private router: Router) { }

  ngOnInit() {
    this._lineService.getLines()
      .subscribe(data => {
        for (let i = 0; i < data['features'].length; i++) {
          this.metroLines.push(data['features'][i]['properties']['line']);
        }
      });
  }

  onSelect(id) {
    this.router.navigate(['/map', id]);
  }
}
