import { NgModule } from '@angular/core';

import { ProgressBarModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { ProgressBarDemoComponent } from './progress-bar-demo.component';
import { ProgressBarDemoRoutingModule } from './progress-bar-demo-routing.module';

@NgModule({
    imports: [
        DemoModule,
        ProgressBarModule,
        ProgressBarDemoRoutingModule,
        ProgressBarDemoComponent,
    ],
})
export class ProgressBarDemoModule {}
