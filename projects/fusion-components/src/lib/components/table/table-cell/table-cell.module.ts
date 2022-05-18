import { NgModule } from '@angular/core';

import { BodyTableCellModule } from './body-table-cell';
import { HeaderTableCellModule } from './header-table-cell';
import { TableCellComponent } from './table-cell';

@NgModule({
  declarations: [
    TableCellComponent,
  ],
  imports: [
    BodyTableCellModule,
    HeaderTableCellModule,
  ],
  exports: [
    BodyTableCellModule,
    HeaderTableCellModule,

    TableCellComponent,
  ],
})
export class TableCellModule {}
