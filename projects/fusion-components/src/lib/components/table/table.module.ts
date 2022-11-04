import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DownloadModule } from '../../directives/download';
import { StateDirectiveModule } from '../../directives/state';
import { TemplateModule } from '../../directives/template';
import { ObjectKeysModule } from '../../pipes/object-keys';
import { ButtonModule } from '../button';
import { LoadingSpinnerModule } from '../loading-spinner';

import { TableActionsModule } from './table-actions';
import { TableCellModule } from './table-cell';
import { TableColumnModule } from './table-column';
import { TableColumnSelectorModule } from './table-column-selector';
import { TableFilterSelectorModule } from './table-filter-selector';
import { TableFiltersModule } from './table-filters';
import { TablePaginationModule } from './table-pagination';
import { TablePipesModule } from './table-pipes';

import { TableComponent } from './table.component';

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    DownloadModule,
    LoadingSpinnerModule,
    ObjectKeysModule,
    StateDirectiveModule,
    TemplateModule,

    TableActionsModule,
    TableCellModule,
    TableColumnModule,
    TableColumnSelectorModule,
    TableFilterSelectorModule,
    TableFiltersModule,
    TablePaginationModule,
    TablePipesModule,
  ],
  declarations: [
    TableComponent,
  ],
  exports: [
    ButtonModule,
    CommonModule,
    DownloadModule,
    LoadingSpinnerModule,
    ObjectKeysModule,
    StateDirectiveModule,
    TemplateModule,

    TableActionsModule,
    TableCellModule,
    TableColumnModule,
    TableColumnSelectorModule,
    TableFilterSelectorModule,
    TableFiltersModule,
    TablePaginationModule,
    TablePipesModule,

    TableComponent,
  ],
})
export class TableModule {}
