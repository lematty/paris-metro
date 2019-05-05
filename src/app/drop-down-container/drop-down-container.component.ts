import { MetroService } from '../services/metro.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drop-down-container',
  templateUrl: './drop-down-container.component.html',
  styleUrls: ['./drop-down-container.component.css']
})
export class DropDownContainerComponent implements OnInit {

  public metros = [];
  public rers = [];
  public buses = [];
  public noctiliens = [];
  public trams = [];

  public METRO = 'metro';
  public RER = 'rer';
  public TRAM = 'tram';
  public BUS = 'bus';
  public NOCTILIEN = 'noctilien';

  @Output() selectedLine = new EventEmitter<string>();

  constructor(private _metroService: MetroService, private router: Router) { }

  ngOnInit() {
    this.getMetroLines();
    this.getRerLines();
    this.getTramLines();
    // this.getBusLines();
    // this.getNoctilienLines();
  }

  async getMetroLines() {
    this.metros = await this._metroService.getAllLineNames('metro');
  }
  async getRerLines() {
    this.rers = await this._metroService.getAllLineNames('rer');
  }

  async getTramLines() {
    this.trams = await this._metroService.getAllLineNames('tram');
  }

  async getBusLines() {
    this.buses = await this._metroService.getAllLineNames('bus');
  }

  async getNoctilienLines() {
    this.noctiliens = await this._metroService.getAllLineNames('noctilien');
  }

  sendNetwork(network: string) {
    this.selectedLine.emit(network);
  }

  // onSelect(lineName: string) {
  //   console.log(lineName);
  //   this.router.navigate(['/map', lineName]);
  // }
}
