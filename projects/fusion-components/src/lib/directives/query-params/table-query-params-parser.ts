import { Params } from '@angular/router';
import {
  FilterComparator,
  TableColumnComponent,
  TableColumnConfig,
  TableColumnSorted,
  TableFilterComponent,
  TableFilterConfig,
  TableView,
} from '@fusion-ui/fusion-components/lib/components/table';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppliedSort, ParamData } from './table-query-params-parser.interface';

export class TableQueryParamsParser {

  /**
   * Filters are in a structure of 'field:comparatorString:value' where value can be a string, number or object. Multiple filters
   * are separated by a comma (,). Each filter string will lookup it's FilterComparator using it's field and comparatorString. Then it will
   * use that object to create it's displayString. Any Filters that fail validation checks will be excluded.
   */
  static getFiltersFromQueryParams(filtersParamString: string, allFilters: TableFilterComponent[]): TableFilterConfig[] {
    const filters: TableFilterConfig[] = [];
    // Split the filters param by the comma (that contain an even number of backslashes before them).
    const filterStrings: string[] = TableQueryParamsParser.splitFiltersString(filtersParamString);
    // eslint-disable-next-line complexity
    filterStrings.forEach(filterString => {
      // Split each filter string by the colon (excluding ones with a '\' preceding it).
      const filterParts: string[] = TableQueryParamsParser.getFilterParts(filterString);

      // There must be at least 2 or 3 filter parts for a valid filter. A filter with 2 parts is usually a filter with a
      // comparator of isEmpty or isNotEmpty.
      if (filterParts.length !== 2 && filterParts.length !== 3) {
        return;
      }

      const field: string = filterParts[0];
      const comparatorName: string = filterParts[1];
      // There must be a filter directive for the field name
      const foundFilter: TableFilterComponent = allFilters.find(f => f.field === field);
      if (!foundFilter) {
        return;
      }

      // There must be a comparator that matches the comparatorName
      const foundComparator: FilterComparator = foundFilter.filterComparators.find(c => c.name === comparatorName);

      if (!foundComparator) {
        return;
      }

      // The filter string must only have data when it's necessary otherwise it is invalid.
      if (!foundComparator.hasData && filterParts[2]) {
        return;
      }

      // The filter must have data when necessary otherwise it is invalid.
      if (foundComparator.hasData && !filterParts[2]) {
        return;
      }

      foundFilter.selectedFilterComparator.next(foundComparator);

      try {
        // Use the decode function from the FilterComparator to get the data from the string.
        const data: any = foundComparator.hasData ? foundComparator.decodeQueryParam(filterParts[2]) : null;
        filters.push(
          {
            filter: foundFilter.TableFilter,
            filterName: '',
            field,
            comparatorName,
            formValues: data,
            label: TableQueryParamsParser.getDisplayString(foundComparator, data)
          });
      } catch (e) {
        return;
      }
    });

    return filters;
  }

  /**
   * Sorts are in a structure of 'field:order' where order is always a number.
   */
  static getSortFromQueryParams(sortParamString: string, allColumns: TableColumnComponent[]): AppliedSort {
    const values = /^([^:]+):(-?1)$/.exec(sortParamString);

    // A valid sort string must contain 2 parts separated by a ':' and have it's field match some column's field.
    if (values?.length !== 3 || !allColumns.map(c => c.field).includes(values[1])) {
      return;
    }
    return { field: values[1], order: Number(values[2]) };
  }

  /**
   * Method to modify the columns from the table to have the correct sort and isVisible values. If the column fields are in the query
   * params then those columns are visible. Also accounts for columns that can't be hidden and if we are showing the default columns.
   *
   * NOTE: This method may be called even if there is no columns query param. That is because when a sort is set we must update the column
   * configs to have the correct 'sorted' member.
   *
   * @param columnsParamString
   * @param allColumns
   * @param sort
   */
  static getColumnsFromQueryParams(
    columnsParamString: string = '',
    allColumns: TableColumnComponent[],
    sort: AppliedSort
  ): TableColumnConfig[] {
    const getSortedType = (order: number): TableColumnSorted =>
      order === 1 ? TableColumnSorted.DESCENDING : TableColumnSorted.ASCENDING;

    const getIsVisible = (column: TableColumnComponent, columnsFieldsToShow: string[]) => {
      // Check if there are any validColumns.
      if (columnsFieldsToShow.length) {
        // Only hide the column if it can be hidden and it is present in the list of valid columns.
        return column.isHidable ? !!columnsFieldsToShow.find(cf => cf === column.field) : column.isVisible;
      } else {
        // If all the query params columns are invalid then return the currently visible columns.
        return column.isVisible;
      }
    };

    const queryParamColumns: string[] = columnsParamString.split(',');

    // Columns in the query param column string must match a field.
    const validColumns = queryParamColumns.filter(c => allColumns.some(ac => ac.field === c));

    return allColumns.map(column =>
      ({
        ...column,
        sorted: column.field === sort.field ? getSortedType(sort.order) : null,
        isVisible: getIsVisible(column, validColumns)
      }));
  }

  /**
   * Returns the view that has a matching name with the query param string. Returns null if none is found.
   *
   * @param viewParamString
   * @param allViews
   */
  static getViewFromQueryParams(viewParamString: string, allViews: TableView[]): TableView {
    return allViews.find(view => view.name === viewParamString);
  }

  /**
   * Utility method to get the displayString for a FilterComparator and its data. If the comparator does not have a function to make the
   * display string then it will use a generic pattern for creating it.
   *
   * @param comparator
   * @param data
   */
  static getDisplayString(comparator: FilterComparator, data: any): string | Observable<string> {
    if (comparator?.displayString) {
      return comparator.displayString(data);
    } else {
      if (comparator?.label instanceof Observable) {
        return comparator.label.pipe(switchMap((l: string) => `${l} ${data || ''}`));
      } else {
        return `${comparator?.label} ${data || ''}`;
      }
    }
  }

  /**
   * Creates the Params object to be used with the Angular router. Each type of param data will call it's corresponding function to map to
   * a string. The param is only included if the string created is not empty.
   *
   * @param parsedData
   * @param allFilters
   */
  static createQueryParams(parsedData: ParamData, allFilters: TableFilterComponent[]): Params {
    const params: Params = {};

    if (!parsedData.filters.length && !parsedData.columns.length && !parsedData.sort && !parsedData.view) {
      return params;
    }
    const filtersString: string = parsedData.filters.map(f => TableQueryParamsParser.filterToParam(f, allFilters)).join(',');
    const sortString: string = TableQueryParamsParser.sortToParam(parsedData.sort);
    const columnsString: string = parsedData.columns.filter(c => c.isVisible).map(c => c.field).join(',');
    const viewString: string = parsedData.view?.name;

    if (filtersString) {
      params.filters = filtersString;
    }

    if (columnsString) {
      params.columns = columnsString;
    }

    if (sortString) {
      params.sort = sortString;
    }

    if (viewString) {
      params.view = viewString;
    }

    return params;
  }

  /**
   * Converts an TableFilterConfig into its string representation. Uses the FilterComparator's encode function to handle complex data
   * appropriately. If the encode function does not return data then the last part is omitted.
   *
   * @param filter
   * @param allFilters
   */
  private static filterToParam(filter: TableFilterConfig, allFilters: TableFilterComponent[]): string {
    const foundFilter = allFilters.find(f => f.field === filter.field);
    const comparator: FilterComparator = foundFilter?.filterComparators.find(c => c.name === filter.comparatorName);
    let param = `${filter.field}:${filter.comparatorName}`;
    const encodeData: string = comparator.encodeQueryParam(filter.formValues);
    if (encodeData) {
      param = `${param}:${encodeData}`;
    }

    return param;
  }

  /**
   * Converts an AppliedSort into its string representation.
   *
   * @param sort
   */
  private static sortToParam(sort: { field: string, order: number }): string {
    return sort ? `${sort.field}:${sort.order}` : '';
  }

  /**
   * For each index split out the full string and push it to an array.
   *
   * @param fullString the full string to split out.
   * @param splitIndices the indices to split at.
   */
  static splitOnIndices(fullString: string, splitIndices: number[]): string[] {
    const splitStrings: string[] = [];

    let previousIndex = 0;
    splitIndices.forEach(index => {
      splitStrings.push(fullString.substring(previousIndex, index));
      previousIndex = index + 1;
    });
    // Add the last part of the string.
    splitStrings.push(fullString.substring(previousIndex));

    return splitStrings;
  }

  /**
   * Function to split up the filters param string. The regex was too complex to use the split method. This split method will split the
   * string on any commas that are either not preceded by a backslash at all or are preceded by an even number of backslash characters
   * (which could happen if a user inputs a string with the last character(s) being backslashes.
   *
   * @param filtersParamString the string to split up.
   */
  private static splitFiltersString(filtersParamString: string): string[] {
    // If the string contains no comma's then it is a single filter and does not need split.
    if (filtersParamString.indexOf(',') === -1) {
      return [filtersParamString];
    }

    const regex = RegExp(/,/g);
    const indices: number[] = [];
    let val: RegExpExecArray = regex.exec(filtersParamString);

    while (val !== null) {
      if (val.index === 0) { return []; }
      let numberOfEscapeCharacters = 0;
      let j: number = val.index - 1;
      while (filtersParamString[j] === '\\') {
        numberOfEscapeCharacters++;
        j--;
      }

      /**
       * If the number of backslashes before the , is an even number then we know it's not an escaped comma.
       *
       * Exampe:
       * stringField:contains:inputValue\\,stringField:is:host\,name would be equal to these 2 filters:
       * {
       *   field: 'stringField',
       *   comparatorName: 'contains',
       *   formValues: {string: 'inputValue\'}
       * }
       * and
       * {
       *   field: 'stringField',
       *   comparatorName: 'is',
       *   formValues: {string: 'host,name'}
       * }
       *
       * The first comma is a separator while the 2nd comma is an escaped comma in the input.
       */
      if (numberOfEscapeCharacters % 2 === 0) {
        indices.push(val.index);
      }
      val = regex.exec(filtersParamString);
    }

    return TableQueryParamsParser.splitOnIndices(filtersParamString, indices);
  }

  /**
   * Function to split up individual filter strings. The simple regex of using a negative lookbehind was not supported in Firefox. This
   * method will split each filter string on a ':' character as long as the previous character is not a '\' (escape character).
   *
   * @param filterString the string to split on ':'
   */
  private static getFilterParts(filterString: string): string[] {
    // If the string contains no colon's then it is invalid and has no parts.
    if (filterString.indexOf(':') === -1) {
      return [];
    }

    const regex = RegExp(/:/g);
    const indices: number[] = [];
    let val: RegExpExecArray = regex.exec(filterString);

    while (val !== null) {
      if (val.index === 0) { return []; }

      const prevChar: string = filterString[val.index - 1];
      if (prevChar !== '\\') {
        indices.push(val.index);
      }
      val = regex.exec(filterString);
    }

    return TableQueryParamsParser.splitOnIndices(filterString, indices);
  }
}
