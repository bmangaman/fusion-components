import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { FormsDemoComponent } from './forms-demo.component';

const routes: Route[] = [
  { path: '', redirectTo: 'checkbox', pathMatch: 'full' },
  { path: 'checkbox', component: FormsDemoComponent },
  { path: 'radio', component: FormsDemoComponent },
  { path: 'input', component: FormsDemoComponent },
  { path: 'textarea', component: FormsDemoComponent },
  { path: 'select', component: FormsDemoComponent },
  { path: 'button', component: FormsDemoComponent },
  { path: 'button-group', component: FormsDemoComponent },
  { path: 'switch', component: FormsDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsDemoRoutingModule {}
