import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() selectedLine: string;

  constructor() { }

  ngOnInit() {
  }

  receiveMessage($event) {
    console.log(this.selectedLine);
    this.selectedLine = $event;
    console.log(this.selectedLine);
  }

}
