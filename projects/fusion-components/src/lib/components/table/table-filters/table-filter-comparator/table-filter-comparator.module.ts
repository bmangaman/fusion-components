import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TablePipesModule } from '../../table-pipes';
import { TableFilterComparatorComponent } from './table-filter-comparator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TablePipesModule,
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
