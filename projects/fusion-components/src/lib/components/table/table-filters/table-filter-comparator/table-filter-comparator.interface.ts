import { Observable } from 'rxjs';

/**
 * Structure for a filter comparator used in the table filter menu
 *  - name: name of the comparator; basically used as an "id"
 *  - label: text displayed in the select input in the filter menu
 *  - hasData: indicates whether a comparator has a data part. IE: isEmpty requires no data to test with.
 *  - displayString: function that can generate the text displayed in the filter menu when the filter is applied
 *  - test: function used to test the data; filters out the data if it does not pass
 *  - decodeQueryParam: decodes the data from a query param. This function knows what format the query param should be in and creates a
 *  valid form values object from that query param string.
 *  - encodeQueryParam: encodes the form values to be used in a query param. This functions maps the form value to a string so that it can
 *  be saved in the query params.
 */
export interface FilterComparator {
  name: string;
  label: string | Observable<string>;
  hasData: boolean;
  displayString?(data?: any): string | Observable<string>;
  test(val: any): boolean;
  decodeQueryParam(data: string): any;
  encodeQueryParam(val: any): string;
}

export interface FilterComparatorTranslations {
  comparatorLabel: string;
}
