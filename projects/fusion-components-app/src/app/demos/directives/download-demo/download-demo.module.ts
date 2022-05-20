import { NgModule } from '@angular/core';

import { ButtonModule, DownloadModule } from 'fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { DownloadDemoComponent } from './download-demo.component';
import { DownloadDemoRoutingModule } from './download-demo-routing.module';

@NgModule({
  declarations: [
    DownloadDemoComponent,
  ],
  imports: [
    ButtonModule,
    DemoModule,
    DownloadModule,

    DownloadDemoRoutingModule,
  ],
})
export class DownloadDemoModule {}
