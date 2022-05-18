import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonModule } from '@fusion-ui/fusion-components/lib/components/button';
import { MenuModule } from '@fusion-ui/fusion-components/lib/components/menu';

import { TableColumnSelectorComponent } from './table-column-selector.component';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    MenuModule,
    TranslateModule,
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
