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
  private rerLetters = ['A', 'B', 'C', 'D', 'E'];

  constructor(private _trainTramService: TrainTramService, private router: Router) { }

  ngOnInit() {
    this._trainTramService.getData()
      .subscribe(data => {
        for (let i = 0; i < data['features'].length; i++) {
          for (let j = 0; j < 15; j++) {
            if (data['features'][i]['properties']['res_com'] === 'M' + [j].toString()
              && (!this.metroLines.includes('M' + [j].toString()))) {
              this.metroLines.push(data['features'][i]['properties']['res_com']);
            }
          }
          for (let j = 0; j < this.rerLetters.length; j++) {
            if (data['features'][i]['properties']['res_com'] === 'RER ' + this.rerLetters[j]
              && (!this.rerLines.includes('RER ' + this.rerLetters[j]))) {
              this.rerLines.push(data['features'][i]['properties']['res_com']);
            }
          }
        }
        this.metroLines.sort();
        this.rerLines.sort();
        console.log(this.rerLines);
      });
  }

  onSelect(id) {
    this.router.navigate(['/map', id]);
  }
}
