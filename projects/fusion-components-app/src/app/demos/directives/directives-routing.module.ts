import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'download',
    pathMatch: 'full',
  },
  {
    path: 'download',
    loadComponent: () => import('./download-demo/download-demo.component').then(m => m.DownloadDemoComponent),
  },
  {
    path: 'password-visibility-toggle',
    loadComponent: () => import('./password-visility-toggle/password-visibility-toggle-demo.component').then(m => m.PasswordVisibilitytoggleDemoComponent),
  },
  {
    path: 'state',
    loadComponent: () => import('./state-demo/state-demo.component').then(m => m.StateDemoComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectivesRoutingModule {}

