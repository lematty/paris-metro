import { Component, OnInit } from '@angular/core';
import {TrainTramService} from '../services/train-tram.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.css']
})
export class LinesListComponent implements OnInit {

  public metroLines = [];
  public rerLines = [];

  constructor(private _trainTramService: TrainTramService, private router: Router) { }

  ngOnInit() {
    this._trainTramService.getData()
      .subscribe(data => {
        for (let i = 0; i < data['features'].length; i++) {
          const line = data['features'][i]['properties']['res_com'];
          if ((line.includes('RER')) && (!this.rerLines.includes(line))) {
            this.rerLines.push(line);
            continue;
          }
          for (let j = 0; j < 15; j++) {
            if (line === 'M' + [j].toString()
              && (!this.metroLines.includes('M' + [j].toString()))) {
              this.metroLines.push(line);
            }
          }
        }
        this.metroLines.sort();
        this.rerLines.sort();
      });
  }

  onSelect(id) {
    this.router.navigate(['/map', id]);
  }
}
