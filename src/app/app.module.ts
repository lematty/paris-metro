import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LinesListComponent } from './lines-list/lines-list.component';
import { MapComponent } from './map/map.component';

import { LineService } from './services/line.service';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    LinesListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [LineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
