import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LinesListComponent} from './lines-list/lines-list.component';
import {DetailComponent} from './detail/detail.component';

const routes: Routes = [
  // { path: '', component: LinesListComponent },
  { path: 'map/:id', component: DetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  LinesListComponent,
  DetailComponent
];
