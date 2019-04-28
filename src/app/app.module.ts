import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { DropDownContainerComponent } from './drop-down-container/drop-down-container.component';
import { MapComponent } from './map/map.component';

import { MetroService } from './services/metro.service';
import { environment } from '../environments/environment';
import { TrainTramService } from './services/train-tram.service';
import { TramMapComponent } from './tram-map/tram-map.component';
import { DetailComponent } from './detail/detail.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TramMapComponent,
    MapComponent,
    DetailComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    }),
    NgxMapboxGLModule.withConfig({
      accessToken: environment.MAPBOX_API_KEY,
    })
  ],
  providers: [
    MetroService,
    TrainTramService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
