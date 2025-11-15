import { ChangeDetectionStrategy, Component, DoCheck, Input } from '@angular/core';

import { get, isEqual } from 'lodash-es';
import { TableRowData } from '../../table.interface';
import { TableCellComponent } from '../table-cell/table-cell.component';


/**
 * BODY TABLE CELL COMPONENT
 *
 * The Body Table Cell component extends the Table Cell class.
 * It generates the content of the body cells of the table component.
 * It is used primarily for appending the correct CSS classes and styles to the cell.
 */
@Component({
    selector: 'f-table-cell-body',
    templateUrl: './body-table-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BodyTableCellComponent extends TableCellComponent implements DoCheck {
  fieldData: any;

  /**
   * Determines the data to be displayed in the table cell.
   */
  private _prevRowData: TableRowData;
  @Input() rowData: TableRowData;

  /**
   * The index of the table cell. Determines whether or not to make the table cell background grey or white.
   */
  private _prevIndex: number;
  @Input() index: number;

  /**
   * Checks to see if the provided inputs (rowData and index) have actually changed. If so, mark the component
   * to be checked and re-rendered.
   */
  override ngDoCheck(): void {
    super.ngDoCheck();

    let didAnythingChange: boolean = false;

    if (!isEqual(this.rowData, this._prevRowData)) {
      this._prevRowData = this.rowData;
      this.fieldData = get(this.rowData, this.col.field || '', '');
      didAnythingChange = true;
    }

    if (this.index !== this._prevIndex) {
      this._prevIndex = this.index;
      didAnythingChange = true;
    }

    if (didAnythingChange) {
      this.tableCellClasses = this.generateTableCellClasses();
      this.changeDetectorRef.markForCheck();
    }
  }

  /**
   * Generates the css classes to be appended to the table cell host component based on the provided inputs.
   * The base Table Cell class uses ngOnChanges to detect when to trigger this function.
   *
   * @returns The generated CSS classes.
   */
  override generateTableCellClasses(): string[] {
    const classes: string[] = ['f-table__table-cell', 'f-table__table-cell--body'];

    if (!!this.col?.isOverflowVisible) {
      classes.push('f-table__table-cell--overflow-visible');
    }

    if (!!this.col?.cellContentAlignment) {
      classes.push(`f-table__table-cell--${this.col.cellContentAlignment}-aligned`);
    }

    if (!!this.col?.cellContentVerticalAlignment) {
      classes.push(`f-table__table-cell--${this.col.cellContentVerticalAlignment}-aligned`);
    }

    if (!!this.col?.isTruncated) {
      classes.push('f-table__table-cell--truncated');
    }

    if (!!this.spacing) {
      classes.push(`f-table__table-cell--${this.spacing}`);
    }

    if (!!this.col?.columnCellStyleClassesFunction) {
      classes.push(...this.col.columnCellStyleClassesFunction(this.rowData));
    }

    if (!!this.index && this.index % 2 !== 0) {
      classes.push('f-table__table-cell--grey');
    }

    classes.push(...this.cssClasses);

    return classes;
  }
}
