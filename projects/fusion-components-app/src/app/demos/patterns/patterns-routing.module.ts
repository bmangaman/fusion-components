import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'forms',
  },
  {
    path: 'forms',
    loadChildren: () => import('./forms-demo/forms-demo.module').then(m => m.FormsDemoModule),
  },
  {
    path: 'tokens',
    loadChildren: () => import('./tokens-pattern/tokens-pattern.module').then(m => m.TokensPatternModule),
  },
  {
    path: 'typography',
    loadChildren: () => import('./typography-pattern/typography-pattern.module').then(m => m.TypographyPatternModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternsRoutingModule {}

