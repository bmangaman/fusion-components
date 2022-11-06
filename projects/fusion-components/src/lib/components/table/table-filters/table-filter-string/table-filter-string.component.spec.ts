import { UntypedFormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { FilterComparator } from '../table-filter-comparator';
import { TableFilterStringComponent } from './table-filter-string.component';
import { DEFAULT_TABLE_FILTER_STRING_TRANSLATIONS, TableFilterStringInputComparator } from './table-filter-string.interface';

describe('TableFilterStringComponent', () => {
  let component: TableFilterStringComponent;

  beforeEach(() => {
    component = new TableFilterStringComponent(new UntypedFormBuilder());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('filterComparators', () => {
    let value: string;

    describe('IS', () => {
      it('test should return true when the input equals the row value', () => {
        component.filterForm.get('string')?.setValue('hello world');

        value = 'hello world';
        expect(component.filterComparators[0].test(value)).toEqual(true);
        value = 'not hello world';
        expect(component.filterComparators[0].test(value)).toEqual(false);
      });

      it('test should decode properly', () => {
        expect(component.filterComparators[0].decodeQueryParam('test-string')).toEqual({ string: 'test-string' });
      });

      it('test should encode properly', () => {
        expect(component.filterComparators[0].encodeQueryParam({ string: 'test-string' })).toBe('test-string');
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
      it('test should return true when the input does not equal the row value', () => {
        component.filterForm.get('string')?.setValue('hello world');

        value = 'not hello world';
        expect(component.filterComparators[1].test(value)).toEqual(true);
        value = 'hello world';
        expect(component.filterComparators[1].test(value)).toEqual(false);
      });
    });

    describe('CONTAINS', () => {
      it('test should return true when the row value contains the input', () => {
        component.filterForm.get('string')?.setValue('hello');

        value = 'hello world';
        expect(component.filterComparators[2].test(value)).toEqual(true);
        value = 'world';
        expect(component.filterComparators[2].test(value)).toEqual(false);
        value = undefined as any;
        expect(component.filterComparators[2].test(value)).toEqual(false);
        value = '';
        expect(component.filterComparators[2].test(value)).toEqual(false);
      });
    });

    describe('DOES_NOT_CONTAIN', () => {
      it('test should return true when the row value does not contain the input', () => {
        component.filterForm.get('string')?.setValue('hello');

        value = undefined as any;
        expect(component.filterComparators[3].test(value)).toEqual(true);
        value = '';
        expect(component.filterComparators[3].test(value)).toEqual(true);
        value = 'world';
        expect(component.filterComparators[3].test(value)).toEqual(true);
        value = 'hello world';
        expect(component.filterComparators[3].test(value)).toEqual(false);
      });
    });

    describe('IS_EMPTY', () => {
      it('test should return true when the row value is empty', () => {
        value = undefined as any;
        expect(component.filterComparators[4].test(value)).toEqual(true);
        value = '';
        expect(component.filterComparators[4].test(value)).toEqual(true);
        value = 'hello world';
        expect(component.filterComparators[4].test(value)).toEqual(false);
      });
    });

    describe('IS_NOT_EMPTY', () => {
      it('test should return true when the row value is not empty', () => {
        value = 'hello world';
        expect(component.filterComparators[5].test(value)).toEqual(true);
        value = undefined as any;
        expect(component.filterComparators[5].test(value)).toEqual(false);
        value = '';
        expect(component.filterComparators[5].test(value)).toEqual(false);
      });
    });
  });

  describe('ngOnInit()', () => {
    it('should create a subscription to update hideInput based on the changes to the selected filter comparator', () => {
      component.ngOnInit();

      let filterComparator: FilterComparator = component.filterComparators[0]; // IS
      component.selectedFilterComparator.next(filterComparator);
      expect(component.hideInput).toBeFalse();

      filterComparator = component.filterComparators[1]; // IS NOT
      component.selectedFilterComparator.next(filterComparator);
      expect(component.hideInput).toBeFalse();

      filterComparator = component.filterComparators[2]; // CONTAINS
      component.selectedFilterComparator.next(filterComparator);
      expect(component.hideInput).toBeFalse();

      filterComparator = component.filterComparators[3]; // DOES NOT CONTAIN
      component.selectedFilterComparator.next(filterComparator);
      expect(component.hideInput).toBeFalse();

      filterComparator = component.filterComparators[4]; // IS EMPTY
      component.selectedFilterComparator.next(filterComparator);
      expect(component.hideInput).toBeTrue();

      filterComparator = component.filterComparators[5]; // IS NOT EMPTY
      component.selectedFilterComparator.next(filterComparator);
      expect(component.hideInput).toBeTrue();
    });
  });

  describe('generateComparatorLabel()', () => {
    it('should handle if a translation for the comparator was provided', () => {
      component.translations = {
        ...DEFAULT_TABLE_FILTER_STRING_TRANSLATIONS,
        comparators: {
          [TableFilterStringInputComparator.IS]: 'is',
        },
      };

      expect(component.generateComparatorLabel(TableFilterStringInputComparator.IS)).toEqual('is');
    });
  });

  describe('generateDisplayString()', () => {
    let filterComparator: FilterComparator;
    let form: any;

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
      form = { string: 'value' };
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

      filterComparator = undefined as any;
      component.selectedFilterComparator.next(filterComparator);
      expect(component.generateDisplayString()).toEqual('undefined value');

      component.selectedFilterComparator = undefined as any;
      expect(component.generateDisplayString()).toEqual('undefined value');
    });
  });

  describe('buildForm()', () => {
    it('should generate the filterForm', () => {
      component.filterForm = undefined as any;
      component.buildForm();
      expect(component.filterForm).toBeDefined();
      expect(component.filterForm.value).toEqual({ string: null });
    });
  });

  describe('getFormValue()', () => {
    it('should return filterForm.number value', () => {
      component.filterForm.get('string')?.setValue('hello world');
      expect(component.getFormValue()).toEqual('hello world');
    });
  });

  describe('isFormInvalid()', () => {
    it('should return false if filterForm is defined, true otherwise', () => {
      component.filterForm.get('string')?.setValue(undefined);
      expect(component.isFormInvalid()).toBeTrue();

      component.hideInput = true;
      expect(component.isFormInvalid()).toBeFalse();

      component.filterForm.get('string')?.setValue('hello world');
      expect(component.isFormInvalid()).toBeFalse();
    });
  });
});
