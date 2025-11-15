import { NgModule } from '@angular/core';

import { KeyValueTableModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { KeyValueTableDemoComponent } from './key-value-table-demo.component';
import { KeyValueTableDemoRoutingModule } from './key-value-table-demo-routing.module';

@NgModule({
    imports: [
        DemoModule,
        KeyValueTableModule,
        KeyValueTableDemoRoutingModule,
        KeyValueTableDemoComponent,
    ],
})
export class KeyValueTableDemoModule {}
