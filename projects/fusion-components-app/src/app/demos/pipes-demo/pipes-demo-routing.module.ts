import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { PipesDemoComponent } from './pipes-demo.component';

const routes: Route[] = [
  { path: '', component: PipesDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PipesDemoRoutingModule {}
