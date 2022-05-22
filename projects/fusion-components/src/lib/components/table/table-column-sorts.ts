/**
 * This file contains common sorting functionality for the Table columns.
 */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { get } from 'lodash';
import { TableColumnSorted, TableRowData } from './table.interface';

export type TableColumnSort =
  (a: TableRowData, b: TableRowData, fieldName: string, direction?: TableColumnSorted, locale?: string) => number;

/**
 * Sorts data, not columns. Usually chained within a Sort.
 */
type DataSort = (first: any, second: any, locale?: string) => number;

/**
 * Case-sensitive sort which always places null/undefined values at the end.
 *
 * @param a {TableRowData} the first data row
 * @param b {TableRowData} the second data row
 * @param fieldName {string} the field being sorted
 * @param direction {TableColumnSorted} the sort direction; default DESCENDING
 * @param locale {string} the locale for sorting; defaults to english ('en')
 * @returns -1, 0, or 1
 */
export const NullsLastCaseSensitiveSort: TableColumnSort = (
  a: TableRowData,
  b: TableRowData,
  fieldName: string,
  direction: TableColumnSorted = TableColumnSorted.ASCENDING,
  locale: string = 'en'): number => {
    const data = getDataElements(a, b, fieldName, direction);
    if (data.first == null || data.second == null) {
      return 1;
    }
    return CaseSensitiveDataSort(data.first, data.second, locale);
  };

/**
 * Case-sensitive sort which treats undefined/null values as if they were lexically after 'z'. Sorting is A-Z, then a-z,
 * then null/undefined.
 *
 * @param a {TableRowData} the first data row
 * @param b {TableRowData} the second data row
 * @param fieldName {string} the field being sorted
 * @param direction {TableColumnSorted} the sort direction; default DESCENDING
 * @param locale {string} the locale for sorting; defaults to english ('en')
 * @returns -1, 0, or 1
 */
export const CaseSensitiveSort: TableColumnSort = (
  a: TableRowData,
  b: TableRowData,
  fieldName: string,
  direction: TableColumnSorted = TableColumnSorted.ASCENDING,
  locale: string = 'en'): number => {
    const data = getDataElements(a, b, fieldName, direction);
    const nullSort: number = getNullSortDirection(data.first, data.second);
    if (!Number.isNaN(nullSort)) {
      return nullSort;
    }
    return CaseSensitiveDataSort(data.first, data.second, locale);
  };

/**
 * Case-insensitive sort which treats undefined/null values as if they were lexically after 'z'.
 *
 * @param a {TableRowData} the first data row
 * @param b {TableRowData} the second data row
 * @param fieldName {string} the field being sorted
 * @param direction {TableColumnSorted} the sort direction; default DESCENDING
 * @param locale {string} the locale for sorting; defaults to english ('en')
 * @returns -1, 0, or 1
 */
export const CaseInsensitiveSort: TableColumnSort = (
  a: TableRowData,
  b: TableRowData,
  fieldName: string,
  direction: TableColumnSorted = TableColumnSorted.ASCENDING,
  locale: string = 'en'): number => {
    const data = getDataElements(a, b, fieldName, direction);

    const nullSort: number = getNullSortDirection(data.first, data.second);
    if (!Number.isNaN(nullSort)) {
      return nullSort;
    }
    return CaseInsensitiveDataSort(data.first, data.second, locale);
  };

/**
 * Numeric sort which always places null/undefined values at the end. Non-numbers are lexically sorted after numbers.
 *
 * @param a {TableRowData} the first data row
 * @param b {TableRowData} the second data row
 * @param fieldName {string} the field being sorted
 * @param direction {TableColumnSorted} the sort direction; default DESCENDING
 * @param locale {string} the locale for sorting; defaults to english ('en')
 * @returns -1, 0, or 1
 */
export const NullsLastNumericSort: TableColumnSort = (
  a: TableRowData,
  b: TableRowData,
  fieldName: string,
  direction: TableColumnSorted = TableColumnSorted.ASCENDING,
  locale: string = 'en'): number => {
    const data = getDataElements(a, b, fieldName, direction);

    if (data.first == null || data.second == null) {
      return 1;
    }
    return NumericDataSort(data.first, data.second, locale);
  };

/**
 * Numeric sort which places non-numbers and nulls lexically after numbers.
 *
 * @param a {TableRowData} the first data row
 * @param b {TableRowData} the second data row
 * @param fieldName {string} the field being sorted
 * @param direction {TableColumnSorted} the sort direction; default DESCENDING
 * @param locale {string} the locale for sorting; defaults to english ('en')
 * @returns -1, 0, or 1
 */
export const NumericSort: TableColumnSort = (
  a: TableRowData,
  b: TableRowData,
  fieldName: string,
  direction: TableColumnSorted = TableColumnSorted.ASCENDING,
  locale: string = 'en'): number => {
    const data = getDataElements(a, b, fieldName, direction);

    const nullSort: number = getNullSortDirection(data.first, data.second);
    if (!Number.isNaN(nullSort)) {
      return nullSort;
    }
    return NumericDataSort(data.first, data.second, locale);
  };

/**
 * Sorts two items using a numeric sort. If no locale is specified, uses 'en'. Null/undefined must be handled explicitly
 * prior to calling. Non-numbers will be sorted after numbers.
 *
 * @param first {any} the first value
 * @param second {any} the second value
 * @param locale {string} optional; the locale to sort against ... default 'en'
 * @return 0, -1 or 1
 */
export const NumericDataSort: DataSort = (first: any, second: any, locale: string = 'en'): number => {
  if (areStrings(first, second) && localeCompareSupportsLocales()) {
    return first.localeCompare(second, locale, { numeric: true });
  }
  return sortNumbers(first, second);
};

/**
 * Sorts two items using a case-sensitive sort. If no locale is specified, uses 'en'. Null/undefined must be handled
 * explicitly prior to calling.
 *
 * @param first {any} the first value
 * @param second {any} the second value
 * @param locale {string} optional; the locale to sort against ... default 'en'
 * @return 0, -1 or 1
 */
export const CaseSensitiveDataSort: DataSort = (first: any, second: any, locale: string = 'en'): number => {
  if (!areStrings(first, second)) {
    return sortLogical(first, second);
  }

  if (localeCompareSupportsLocales()) {
    return first.localeCompare(second, locale, {caseFirst: 'upper'});
  } else {
    return first.localeCompare(second);
  }
};

/**
 * Sorts two items using a case-insensitive sort. If no locale is specified, uses 'en'. Null/undefined must be handled
 * explicitly prior to calling.
 *
 * @param first {any} the first value
 * @param second {any} the second value
 * @param locale {string} optional; the locale to sort against ... default 'en'
 * @return 0, -1 or 1
 */
export const CaseInsensitiveDataSort: DataSort = (first: any, second: any, locale: string = 'en'): number => {
  if (!areStrings(first, second)) {
    return sortLogical(first, second);
  }

  if (localeCompareSupportsLocales()) {
    return first.localeCompare(second, locale, { sensitivity: 'base' });
  }
  return first.toLowerCase().localeCompare(second.toLowerCase());
};

/**
 * Gets the data elements for comparison. Returns an array like { first: any, second: any }. Takes sorting direction into
 * account.
 *
 * @param a {TableRowData} one of the rows
 * @param b {TableRowData} the other row
 * @param fieldName {string} the field to get from each of the rows
 * @param direction {TableColumnSorted} the sorting direction
 * @returns an object containing the two data elements for further comparison/sorting
 */
export function getDataElements(
  a: TableRowData,
  b: TableRowData,
  fieldName: string,
  direction: TableColumnSorted): { first: any, second: any } {
    const first: TableRowData = direction === TableColumnSorted.ASCENDING ? a : b;
    const second: TableRowData = direction === TableColumnSorted.ASCENDING ? b : a;
    const firstData: any = get(first, fieldName);
    const secondData: any = get(second, fieldName);
    return {first: firstData, second: secondData};
  }

/**
 * @returns true if the current browser supports localeCompare's locale and options parameters.
 */
// eslint-disable-next-line max-len
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare#Check_browser_support_for_extended_arguments
function localeCompareSupportsLocales(): boolean {
  try {
    'foo'.localeCompare('bar', 'i');
  } catch (e) {
    if (e instanceof Error) {
      return e.name === 'RangeError';
    }
  }
  return false;
}

/**
 * Sorts numbers. For use when localeCompare isn't supported with options.
 *
 * @param first {any} the first value
 * @param second {any} the second value
 * @returns 0, -1, 1
 */
function sortNumbers(first: any, second: any): number {
  const firstData = Number(first);
  const secondData = Number(second);

  if (Number.isNaN(firstData) && Number.isNaN(secondData)) {
    return 0;
  } else if (Number.isNaN(firstData) || firstData > secondData) {
    return 1;
  } else if (Number.isNaN(secondData) || secondData > firstData) {
    return -1;
  } else {
    return 0;
  }
}

/**
 * For non "null-last" sorts, this returns 0, 1, -1 depending on which value is null, If they're both non-null, returns
 * NaN.
 *
 * @param first {any} the first value
 * @param second {any} the second value
 * @returns 0, 1, -1, undefined
 */
function getNullSortDirection(first: any, second: any): number {
  if (first == null && second == null) {
    return 0;
  }
  if (first == null) {
    return 1;
  }
  if (second == null) {
    return -1;
  }
  return Number.NaN;
}

/**
 * @param first {any} the first parameter
 * @param second {any} the second parameter
 * @returns true if both parameters are strings; false otherwise
 */
function areStrings(first: any, second: any): boolean {
  return (typeof first === 'string') && (typeof second === 'string');
}

/**
 * When the parameters are not strings, we can't use String's localeCompare method.
 *
 * @param first {any} the first value
 * @param second {any} the second value
 * @return -1, 0, 1
 */
function sortLogical(first: any, second: any): number {
  if (first > second) {
    return 1;
  }
  if (first < second) {
    return -1;
  }
  return 0;
}
