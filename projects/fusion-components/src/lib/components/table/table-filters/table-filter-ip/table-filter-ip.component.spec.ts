import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { FilterComparator } from '../table-filter-comparator';
import { TableFilterIpComponent } from './table-filter-ip.component';
import { DEFAULT_TABLE_FILTER_IP_TRANSLATIONS, TableFilterIpInputComparator } from './table-filter-ip.interface';

describe('TableFilterIpComponent', () => {
  let component: TableFilterIpComponent;

  beforeEach(() => {
    component = new TableFilterIpComponent(new UntypedFormBuilder());
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('filterComparators', () => {
    describe('IS', () => {
      let value: string;

      beforeEach(() => {
        value = '1.2.3.4';
        component.selectedFilterComparator.next(component.filterComparators[0]);
        component.filterForm.get('ip')?.setValue('1.2.3.4');
      });

      it('test should return true when the input equals the row value', () => {
        expect(component.filterComparators[0].test(value)).toEqual(true);
        value = '1.1.1.1';
        expect(component.filterComparators[0].test(value)).toEqual(false);
      });

      it('test should decode properly', () => {
        expect(component.filterComparators[0].decodeQueryParam('10.175.12.01')).toEqual({
          ip: '10.175.12.01'
        });
      });

      it('test should encode properly', () => {
        expect(component.filterComparators[0].encodeQueryParam({ip: '10.10.10.10'})).toBe('10.10.10.10');
        expect(component.filterComparators[0].encodeQueryParam(null)).toBe('');
      });

      describe('displayString', () => {
        it('should call generateDisplayString()', () => {
          spyOn(component, 'generateDisplayString').and.returnValue('is value');
          expect(component.filterComparators[0].displayString!()).toEqual('is value');
        });
      });
    });

    describe('IS_NOT', () => {
      let value: string;

      beforeEach(() => {
        value = '1.2.3.4';
        component.selectedFilterComparator.next(component.filterComparators[1]);
        component.filterForm.get('ip')?.setValue('1.2.3.4');
      });

      it('test should return true when the input equals the row value', () => {
        expect(component.filterComparators[1].test(value)).toEqual(false);
        value = '1.1.1.1';
        expect(component.filterComparators[1].test(value)).toEqual(true);
      });

      it('test should decode properly', () => {
        expect(component.filterComparators[1].decodeQueryParam('10.175.12.01')).toEqual({
          ip: '10.175.12.01'
        });
      });

      it('test should encode properly', () => {
        expect(component.filterComparators[1].encodeQueryParam({ip: '10.10.10.10'})).toBe('10.10.10.10');
        expect(component.filterComparators[1].encodeQueryParam(null)).toBe('');
      });
    });

    describe('CONTAINS', () => {
      let value: string;

      beforeEach(() => {
        value = '1.2.3.4';
        component.selectedFilterComparator.next(component.filterComparators[2]);
        component.filterForm.get('octet1')?.setValue(1);
      });

      it('test should return true when the input is equal to the octet values', () => {
        expect(component.filterComparators[2].test(value)).toEqual(true);

        component.filterForm.get('octet2')?.setValue(2);
        expect(component.filterComparators[2].test(value)).toEqual(true);

        component.filterForm.get('octet3')?.setValue(3);
        expect(component.filterComparators[2].test(value)).toEqual(true);

        component.filterForm.get('octet4')?.setValue(4);
        expect(component.filterComparators[2].test(value)).toEqual(true);

        component.filterForm.get('octet1')?.setValue(2);
        expect(component.filterComparators[2].test(value)).toEqual(false);
      });

      it('test should decode properly', () => {
        expect(component.filterComparators[2].decodeQueryParam('10.x.1.x')).toEqual({
          ip: null,
          octet1: 10,
          octet2: null,
          octet3: 1,
          octet4: null,
        });
      });

      it('test should error on decode if invalid', () => {
        expect(() => component.filterComparators[2].decodeQueryParam('175.12.01')).toThrowError();
        expect(() => component.filterComparators[2].decodeQueryParam('x.x.x.x')).toThrowError();

      });

      it('test should encode properly', () => {
        expect(component.filterComparators[2].encodeQueryParam({
          octet1: 192,
          octet2: 19,
          octet3: 1,
          octet4: null,
        })).toBe('192.19.1.x');
      });
    });

    describe('DOES_NOT_CONTAIN', () => {
      let value: string;

      beforeEach(() => {
        value = '1.2.3.4';
        component.selectedFilterComparator.next(component.filterComparators[3]);
        component.filterForm.get('octet1')?.setValue(1);
      });

      it('test should return true when the input is not equal to the selected octet value', () => {
        expect(component.filterComparators[3].test(value)).toEqual(false);

        component.filterForm.get('octet2')?.setValue(2);
        expect(component.filterComparators[3].test(value)).toEqual(false);

        component.filterForm.get('octet3')?.setValue(3);
        expect(component.filterComparators[3].test(value)).toEqual(false);

        component.filterForm.get('octet4')?.setValue(4);
        expect(component.filterComparators[3].test(value)).toEqual(false);

        component.filterForm.get('octet1')?.setValue(2);
        expect(component.filterComparators[3].test(value)).toEqual(false);

        component.filterForm.get('octet1')?.setValue(2);
        component.filterForm.get('octet2')?.setValue(null);
        component.filterForm.get('octet3')?.setValue(null);
        component.filterForm.get('octet4')?.setValue(null);
        expect(component.filterComparators[3].test(value)).toEqual(true);
      });

      it('test should decode properly', () => {
        expect(component.filterComparators[3].decodeQueryParam('10.x.1.x')).toEqual({
          ip: null,
          octet1: 10,
          octet2: null,
          octet3: 1,
          octet4: null,
        });
      });

      it('test should error on decode if invalid', () => {
        expect(() => component.filterComparators[3].decodeQueryParam('175.12.01')).toThrowError();
        expect(() => component.filterComparators[3].decodeQueryParam('x.x.x.x')).toThrowError();
      });

      it('test should encode properly', () => {
        expect(component.filterComparators[3].encodeQueryParam({
          octet1: 192,
          octet2: 19,
          octet3: 1,
          octet4: null,
        })).toBe('192.19.1.x');
      });
    });
  });

  describe('ngOnInit()', () => {
    it(
      `should create a subscription to update isContainsOrDoesNotContainSelector
      based on the changes to the selected filter comparator`,
      () => {
        component.ngOnInit();

        let filterComparator: FilterComparator = component.filterComparators[0]; // IS
        component.selectedFilterComparator.next(filterComparator);
        expect(component.isContainsOrDoesNotContainSelector).toBeFalse();

        filterComparator = component.filterComparators[1]; // IS NOT
        component.selectedFilterComparator.next(filterComparator);
        expect(component.isContainsOrDoesNotContainSelector).toBeFalse();

        filterComparator = component.filterComparators[2]; // CONTAINS
        component.selectedFilterComparator.next(filterComparator);
        expect(component.isContainsOrDoesNotContainSelector).toBeTrue();

        filterComparator = component.filterComparators[3]; // DOES NOT CONTAIN
        component.selectedFilterComparator.next(filterComparator);
        expect(component.isContainsOrDoesNotContainSelector).toBeTrue();
    });
  });

  describe('generateComparatorLabel()', () => {
    it('should handle if a translation for the comparator was provided', () => {
      component.translations = {
        ...DEFAULT_TABLE_FILTER_IP_TRANSLATIONS,
        comparators: {
          [TableFilterIpInputComparator.IS]: 'is',
        },
      };

      expect(component.generateComparatorLabel(TableFilterIpInputComparator.IS)).toEqual('is');
    });
  });

  describe('generateDisplayString()', () => {
    let filterComparator: FilterComparator;
    let form: any;

    describe('IS and IS_NOT', () => {
      beforeEach(() => {
        spyOn(component, 'getFormValue').and.returnValue('value');
        filterComparator = component.filterComparators[0];
        filterComparator.label = 'is';
        component.selectedFilterComparator.next(filterComparator);
      });

      it('should use the provided comparator label', () => {
        expect(component.generateDisplayString(filterComparator)).toEqual('is value');
      });

      it('should use the selectedFilterComparator label if no comparator was provided', () => {
        component.selectedFilterComparator.next(filterComparator);
        expect(component.generateDisplayString()).toEqual('is value');
      });

      it('should use the provided form', () => {
        form = { ip: 'value' };
        expect(component.generateDisplayString(undefined, form)).toEqual('is value');
      });

      it('should use getFormValue if no form was provided or if it is undefined', () => {
        expect(component.generateDisplayString()).toEqual('is value');
      });

      it('should return an observable if the label is an observable', (done: DoneFn) => {
        filterComparator.label = of('is');
        (component.generateDisplayString(filterComparator) as Observable<string>).subscribe((displayString: string) => {
          expect(displayString).toEqual('is value');
          done();
        });
      });

      it('should just return the value if the label is undefined', (done: DoneFn) => {
        filterComparator.label = of(undefined as any);
        (component.generateDisplayString(filterComparator) as Observable<string>).subscribe((displayString: string) => {
          expect(displayString).toEqual('undefined value');
          done();
        });

        filterComparator.label = undefined as any;
        expect(component.generateDisplayString(filterComparator)).toEqual('undefined value');

        component.selectedFilterComparator.next(filterComparator);
        expect(component.generateDisplayString()).toEqual('undefined value');
      });
    });

    describe('CONTAINS and DOES_NOT_CONTAIN', () => {
      beforeEach(() => {
        spyOn(component, 'getFormValue').and.returnValue([10, null as any, null, null]);
        filterComparator = component.filterComparators[2];
        filterComparator.label = 'contains';
        component.selectedFilterComparator.next(filterComparator);
      });

      it('should use the provided comparator label', () => {
        expect(component.generateDisplayString(filterComparator)).toEqual('contains 10.x.x.x');
      });

      it('should use the selectedFilterComparator label if no comparator was provided', () => {
        component.selectedFilterComparator.next(filterComparator);
        expect(component.generateDisplayString()).toEqual('contains 10.x.x.x');
      });

      it('should use the provided form', () => {
        form = { octet1: 10, octet2: null, octet3: null, octet4: null };
        expect(component.generateDisplayString(undefined, form)).toEqual('contains 10.x.x.x');
      });

      it('should use getFormValue if no form was provided or if it is undefined', () => {
        expect(component.generateDisplayString()).toEqual('contains 10.x.x.x');
      });

      it('should return an observable if the label is an observable', (done: DoneFn) => {
        filterComparator.label = of('contains');
        (component.generateDisplayString(filterComparator) as Observable<string>).subscribe((displayString: string) => {
          expect(displayString).toEqual('contains 10.x.x.x');
          done();
        });
      });

      it('should just return the value if the label is undefined', (done: DoneFn) => {
        filterComparator.label = of(undefined as any);
        (component.generateDisplayString(filterComparator) as Observable<string>).subscribe((displayString: string) => {
          expect(displayString).toEqual('undefined 10.x.x.x');
          done();
        });

        filterComparator.label = undefined as any;
        expect(component.generateDisplayString(filterComparator)).toEqual('undefined 10.x.x.x');

        component.selectedFilterComparator.next(filterComparator);
        expect(component.generateDisplayString()).toEqual('undefined 10.x.x.x');

        filterComparator = undefined as any;
        component.selectedFilterComparator.next(filterComparator);
        expect(component.generateDisplayString()).toEqual('undefined 10.x.x.x');

        component.selectedFilterComparator = undefined as any;
        expect(component.generateDisplayString()).toEqual('undefined 10.x.x.x');
      });
    });
  });

  describe('buildForm()', () => {
    it('should build the filterForm with the correct controls', () => {
      component.buildForm();
      expect(component.filterForm.get('ip')).toBeTruthy();
      expect(component.filterForm.get('octet1')).toBeTruthy();
      expect(component.filterForm.get('octet2')).toBeTruthy();
      expect(component.filterForm.get('octet3')).toBeTruthy();
      expect(component.filterForm.get('octet4')).toBeTruthy();
    });
  });

  describe('getFormValue()', () => {
    it('should return octets if isContainsOrDoesNotContainSelector, ip otherwise', () => {
      const testSpy: jasmine.Spy = spyOn((component as any), 'testIfIsContainsOrDoesNotContainSelector');

      component.filterForm.get('ip')?.setValue('1.2.3.4');
      component.filterForm.get('octet1')?.setValue(1);
      component.filterForm.get('octet2')?.setValue(2);
      component.filterForm.get('octet3')?.setValue(3);
      component.filterForm.get('octet4')?.setValue(4);

      testSpy.and.returnValue(true);
      expect(component.getFormValue()).toEqual([1, 2, 3, 4]);

      testSpy.and.returnValue(false);
      expect(component.getFormValue()).toEqual('1.2.3.4');
    });
  });

  describe('isFormInvalid', () => {
    it('should return true if the form is invalid, false otherwise', fakeAsync(() => {
      component.filterForm.get('ip')?.setValue(null);
      component.filterForm.get('octet1')?.setValue(null);
      component.filterForm.get('octet2')?.setValue(null);
      component.filterForm.get('octet3')?.setValue(null);
      component.filterForm.get('octet4')?.setValue(null);

      component.selectedFilterComparator.next(component.filterComparators[0]);
      tick(1000);
      expect(component.isFormInvalid()).toBeTrue();
      component.selectedFilterComparator.next(component.filterComparators[1]);
      tick(1000);
      expect(component.isFormInvalid()).toBeTrue();
      component.selectedFilterComparator.next(component.filterComparators[2]);
      tick(1000);
      expect(component.isFormInvalid()).toBeTrue();
      component.selectedFilterComparator.next(component.filterComparators[3]);
      tick(1000);
      expect(component.isFormInvalid()).toBeTrue();

      component.filterForm.get('ip')?.setValue('1.2.3.4');
      component.filterForm.get('octet1')?.setValue(1);

      component.selectedFilterComparator.next(component.filterComparators[0]);
      tick(1000);
      expect(component.isFormInvalid()).toBeFalse();
      component.selectedFilterComparator.next(component.filterComparators[1]);
      tick(1000);
      expect(component.isFormInvalid()).toBeFalse();
      component.selectedFilterComparator.next(component.filterComparators[2]);
      tick(1000);
      expect(component.isFormInvalid()).toBeFalse();
      component.selectedFilterComparator.next(component.filterComparators[3]);
      tick(1000);
      expect(component.isFormInvalid()).toBeFalse();

      discardPeriodicTasks();
    }));
  });
});
