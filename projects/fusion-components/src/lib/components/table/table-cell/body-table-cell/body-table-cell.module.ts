import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BodyTableCellComponent } from './body-table-cell.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BodyTableCellComponent,
  ],
  exports: [
    CommonModule,

    BodyTableCellComponent,
  ],
})
export class BodyTableCellModule {}
