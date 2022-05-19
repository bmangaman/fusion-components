import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { TableDemoComponent } from './table-demo.component';

const routes: Route[] = [
  { path: '', component: TableDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableDemoRoutingModule {}
