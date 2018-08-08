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


@NgModule({
  declarations: [
    AppComponent,
    LinesListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    })
  ],
  providers: [LineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
