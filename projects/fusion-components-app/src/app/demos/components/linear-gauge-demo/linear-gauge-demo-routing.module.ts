import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { LinearGaugeDemoComponent } from './linear-gauge-demo.component';

const routes: Route[] = [
  { path: '', component: LinearGaugeDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinearGaugeDemoRoutingModule {}
