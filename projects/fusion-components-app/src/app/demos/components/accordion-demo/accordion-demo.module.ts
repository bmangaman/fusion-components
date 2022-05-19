import { NgModule } from '@angular/core';

import { AccordionModule } from '@fusion-ui/fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { AccordionDemoComponent } from './accordion-demo.component';
import { AccordionDemoRoutingModule } from './accordion-demo-routing.module';

@NgModule({
  declarations: [
    AccordionDemoComponent,
  ],
  imports: [
    AccordionModule,
    DemoModule,

    AccordionDemoRoutingModule,
  ],
})
export class AccordionDemoModule {}
