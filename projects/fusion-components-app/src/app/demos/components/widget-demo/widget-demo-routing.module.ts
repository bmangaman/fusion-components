import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { WidgetDemoComponent } from './widget-demo.component';

const routes: Route[] = [
  { path: '', component: WidgetDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WidgetDemoRoutingModule {}
