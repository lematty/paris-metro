import { MetroService } from '../services/metro.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drop-down-container',
  templateUrl: './drop-down-container.component.html',
  styleUrls: ['./drop-down-container.component.css']
})
export class DropDownContainerComponent implements OnInit {

  public metroLines = [];
  public rerLines = [];

  constructor(private _metroService: MetroService, private router: Router) { }

  ngOnInit() {
    this.getMetroLines();
  }

  async getMetroLines() {
    this.metroLines = await this._metroService.getAllLineNames();
  }

  onSelect(id) {
    this.router.navigate(['/map', id]);
  }
}
