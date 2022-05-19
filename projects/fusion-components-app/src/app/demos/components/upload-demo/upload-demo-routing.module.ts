import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { UploadDemoComponent } from './upload-demo.component';

const routes: Route[] = [
  { path: '', component: UploadDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadDemoRoutingModule {}
