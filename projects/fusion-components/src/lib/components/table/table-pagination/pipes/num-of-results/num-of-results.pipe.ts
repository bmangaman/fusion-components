import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * NUM OF RESULTS PIPE
 *
 * The number-of-results pipe is to be used with the table pagination component.
 * The pipe generates the "x - x of x results" text in the bottom right hand corner of the pagination component.
 */
@Pipe({ name: 'numOfResults' })
export class NumOfResultsPipe implements PipeTransform {

  /**
   * Transform the provided config into the "x - x of x results" text.
   *
   * @param dataLength The number of rows/ data points.
   * @param numResultsPerPage The maximum number of results to be displayed per page.
   * @param currentPageIndex The index of the currently displayed page.
   * @param translation Optional manual override of the translation string.
   * @returns The generated 'number of results' string.
   */
  transform(dataLength: number, numResultsPerPage: number, currentPageIndex: number, translation?: string): Observable<string> {
    if (!!dataLength && !!numResultsPerPage) {
      const numOfResults: number = numResultsPerPage === -1 ? dataLength : numResultsPerPage;
      const startNumber: number = (currentPageIndex * numOfResults) + 1;
      const endNumber: number = Math.min(currentPageIndex * numOfResults + numOfResults, dataLength);

      if (translation) {
        return of(translation
        .replace('$min', startNumber.toString())
        .replace('$max', endNumber.toString())
        .replace('$total', dataLength.toString()));
      }
    }

    return of('-');
  }
}
