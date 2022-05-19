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
    loadChildren: () => import('./demos/pipes-demo/pipes-demo.module').then(m => m.PipesDemoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
