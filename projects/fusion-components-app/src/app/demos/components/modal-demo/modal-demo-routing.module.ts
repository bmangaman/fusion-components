import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ModalDemoComponent } from './modal-demo.component';

const routes: Route[] = [
  { path: '', component: ModalDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDemoRoutingModule {}
