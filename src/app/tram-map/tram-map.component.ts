import { Component, OnInit } from '@angular/core';
import { TrainTramService } from '../services/train-tram.service';

@Component({
  selector: 'app-tram-map',
  templateUrl: './tram-map.component.html',
  styleUrls: ['./tram-map.component.css']
})
export class TramMapComponent implements OnInit {
  latitude = 48.8566;
  longitude = 2.3522;
  zoom = 12;
  tramLines = [];
  reseaux = [];
  queryVal = 1;
  details = 'metro';

  constructor(private trainTramService: TrainTramService) { }

  ngOnInit() {
    this.trainTramService.getData()
      .subscribe(data => {
        for (let i = 0; i < data['features'].length; i++) {
          if (data['features'][i]['properties']['metro'] === this.queryVal) {
            this.tramLines.push(data['features'][i]['geometry']['coordinates']);
          }
          if (!this.reseaux.includes(data['features'][i]['properties'][this.details])) {
            this.reseaux.push(data['features'][i]['properties'][this.details]);
          }
        }
        console.log(this.reseaux);
      });
  }

}
