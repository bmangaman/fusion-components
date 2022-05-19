import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { CheckboxDemoComponent } from './checkbox-demo.component';

const routes: Route[] = [
  { path: '', component: CheckboxDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckboxDemoRoutingModule {}
