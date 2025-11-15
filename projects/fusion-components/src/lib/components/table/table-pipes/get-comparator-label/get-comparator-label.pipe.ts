import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FilterComparator } from '../../table-filters';

/**
 * GET COMPARATOR LABEL PIPE
 *
 * The Get Comparator Label Pipe gets the label value of a comparator. Determines if the label is
 * either an observable or a string and gets the value accordingly.
 */
@Pipe({
    name: 'getComparatorLabel',
    standalone: false
})
export class GetComparatorLabelPipe implements PipeTransform {

  /**
   * If the comparator label is an observable, return it. Otherwise, wrap it with an of()
   * to turn it into an observable.
   *
   * @param comparator The table fitler comparator.
   */
  transform(comparator: FilterComparator): Observable<string> {
    return comparator.label instanceof Observable ? comparator.label : of(comparator.label);
  }
}
