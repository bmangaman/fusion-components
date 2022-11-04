import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';

import { BytesPipe, BytesPipeBase, EnumToArrayPipe } from '@fusion-components/lib/pipes';
import { BiBytesUnit, BytesUnit } from '@fusion-components/lib/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilterComparator } from '../table-filter-comparator';
import { TableFilterComponent } from '../table-filter/table-filter.component';
import { DEFAULT_TABLE_FILTER_BYTES_TRANSLATIONS, TableFilterBytesInputComparator, TableFilterBytesTranslations } from './table-filter-bytes.interface';

/**
 * BYTES TABLE FILTER COMPONENT
 *
 * The bytes table filter component is used with the table component to create a filter for data that deals
 * with bytes. It allows two inputs: the unit (B, MB, TB, etc.) and the value of that unit.
 */
@Component({
  selector: 'f-table-bytes-filter',
  templateUrl: './table-filter-bytes.component.html',
  providers: [{ provide: TableFilterComponent, useExisting: TableFilterBytesComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterBytesComponent extends TableFilterComponent {
  override TableFilter = TableFilterBytesComponent;

  readonly BytesPipeBase = BytesPipeBase;
  readonly BytesUnit = BytesUnit;
  readonly BiBytesUnit = BiBytesUnit;
  readonly enumToArrayPipe: EnumToArrayPipe = new EnumToArrayPipe();
  readonly bytesPipe: BytesPipe = new BytesPipe();

  bytesOptions: (BiBytesUnit | BytesUnit)[] = this.enumToArrayPipe.transform(BiBytesUnit) as (BiBytesUnit | BytesUnit)[];

  @Input() override translations: TableFilterBytesTranslations = DEFAULT_TABLE_FILTER_BYTES_TRANSLATIONS;

  override filterComparators: FilterComparator[] = [
    {
      name: TableFilterBytesInputComparator.EQUAL_TO,
      label: this.generateComparatorLabel(TableFilterBytesInputComparator.EQUAL_TO),
      test: (value: number): boolean =>
        this.bytesPipe.transform(this.useValueTransformFunctionIfItExists(value), this.bytesBase, false) === this.getFormValue(),
    },
    {
      name: TableFilterBytesInputComparator.NOT_EQUAL_TO,
      label: this.generateComparatorLabel(TableFilterBytesInputComparator.NOT_EQUAL_TO),
      test: (value: number): boolean =>
        this.bytesPipe.transform(this.useValueTransformFunctionIfItExists(value), this.bytesBase, false) !== this.getFormValue(),
    },
    {
      name: TableFilterBytesInputComparator.GREATER_THAN,
      label: this.generateComparatorLabel(TableFilterBytesInputComparator.GREATER_THAN),
      test: (value: number): boolean =>
        this.bytesPipe.transform(this.useValueTransformFunctionIfItExists(value), this.bytesBase, false) > this.getFormValue(),
    },
    {
      name: TableFilterBytesInputComparator.LESS_THAN,
      label: this.generateComparatorLabel(TableFilterBytesInputComparator.LESS_THAN),
      test: (value: number): boolean =>
        this.bytesPipe.transform(this.useValueTransformFunctionIfItExists(value), this.bytesBase, false) < this.getFormValue(),
    },
  ].map(comparator => ({
    ...comparator,
    displayString: (form: any) => this.generateDisplayString(comparator, form),
    decodeQueryParam: (dataAsString: string) => this.decodeBytesString(dataAsString),
    encodeQueryParam: (data: any) => Object.keys(data).map(key => `${key}~${data[key]}`).join(';'),
    hasData: true,
  }));

  /**
   * Determines which base (10 or 2) to use for the bytesBase.
   * When set, updates the byte unit select options and selected unit of the filterForm accordingly.
   */
  private _bytesBase: BytesPipeBase = BytesPipeBase.TWO;
  @Input()
  set bytesBase(base: BytesPipeBase) {
    this._bytesBase = base;
    this.bytesOptions = this.enumToArrayPipe.transform(base === BytesPipeBase.TWO ? BiBytesUnit : BytesUnit) as (BiBytesUnit | BytesUnit)[];
    this.filterForm.get('unit')!.setValue(base === BytesPipeBase.TWO ? BiBytesUnit.GIB : BytesUnit.GB);
  }
  get bytesBase(): BytesPipeBase {
    return this._bytesBase;
  }

  /**
   * Builds the filterForm.
   * Automatically called in the constructor (inherited from the tableFilter class).
   */
  override buildForm(): void {
    this.filterForm = this.fb.group({
      bytes: [null, Validators.required],
      unit: [BiBytesUnit.GIB, Validators.required],
    });
  }

  /**
   * Gets the value of the bytes input of the filter form.
   *
   * @returns the bytes input value
   */
  override getFormValue(): number {
    return this.filterForm.get('bytes')!.value;
  }

  /**
   * Decodes a string of type 'bytes~500;unit~GiB' into a form value object.
   *
   * @param dataAsString The query param string that needs to be split into a form value object.
   * @private
   */
  private decodeBytesString(dataAsString: string): any {
    const values = /^bytes~(\d+);unit~(.+)$/.exec(dataAsString);
    if (values?.length !== 3) {
      throw new Error('Invalid filter string');
    }
    return { bytes: Number(values[1]), unit: values[2] };
  }

  /**
   * Generates and returns the label to be displayed in the comparator select and the list of applied filters in the menu.
   *
   * @param comparator The filter comparator enum.
   * @returns Either the string provided by the translations input or the translated value.
   */
  override generateComparatorLabel(comparator: TableFilterBytesInputComparator): string | Observable<string> {
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

    const bytes: number = form?.bytes || this.filterForm.get('bytes')!.value;
    const unit: BiBytesUnit = form?.unit || this.filterForm.get('unit')!.value;

    if (label instanceof Observable) {
      return label.pipe(map((l: string) => `${l} ${bytes} ${unit}`));
    }
    return `${label} ${bytes} ${unit}`;
  }

  /**
   * Determines whether or not the form is valid.
   * Both the bytes and units inputs must be defined.
   *
   * @returns true if the form is invalid, false otherwise
   */
  override isFormInvalid(): boolean {
    return this.filterForm.invalid;
  }
}
