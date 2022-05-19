import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AccordionDemoComponent } from './accordion-demo.component';

const routes: Route[] = [
  { path: '', component: AccordionDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccordionDemoRoutingModule {}
