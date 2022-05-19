import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { TypographyPatternComponent } from './typography-pattern.component';

const routes: Route[] = [
  { path: '', component: TypographyPatternComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypographyPatternRoutingModule {}
