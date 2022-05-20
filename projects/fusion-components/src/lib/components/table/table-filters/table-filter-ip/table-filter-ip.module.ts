import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { EnumToArrayModule } from '@fusion-components/lib/pipes';
import { TableFilterModule } from '../table-filter';
import { TableFilterComparatorModule } from '../table-filter-comparator';
import { TableFilterIpComponent } from './table-filter-ip.component';

@NgModule({
  imports: [
    CommonModule,
    EnumToArrayModule,
    FormsModule,
    ReactiveFormsModule,
    TableFilterComparatorModule,
    TableFilterModule,
    TranslateModule,
  ],
  declarations: [
    TableFilterIpComponent,
  ],
  exports: [
    CommonModule,
    EnumToArrayModule,
    FormsModule,
    ReactiveFormsModule,
    TableFilterComparatorModule,
    TableFilterModule,

    TableFilterIpComponent,
  ],
  entryComponents: [
    TableFilterIpComponent,
  ],
})
export class TableFilterIpModule {}
