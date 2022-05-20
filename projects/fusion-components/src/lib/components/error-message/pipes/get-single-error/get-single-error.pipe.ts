
import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';

import { ErrorMessage } from '../../error-message.interface';

/**
 * GET SINGLE ERROR PIPE
 *
 * The Get Single Error Pipe gets the highest priority error of the provided current errors and returns its
 * translation value.
 */
@Pipe({ name: 'getSingleError' })
export class GetSingleErrorPipe implements PipeTransform {

  /**
   * Gets the translation value of the highest priority applied error.
   * Does the following:
   *   1. Checks errors with priority, returns if found;
   *   2. Checks errors without priority, returns if found;
   *   3. Otherwise, returns empty error message.
   *
   * @param errors The list of errors.
   * @param validationErrors The applied validation errors of an abstract control.
   * @returns The translation value.
   */
  transform(errors: ErrorMessage[], validationErrors: ValidationErrors): Observable<string | SafeHtml> {
    if (!!errors?.length && !!validationErrors) {
      const foundPriorityError: ErrorMessage = errors
        .filter((e: ErrorMessage) => e.priority)
        .sort((a: ErrorMessage, b: ErrorMessage) => a.priority! - b.priority!)
        .find((e: ErrorMessage) => validationErrors.hasOwnProperty(e.error))!;

      const foundNonPriorityError: ErrorMessage = errors
        .filter((e: ErrorMessage) => !e.priority)
        .find((e: ErrorMessage) => validationErrors.hasOwnProperty(e.error))!;

      return foundPriorityError ? foundPriorityError.translation : foundNonPriorityError.translation;
    }

    return of('');
  }
}
