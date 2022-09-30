import { NgModule } from '@angular/core';

import { AreAllVisibleRowsSelectedPipe } from './are-all-visible-rows-selected';
import { AreAnyRowsSelectedPipe } from './are-any-rows-selected';
import { DownloadTableDataPipe } from './download-table-data';
import { GetComparatorLabelPipe } from './get-comparator-label/get-comparator-label.pipe';
import { GetTableStatePipe } from './get-table-state';
import { RemoveTableRowFormattingPipe } from './remove-table-row-formatting';
import { VisibleTableRowsPipe } from './visible-table-rows';

@NgModule({
  declarations: [
    AreAllVisibleRowsSelectedPipe,
    AreAnyRowsSelectedPipe,
    DownloadTableDataPipe,
    GetComparatorLabelPipe,
    GetTableStatePipe,
    VisibleTableRowsPipe,
    RemoveTableRowFormattingPipe,
  ],
  exports: [
    AreAllVisibleRowsSelectedPipe,
    AreAnyRowsSelectedPipe,
    DownloadTableDataPipe,
    GetComparatorLabelPipe,
    GetTableStatePipe,
    VisibleTableRowsPipe,
    RemoveTableRowFormattingPipe,
  ],
})
export class TablePipesModule {}
