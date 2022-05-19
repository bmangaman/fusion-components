import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'download',
  },
  {
    path: 'download',
    loadChildren: () => import('./download-demo/download-demo.module').then(m => m.DownloadDemoModule),
  },
  {
    path: 'password-visibility-toggle',
    loadChildren: () => import('./password-visility-toggle/password-visibility-toggle-demo.module').then(m => m.PasswordVisibilityToggleDemoModule),
  },
  {
    path: 'state',
    loadChildren: () => import('./state-demo/state-demo.module').then(m => m.StateDemoModule),
  },
  {
    path: 'download',
    loadChildren: () => import('./download-demo/download-demo.module').then(m => m.DownloadDemoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectivesRoutingModule {}

