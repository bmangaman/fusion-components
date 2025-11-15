import { NgModule } from '@angular/core';

import { LoadingSpinnerModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { LoadingSpinnerDemoComponent } from './loading-spinner-demo.component';
import { LoadingSpinnerDemoRoutingModule } from './loading-spinner-demo-routing.module';

@NgModule({
    imports: [
        DemoModule,
        LoadingSpinnerModule,
        LoadingSpinnerDemoRoutingModule,
        LoadingSpinnerDemoComponent,
    ],
})
export class LoadingSpinnerDemoModule {}
