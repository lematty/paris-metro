import { MetroService } from '../services/metro.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { METRO, RER, TRAM, BUS, NOCTILIEN } from '../models';

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

  constructor(private _metroService: MetroService, private router: Router) { }

  ngOnInit() {
    this.getMetroLines();
    this.getRerLines();
    this.getTramLines();
    // TODO: Implement Bus lines
    // this.getBusLines();
    // this.getNoctilienLines();
  }

  async getMetroLines() {
    this.metros = await this._metroService.getAllLineNames(METRO);
  }
  async getRerLines() {
    this.rers = await this._metroService.getAllLineNames(RER);
  }

  async getTramLines() {
    this.trams = await this._metroService.getAllLineNames(TRAM);
  }

  async getBusLines() {
    this.buses = await this._metroService.getAllLineNames(BUS);
  }

  async getNoctilienLines() {
    this.noctiliens = await this._metroService.getAllLineNames(NOCTILIEN);
  }
}
