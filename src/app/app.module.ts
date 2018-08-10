import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LinesListComponent } from './lines-list/lines-list.component';
import { MapComponent } from './map/map.component';

import { LineService } from './services/line.service';
import { environment } from '../environments/environment';
import {TrainTramService} from './services/train-tram.service';
import { TramMapComponent } from './tram-map/tram-map.component';
import { DetailComponent } from './detail/detail.component';
import {AppRoutingModule, routingComponents} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TramMapComponent,
    MapComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    })
  ],
  providers: [
    LineService,
    TrainTramService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
