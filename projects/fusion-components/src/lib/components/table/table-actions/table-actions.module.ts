import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '@fusion-components/lib/components/button';
import { MenuModule } from '@fusion-components/lib/components/menu';

import { TableActionsComponent } from './table-actions.component';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    MenuModule,
  ],
  declarations: [
    TableActionsComponent,
  ],
  exports: [
    ButtonModule,
    CommonModule,
    MenuModule,

    TableActionsComponent,
  ],
})
export class TableActionsModule {}
