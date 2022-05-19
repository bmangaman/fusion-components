import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { TokensPatternComponent } from './tokens-pattern.component';

const routes: Route[] = [
  { path: '', component: TokensPatternComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokensPatternRoutingModule {}
