import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ErrorMessage } from './error-message.interface';

@Component({
  selector: 'f-error-message',
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  /**
   * The abstract control dictating which errors are to be displayed.
   */
  @Input() control: AbstractControl;

  /**
   * The array of possible errors to be displayed.
   */
  @Input() errors: ErrorMessage[];

  /**
   * Flag that determines whether or not multiple error messages should be displayed at one time.
   */
  @Input() displayMultiple: boolean;

  /**
   * Displays the error message if the control has errors and is dirty.
   *
   * @returns True when the error message should be displayed; false otherwise.
   */
  displayError(): boolean {
    return !!this.control?.errors && (this.control.dirty || this.control.touched);
  }
}
