import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { RouterModule, Routes } from '@angular/router';

import { MetroService } from './services/metro.service';
import { environment } from '../environments/environment';
import { TrainTramService } from './services/train-tram.service';
import { TramMapComponent } from './tram-map/tram-map.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { DropDownContainerComponent } from './drop-down-container/drop-down-container.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: ':network/:line', component: DetailComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DropDownContainerComponent,
    DetailComponent,
    ErrorComponent,
    HomeComponent,
    MapComponent,
    TramMapComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    }),
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [
    MetroService,
    TrainTramService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
