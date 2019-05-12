import { Component, OnInit } from '@angular/core';
import { NetworkType } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public network: NetworkType;
  public line = 'Metro';

  constructor() { }

  ngOnInit() {
  }

  setTitle($event) {
    this.line = $event;
  }

}
