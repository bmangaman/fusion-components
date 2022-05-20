import { NgModule } from '@angular/core';

import { ProgressBarModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { ProgressBarDemoComponent } from './progress-bar-demo.component';
import { ProgressBarDemoRoutingModule } from './progress-bar-demo-routing.module';

@NgModule({
  declarations: [
    ProgressBarDemoComponent,
  ],
  imports: [
    DemoModule,
    ProgressBarModule,

    ProgressBarDemoRoutingModule,
  ],
})
export class ProgressBarDemoModule {}
