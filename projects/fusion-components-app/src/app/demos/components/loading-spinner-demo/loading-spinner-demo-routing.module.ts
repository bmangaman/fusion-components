import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { LoadingSpinnerDemoComponent } from './loading-spinner-demo.component';

const routes: Route[] = [
  { path: '', component: LoadingSpinnerDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingSpinnerDemoRoutingModule {}
