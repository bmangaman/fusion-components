import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { UnsubscribeComponent } from './../../../../shared/components/unsubscribe/unsubscribe.component';

import { TableFilterConfig } from '../../table-filter-selector';
import { FilterComparator } from '../table-filter-comparator';
import { TableFilterTranslations } from './table-filter.interface';

/**
 * TABLE FILTER
 *
 * The base class on which all other table filters should be based.
 */
@Component({
  selector: 'f-table-filter',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterComponent extends UnsubscribeComponent {
  TableFilter = TableFilterComponent;

  get fb(): UntypedFormBuilder {
    return this._fb;
  }

  /**
   * The reactive form to be used to take in the inputs used to filter the table data.
   */
  filterForm: UntypedFormGroup;

  /**
   * The currently selected filter comparator. Is a BehaviorSubject to make it easier to react/ update the DOM when/ if it changes.
   */
  selectedFilterComparator: BehaviorSubject<FilterComparator> = new BehaviorSubject<FilterComparator>(undefined as unknown as FilterComparator);

  /**
   * The uuid of the filter. Helps keep track of and compare applied filters.
   */
  uuid: string;

  /**
   * The list of all available filter comparator (configs) associated with the filter.
   */
  filterComparators: FilterComparator[] = [];

  /**
   * Flag to determine whether or not the filter is associated with a view.
   * Affects when and how the filter is applied (see table-filter-selector).
   */
  isViewFilter: boolean;

  /**
   * Determines the name of the filter that is displayed in the select input and the applied filters list
   */
  @Input() filterName: string;

  /**
   * Determines the field to which the filter logic applies
   */
  @Input() field: string;

  /**
   * Determines the translations for any static text.
   */
  @Input() translations: TableFilterTranslations;

  /**
   * Determines whether or not the filter should be visible in the the applied filters list.
   * If set to false, this also means that the "remove all" filter button(s) will not remove this filter.
   * This flag should only be set to false with table view that we do not want the user to be able to modify.
   */
  @Input() isVisible: boolean = true;

  /*
   * Determines whether or not the filter should be in the filter selector input.
   * This flag should only be set to false if the column/ field associated with the filter is not visible.
   */
  @Input() isVisibleInSelector: boolean = true;

  /**
   * Determines whether or not the content of the implemented filters is loaded
   * Helps with performance
   */
  @Input() isLoaded: boolean;

  /**
   * Function to transform the data (from the table) before it gets compared and filtered.
   * Useful if the actual data is different than what is being displayed in the table.
   */
  @Input() valueTransformFunction: (val: any) => any;

  /**
   * @param _fb Reactive Forms FormBuilder.
   */
  constructor(
    private _fb: UntypedFormBuilder,
  ) {
    super();
    this.buildForm();
  }

  /**
   * Builds the filter form.
   * This function should be overridden to generate the appropriate form for the filter.
   */
  buildForm(): void {
    this.filterForm = this.fb.group({});
  }

  /**
   * Returns the value of the form
   * This function should be overridden to return the filter's actual form values
   *
   * @returns the value of the form
   */
  getFormValue(): any {
    return this.filterForm;
  }

  /**
   * Generates and returns the label to be displayed in the comparator select and the list of applied filters in the menu.
   * This function should be overridden to return the filter's actual comparator label value.
   *
   * @param comparator The filter comparator enum.
   * @returns Either the string provided by the translations input or the translated value.
   */
  generateComparatorLabel(comparator: any): string | Observable<string> {
    if (this.translations.comparators && this.translations.comparators[comparator]) {
      return this.translations.comparators[comparator];
    }

    return '';
  }

  /**
   * Generates the string to be displayed at the bottom of the filter selection menu.
   * This function should be overridden to return the filter's actual comparator display string.
   *
   * @param comparator Optional. Filter comparator to get label.
   * @param form Optional. Form to get input values.
   * @returns Either a string or observable string, depending on what the type of selected filter comparator label.
   */
  generateDisplayString(comparator?: Partial<FilterComparator>, form?: any): string | Observable<string> {
    return `${comparator?.label} ${form}`;
  }

  /**
   * Returns whether or not the form is valid.
   * This function should be overridden to return the filter's actual form state
   *
   * @returns true if the form is invalid, false otherwise
   */
  isFormInvalid(): boolean {
    return !this.filterForm || this.filterForm.invalid;
  }

  /**
   * Helper function to provide a consistent way to apply the valueTransformFunction if it defined.
   *
   * @param value The value from the table data.
   */
  useValueTransformFunctionIfItExists(value: any): any {
    return this.valueTransformFunction ? this.valueTransformFunction(value) : value;
  }

  /**
   * Generates a filter config to be emitted and used.
   *
   * @returns The generated filter config based on the filter's current state.
   */
  get config(): TableFilterConfig {
    return {
      field: this.field,
      filter: this.TableFilter,
      filterName: this.filterName,
      comparatorName: this.selectedFilterComparator.value?.name,
      formValues: this.filterForm.value,
      uuid: this.uuid,
      isVisible: this.isVisible,
      isVisibleInSelector: this.isVisibleInSelector,
      isViewFilter: this.isViewFilter,
      translations: this.translations,
      valueTransformFunction: this.valueTransformFunction,
    };
  }

  /**
   * Escapes all special characters in a string. The special characters are:
   * ',' - Used to separate multiple filters, sorts, and columns.
   * ':' = Used to separate field, comparator, and data for filters and field and order for sorts.
   * '\' = Used to escape special characters so it must also be escaped.
   *
   * @param data The provided data to be cleaned up.
   */
  escapeSpecialChars(data: string): string {
    return data
      .replace(/(\\)/g, '\\$1')
      .replace(/(:)/g, '\\$1')
      .replace(/(,)/g, '\\$1');
  }

  /**
   * Un-escapes all special characters that were previously escaped.
   *
   * @param data The provided data to be cleaned up.
   */
  unescapeSpecialChars(data: string): string {
    return data
      .replace(/\\(?=,)/g, '')
      .replace(/\\(?=:)/g, '')
      .replace(/\\(\\)?/g, '$1');
  }
}
