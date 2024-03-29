import { NgModule } from '@angular/core';

import { DomService, TooltipDirectiveModule, TooltipService } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { TooltipDemoComponent } from './tooltip-demo.component';
import { TooltipDemoRoutingModule } from './tooltip-demo-routing.module';

@NgModule({
  declarations: [
    TooltipDemoComponent,
  ],
  imports: [
    DemoModule,

    TooltipDirectiveModule,
    TooltipDemoRoutingModule,
  ],
})
export class TooltipDemoModule {}
