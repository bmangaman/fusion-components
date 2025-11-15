import { NgModule } from '@angular/core';

import { AccordionModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { AccordionDemoComponent } from './accordion-demo.component';
import { AccordionDemoRoutingModule } from './accordion-demo-routing.module';

@NgModule({
    imports: [
        AccordionModule,
        DemoModule,
        AccordionDemoRoutingModule,
        AccordionDemoComponent,
    ],
})
export class AccordionDemoModule {}
