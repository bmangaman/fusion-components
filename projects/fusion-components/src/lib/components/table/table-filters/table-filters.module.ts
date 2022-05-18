import { NgModule } from '@angular/core';

import { TableFilterArrayModule } from './table-filter-array';
import { TableFilterBytesModule } from './table-filter-bytes';
import { TableFilterComparatorModule } from './table-filter-comparator';
import { TableFilterIpModule } from './table-filter-ip';
import { TableFilterNumberModule } from './table-filter-number';
import { TableFilterStringModule } from './table-filter-string';

@NgModule({
  imports: [
    TableFilterArrayModule,
    TableFilterBytesModule,
    TableFilterComparatorModule,
    TableFilterIpModule,
    TableFilterNumberModule,
    TableFilterStringModule,
  ],
  exports: [
    TableFilterArrayModule,
    TableFilterBytesModule,
    TableFilterComparatorModule,
    TableFilterIpModule,
    TableFilterNumberModule,
    TableFilterStringModule,
  ],
})
export class TableFiltersModule {}
