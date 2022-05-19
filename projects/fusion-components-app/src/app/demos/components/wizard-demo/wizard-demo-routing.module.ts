import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { WizardDemoComponent } from './wizard-demo.component';

const routes: Route[] = [
  { path: '', component: WizardDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WizardDemoRoutingModule {}
