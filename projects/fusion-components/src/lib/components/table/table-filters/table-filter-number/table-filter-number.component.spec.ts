import { FormBuilder } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { FusionComponentsTranslationService } from '@fusion-ui/fusion-components/lib/services/translation';
import { ComponentStubFactory } from '@fusion-ui/fusion-components/unit-test-helpers/component-stub-factory.spec';

import { FilterComparator } from '../table-filter-comparator';
import { TableFilterNumberComponent } from './table-filter-number.component';
import { TableFilterNumberInputComparator } from './table-filter-number.interface';

describe('TableFilterNumberComponent', () => {
  let component: TableFilterNumberComponent;
  let translationService: FusionComponentsTranslationService;
  let translateService: TranslateService;

  beforeEach(() => {
    translationService = new FusionComponentsTranslationService();
    translateService = ComponentStubFactory.getTranslateServiceStub();
    component = new TableFilterNumberComponent(new FormBuilder(), translationService, translateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('filterComparators', () => {
    let value: number;

    describe('EQUAL_TO', () => {
      it('test should return true when the input equals the row value', () => {
        component.filterForm.get('number').setValue(1);

        value = 1;
        expect(component.filterComparators[0].test(value)).toEqual(true);
        value = 2;
        expect(component.filterComparators[0].test(value)).toEqual(false);
      });

      it('test should decode properly', () => {
        expect(component.filterComparators[0].decodeQueryParam('500')).toEqual({ number: 500 });
      });

      it('test should encode properly', () => {
        expect(component.filterComparators[0].encodeQueryParam({ number: 300 })).toBe('300');
        expect(component.filterComparators[0].encodeQueryParam(null)).toBe('');
      });

      describe('displayString', () => {
        it('should call generateDisplayString()', () => {
          spyOn(component, 'generateDisplayString').and.returnValue('is value');
          expect(component.filterComparators[0].displayString()).toEqual('is value');
        });
      });
    });

    describe('NOT_EQUAL_TO', () => {
      it('test should return true when the input does not equal the row value', () => {
        component.filterForm.get('number').setValue(1);

        value = 2;
        expect(component.filterComparators[1].test(value)).toEqual(true);
        value = 1;
        expect(component.filterComparators[1].test(value)).toEqual(false);
      });
    });

    describe('GREATER_THAN', () => {
      it('test should return true when the input is greater than the row value', () => {
        component.filterForm.get('number').setValue(1);

        value = 2;
        expect(component.filterComparators[2].test(value)).toEqual(true);
        value = 0;
        expect(component.filterComparators[2].test(value)).toEqual(false);
      });
    });

    describe('LESS_THAN', () => {
      it('test should return true when the input is less than the row value', () => {
        component.filterForm.get('number').setValue(1);

        value = 0;
        expect(component.filterComparators[3].test(value)).toEqual(true);
        value = 2;
        expect(component.filterComparators[3].test(value)).toEqual(false);
      });
    });
  });

  describe('generateComparatorLabel()', () => {
    it('should handle if a translation for the comparator was provided', () => {
      component.translations = {
        comparators: {
          [TableFilterNumberInputComparator.EQUAL_TO]: 'equal to',
        },
      };

      expect(component.generateComparatorLabel(TableFilterNumberInputComparator.EQUAL_TO)).toEqual('equal to');
    });

    it('should use the translateService to generate the comparator label if no translation was provided', (done: DoneFn) => {
      (translateService.get as jasmine.Spy).calls.reset();
      (translateService.get as jasmine.Spy).and.returnValue(of('equal to'));
      spyOnProperty(translationService, 'baseTranslationKey').and.returnValue('components');
      (component.generateComparatorLabel(TableFilterNumberInputComparator.EQUAL_TO) as Observable<string>).subscribe((label: string) => {
        expect(label).toEqual('equal to');
        expect(translateService.get).toHaveBeenCalledWith('components.table.filters.number.comparators.equalTo');
        done();
      });
    });
  });

  describe('generateDisplayString()', () => {
    let filterComparator: FilterComparator;
    let form: any;

    beforeEach(() => {
      spyOn(component, 'getFormValue').and.returnValue(1);
      filterComparator = component.filterComparators[0];
      filterComparator.label = 'equal to';
      component.selectedFilterComparator.next(filterComparator);
    });

    it('should use the provided comparator label', () => {
      expect(component.generateDisplayString(filterComparator)).toEqual('equal to 1');
    });

    it('should use the selectedFilterComparator label if no comparator was provided', () => {
      component.selectedFilterComparator.next(filterComparator);
      expect(component.generateDisplayString()).toEqual('equal to 1');
    });

    it('should use the provided form', () => {
      form = { number: 1 };
      expect(component.generateDisplayString(undefined, form)).toEqual('equal to 1');
    });

    it('should use getFormValue if no form was provided or if it is undefined', () => {
      expect(component.generateDisplayString()).toEqual('equal to 1');
    });

    it('should return an observable if the label is an observable', (done: DoneFn) => {
      filterComparator.label = of('equal to');
      (component.generateDisplayString(filterComparator) as Observable<string>).subscribe((displayString: string) => {
        expect(displayString).toEqual('equal to 1');
        done();
      });
    });

    it('should just return the value if the label is undefined', (done: DoneFn) => {
      filterComparator.label = of(undefined);
      (component.generateDisplayString(filterComparator) as Observable<string>).subscribe((displayString: string) => {
        expect(displayString).toEqual('undefined 1');
        done();
      });

      filterComparator.label = undefined;
      expect(component.generateDisplayString(filterComparator)).toEqual('undefined 1');

      component.selectedFilterComparator.next(filterComparator);
      expect(component.generateDisplayString()).toEqual('undefined 1');

      filterComparator = undefined;
      component.selectedFilterComparator.next(filterComparator);
      expect(component.generateDisplayString()).toEqual('undefined 1');

      component.selectedFilterComparator = undefined;
      expect(component.generateDisplayString()).toEqual('undefined 1');
    });
  });

  describe('buildForm()', () => {
    it('should generate the filterForm', () => {
      component.filterForm = undefined;
      component.buildForm();
      expect(component.filterForm).toBeDefined();
      expect(component.filterForm.value).toEqual({ number: null });
    });
  });

  describe('getFormValue()', () => {
    it('should return filterForm.number value', () => {
      component.filterForm.get('number').setValue(1);
      expect(component.getFormValue()).toEqual(1);
    });
  });

  describe('isFormInvalid()', () => {
    it('should return false if filterForm is defined, true otherwise', () => {
      component.filterForm.get('number').setValue(undefined);
      expect(component.isFormInvalid()).toBeTrue();

      component.filterForm.get('number').setValue(0);
      expect(component.isFormInvalid()).toBeFalse();

      component.filterForm.get('number').setValue(1);
      expect(component.isFormInvalid()).toBeFalse();
    });
  });
});
