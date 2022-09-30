import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList } from '@angular/core';

import { Location, Size, TranslatedComponent } from '../../../shared';
import { TableColumnComponent } from '../table-column/table-column.component';
import { TableColumnSelectorTranslations } from './table-column-selector.interface';

/**
 * TABLE COLUMN SELECTOR COMPONENT
 *
 * The table column selector component allows the user to control what columns are visible in the table.
 * It uses the menu component to display the list of columns.
 */
@Component({
  selector: 'f-table-column-selector',
  templateUrl: './table-column-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableColumnSelectorComponent extends TranslatedComponent {
  readonly Location = Location;
  readonly Size = Size;

  isMenuDialogOpen: boolean = false;

  /**
   * Determines the list of all the columns available to be displayed in the table.
   */
  @Input() columns: QueryList<TableColumnComponent>;

  /**
   * Determines the translations for the static text and aria attributes.
   */
  @Input() translations: TableColumnSelectorTranslations | undefined;

  /**
   * Emits the list of visible columns.
   */
  @Output() visibleColumns: EventEmitter<TableColumnComponent[]> = new EventEmitter<TableColumnComponent[]>();

  /**
   * Toggles the visibility of a column at the provided index and emits the list of visible columns.
   *
   * @param index the index of the column
   */
  updateColumnVisibility(index: number): void {
    const column: TableColumnComponent = this.columns.toArray()[index];
    column.isVisible = column.isHidable ? !column.isVisible : true;
    this.emitVisibleColumns();
  }

  /**
   * Emits only the visible columns
   */
  emitVisibleColumns(): void {
    this.visibleColumns.emit(this.columns.toArray().filter((col: TableColumnComponent) => col.isVisible));
  }

  /**
   * Tracks the column data to make ngFor more performant.
   *
   * @param index The index of the current column.
   * @param item The current column (unused).
   * @returns The provided index.
   */
  colTrackByFn(index: number, item?: TableColumnComponent): number | string {
    return item && item.field ? item.field : index;
  }
}
