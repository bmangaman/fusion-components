import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { KeyValueTableDemoComponent } from './key-value-table-demo.component';

const routes: Route[] = [
  { path: '', component: KeyValueTableDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeyValueTableDemoRoutingModule {}
