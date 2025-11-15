import { Pipe, PipeTransform } from '@angular/core';

/**
 * GET CENTER FIVE PAGES PIPE
 *
 * The get-center-five-pages pipe is to be used with the table pagination component.
 * The pipe generates the (maximum 5) page indexes to be displayed in the center of the component.
 * The five (5) pages to be displayed should be the:
 *  - two (2) left of the current page
 *  - the current page
 *  - two (2) right of the current page
 * Examples:
 *  - current page is 1 (index 0); 1 page total; will display [1]
 *  - current page is 1 (index 0); 3 pages total; will display [1, 2, 3]
 *  - current page is 1 (index 0); 5 pages total; will display [1, 2, 3, 4, 5]
 *  - current page is 5 (index 4); 10 pages total; will display [3, 4, 5, 6, 7]
 *  - current page is 10 (index 9); 10 pages total; will display [6. 7, 8 , 9, 10]
 */
@Pipe({
    name: 'getCenterFivePages',
    standalone: false
})
export class GetCenterFivePagesPipe implements PipeTransform {

  /**
   * Generates an array of (maximum 5) page indexes to be displayed in the center of the component.
   * The five (5) pages should be the two (2) before the current page, the two (2) after the current page, and the current page.
   *
   * @param numOfPages The total number of pages.
   * @param currentPageIndex The currently selected page index.
   * @returns An array of page indexes.
   */
  transform(numOfPages: number, currentPageIndex: number): number[] {
    const numOfPagesArray: number[] = Array.from(Array(numOfPages), (_, i) => i);
    const startIndex: number = Math.max(Math.min(currentPageIndex - 2, numOfPages - 5), 0);
    const endIndex: number = Math.min(startIndex + 5, numOfPages);
    const newArray: number[] = numOfPages > 5 ? numOfPagesArray.slice(startIndex, endIndex) : numOfPagesArray;

    return newArray;
  }
}
