import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { DownloadDemoComponent } from './download-demo.component';

const routes: Route[] = [
  { path: '', component: DownloadDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadDemoRoutingModule {}
