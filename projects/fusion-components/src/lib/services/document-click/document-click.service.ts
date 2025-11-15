
import { Inject, Injectable, DOCUMENT } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';

/**
 * DOCUMENT CLICK SERVICE
 *
 * The document click service is used to help keep track of click events in the document.
 *
 * This service was primarily developed for the Menu Component.
 * It allows the UI to keep track of whether or not a click is inside or outside of the menu component dialog.
 * If a click is detected to be outside of the menu component dialog, close the menu dialog; otherwise, keep it open.
 */
@Injectable({ providedIn: 'root' })
export class DocumentClickService {
  documentClickedTarget$: Subject<HTMLElement> = new Subject<HTMLElement>();

  /**
   * On initialization, listens for clicks on the document.
   * When something within the document is clicked, update the documentClickedTarget to the target of that click event.
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    fromEvent(this.document, 'click').subscribe((event: any) => {
      this.documentClickedTarget$.next(event.target);
    });
  }
}
