import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { TooltipDemoComponent } from './tooltip-demo.component';

const routes: Route[] = [
  { path: '', component: TooltipDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TooltipDemoRoutingModule {}
