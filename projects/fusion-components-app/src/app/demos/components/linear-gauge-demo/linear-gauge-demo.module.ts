import { NgModule } from '@angular/core';

import { DomService, LinearGaugeModule, TooltipService } from '@fusion-ui/fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { LinearGaugeDemoComponent } from './linear-gauge-demo.component';
import { LinearGaugeDemoRoutingModule } from './linear-gauge-demo-routing.module';

@NgModule({
  declarations: [
    LinearGaugeDemoComponent,
  ],
  imports: [
    DemoModule,
    LinearGaugeModule,

    LinearGaugeDemoRoutingModule,
  ],
  providers: [
    DomService,
    TooltipService,
  ],
})
export class LinearGaugeDemoModule {}
