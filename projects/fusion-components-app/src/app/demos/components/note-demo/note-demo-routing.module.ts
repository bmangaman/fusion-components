import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { NoteDemoComponent } from './note-demo.component';

const routes: Route[] = [
  { path: '', component: NoteDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteDemoRoutingModule {}
