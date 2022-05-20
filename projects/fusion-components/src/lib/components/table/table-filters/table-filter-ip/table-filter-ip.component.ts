import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { map, takeUntil } from 'rxjs/operators';

import { FilterComparator } from '../table-filter-comparator';
import { TableFilterComponent } from '../table-filter/table-filter.component';
import { TableFilterIpInputComparator, TableFilterIpTranslations } from './table-filter-ip.interface';

@Component({
  selector: 'f-table-ip-filter',
  templateUrl: './table-filter-ip.component.html',
  providers: [{ provide: TableFilterComponent, useExisting: TableFilterIpComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterIpComponent extends TableFilterComponent implements OnInit {
  TableFilter = TableFilterIpComponent;

  isContainsOrDoesNotContainSelector: boolean;

  @Input() translations: TableFilterIpTranslations;

  filterComparators: FilterComparator[] = [
    {
      name: TableFilterIpInputComparator.IS,
      label: this.generateComparatorLabel(TableFilterIpInputComparator.IS),
      test: (value: string): boolean => this.useValueTransformFunctionIfItExists(value) === this.getFormValue(),
      decodeQueryParam: ((dataAsString: string) => ({ ip: this.unescapeSpecialChars(dataAsString) })),
      encodeQueryParam: (data: any) => this.escapeSpecialChars(data?.ip ?? ''),
    },
    {
      name: TableFilterIpInputComparator.IS_NOT,
      label: this.generateComparatorLabel(TableFilterIpInputComparator.IS_NOT),
      test: (value: string): boolean => this.useValueTransformFunctionIfItExists(value) !== this.getFormValue(),
      decodeQueryParam: ((dataAsString: string) => ({ ip: this.unescapeSpecialChars(dataAsString) })),
      encodeQueryParam: (data: any) => this.escapeSpecialChars(data?.ip ?? ''),
    },
    {
      name: TableFilterIpInputComparator.CONTAINS,
      label: this.generateComparatorLabel(TableFilterIpInputComparator.CONTAINS),
      test: (value: string): boolean => {
        const valOctets: number[] = this.useValueTransformFunctionIfItExists(value).split('.').map(Number);
        const formOctets: number[] = this.getOctetsValues();
        return !formOctets.some((octet: number, index: number) => (!!octet || octet === 0) && octet !== valOctets[index]);
      },
      encodeQueryParam: (data: Record<string, any>) => this.getOctetsValues(data).map(octet => octet ? octet : 'x').join('.'),
      decodeQueryParam: (dataAsString: string) => this.decodeIpString(dataAsString),
    },
    {
      name: TableFilterIpInputComparator.DOES_NOT_CONTAIN,
      label: this.generateComparatorLabel(TableFilterIpInputComparator.DOES_NOT_CONTAIN),
      test: (value: string): boolean => {
        const valOctets: number[] = this.useValueTransformFunctionIfItExists(value).split('.').map(Number);
        const formOctets: number[] = this.getOctetsValues() as number[];
        return !formOctets.some((octet: number, index: number) => (!!octet || octet === 0) && octet === valOctets[index]);
      },
      encodeQueryParam: (data: Record<string, any>) => this.getOctetsValues(data).map(octet => octet ? octet : 'x').join('.'),
      decodeQueryParam: (dataAsString: string) => this.decodeIpString(dataAsString),
    },
  ].map(comparator => ({
    ...comparator,
    displayString: (form: any) => this.generateDisplayString(comparator, form),
    hasData: true,
  }));

  /**
   * On component initialization, subscribe to when the comparator changes. If it is CONTAINS or DOES NOT CONTAIN,
   * set isContainsOrDoesNotContainSelector to true to change the input.
   */
  ngOnInit(): void {
    this.selectedFilterComparator.pipe(takeUntil(this.unsubscribe$)).subscribe((comparator: FilterComparator) => {
      this.isContainsOrDoesNotContainSelector = this.testIfIsContainsOrDoesNotContainSelector(comparator);
    });
  }

  /**
   * Generates and returns the label to be displayed in the comparator select and the list of applied filters in the menu.
   *
   * @param comparator The filter comparator enum.
   * @returns Either the string provided by the translations input or the translated value.
   */
  generateComparatorLabel(comparator: TableFilterIpInputComparator): string | Observable<string> {
    if (this.translations?.comparators && this.translations.comparators[comparator]) {
      return this.translations.comparators[comparator];
    }
    return this.translateService.get(`${this.translationService.baseTranslationKey}.table.filters.ip.comparators.${comparator}`);
  }

  /**
   * Generates the string to be displayed at the bottom of the filter selection menu.
   *
   * @param comparator Optional. Filter comparator to get label.
   * @param form Optional. Form to get input values.
   * @returns Either a string or observable string, depending on what the type of selected filter comparator label.
   */
  generateDisplayString(comparator?: Partial<FilterComparator>, form?: any): string | Observable<string> {
    const currentComparator: Partial<FilterComparator> = comparator || this.selectedFilterComparator?.value;
    const label: string | Observable<string> = currentComparator?.label;

    if (currentComparator?.name === TableFilterIpInputComparator.IS || currentComparator?.name === TableFilterIpInputComparator.IS_NOT) {
      const value: any = form?.ip || this.getFormValue();

      if (label instanceof Observable) {
        return label.pipe(map((l: string) => `${l} ${value}`));
      }
      return `${label} ${value}`;
    } else {
      const octets: number[] = form ? this.getOctetsValues(form) : (this.getFormValue() as number[]);
      const octetString: string = (octets.map((octet: number) => (!!octet || octet === 0) ? octet.toString() : 'x')).join('.');

      if (label instanceof Observable) {
        return label.pipe(map((l: string) => `${l} ${octetString}`));
      }
      return `${label} ${octetString}`;
    }
  }

  /**
   * Builds the filterForm.
   * Automatically called in the constructor (inherited from the tableFilter class).
   */
  buildForm(): void {
    this.filterForm = this.fb.group({
      ip: [null, Validators.required],
      octet1: [null],
      octet2: [null],
      octet3: [null],
      octet4: [null],
    });
    this.filterForm.setValidators(Validators.required);
  }

  /**
   * If the current comparator is either CONTAINS or DOES NOT CONTAIN, return the octet value, otherwise, get the ip value.
   *
   * @returns Either the ip string or the octet number.
   */
  getFormValue(): string | number[] {
    this.isContainsOrDoesNotContainSelector = this.testIfIsContainsOrDoesNotContainSelector();
    return this.isContainsOrDoesNotContainSelector ? this.getOctetsValues() : this.filterForm.get('ip').value;
  }

  /**
   * Tests whether or not the current (selected) comparator is CONTAINS or DOES NOT CONTAIN
   *
   * @param comparator Optional. The comparator to test.
   * @returns True if the current comparator is CONTAINS or DOES NOT CONTAIN. False otherwise.
   */
  private testIfIsContainsOrDoesNotContainSelector(comparator?: FilterComparator): boolean {
    const currentComparator: FilterComparator = comparator || this.selectedFilterComparator.value;
    const isSelectedFilterComparatorContains: boolean = currentComparator === this.filterComparators[2]; // CONTAINS
    const isSelectedFilterComparatorDoesNotContain: boolean = currentComparator === this.filterComparators[3]; // DOES NOT CONTAIN
    return isSelectedFilterComparatorContains || isSelectedFilterComparatorDoesNotContain;
  }

  /**
   * Gets the values for each octet and puts them in an array of numbers. Any values that are missing are counted as null.
   *
   * @param formObj The form value to map into an array.
   * @private
   */
  private getOctetsValues(formObj?: Record<string, any>): number[] {
    const formValue: {
      ip: string,
      octet1: number,
      octet2: number,
      octet3: number,
      octet4: number,
    } = formObj ?? this.filterForm.getRawValue();
    const octets: number[] = [];

    for (let i = 1; i < 5; i++) {
      const value: number = formValue[`octet${i}`];
      octets.push(!!value || value === 0 ? value : null);
    }

    return octets;
  }

  /**
   * Decodes a string of type '1.x.1.x' into a form value object. Also sets the form value to that object for use in applying the filter.
   *
   * @param dataAsString The query param string that needs to be split into a form value object.
   * @private
   */
  private decodeIpString(dataAsString: string): any {
    const octets: string[] = dataAsString.split('.');
    if (octets.length === 4) {
      if (octets.some(o => o !== 'x')) {
        const form = { ip: null };
        const parsedOctets = dataAsString.split('.').map(octet => octet === 'x' ? null : octet);
        parsedOctets.forEach((octet, idx) => {
          form[`octet${idx + 1}`] = !!octet ? Number(octet) : null;
        });

        this.filterForm.setValue(form);
        return form;
      }
    }

    throw new Error('Invalid filter string');
  }

  /**
   * Returns whether or the form is invalid.
   *
   * @returns True if the input(s) is/are invalid (do NOT have values), false otherwise.
   */
  isFormInvalid(): boolean {
    return this.isContainsOrDoesNotContainSelector
      ? !(this.getFormValue() as number[]).some((octet: number) => !!octet || octet === 0)
      : !this.filterForm.get('ip').value;
  }
}
