import { NgModule } from '@angular/core';

import { AreAllVisibleRowsSelectedPipe } from './are-all-visible-rows-selected';
import { AreAnyRowsSelectedPipe } from './are-any-rows-selected';
import { DownloadTableDataPipe } from './download-table-data';
import { GetTableStatePipe } from './get-table-state';
import { RemoveTableRowFormattingPipe } from './remove-table-row-formatting';
import { VisibleTableRowsPipe } from './visible-table-rows';

@NgModule({
  declarations: [
    AreAllVisibleRowsSelectedPipe,
    AreAnyRowsSelectedPipe,
    DownloadTableDataPipe,
    GetTableStatePipe,
    VisibleTableRowsPipe,
    RemoveTableRowFormattingPipe,
  ],
  exports: [
    AreAllVisibleRowsSelectedPipe,
    AreAnyRowsSelectedPipe,
    DownloadTableDataPipe,
    GetTableStatePipe,
    VisibleTableRowsPipe,
    RemoveTableRowFormattingPipe,
  ],
})
export class TablePipesModule {}
