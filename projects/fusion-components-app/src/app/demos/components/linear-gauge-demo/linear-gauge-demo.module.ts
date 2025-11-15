import { NgModule } from '@angular/core';

import { LinearGaugeModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { LinearGaugeDemoComponent } from './linear-gauge-demo.component';
import { LinearGaugeDemoRoutingModule } from './linear-gauge-demo-routing.module';

@NgModule({
    imports: [
        DemoModule,
        LinearGaugeModule,
        LinearGaugeDemoRoutingModule,
        LinearGaugeDemoComponent,
    ],
})
export class LinearGaugeDemoModule {}
