import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilterComparator } from '../table-filter-comparator';
import { TableFilterComponent } from '../table-filter/table-filter.component';
import { TableFilterArrayInputComparator, TableFilterArrayTranslations } from './table-filter-array.interface';

/**
 * ARRAY TABLE FILTER COMPONENT
 *
 * The string table filter component is used with the table component to create a filter for array data.
 * It has one input for the value.
 */
@Component({
  selector: 'fusion-ui-table-array-filter',
  templateUrl: './table-filter-array.component.html',
  providers: [{ provide: TableFilterComponent, useExisting: TableFilterArrayComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterArrayComponent extends TableFilterComponent {
  TableFilter = TableFilterArrayComponent;

  @Input() translations: TableFilterArrayTranslations;

  filterComparators: FilterComparator[] = [
    {
      name: TableFilterArrayInputComparator.CONTAINS,
      label: this.generateComparatorLabel(TableFilterArrayInputComparator.CONTAINS),
      test: (value: any[]): boolean => this.containsTest(value),
    },
    {
      name: TableFilterArrayInputComparator.DOES_NOT_CONTAIN,
      label: this.generateComparatorLabel(TableFilterArrayInputComparator.DOES_NOT_CONTAIN),
      test: (value: any[]): boolean => !this.containsTest(value),
    },
  ].map(comparator => ({
    ...comparator,
    displayString: (form: any) => this.generateDisplayString(comparator, form),
    decodeQueryParam: (dataAsString: string) => ({value: this.unescapeSpecialChars(dataAsString)}),
    encodeQueryParam: (data: any) => this.escapeSpecialChars(data?.value ?? ''),
    hasData: true,
  }));

  /**
   * Generates and returns the label to be displayed in the comparator select and the list of applied filters in the menu.
   *
   * @param comparator The filter comparator enum.
   * @returns Either the string provided by the translations input or the translated value.
   */
  generateComparatorLabel(comparator: TableFilterArrayInputComparator): string | Observable<string> {
    if (this.translations?.comparators && this.translations.comparators[comparator]) {
      return this.translations.comparators[comparator];
    }
    return this.translateService.get(`${this.translationService.baseTranslationKey}.table.filters.array.comparators.${comparator}`);
  }

  /**
   * Generates the string to be displayed at the bottom of the filter selection menu.
   *
   * @param comparator Optional. Filter comparator to get label.
   * @param form Optional. Form to get input values.
   * @returns Either a string or observable string, depending on what the type of selected filter comparator label.
   */
  generateDisplayString(comparator?: Partial<FilterComparator>, form?: any): string | Observable<string> {
    const label: string | Observable<string> = comparator?.label || this.selectedFilterComparator?.value?.label;
    const value: any = form?.value || this.getFormValue();

    if (label instanceof Observable) {
      return label.pipe(map((l: string) => `${l} ${value}`));
    }
    return `${label} ${value}`;
  }

  /**
   * Builds the filterForm.
   * Automatically called in the constructor (inherited from the tableFilter class).
   */
  buildForm(): void {
    this.filterForm = this.fb.group({
      value: [null, Validators.required],
    });
  }

  /**
   * Gets the value of the value input of the filter form.
   *
   * @returns the string input value
   */
  getFormValue(): any {
    return this.filterForm.get('value').value;
  }

  /**
   * Determines whether or not the form is valid.
   * The form is valid if
   *  - input is hidden OR
   *  - the filter form and the string input is defined
   *
   * @returns true if the form is invalid, false otherwise
   */
  isFormInvalid(): boolean {
    return this.filterForm.invalid;
  }

  /**
   * Checks to see whether or not the input value exists in the array.
   * If the provided row value is an array of strings, also check if the input value exists as a substring.
   * Otherwise, just check to see if the values match.
   *
   * @param value The row value.
   * @returns True if the values match (or is a substring); false otherwise.
   */
  containsTest(value: any[]): boolean {
    const newValue: any[] = this.useValueTransformFunctionIfItExists(value);
    const formValue: any = this.getFormValue();

    return !!newValue?.some((val: any) => {
      if (typeof val === 'string') {
        return val.includes(formValue);
      }

      return val === formValue;
    });
  }
}
