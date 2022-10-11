import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { FusionComponentsTranslationService } from '@fusion-components/lib/services/translation';
import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';

import { TableFilterConfig } from '../../table-filter-selector';
import { FilterComparator } from '../table-filter-comparator';
import { TableFilterComponent } from './table-filter.component';

describe('TableFilter', () => {
  let component: TableFilterComponent;
  let translationService: FusionComponentsTranslationService;
  let translateService: TranslateService;

  beforeEach(() => {
    translationService = new FusionComponentsTranslationService();
    translateService = ComponentStubFactory.getTranslateServiceStub();
    component = new TableFilterComponent(new UntypedFormBuilder(), translationService, translateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getters and setters', () => {
    describe('GET config', () => {
      it('should return the filter config based on the filter state', () => {
        const result: TableFilterConfig = component.config;
        expect(result.field).toEqual(component.field);
        expect(result.filter).toEqual(component.TableFilter);
        expect(result.filterName).toEqual(component.filterName);
        expect(result.comparatorName).toEqual(component.selectedFilterComparator.value?.name);
        expect(result.formValues).toEqual(component.filterForm.value);
        expect(result.uuid).toEqual(component.uuid);
        expect(result.isVisibleInSelector).toEqual(component.isVisibleInSelector);
        expect(result.isVisible).toEqual(component.isVisible);
        expect(result.isViewFilter).toEqual(component.isViewFilter);
      });
    });
  });

  describe('getFormValue()', () => {
    it('should return filterForm by default', () => {
      const form: UntypedFormGroup = component.fb.group({});
      component.filterForm = form;
      expect(component.getFormValue()).toEqual(form);
    });
  });

  describe('generateComparatorLabel()', () => {
    it('should handle if a translation for the comparator was provided', () => {
      component.translations = {
        comparators: {
          testComparator: 'test',
        },
      };

      expect(component.generateComparatorLabel('testComparator')).toEqual('test');
    });

    it('should use the translateService to generate the comparator label if no translation was provided', (done: DoneFn) => {
      (translateService.get as jasmine.Spy).calls.reset();
      (translateService.get as jasmine.Spy).and.returnValue(of('test'));
      spyOnProperty(translationService, 'baseTranslationKey').and.returnValue('components');
      (component.generateComparatorLabel('testComparator') as Observable<string>).subscribe((label: string) => {
        expect(label).toEqual('test');
        expect(translateService.get).toHaveBeenCalledWith('components.table.filters.base.comparators.testComparator');
        done();
      });
    });
  });

  describe('generateDisplayString()', () => {
    it('should return the provided comparator label and form', () => {
      const filterComparator: FilterComparator = {} as FilterComparator;
      filterComparator.label = 'label';

      expect(component.generateDisplayString(filterComparator, undefined)).toEqual('label undefined');
      expect(component.generateDisplayString(undefined, undefined)).toEqual('undefined undefined');
    });
  });

  describe('isFormInvalid()', () => {
    it('should return false if filterForm is defined, true otherwise', () => {
      let form: UntypedFormGroup = component.fb.group({});

      component.filterForm = undefined as any;
      expect(component.isFormInvalid()).toBeTrue();

      form = component.fb.group({ input: [null, Validators.required]});
      component.filterForm = form;
      expect(component.isFormInvalid()).toBeTruthy();

      form = component.fb.group({});
      component.filterForm = form;
      expect(component.isFormInvalid()).toBeFalse();
    });
  });

  describe('useValueTransformFunctionIfItExists', () => {
    it('should transform the value if valueTransformFunction was provided', () => {
      component.valueTransformFunction = undefined as any;
      expect(component.useValueTransformFunctionIfItExists('value')).toEqual('value');

      component.valueTransformFunction = (_val: any) => 'new value';
      expect(component.useValueTransformFunctionIfItExists('value')).toEqual('new value');
    });
  });

  describe('escape/unescape', () => {
    it('should properly escape strings', () => {
      expect(component.escapeSpecialChars('hi-my-name-is')).toBe('hi-my-name-is');
      expect(component.escapeSpecialChars('hi,my,name,is')).toBe('hi\\,my\\,name\\,is');
      expect(component.escapeSpecialChars('hi:my:name:is')).toBe('hi\\:my\\:name\\:is');
      expect(component.escapeSpecialChars('hi\\my\\name\\is')).toBe('hi\\\\my\\\\name\\\\is');
      expect(component.escapeSpecialChars('hi,my:name\\is')).toBe('hi\\,my\\:name\\\\is');
      expect(component.escapeSpecialChars('hi\\\\dude')).toBe('hi\\\\\\\\dude');
    });

    it('should properly unescape strings', () => {
      expect(component.unescapeSpecialChars('hi\\,my\\,name\\,is')).toBe('hi,my,name,is');
      expect(component.unescapeSpecialChars('hi\\:my\\:name\\:is')).toBe('hi:my:name:is');
      expect(component.unescapeSpecialChars('hi\\\\my\\\\name\\\\is')).toBe('hi\\my\\name\\is');
      expect(component.unescapeSpecialChars('hi\\,my\\:name\\\\is')).toBe('hi,my:name\\is');
      expect(component.unescapeSpecialChars('hi\\\\\\\\dude')).toBe('hi\\\\dude');
    });

    it('should properly escape then unescape', () => {
      expect(component.unescapeSpecialChars(component.escapeSpecialChars('hi-my-name-is'))).toBe('hi-my-name-is');
      expect(component.unescapeSpecialChars(component.escapeSpecialChars('hi,my,name,is'))).toBe('hi,my,name,is');
      expect(component.unescapeSpecialChars(component.escapeSpecialChars('hi:my:name:is'))).toBe('hi:my:name:is');
      expect(component.unescapeSpecialChars(component.escapeSpecialChars('hi\\my\\name\\is'))).toBe('hi\\my\\name\\is');
      expect(component.unescapeSpecialChars(component.escapeSpecialChars('hi,my:name\\is'))).toBe('hi,my:name\\is');
      expect(component.unescapeSpecialChars(component.escapeSpecialChars('hi\\\\dude'))).toBe('hi\\\\dude');
    });
  });
});
