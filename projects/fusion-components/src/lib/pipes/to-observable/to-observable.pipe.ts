import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash-es';
import { Observable, of } from 'rxjs';

/**
 * TO OBSERVABLE PIPE
 *
 * Ensures the value provided will be returned as an observable.
 */
@Pipe({
    name: 'toObservable',
    standalone: false
})
export class ToObservablelPipe implements PipeTransform {

  /**
   * Checks if the provided value is an observable. If so, return it as it. Otherwise,
   * return the value wrapped as an observable.
   *
   * @param value The table fitler comparator.
   */
  transform(value: any): Observable<any> {
    return value instanceof Observable ? value : of(value);
  }
}
