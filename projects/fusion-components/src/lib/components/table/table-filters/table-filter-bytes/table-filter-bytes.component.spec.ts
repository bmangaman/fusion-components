import { FormBuilder } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { BytesPipeBase, EnumToArrayPipe } from '@fusion-components/lib/pipes';
import { FusionComponentsTranslationService } from '@fusion-components/lib/services/translation';
import { BiBytesUnit, BytesUnit } from '@fusion-components/lib/shared';
import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';

import { FilterComparator } from '../table-filter-comparator';
import { TableFilterBytesComponent } from './table-filter-bytes.component';
import { TableFilterBytesInputComparator } from './table-filter-bytes.interface';

describe('TableFilterBytesComponent', () => {
  let component: TableFilterBytesComponent;
  let translationService: FusionComponentsTranslationService;
  let enumToArrayPipe: EnumToArrayPipe;
  let translateService: TranslateService;

  beforeAll(() => {
    enumToArrayPipe = new EnumToArrayPipe();
  });

  beforeEach(() => {
    translationService = new FusionComponentsTranslationService();
    translateService = ComponentStubFactory.getTranslateServiceStub();
    component = new TableFilterBytesComponent(new FormBuilder(), translationService, translateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input()', () => {
    describe('bytesBase()', () => {
      it('should set the bytesBase to the provided value and update the bytes options and filter form accordingly', () => {
        component.bytesBase = BytesPipeBase.TEN;
        expect(component.bytesBase).toEqual(BytesPipeBase.TEN);
        expect(component.bytesOptions).toEqual(enumToArrayPipe.transform(BytesUnit) as (BiBytesUnit | BytesUnit)[]);
        expect(component.filterForm.get('unit').value).toEqual(BytesUnit.GB);

        component.bytesBase = BytesPipeBase.TWO;
        expect(component.bytesBase).toEqual(BytesPipeBase.TWO);
        expect(component.bytesOptions).toEqual(enumToArrayPipe.transform(BiBytesUnit) as (BiBytesUnit | BytesUnit)[]);
        expect(component.filterForm.get('unit').value).toEqual(BiBytesUnit.GIB);
      });
    });
  });

  describe('filterComparators', () => {
    describe('EQUAL_TO', () => {
      let value: number;

      beforeEach(() => {
        value = 999; // 999 B
        component.selectedFilterComparator.next(component.filterComparators[0]);
        component.filterForm.get('bytes').setValue(999);
        component.filterForm.get('unit').setValue(BytesUnit.B);
      });

      it('test should return true when the input equals the row value', () => {
        expect(component.filterComparators[0].test(value)).toEqual(true);
        value = 900;
        expect(component.filterComparators[0].test(value)).toEqual(false);
      });

      it('test should decode properly', () => {
        expect(component.filterComparators[0].decodeQueryParam('bytes~50;unit~GiB')).toEqual({
          bytes: 50,
          unit: 'GiB'
        });
      });

      it('test should error on decode when string is invalid', () => {
        expect(() => component.filterComparators[0].decodeQueryParam('bytes~50unit~GiB')).toThrowError();
        expect(() => component.filterComparators[0].decodeQueryParam('bytes50;unitGiB')).toThrowError();
      });

      it('test should encode properly', () => {
        expect(component.filterComparators[0].encodeQueryParam({bytes: 200, unit: 'KiB'})).toBe('bytes~200;unit~KiB');
      });

      describe('displayString', () => {
        it('should call generateDisplayString()', () => {
          spyOn(component, 'generateDisplayString').and.returnValue('is value');
          expect(component.filterComparators[0].displayString()).toEqual('is value');
        });
      });
    });

    describe('NOT_EQUAL_TO', () => {
      let value: number;

      beforeEach(() => {
        value = 900; // 900 B
        component.selectedFilterComparator.next(component.filterComparators[1]);
        component.filterForm.get('bytes').setValue(999);
        component.filterForm.get('unit').setValue(BytesUnit.B);
      });

      it('test should return true when the input is not equal to the row value', () => {
        expect(component.filterComparators[1].test(value)).toEqual(true);
        value = 999;
        expect(component.filterComparators[1].test(value)).toEqual(false);
      });
    });

    describe('GREATER_THAN', () => {
      let value: number;

      beforeEach(() => {
        value = 999; // 999 B
        component.selectedFilterComparator.next(component.filterComparators[2]);
        component.filterForm.get('bytes').setValue(950);
        component.filterForm.get('unit').setValue(BytesUnit.B);
      });

      it('test should return true when the input is greater than the row value', () => {
        expect(component.filterComparators[2].test(value)).toEqual(true);
        value = 900;
        expect(component.filterComparators[2].test(value)).toEqual(false);
      });
    });

    describe('LESS_THAN', () => {
      let value: number;

      beforeEach(() => {
        value = 900; // 900 B
        component.selectedFilterComparator.next(component.filterComparators[3]);
        component.filterForm.get('bytes').setValue(950);
        component.filterForm.get('unit').setValue(BytesUnit.B);
      });

      it('test should return true when the input is less than the row value', () => {
        expect(component.filterComparators[3].test(value)).toEqual(true);
        value = 999;
        expect(component.filterComparators[3].test(value)).toEqual(false);
      });
    });
  });

  describe('getFormValue()', () => {
    it('should return filterForm.bytes value', () => {
      component.filterForm.get('bytes').setValue(1000);
      component.filterForm.get('unit').setValue(BytesUnit.B);
      expect(component.getFormValue()).toEqual(1000);
    });
  });

  describe('generateComparatorLabel()', () => {
    it('should handle if a translation for the comparator was provided', () => {
      component.translations = {
        comparators: {
          [TableFilterBytesInputComparator.EQUAL_TO]: 'equal to',
        },
      };

      expect(component.generateComparatorLabel(TableFilterBytesInputComparator.EQUAL_TO)).toEqual('equal to');
    });

    it('should use the translateService to generate the comparator label if no translation was provided', (done: DoneFn) => {
      (translateService.get as jasmine.Spy).calls.reset();
      (translateService.get as jasmine.Spy).and.returnValue(of('equal to'));
      spyOnProperty(translationService, 'baseTranslationKey').and.returnValue('components');
      (component.generateComparatorLabel(TableFilterBytesInputComparator.EQUAL_TO) as Observable<string>).subscribe((label: string) => {
        expect(label).toEqual('equal to');
        expect(translateService.get).toHaveBeenCalledWith('components.table.filters.bytes.comparators.equalTo');
        done();
      });
    });
  });

  describe('generateDisplayString()', () => {
    let filterComparator: FilterComparator;
    let form: any;

    beforeEach(() => {
      component.bytesBase = BytesPipeBase.TEN;
      component.filterForm.get('bytes').setValue(1000);
      component.filterForm.get('unit').setValue(BytesUnit.B);
      filterComparator = component.filterComparators[0];
      filterComparator.label = 'equal to';
      component.selectedFilterComparator.next(filterComparator);
    });

    it('should use the provided comparator label', () => {
      expect(component.generateDisplayString(filterComparator)).toEqual('equal to 1000 B');
    });

    it('should use the selectedFilterComparator label if no comparator was provided', () => {
      component.selectedFilterComparator.next(filterComparator);
      expect(component.generateDisplayString()).toEqual('equal to 1000 B');
    });

    it('should use the provided form', () => {
      form = { bytes: 1000, unit: 'B' };
      expect(component.generateDisplayString(undefined, form)).toEqual('equal to 1000 B');
    });

    it('should use getFormValue if no form was provided or if it is undefined', () => {
      expect(component.generateDisplayString()).toEqual('equal to 1000 B');
    });

    it('should return an observable if the label is an observable', (done: DoneFn) => {
      filterComparator.label = of('equal to');
      (component.generateDisplayString(filterComparator) as Observable<string>).subscribe((displayString: string) => {
        expect(displayString).toEqual('equal to 1000 B');
        done();
      });
    });

    it('should just return the value if the label is undefined', (done: DoneFn) => {
      filterComparator.label = of(undefined);
      (component.generateDisplayString(filterComparator) as Observable<string>).subscribe((displayString: string) => {
        expect(displayString).toEqual('undefined 1000 B');
        done();
      });

      filterComparator.label = undefined;
      expect(component.generateDisplayString(filterComparator)).toEqual('undefined 1000 B');

      component.selectedFilterComparator.next(filterComparator);
      expect(component.generateDisplayString()).toEqual('undefined 1000 B');

      filterComparator = undefined;
      component.selectedFilterComparator.next(filterComparator);
      expect(component.generateDisplayString()).toEqual('undefined 1000 B');

      component.selectedFilterComparator = undefined;
      expect(component.generateDisplayString()).toEqual('undefined 1000 B');
    });
  });

  describe('isFormInvalid()', () => {
    it('should return false if filterForm is defined, true otherwise', () => {
      component.filterForm.get('bytes').setValue(undefined);
      component.filterForm.get('unit').setValue(undefined);
      expect(component.isFormInvalid()).toBeTrue();

      component.filterForm.get('bytes').setValue(undefined);
      component.filterForm.get('unit').setValue(BytesUnit.B);
      expect(component.isFormInvalid()).toBeTrue();

      component.filterForm.get('bytes').setValue(1000);
      component.filterForm.get('unit').setValue(undefined);
      expect(component.isFormInvalid()).toBeTrue();

      component.filterForm.get('bytes').setValue(0);
      component.filterForm.get('unit').setValue(BytesUnit.B);
      expect(component.isFormInvalid()).toBeFalse();

      component.filterForm.get('bytes').setValue(1000);
      component.filterForm.get('unit').setValue(BytesUnit.B);
      expect(component.isFormInvalid()).toBeFalse();
    });
  });
});
