import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { TabviewDemoComponent } from './tabview-demo.component';

const routes: Route[] = [
  { path: '', component: TabviewDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabviewDemoRoutingModule {}
