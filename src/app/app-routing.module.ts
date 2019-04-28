import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DropDownContainerComponent } from './drop-down-container/drop-down-container.component';
import { DetailComponent } from './detail/detail.component';
import { ErrorComponent } from './error/error.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'map/:id', component: DetailComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  DropDownContainerComponent,
  DetailComponent
];
