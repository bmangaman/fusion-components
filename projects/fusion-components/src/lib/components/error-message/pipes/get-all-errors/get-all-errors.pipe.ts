
import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';

import { ErrorMessage } from '../../error-message.interface';

/**
 * GET ALL ERRORS PIPE
 *
 * The GET All Errors Pipe gets all the applied errors messages.
 */
@Pipe({ name: 'getAllErrors' })
export class GetAllErrorsPipe implements PipeTransform {

  /**
   * Loops through all the potential errors and returns the control error messages.
   *
   * @param errors The list of errors.
   * @param validationErrors The applied validation errors of an abstract control.
   * @returns The translation values.
   */
  transform(errors: ErrorMessage[], validationErrors: ValidationErrors): Observable<string | SafeHtml>[] {
    const displayedErrorMessages: Observable<string | SafeHtml>[] = [];

    if (!!errors?.length && !!validationErrors) {
      errors.forEach((e: ErrorMessage) => {
        if (validationErrors.hasOwnProperty(e.error)) {
          displayedErrorMessages.push(e.translation);
        }
      });
    }

    return !!displayedErrorMessages.length ? displayedErrorMessages : [of(undefined)];
  }
}
