import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { MenuDemoComponent } from './menu-demo.component';

const routes: Route[] = [
  { path: '', component: MenuDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuDemoRoutingModule {}
