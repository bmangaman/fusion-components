import { NgModule } from '@angular/core';

import { CheckboxModule } from '@fusion-components';
import { DemoModule } from '../../../shared/components/demo/demo.module';


import { CheckboxDemoComponent } from './checkbox-demo.component';
import { CheckboxDemoRoutingModule } from './checkbox-demo-routing.module';

@NgModule({
    imports: [
        DemoModule,
        CheckboxModule,
        CheckboxDemoRoutingModule,
        CheckboxDemoComponent,
    ],
})
export class CheckboxDemoModule {}
