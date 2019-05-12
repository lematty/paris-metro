import { TransportDataService } from '../services/transport-data.service';
import { Component, OnInit } from '@angular/core';
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

  constructor(private transportDataService: TransportDataService) { }

  ngOnInit() {
    this.getMetroLines();
    this.getRerLines();
    this.getTramLines();
    // TODO: Implement Bus lines
    // this.getBusLines();
    // this.getNoctilienLines();
  }

  async getMetroLines() {
    this.metros = await this.transportDataService.getAllLineNames(METRO);
  }
  async getRerLines() {
    this.rers = await this.transportDataService.getAllLineNames(RER);
  }

  async getTramLines() {
    this.trams = await this.transportDataService.getAllLineNames(TRAM);
  }

  async getBusLines() {
    this.buses = await this.transportDataService.getAllLineNames(BUS);
  }

  async getNoctilienLines() {
    this.noctiliens = await this.transportDataService.getAllLineNames(NOCTILIEN);
  }
}
