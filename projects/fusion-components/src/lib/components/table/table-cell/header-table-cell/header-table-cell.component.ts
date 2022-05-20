import { ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';

import { TableColumnConfig, TableColumnSorted } from '../../table.interface';
import { TableCellComponent } from '../table-cell/table-cell.component';

export interface ResizeCoordinates {
  start: number;
  stop: number;
}

/**
 * HEADER TABLE CELL COMPONENT
 *
 * The Header Table Cell component generates the content of the header cells of the table component.
 * It has logic to allow both ascending and descending sorting of the column, if sorting is enabled.
 */
@Component({
  selector: 'f-table-cell-header',
  templateUrl: './header-table-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTableCellComponent extends TableCellComponent implements DoCheck {
  readonly TableColumnSorted = TableColumnSorted;

  private _isResizing: boolean;
  get isResizing(): boolean {
    return this._isResizing;
  }
  private _resizeCoordinates: ResizeCoordinates = { start: undefined!, stop: undefined! };

  /**
   * Determines whether or not the table cell will stick to the top (position: sticky).
   */
  private _prevIsSticky: boolean;
  @Input() isSticky: boolean;

  /**
   * Whenever the table cell is clicked, emit an event to update the sorting of the table data.
   */
  @Output() sort: EventEmitter<TableColumnConfig> = new EventEmitter<TableColumnConfig>();

  /**
   * Whenever the column resizer is clicked, emit an event to let the table component know to display the indicator.
   */
  @Output() startResize: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Whenever the column resize was clicked and then the mouse is released, emit an event to let the table
   * component know to update the column updatedWidth value and to hide the column indicator.
   */
  @Output() stopResize: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Checks to see if the provided inputs (rowData and index) have actually changed. If so, mark the component
   * to be checked and re-rendered.
   */
  override ngDoCheck(): void {
    super.ngDoCheck();

    let didAnythingChange: boolean = false;

    if (this.isSticky !== this._prevIsSticky) {
      this._prevIsSticky = this.isSticky;
      didAnythingChange = true;
    }

    if (didAnythingChange) {
      this.tableCellClasses = this.generateTableCellClasses();
      this.changeDetectorRef.markForCheck();
    }
  }

  /**
   * When the column resizer button is clicked and held (mousedown)
   *  - record the current location of the mouse
   *  - set the isResizing flag to true
   *  - emit to the table component that a column resize has started
   *
   * @param event The mousedown event (that contains the mouse coordinates on the page).
   */
  startResizing(event: MouseEvent): void {
    this._resizeCoordinates.start = event.pageX;
    this._isResizing = true;
    this.startResize.emit();
  }

  /**
   * When the column resizer has been clicked, held, and then released (mouseup)
   *  - record the current location of the mouse
   *  - calculate the new width of the column
   *  - emit to the table componen the new updatedwidth of the column
   *  - set the isResizing flag to false
   *
   * @param event The mouseup event (that contains the mouse coordinates on the page).
   */
  stopResizing(event: MouseEvent): void {
    if (this.isResizing) {
      this._resizeCoordinates.stop = event.pageX;
      const difference: number = this._resizeCoordinates.stop - this._resizeCoordinates.start;
      const updatedWidth = `${parseInt(this.col.updatedWidth || this.col.width || '0', 10) + difference}px`;
      this.stopResize.emit(updatedWidth);
      this._isResizing = false;
    }
  }

  /**
   * Updates the table sorting by emitting which column is to be sorted and the direction (ascending or descending).
   */
  changeSort(): void {
    if (!!this.col) {
      this.sort.emit({
        ...this.col,
        sorted: this.col.sorted === TableColumnSorted.ASCENDING ? TableColumnSorted.DESCENDING : TableColumnSorted.ASCENDING,
      });
    }
  }

  /**
   * Generates the css classes to be appended to the table cell based on the provied inputs
   *
   * @returns the generate css classes
   */
  // eslint-disable-next-line complexity
  override generateTableCellClasses(): string[] {
    const classes: string[] = ['f-table__table-cell', 'f-table__table-cell--header'];

    if (!!this.col?.cellContentAlignment) {
      classes.push(`f-table__table-cell--${this.col.cellContentAlignment}-aligned`);
    }

    if (!!this.col?.cellContentVerticalAlignment) {
      classes.push(`f-table__table-cell--${this.col.cellContentVerticalAlignment}-aligned`);
    }

    if (!!this.col?.isOverflowVisible || !!this.col?.isResizable) {
      classes.push('f-table__table-cell--overflow-visible');
    }

    if (this.col?.isSortable) {
      classes.push('f-table__table-cell--sortable');
    }

    if (!!this.col?.sorted) {
      classes.push('f-table__table-cell--sorted');
    }

    if (!!this.col?.isFiltered) {
      classes.push('f-table__table-cell--filtered');
    }

    if (!!this.col?.isResizable) {
      classes.push('f-table__table-cell--resizable');
    }

    if (this.isSticky) {
      classes.push('f-table__table-cell--sticky');
    }

    if (!!this.spacing) {
      classes.push(`f-table__table-cell--${this.spacing}`);
    }

    classes.push(...this.cssClasses);

    return classes;
  }
}
