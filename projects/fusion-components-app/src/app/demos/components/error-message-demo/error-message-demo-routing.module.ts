import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ErrorMessageDemoComponent } from './error-message-demo.component';

const routes: Route[] = [
  { path: '', component: ErrorMessageDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorMessageDemoRoutingModule {}
