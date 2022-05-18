import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonModule } from '@fusion-ui/fusion-components/lib/components/button';
import { MenuModule } from '@fusion-ui/fusion-components/lib/components/menu';

import { TableActionsComponent } from './table-actions.component';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    MenuModule,
    TranslateModule,
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
