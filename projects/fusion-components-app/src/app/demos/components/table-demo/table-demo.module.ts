import { NgModule } from '@angular/core';

import {
  BytesModule,
  DomService,
  QueryParamsModule,
  TableModule,
  TooltipDirectiveModule,
  TooltipService,
} from '@fusion-ui/fusion-components';
import { TranslateModule } from '@ngx-translate/core';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { TableDemoComponent } from './table-demo.component';
import { TableDemoRoutingModule } from './table-demo-routing.module';

@NgModule({
  declarations: [
    TableDemoComponent,
  ],
  imports: [
    BytesModule,
    DemoModule,
    QueryParamsModule,
    TableModule,
    TooltipDirectiveModule,
    TranslateModule,

    TableDemoRoutingModule,
  ],
  providers: [
    DomService,
    TooltipService,
  ],
})
export class TableDemoModule {}
