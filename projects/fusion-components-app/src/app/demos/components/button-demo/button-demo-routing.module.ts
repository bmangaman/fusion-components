import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ButtonDemoComponent } from './button-demo.component';

const routes: Route[] = [
  { path: '', component: ButtonDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ButtonDemoRoutingModule {}
