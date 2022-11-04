import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '@fusion-components/lib/components/button';
import { MenuModule } from '@fusion-components/lib/components/menu';

import { TableColumnSelectorComponent } from './table-column-selector.component';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    MenuModule,
  ],
  declarations: [
    TableColumnSelectorComponent,
  ],
  exports: [
    ButtonModule,
    CommonModule,
    MenuModule,

    TableColumnSelectorComponent,
  ],
})
export class TableColumnSelectorModule {}
