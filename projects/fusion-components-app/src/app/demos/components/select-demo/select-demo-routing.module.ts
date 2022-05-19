import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SelectDemoComponent } from './select-demo.component';

const routes: Route[] = [
  { path: '', component: SelectDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectDemoRoutingModule {}
