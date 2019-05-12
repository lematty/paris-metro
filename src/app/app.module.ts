import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { RouterModule, Routes } from '@angular/router';

import { TransportDataService } from './services/transport-data.service';
import { HomeComponent } from './home/home.component';
import { DropDownContainerComponent } from './drop-down-container/drop-down-container.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: ':network/:line', component: MapComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DropDownContainerComponent,
    ErrorComponent,
    HomeComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [
    TransportDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
