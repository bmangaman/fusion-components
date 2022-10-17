import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TablePipesModule } from '../../table-pipes';
import { TableFilterComparatorComponent } from './table-filter-comparator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TablePipesModule,
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
