import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderTableCellComponent } from './header-table-cell.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [
    HeaderTableCellComponent,
  ],
  exports: [
    CommonModule,

    HeaderTableCellComponent,
  ],
})
export class HeaderTableCellModule {}
