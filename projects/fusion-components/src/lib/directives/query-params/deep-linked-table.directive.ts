import { AfterViewInit, ChangeDetectorRef, Directive, forwardRef, Inject, OnDestroy, Optional } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { isEqual } from 'lodash-es';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import {
  TableColumnComponent,
  TableColumnConfig,
  TableColumnSorted,
  TableComponent,
  TableFilterComponent,
  TableFilterConfig,
  TableView,
} from '@fusion-components/lib/components/table';
import { Utilities } from '@fusion-components/lib/shared/utilities';
import { TableQueryParamsParser } from './table-query-params-parser';
import { AppliedSort, ParamData } from './table-query-params-parser.interface';

/**
 * This directive should and can only be used on a f table component.
 *
 *
 * Usage:
 *
 *   <f-table
 *   fusionUiDeepLinkedTable
 *   ...
 *   ...>
 *   </f-table>
 */

@Directive({
    selector: '[fusionUiDeepLinkedTable]',
    standalone: false
})
export class DeepLinkedTableDirective implements AfterViewInit, OnDestroy {

  noTableErrorMsg = 'This directive must be placed on a f table component.';
  initialized: boolean = false;

  allColumns: TableColumnComponent[] = [];
  allColumnVisibleFields: string[] = [];
  allFilters: TableFilterComponent[] = [];
  defaultFilters: TableFilterConfig[] = [];
  allViews: TableView[] = [];
  defaultView: TableView;
  defaultSort: AppliedSort;

  paramData: ParamData = {
    filters: [],
    sort: undefined,
    columns: [],
    view: undefined
  };

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Optional() @Inject(forwardRef(() => TableComponent)) private table?: TableComponent) {
  }

  ngAfterViewInit(): void {
    if (this.table) {
      this.init();
      this.getQueryParamData();
      this.setupChangeListeners();
    } else {
      throw new Error(this.noTableErrorMsg);
    }
  }

  ngOnDestroy(): void {
    Utilities.unsubscribeSubject(this._destroy$);
  }

  /**
   * Gets the query param values from the url along with data needed from the table.
   * Data needed from the table:
   *  filters so the parser can validate and find the correct filter comparator.
   *  columns so the parser can validate columns and make sure we are still showing non-hidable columns.
   *
   *  In the event that defaultFields is not supplied by the parent component the defaultFields will be all columns.
   */
  getQueryParamData(): void {
    // eslint-disable-next-line complexity
    this.route.queryParams.pipe(take(1)).subscribe((qParams: Params) => {
      let hasChanges = false;

      if (qParams['view']) {
        this.paramData.view = TableQueryParamsParser.getViewFromQueryParams(qParams['view'], this.allViews);
        if (this.paramData.view) {
          // If no valid filters were parsed then don't update.
          this.table!.appliedTableView = this.paramData.view;
        }
        hasChanges = true;
      }

      if (qParams['filters']) {
        this.paramData.filters = TableQueryParamsParser.getFiltersFromQueryParams(qParams['filters'], this.allFilters);
        if (this.paramData.filters.length) {
          // If no valid filters were parsed then don't update.
          this.table!.appliedFilters = this.paramData.filters;
        }
        hasChanges = true;
      }

      if (qParams['sort']) {
        this.paramData.sort = TableQueryParamsParser.getSortFromQueryParams(qParams['sort'], this.allColumns);
        hasChanges = true;
      }

      // Since the sort is stored in the column configs we must update the columns if either the sort or the columns have been provided.
      if (qParams['columns'] || this.paramData.sort) {
        const columns = TableQueryParamsParser.getColumnsFromQueryParams(
          qParams['columns'], this.allColumns, this.paramData.sort ?? this.defaultSort);

        this.table!.defaultColumns = columns;

        if (!this.isDefaultColumns(columns)) {
          // If the parsed columns are different than the default columns then update the param data.
          this.paramData.columns = columns;
          hasChanges = true;
        }
      }

      if (hasChanges) {
        // Update the query params in the cases where some pieces were invalid and need to be removed from the URL.
        this.updateQueryParams(this.paramData);
      }
      // Since we are possibly changing values of the table during it's initialization we must notify the change detector of
      // those changes accordingly.
      this.cdr.detectChanges();
    });
  }

  /**
   * Method that subscribes to all the relevant event emitters on the table and uses their outputs to update the query params.
   */
  setupChangeListeners(): void {
    this.table!.filterChange.pipe(takeUntil(this._destroy$)).subscribe(filters => this.handleFiltersChange(filters));
    this.table!.columnVisibilityChange.pipe(takeUntil(this._destroy$)).subscribe(columns => this.handleColumnsChange(columns));
    this.table!.sortChange.pipe(takeUntil(this._destroy$)).subscribe(sort => this.handleSortChange(sort));
    this.table!.viewChange.pipe(takeUntil(this._destroy$)).subscribe(view => this.handleViewChange(view));
  }

  /**
   * Method to handle filter changes. If all new filters are the same as the default one then don't set them.
   *
   * @param filters the new filters.
   */
  handleFiltersChange(filters: TableFilterConfig[]): void {
    // Grab all filters that aren't view filters.
    const nonViewFilters = filters.filter(f => !f.isViewFilter);
    // Map each filter (default and new) to have "field" and "value" and then sort them.
    const mappedDefaultFilters = this.defaultFilters.map(df => ({ field: df.field, value: df.formValues })).sort();
    const mappedNewFilters = nonViewFilters.map(df => ({ field: df.field, value: df.formValues })).sort();
    if (this.defaultFilters.length === nonViewFilters.length && isEqual(mappedNewFilters, mappedDefaultFilters)) {
      this.paramData.filters = [];
    } else {
      this.paramData.filters = nonViewFilters;
    }
    this.updateQueryParams(this.paramData);
  }

  /**
   * Method to handle sort changes. If sort is the same as the defaultSort then we know we have no sort set.
   *
   * @param sort the new sorts.
   */
  handleSortChange(sort: TableColumnConfig): void {
    const newSort: AppliedSort = {
      field: sort.field!,
      order: sort.sorted === TableColumnSorted.ASCENDING ? -1 : 1
    };

    if (isEqual(this.defaultSort, newSort)) {
      this.paramData.sort = undefined;
    } else {
      this.paramData.sort = newSort;
    }
    this.updateQueryParams(this.paramData);
  }

  /**
   * Method to handle column changes. If every column is the same as in the defaultFields array then we know we have no columns set.
   *
   * @param columns the new columns.
   */
  handleColumnsChange(columns: TableColumnConfig[]): void {
    if (this.isDefaultColumns(columns)) {
      this.paramData.columns = [];
    } else {
      this.paramData.columns = columns;
    }
    this.updateQueryParams(this.paramData);
  }

  /**
   * Method to handle view changes. If the view is the same as the one set at load then do not set it to be stored in query params.
   *
   * @param view the new view.
   */
  handleViewChange(view: TableView): void {
    if (isEqual(this.defaultView, view)) {
      this.paramData.view = undefined;
    } else {
      this.paramData.view = view;
    }
    // Since view changes reset column visibility we also must reset the column query params.
    this.paramData.columns = [];
    this.updateQueryParams(this.paramData);
  }

  /**
   * Method for updating the query params in the url. Uses the paramData object that is updated whenever something changes.
   *
   * @param paramData
   */
  private updateQueryParams(paramData: ParamData): void {
    this.router.navigate([this.router.url.split('?')[0]], {
      replaceUrl: true,
      queryParams: TableQueryParamsParser.createQueryParams(paramData, this.allFilters)
    });
  }

  /**
   * Setup the allColumns, allFilters, allViews, and sets the default values for filters, sort, columns, and view.
   *
   * @private
   */
  private init(): void {
    this.allColumns = this.table!.columns.toArray();
    this.allFilters = this.table!.filters.toArray();
    this.allViews = this.table!.tableViews;
    this.allColumnVisibleFields = this.allColumns.filter(c => c.isVisible).map(c => c.field);
    // Grab all the visible columns.
    this.defaultView = this.table!.appliedTableView;
    // Grab any default applied quick filters and any other filters that were applied.
    this.defaultFilters = [
      ...(this.table!.quickFilters?.filter(qf => qf.isApplied) ?? []),
      ...(this.table!.appliedFilters?.filter(af => af.isApplied) ?? []),
    ];
    this.defaultSort = this.getDefaultSort();
  }

  /**
   * Method for extracting the column that has been sorted by default. This is used to later on to decide if a sort should be stored in the
   * query params or not (if it's the same as the default it won't be stored).
   *
   * @private
   */
  private getDefaultSort(): AppliedSort {
    const sortColumn: TableColumnComponent | undefined = this.allColumns.find(column => column.sorted !== undefined);
    return {
      field: sortColumn?.field || '',
      order: sortColumn?.sorted === TableColumnSorted.ASCENDING ? -1 : 1
    };
  }

  /**
   * Compares the an array of columns with the default columns to see if they differ. Since the default columns filter out non-visible
   * columns we must also filter the array for non-visible columns.
   *
   * @param columns The array of columns to compare with the default columns.
   */
  private isDefaultColumns(columns: TableColumnConfig[]): boolean {
    // The default columns member is filtered so we must filter these columns as well.
    const filteredColumns = columns.filter(c => c.isVisible);
    let defaultColumnFields: string [];

    if (this.table!.appliedTableView?.columns) {
      defaultColumnFields = this.table!.appliedTableView.columns.filter(c => c.isVisible).map(c => c.field!) || [];
    } else {
      defaultColumnFields = this.allColumnVisibleFields;
    }

    return defaultColumnFields.length === filteredColumns.length &&
      defaultColumnFields.every(dcf => filteredColumns.map(c => c.field).includes(dcf));
  }
}
