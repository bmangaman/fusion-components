import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { InstanceOfModule } from '@fusion-ui/fusion-components/lib/pipes/instance-of';
import { TableFilterComparatorComponent } from './table-filter-comparator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InstanceOfModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [
    TableFilterComparatorComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TableFilterComparatorComponent,
  ],
})
export class TableFilterComparatorModule {}
