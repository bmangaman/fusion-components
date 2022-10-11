import { UntypedFormBuilder } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { FusionComponentsTranslationService } from '@fusion-components/lib/services/translation';
import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';

import { FilterComparator } from '../table-filter-comparator';
import { TableFilterArrayComponent } from './table-filter-array.component';
import { TableFilterArrayInputComparator } from './table-filter-array.interface';

describe('TableFilterArrayComponent', () => {
  let component: TableFilterArrayComponent;
  let translationService: FusionComponentsTranslationService;
  let translateService: TranslateService;

  beforeEach(() => {
    translationService = new FusionComponentsTranslationService();
    translateService = ComponentStubFactory.getTranslateServiceStub();
    component = new TableFilterArrayComponent(new UntypedFormBuilder(), translationService, translateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('filterComparators', () => {
    let value: any[];

    describe('CONTAINS', () => {
      it('test should call containsTest', () => {
        spyOn(component, 'containsTest').and.callThrough();
        component.filterForm.get('value')?.setValue('hello');
        value = ['hello', 'world'];
        expect(component.filterComparators[0].test(value)).toEqual(true);
        expect(component.containsTest).toHaveBeenCalledWith(value);
      });

      it('test should decode properly', () => {
        expect(component.filterComparators[0].decodeQueryParam('test-string')).toEqual({ value: 'test-string' });
      });

      it('test should encode properly', () => {
        expect(component.filterComparators[0].encodeQueryParam({ value: 'test-string' })).toBe('test-string');
        expect(component.filterComparators[0].encodeQueryParam(null)).toBe('');
      });

      describe('displayString', () => {
        it('should call generateDisplayString()', () => {
          spyOn(component, 'generateDisplayString').and.returnValue('is value');
          expect(component.filterComparators[0].displayString!()).toEqual('is value');
        });
      });
    });

    describe('DOES_NOT_CONTAIN', () => {
      it('test should call containsTest', () => {
        spyOn(component, 'containsTest').and.callThrough();
        component.filterForm.get('value')?.setValue('hello');
        value = ['hello', 'world'];
        expect(component.filterComparators[1].test(value)).toEqual(false);
        expect(component.containsTest).toHaveBeenCalledWith(value);
      });
    });
  });

  describe('generateComparatorLabel()', () => {
    it('should handle if a translation for the comparator was provided', () => {
      component.translations = {
        comparators: {
          [TableFilterArrayInputComparator.CONTAINS]: 'contains',
        },
      };

      expect(component.generateComparatorLabel(TableFilterArrayInputComparator.CONTAINS)).toEqual('contains');
    });

    it('should use the translateService to generate the comparator label if no translation was provided', (done: DoneFn) => {
      (translateService.get as jasmine.Spy).calls.reset();
      (translateService.get as jasmine.Spy).and.returnValue(of('contains'));
      spyOnProperty(translationService, 'baseTranslationKey').and.returnValue('components');
      (component.generateComparatorLabel(TableFilterArrayInputComparator.CONTAINS) as Observable<string>).subscribe((label: string) => {
        expect(label).toEqual('contains');
        expect(translateService.get).toHaveBeenCalledWith('components.table.filters.array.comparators.contains');
        done();
      });
    });
  });

  describe('generateDisplayString()', () => {
    let filterComparator: FilterComparator;
    let form: any;

    beforeEach(() => {
      spyOn(component, 'getFormValue').and.returnValue('value');
      filterComparator = component.filterComparators[0];
      filterComparator.label = 'contains';
      component.selectedFilterComparator.next(filterComparator);
    });

    it('should use the provided comparator label', () => {
      expect(component.generateDisplayString(filterComparator)).toEqual('contains value');
    });

    it('should use the selectedFilterComparator label if no comparator was provided', () => {
      component.selectedFilterComparator.next(filterComparator);
      expect(component.generateDisplayString()).toEqual('contains value');
    });

    it('should use the provided form', () => {
      form = { string: 'value' };
      expect(component.generateDisplayString(undefined, form)).toEqual('contains value');
    });

    it('should use getFormValue if no form was provided or if it is undefined', () => {
      expect(component.generateDisplayString()).toEqual('contains value');
    });

    it('should return an observable if the label is an observable', (done: DoneFn) => {
      filterComparator.label = of('contains');
      (component.generateDisplayString(filterComparator) as Observable<string>).subscribe((displayString: string) => {
        expect(displayString).toEqual('contains value');
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
      expect(component.filterForm.value).toEqual({ value: null });
    });
  });

  describe('getFormValue()', () => {
    it('should return filterForm.number value', () => {
      component.filterForm.get('value')?.setValue('hello world');
      expect(component.getFormValue()).toEqual('hello world');
    });
  });

  describe('isFormInvalid()', () => {
    it('should return false if filterForm is defined, true otherwise', () => {
      component.filterForm.get('value')?.setValue(undefined);
      expect(component.isFormInvalid()).toBeTrue();

      component.filterForm.get('value')?.setValue('hello world');
      expect(component.isFormInvalid()).toBeFalse();
    });
  });

  describe('containsTest()', () => {
    let value: any[];

    beforeEach(() => {
      value = [];
    });

    describe('string[]', () => {
      beforeEach(() => {
        component.filterForm.get('value')?.setValue('hello');
      });

      it('should return true if the input value matches or is a substring of any of the row values', () => {
        value = ['hello', 'world', 'helloWorld'];
        expect(component.filterComparators[0].test(value)).toEqual(true);
        value = ['helloWorld'];
        expect(component.filterComparators[0].test(value)).toEqual(true);
        value = ['world'];
        expect(component.filterComparators[0].test(value)).toEqual(false);
        value = [] as string[];
        expect(component.filterComparators[0].test(value)).toEqual(false);
        value = undefined as any;
        expect(component.filterComparators[0].test(value)).toEqual(false);
      });
    });

    describe('other', () => {
      beforeEach(() => {
        component.filterForm.get('value')?.setValue(10);
      });

      it('should return true if the input value matches any of the row values', () => {
        value = [9, 10, 100];
        expect(component.filterComparators[0].test(value)).toEqual(true);
        value = [100];
        expect(component.filterComparators[0].test(value)).toEqual(false);
        value = [];
        expect(component.filterComparators[0].test(value)).toEqual(false);
        value = undefined as any;
        expect(component.filterComparators[0].test(value)).toEqual(false);
      });
    });
  });
});
