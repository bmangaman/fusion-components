import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderTableCellComponent } from './header-table-cell.component';

@NgModule({
  imports: [
    CommonModule,
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
