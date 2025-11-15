import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: 'components',
    loadChildren: () => import('./demos/components/components-routing.module').then(m => m.ComponentsRoutingModule),
  },
  {
    path: 'directives',
    loadChildren: () => import('./demos/directives/directives-routing.module').then(m => m.DirectivesRoutingModule),
  },
  {
    path: 'patterns',
    loadChildren: () => import('./demos/patterns/patterns-routing.module').then(m => m.PatternsRoutingModule),
  },
  {
    path: 'pipes',
    loadComponent: () => import('./demos/pipes-demo/pipes-demo.component').then(m => m.PipesDemoComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
