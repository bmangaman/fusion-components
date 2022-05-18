import { SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';

/**
 * ERROR MESSAGE
 *
 * Structure of the error message needed for the Error Message Component.
 *  - priority: indicates the order in which the error should be displayed (1 === highest).
 *  - translation: the text to be displayed for the error.
 *  - error: the error that matches what the control Angular Reactive Form validator returns.
 */
export interface ErrorMessage {
  priority?: number; // 0 is the same as not setting this
  translation: Observable<string | SafeHtml>;
  error: string;
}
