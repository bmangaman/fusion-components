import { NgModule } from '@angular/core';

import { SelectModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { SelectDemoComponent } from './select-demo.component';
import { SelectDemoRoutingModule } from './select-demo-routing.module';

@NgModule({
    imports: [
        DemoModule,
        SelectModule,
        SelectDemoRoutingModule,
        SelectDemoComponent,
    ],
})
export class SelectDemoModule {}
