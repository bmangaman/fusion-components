import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Reactive forms validator created for the Select Component.
 * Determines whether or not the Select Component (form)control is valid by checking
 * to see if the selected option has a value.
 *
 * @param control The abstract form control provided to the Select Component.
 * @returns Null if the selected option has a value; an error object otherwise.
 */
export function selectRequiredValidator(control: AbstractControl): ValidationErrors | null {
  const noValue: boolean = !control || !control.value || !control.value.value;
  return noValue ? { required : true } : null;
}
