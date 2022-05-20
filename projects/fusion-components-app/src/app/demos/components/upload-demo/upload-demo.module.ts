import { NgModule } from '@angular/core';

import { ButtonModule, UploadModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { UploadDemoComponent } from './upload-demo.component';
import { UploadDemoRoutingModule } from './upload-demo-routing.module';

@NgModule({
  declarations: [
    UploadDemoComponent,
  ],
  imports: [
    ButtonModule,
    DemoModule,
    UploadModule,

    UploadDemoRoutingModule,
  ],
})
export class UploadDemoModule {}
