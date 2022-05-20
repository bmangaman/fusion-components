import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateModule } from '@fusion-components/lib/directives/template';
import { TableColumnComponent } from './table-column.component';

@NgModule({
  imports: [
    CommonModule,
    TemplateModule,
  ],
  declarations: [
    TableColumnComponent,
  ],
  exports: [
    CommonModule,
    TemplateModule,

    TableColumnComponent,
  ],
})
export class TableColumnModule {}
