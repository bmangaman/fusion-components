import { NgModule } from '@angular/core';

import {
  BytesModule,
  QueryParamsModule,
  TableModule,
  TooltipDirectiveModule,
} from '@fusion-components';
import { TranslateModule } from '@ngx-translate/core';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { TableDemoComponent } from './table-demo.component';
import { TableDemoRoutingModule } from './table-demo-routing.module';

@NgModule({
    imports: [
        BytesModule,
        DemoModule,
        QueryParamsModule,
        TableModule,
        TooltipDirectiveModule,
        TranslateModule,
        TableDemoRoutingModule,
        TableDemoComponent,
    ],
})
export class TableDemoModule {}
