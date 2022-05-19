import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { StateDemoComponent } from './state-demo.component';

const routes: Route[] = [
  { path: '', component: StateDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateDemoRoutingModule {}
