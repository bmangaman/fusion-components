import { NgModule } from '@angular/core';

import { KeyValueTableModule } from '@fusion-ui/fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { KeyValueTableDemoComponent } from './key-value-table-demo.component';
import { KeyValueTableDemoRoutingModule } from './key-value-table-demo-routing.module';

@NgModule({
  declarations: [
    KeyValueTableDemoComponent,
  ],
  imports: [
    DemoModule,
    KeyValueTableModule,

    KeyValueTableDemoRoutingModule,
  ],
})
export class KeyValueTableDemoModule {}
