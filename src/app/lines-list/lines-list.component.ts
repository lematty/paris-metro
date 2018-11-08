import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetroService } from '../services/metro.service';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.css']
})
export class LinesListComponent implements OnInit {

  public metroLines = [];
  public rerLines = [];

  constructor(private _metroService: MetroService, private router: Router) { }

  ngOnInit() {
    this.metroLines = this._metroService.getAllLineNames();
  }

  onSelect(id) {
    this.router.navigate(['/map', id]);
  }
}
