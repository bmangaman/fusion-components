import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SidenavDemoComponent } from './sidenav-demo.component';

const routes: Route[] = [
  { path: '', component: SidenavDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidenavDemoRoutingModule {}
