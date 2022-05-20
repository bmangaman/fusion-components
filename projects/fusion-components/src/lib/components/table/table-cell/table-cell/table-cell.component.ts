import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, HostBinding, Input } from '@angular/core';

import { isEqual } from 'lodash';

import { FusionComponentsTranslationService } from '@fusion-components/lib/services';
import { TranslatedComponent } from '@fusion-components/lib/shared';
import { TableCellTranslations, TableColumnConfig, TableSpacing } from '../../table.interface';

/**
 * TABLE CELL
 *
 * The Table Cell class is used by the Body Table Cell and Header Table Cell components.
 * It contains the shared inputs and CSS class/ styling generation logic to ensure both components
 * behave similarly.
 */
@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellComponent extends TranslatedComponent implements DoCheck {
  tableCellClasses: string[] = [];

  /**
   * Determines the column used to determines the state of the table cell.
   */
  prevCol: TableColumnConfig;
  @Input() col: TableColumnConfig;

  /**
   * Determines the spacing (padding) of the table cell.
   */
  prevSpacing: TableSpacing;
  @Input() spacing: TableSpacing;

  /**
   * Determines whether or not a table cell is used for non-data content, such as:
   *  - row expansion
   *  - row selection
   *  - row actions
   * Setting this to true displays the projected content instead of the provided column template
   * or rowData value(s).
   */
  prevShouldProjectContent: boolean;
  @Input() shouldProjectContent: boolean;

  /**
   * Determines the static text used in the table cell component.
   */
  prevTranslations: TableCellTranslations;
  @Input() translations: TableCellTranslations;

  /**
   * Allows for custom CSS classes to be appended to the host component element.
   */
  prevCssClasses: string[];
  @Input() cssClasses: string[] = [];

  @HostBinding('class')
  get hostClasses(): string {
    return this.tableCellClasses.join(' ');
  }

  @HostBinding('style.width')
  get hostWidth(): string {
    return this.col?.updatedWidth || this.col?.width || '';
  }

  @HostBinding('style.minWidth')
  get hostMinWidth(): string {
    return this.col?.minWidth || '';
  }

  @HostBinding('attr.role')
  get role(): string {
    return 'cell';
  }

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected _translationService: FusionComponentsTranslationService,
  ) {
    super(_translationService);
  }

  /**
   * Checks to see if the provided inputs have actually changed. If so, mark the component
   * to be checked and re-rendered.
   */
  ngDoCheck(): void {
    let didAnythingChange: boolean = false;

    if (!isEqual(this.cssClasses, this.prevCssClasses)) {
      this.prevCssClasses = this.cssClasses;
      didAnythingChange = true;
    }

    if (this.spacing !== this.prevSpacing) {
      this.prevSpacing = this.spacing;
      didAnythingChange = true;
    }

    if (this.shouldProjectContent !== this.prevShouldProjectContent) {
      this.prevShouldProjectContent = this.shouldProjectContent;
      didAnythingChange = true;
    }

    if (!isEqual(this.translations, this.prevTranslations)) {
      this.prevTranslations = this.translations;
      didAnythingChange = true;
    }

    if (!isEqual(this.col, this.prevCol)) {
      this.prevCol = this.col;
      didAnythingChange = true;
    }

    if (didAnythingChange) {
      this.tableCellClasses = this.generateTableCellClasses();
      this.changeDetectorRef.markForCheck();
    }
  }

  /**
   * Generates the CSS classes to be appended to the table cell based on the provided inputs.
   * Implemented in the body-table-cell and header-table-cell components.
   *
   * @returns The generated CSS classes.
   */
  generateTableCellClasses(): string[] {
    return [];
  }
}
