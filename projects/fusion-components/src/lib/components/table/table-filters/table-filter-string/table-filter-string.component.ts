import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { FilterComparator } from '../table-filter-comparator';
import { TableFilterComponent } from '../table-filter/table-filter.component';
import { TableFilterStringInputComparator, TableFilterStringTranslations, DEFAULT_TABLE_FILTER_STRING_TRANSLATIONS } from './table-filter-string.interface';

/**
 * STRING TABLE FILTER COMPONENT
 *
 * The string table filter component is used with the table component to create a filter for text-based data.
 * It has one input for the text value.
 */
@Component({
    selector: 'f-table-string-filter',
    templateUrl: './table-filter-string.component.html',
    providers: [{ provide: TableFilterComponent, useExisting: TableFilterStringComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TableFilterStringComponent extends TableFilterComponent implements OnInit {
  override TableFilter = TableFilterStringComponent;

  hideInput: boolean;

  @Input() override translations: TableFilterStringTranslations = DEFAULT_TABLE_FILTER_STRING_TRANSLATIONS;

  override filterComparators: FilterComparator[] = [
    {
      name: TableFilterStringInputComparator.IS,
      label: this.generateComparatorLabel(TableFilterStringInputComparator.IS),
      test: (value: string): boolean => this.useValueTransformFunctionIfItExists(value) === this.getFormValue(),
      hasData: true,
    },
    {
      name: TableFilterStringInputComparator.IS_NOT,
      label: this.generateComparatorLabel(TableFilterStringInputComparator.IS_NOT),
      test: (value: string): boolean => this.useValueTransformFunctionIfItExists(value) !== this.getFormValue(),
      hasData: true,
    },
    {
      name: TableFilterStringInputComparator.CONTAINS,
      label: this.generateComparatorLabel(TableFilterStringInputComparator.CONTAINS),
      test: (value: string): boolean => !!this.useValueTransformFunctionIfItExists(value)?.includes(this.getFormValue()),
      hasData: true,
    },
    {
      name: TableFilterStringInputComparator.DOES_NOT_CONTAIN,
      label: this.generateComparatorLabel(TableFilterStringInputComparator.DOES_NOT_CONTAIN),
      test: (value: string): boolean => !this.useValueTransformFunctionIfItExists(value)?.includes(this.getFormValue()),
      hasData: true,
    },
    {
      name: TableFilterStringInputComparator.IS_EMPTY,
      label: this.generateComparatorLabel(TableFilterStringInputComparator.IS_EMPTY),
      test: (value: string): boolean => !this.useValueTransformFunctionIfItExists(value),
      hasData: false
    },
    {
      name: TableFilterStringInputComparator.IS_NOT_EMPTY,
      label: this.generateComparatorLabel(TableFilterStringInputComparator.IS_NOT_EMPTY),
      test: (value: string): boolean => !!this.useValueTransformFunctionIfItExists(value),
      hasData: false,
    },
  ].map(comparator => ({
    ...comparator,
    displayString: (form: any) => this.generateDisplayString(comparator, form),
    decodeQueryParam: (dataAsString: string) => ({string:  this.unescapeSpecialChars(dataAsString)}),
    encodeQueryParam: (data: any) => this.escapeSpecialChars(data?.string ?? ''),
  }));

  /**
   * On component initialization, subscribe to filter comparator changes.
   * Hide the "string" input if the new comparator is either IS_EMPTY or IS_NOT_EMPTY.
   */
  ngOnInit(): void {
    this.selectedFilterComparator
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((comparator: FilterComparator) => {
      this.hideInput =
        comparator?.name === TableFilterStringInputComparator.IS_EMPTY ||
        comparator?.name === TableFilterStringInputComparator.IS_NOT_EMPTY;
    });
  }

  /**
   * Generates and returns the label to be displayed in the comparator select and the list of applied filters in the menu.
   *
   * @param comparator The filter comparator enum.
   * @returns Either the string provided by the translations input or the translated value.
   */
  override generateComparatorLabel(comparator: TableFilterStringInputComparator): string | Observable<string> {
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
    const value: string = form?.string || this.getFormValue();

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
      string: [null, Validators.required],
    });
  }

  /**
   * Gets the value of the string input of the filter form.
   *
   * @returns the string input value
   */
  override getFormValue(): string {
    return this.filterForm.get('string')!.value;
  }

  /**
   * Determines whether or not the form is valid.
   * The form is valid if
   *  - input is hidden OR
   *  - the filter form and the string input is defined
   *
   * @returns true if the form is invalid, false otherwise
   */
  override isFormInvalid(): boolean {
    return this.hideInput ? false : this.filterForm.invalid;
  }
}
