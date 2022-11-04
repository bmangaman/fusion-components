import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { BehaviorSubject, Subscription } from 'rxjs';

import { cloneDeep } from 'lodash-es';

import { Size, UnsubscribeComponent} from '@fusion-components/lib/shared';
import * as Utils from '@fusion-components/lib/shared/utilities';
import { ButtonType } from '../../button/button.interface';
import { TableRowData } from '../table.interface';
import {
  ResultsPerPageOption,
  TABLE_PAGINATION_CONFIG,
  TablePaginationConfig,
  TablePaginationEmit,
  TablePaginationTranslations,
  DEFAULT_TABLE_PAGINATION_TRANSLATIONS,
} from './table-pagination.interface';

@Component({
  selector: 'f-table-pagination',
  templateUrl: './table-pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePaginationComponent extends UnsubscribeComponent implements OnInit, OnDestroy {
  readonly ButtonType = ButtonType;
  readonly Size = Size;

  numOfPages: number = 1;
  oldNumResultsPerPage: number;
  numResultsPerPage: UntypedFormControl = new UntypedFormControl();
  currentPageIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  numSelectedRows: number;
  numDeselectableSelectedRows: number;
  numVisibleData: number;

  subscriptions: Subscription[] = [];

  /**
   * Determines whether or not the pagination section of the table is disabled.
   * Usually set to true when the table is NOT loaded and/or has NO results.
   */
  @Input() isDisabled = false;

  /**
   * Determines the text displayed for various things displayed in the pagination component:
   *  - number of results string
   *  - page navigation labels
   *  - view all for number of results per page
   */
  @Input() translations: TablePaginationTranslations = DEFAULT_TABLE_PAGINATION_TRANSLATIONS;

  /**
   * Determines the configuration of the pagination area. Provides control over the results per page select dropdown.
   */
  private _prevConfig: TablePaginationConfig;
  private _config: TablePaginationConfig = TABLE_PAGINATION_CONFIG;
  @Input()
  set config(config: TablePaginationConfig) {
    this._config = config || this._config;

    if (!!config) {
      this.setDefaultResultsPerPage();
    }
  }
  get config(): TablePaginationConfig {
    return this._config;
  }

  /**
   * Determines the data to be paginated.
   */
  private _data: TableRowData[] = [];
  @Input()
  set data(data: TableRowData[] | null) {
    this._data = data || [];
    this.updateTableData();
  }
  get data(): TableRowData[] {
    return this._data;
  }

  /**
   * Emits the updated table row data (with the 'isVisible' attribute set).
   */
  @Output() paginatedTableData: EventEmitter<TableRowData[]> = new EventEmitter<TableRowData[]>();

  /**
   * Emits the current configuration of the table pagination.
   */
  @Output() paginationChange: EventEmitter<TablePaginationEmit> = new EventEmitter<TablePaginationEmit>();

  /**
   * Emits that the deselect all button was clicked.
   */
  @Output() deselectAll: EventEmitter<any> = new EventEmitter<TablePaginationComponent>();

  /**
   * On component load:
   *  - set the default number of results and select it;
   *  - subscribe to when the current page index is changed to kick off updating the table data.
   *  - subscribe to when the number of results is changed and reset the current page index to 0.
   */
  ngOnInit(): void {
    this.setDefaultResultsPerPage();

    const currentPageIndexSub: Subscription = this.currentPageIndex.subscribe(() => this.updateTableData());

    const numResultsPerPageSub: Subscription = this.numResultsPerPage.valueChanges.subscribe((numResultsPerPage: number) => {
      if (numResultsPerPage !== this.oldNumResultsPerPage) {
        this.oldNumResultsPerPage = numResultsPerPage;
        this.updateCurrentPageIndex(0);
        this.updateTableData();
      }
    });

    this.subscriptions.push(currentPageIndexSub, numResultsPerPageSub);
  }

  /**
   * On component unload, unsubscribe from all active subscriptions.
   */
  override ngOnDestroy(): void {
    Utils.unsubscribeAll(this.subscriptions);
  }

  /**
   * Sets the default number of results per page option.
   * If a default option is set via the provided config, use that option, otherwise, just use the first option.
   */
  setDefaultResultsPerPage(): void {
    const defaultOption: ResultsPerPageOption | undefined = this.config.resultsPerPageOptions.find((option: ResultsPerPageOption) => option.isDefault);
    this.numResultsPerPage.setValue((defaultOption ? defaultOption.value : this.config.resultsPerPageOptions[0].value));
  }

  /**
   * Updates the current page index with the provided index input. Used with the page buttons.
   *
   * @param index The index of the page to be set as the current.
   */
  updateCurrentPageIndex(index: number): void {
    this.currentPageIndex.next(index);
  }

  /**
   * Updates the final table data visibility by:
   *  1. calculating the total number of pages based on the provided data
   *  2. calculating the starting and ending page indexes based on the total number of pages and current page index
   *  3. setting the 'isVisible' attribute of the table data base on whether or not it falls within the starting and ending page indexes.
   *  4. emitting the updated table data and pagination configuration.
   */
  updateTableData(): void {
    const newData: TableRowData[] = cloneDeep(this.data);

    // Check to see if any data has been filtered
    const isFiltered: boolean = newData.some((d: TableRowData) => d.isFiltered);

    // If data has been filtered then set the availableData to the rows that are not filtered out.
    // Otherwise set availableData to be the same as newData.
    const availableData: TableRowData[] = isFiltered ? newData.filter((d: TableRowData) => !d.isFiltered) : newData;
    const numOfResults: number = this.numResultsPerPage.value === -1 ? availableData.length : this.numResultsPerPage.value;

    this.numOfPages = Math.ceil(availableData.length / numOfResults);

    // If our current page index ever exceeds are number of pages then we must set it to be in bounds.
    const highestPageIndex: number = this.numOfPages ? this.numOfPages - 1 : 0;
    if (this.currentPageIndex.value > highestPageIndex) {
      this.currentPageIndex.next(highestPageIndex);
    }

    const startingIndex: number = this.currentPageIndex.value * numOfResults;
    const endingIndex: number = startingIndex + numOfResults;

    // We only care about setting the isVisible property for available data (IE: the data that can still be shown). All the other rows
    // will be hidden from the isFiltered property.
    availableData.forEach((data: TableRowData, index: number) => {
      data.isVisible = index >= startingIndex && index < endingIndex;
    });

    this.numVisibleData = availableData.length;

    const selectedRows: TableRowData[] = newData.filter((d: TableRowData) => d.isSelected && !d.isNotInView);
    this.numSelectedRows = selectedRows.length;
    this.numDeselectableSelectedRows = selectedRows.filter((d: TableRowData) => d.isSelectable).length;

    if (this._prevConfig !== this._config) {
      this.paginationChange.emit({
        config: this.config,
        numOfPages: this.numOfPages,
        oldNumResultsPerPage: this.oldNumResultsPerPage,
        numResultsPerPage: this.numResultsPerPage.value,
        currentPageIndex: this.currentPageIndex.value,
      });

      this._prevConfig = this._config;
    }

    // Always emit the newData so we do not lose selection info.
    this.paginatedTableData.emit(newData);
  }
}
