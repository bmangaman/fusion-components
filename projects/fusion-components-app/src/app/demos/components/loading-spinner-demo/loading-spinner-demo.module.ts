import { NgModule } from '@angular/core';

import { LoadingSpinnerModule } from '@fusion-ui/fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { LoadingSpinnerDemoComponent } from './loading-spinner-demo.component';
import { LoadingSpinnerDemoRoutingModule } from './loading-spinner-demo-routing.module';

@NgModule({
  declarations: [
    LoadingSpinnerDemoComponent,
  ],
  imports: [
    DemoModule,
    LoadingSpinnerModule,

    LoadingSpinnerDemoRoutingModule,
  ],
})
export class LoadingSpinnerDemoModule {}
