import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'forms',
    pathMatch: 'full',
  },
  {
    path: 'forms',
    loadComponent: () => import('./forms-demo/forms-demo.component').then(m => m.FormsDemoComponent),
  },
  {
    path: 'tokens',
    loadComponent: () => import('./tokens-pattern/tokens-pattern.component').then(m => m.TokensPatternComponent),
  },
  {
    path: 'typography',
    loadComponent: () => import('./typography-pattern/typography-pattern.component').then(m => m.TypographyPatternComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternsRoutingModule {}

