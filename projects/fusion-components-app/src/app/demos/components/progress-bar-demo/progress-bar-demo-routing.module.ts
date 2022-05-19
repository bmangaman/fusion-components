import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ProgressBarDemoComponent } from './progress-bar-demo.component';

const routes: Route[] = [
  { path: '', component: ProgressBarDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressBarDemoRoutingModule {}
