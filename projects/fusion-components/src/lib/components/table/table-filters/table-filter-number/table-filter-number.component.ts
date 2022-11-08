import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilterComparator } from '../table-filter-comparator';
import { TableFilterComponent } from '../table-filter/table-filter.component';
import { DEFAULT_TABLE_FILTER_NUMBER_TRANSLATIONS, TableFilterNumberInputComparator, TableFilterNumberTranslations } from './table-filter-number.interface';

/**
 * NUMBER TABLE FILTER COMPONENT
 *
 * The number table filter component is used with the table component to create a filter for numerical data.
 * It has one input for the numerical value.
 */
@Component({
  selector: 'f-table-number-filter',
  templateUrl: './table-filter-number.component.html',
  providers: [{ provide: TableFilterComponent, useExisting: TableFilterNumberComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterNumberComponent extends TableFilterComponent {
  override TableFilter = TableFilterNumberComponent;

  @Input() override translations: TableFilterNumberTranslations = DEFAULT_TABLE_FILTER_NUMBER_TRANSLATIONS;

  override filterComparators: FilterComparator[] = [
    {
      name: TableFilterNumberInputComparator.EQUAL_TO,
      label: this.generateComparatorLabel(TableFilterNumberInputComparator.EQUAL_TO),
      test: (value: number): boolean => this.useValueTransformFunctionIfItExists(value) === this.getFormValue(),
    },
    {
      name: TableFilterNumberInputComparator.NOT_EQUAL_TO,
      label: this.generateComparatorLabel(TableFilterNumberInputComparator.NOT_EQUAL_TO),
      test: (value: number): boolean => this.useValueTransformFunctionIfItExists(value) !== this.getFormValue(),
    },
    {
      name: TableFilterNumberInputComparator.GREATER_THAN,
      label: this.generateComparatorLabel(TableFilterNumberInputComparator.GREATER_THAN),
      test: (value: number): boolean => this.useValueTransformFunctionIfItExists(value) > this.getFormValue(),
    },
    {
      name: TableFilterNumberInputComparator.LESS_THAN,
      label: this.generateComparatorLabel(TableFilterNumberInputComparator.LESS_THAN),
      test: (value: number): boolean => this.useValueTransformFunctionIfItExists(value) < this.getFormValue(),
    },
  ].map(comparator => ({
    ...comparator,
    displayString: (form: any) => this.generateDisplayString(comparator, form),
    hasData: true,
    decodeQueryParam: (dataAsString: string) => ({ number: Number(dataAsString) }),
    encodeQueryParam: (data: any) => String(data?.number ?? ''),
  }));

  /**
   * Generates and returns the label to be displayed in the comparator select and the list of applied filters in the menu.
   *
   * @param comparator The filter comparator enum.
   * @returns Either the string provided by the translations input or the translated value.
   */
  override generateComparatorLabel(comparator: TableFilterNumberInputComparator): string | Observable<string> {
    if (this.translations.comparators && this.translations.comparators[comparator]) {
      return this.translations.comparators[comparator]!;
    }

    return '';
  }

  /**
   * Generates the string to be displayed at the bottom of the filter selection menu.
   *
   * @param comparator Optional. Filter comparator to get label.
   * @param form Optional. Form to get input values.
   * @returns Either a string or observable string, depending on what the type of selected filter comparator label.
   */
  override generateDisplayString(comparator?: Partial<FilterComparator>, form?: any): string | Observable<string> {
    const label: string | Observable<string> = comparator?.label || this.selectedFilterComparator?.value?.label;
    const value: any = form?.number || this.getFormValue();

    if (label instanceof Observable) {
      return label.pipe(map((l: string) => `${l || ''} ${value || ''}`));
    }
    return `${label || ''} ${value || ''}`;
  }

  /**
   * Builds the filterForm.
   * Automatically called in the constructor (inherited from the tableFilter class).
   */
  override buildForm(): void {
    this.filterForm = this.fb.group({
      number: [null, Validators.required],
    });
  }

  /**
   * Gets the value of the number input of the filter form.
   *
   * @returns The number input value.
   */
  override getFormValue(): number {
    return this.filterForm.get('number')!.value;
  }

  /**
   * Determines whether or not the form is valid.
   * The number input must be defined.
   *
   * @returns True if the form is invalid, false otherwise,
   */
  override isFormInvalid(): boolean {
    return this.filterForm.invalid;
  }
}
