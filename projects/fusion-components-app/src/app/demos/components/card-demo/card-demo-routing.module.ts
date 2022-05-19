import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { CardDemoComponent } from './card-demo.component';

const routes: Route[] = [
  { path: '', component: CardDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardDemoRoutingModule {}
