import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { BadgeDemoComponent } from './badge-demo.component';

const routes: Route[] = [
  { path: '', component: BadgeDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BadgeDemoRoutingModule {}
