import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { UntypedFormControl, NgControl } from '@angular/forms';

import { cloneDeep } from 'lodash-es';

import { MockElementRef } from '@fusion-components/unit-test-helpers/mock-utils.spec';
import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { DocumentClickService } from '../../services/document-click';
import { SelectComponent } from './select.component';
import { SelectOption } from './select.interface';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let ngControl: NgControl;
  let documentClickService: DocumentClickService;

  beforeEach(() => {
    ngControl = ComponentStubFactory.getNgControlStub() as NgControl;
    documentClickService = new DocumentClickService(document);

    component = new SelectComponent(ngControl, documentClickService);
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  describe('getters', () => {
    describe('control', () => {
      it('should return the _control', () => {
        expect(component.control).toEqual(ngControl);
      });
    });
  });

  describe('setters', () => {
    describe('isDisabled', () => {
      it('should set isDisabled and either enable or disable the searchInputControl', () => {
        spyOn(component.searchInputControl, 'disable').and.stub();
        spyOn(component.searchInputControl, 'enable').and.stub();

        component.isDisabled = true;
        expect(component.searchInputControl.disable).toHaveBeenCalled();

        component.isDisabled = false;
        expect(component.searchInputControl.enable).toHaveBeenCalled();
      });
    });
  });

  describe('@Input()', () => {
    describe('uuid', () => {
      it('should set the uuid if provided', () => {
        component.uuid = null as any;
        expect(component.uuid).toBeTruthy();

        component.uuid = 'custom-uuid';
        expect(component.uuid).toEqual('custom-uuid');
      });
    });

    describe('value', () => {
      it('should call setValue with the provided option', () => {
        const option: SelectOption = { label: 'label', value: 'value' };
        spyOn(component, 'setValue').and.stub();
        component.value = option;
        expect(component.setValue).toHaveBeenCalledWith(option);
      });
    });

    describe('options', () => {
      let options: SelectOption[];

      beforeEach(() => {
         options = [
          { label: 'label', value: 'value' },
          { label: 'label', value: 'value' },
          { label: 'label', value: 'value' },
        ];
      });

      it('should update the options and call setDropdownMinHeight()', () => {
        component.options = options;
        expect(component.options).toEqual([
          { label: '- Select -', value: null },
          ...options,
        ]);
      });

      it('should call filterOptions if isSearchable is true', () => {
        spyOn(component, 'filterOptions').and.stub();
        component.isSearchable = true;
        component.options = options;
        expect(component.filterOptions).toHaveBeenCalled();
      });
    });
  
    describe('isSearchable', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      let option: SelectOption;

      beforeEach(() => {
        option = { label: 'label', value: 'value' };
      });

      it('should set isSearchable and the searchInputControl value', () => {
        component['_value'] = option;
        component.isSearchable = true;
        expect(component['isSearchable']).toBeTrue();
        expect(component.searchInputControl.value).toEqual(option.label);
      });

      it('should handle if the searchInputControl or value is undefined', () => {
        component.searchInputControl = undefined as any;
        component['_value'] = option;
        component.isSearchable = true;
        expect(component.searchInputControl).toBeFalsy();

        component.searchInputControl = new UntypedFormControl();
        component['_value'] = undefined as any;
        component.isSearchable = true;
        expect(component.searchInputControl.value).toEqual(undefined);
      });

      /* eslint-enable @typescript-eslint/dot-notation */
    });
  });

  describe('onEscapeKeydown()', () => {
    it('should call closeDropdown() if the dropdown menu is open', () => {
      component.isDropdownOpen = false;
      component.onEscapeKeydown();
      expect(component.isDropdownOpen).toBeFalse();

      component.isDropdownOpen = true;
      component.onEscapeKeydown();
      expect(component.isDropdownOpen).toBeFalse();
    });
  });

  describe('ngOnInit()', () => {
    it('should call generateSelectClasses(), setDropdownMinHeight(), createCloseSelectSubscription(), and filterOptions()', () => {
      component.cssClasses = [];
      spyOn(component, 'generateSelectClasses').and.callThrough();
      spyOn(component, 'setDropdownMinHeight').and.stub();

      component.ngOnInit();
      expect(component.generateSelectClasses).toHaveBeenCalled();
      expect(component.selectClasses).toBeTruthy();
      expect(component.setDropdownMinHeight).toHaveBeenCalled();
    });

    it('should create a subscription to the searchInputControl', fakeAsync(() => {
      spyOn(component, 'filterOptions').and.stub();
      component.ngOnInit();
      component.searchInputControl.setValue('new value');
      tick(500);
      expect(component.filterOptions).toHaveBeenCalledWith('new value');
      discardPeriodicTasks();
    }));
  });

  describe('ngOnDestroy()', () => {
    it('should call next and complete on the unsubscribe subject', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      spyOn(component['_unsubscribe$'], 'next').and.stub();
      spyOn(component['_unsubscribe$'], 'complete').and.stub();
      component.ngOnDestroy();
      expect(component['_unsubscribe$'].next).toHaveBeenCalled();
      expect(component['_unsubscribe$'].complete).toHaveBeenCalled();

      /* eslint-enable @typescript-eslint/dot-notation */
    });
  });

  describe('filterOptions()', () => {
    let options: SelectOption[];

    beforeEach(() => {
      options = [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2', isDisabled: true },
        { label: 'label3', value: 'value3' },
      ];
      component.options = options;
    });

    it('should set filteredOptions to options if isSearchable is false or if no searchTerm was provided', () => {
      component.isSearchable = false;
      component.filterOptions();
      expect(component.filteredOptions).toEqual(component.options);
      
      component.isSearchable = false;
      component.filterOptions('1');
      expect(component.filteredOptions).toEqual(component.options);

      component.isSearchable = true;
      component.filterOptions();
      expect(component.filteredOptions).toEqual(component.options);
    });

    it('should return the list of options that contain the searchTerm', () => {
      component.isSearchable = true;
      component.isDropdownOpen = false;

      component.filterOptions('label');
      expect(component.filteredOptions).toEqual(options);

      component.filterOptions('1');
      expect(component.filteredOptions).toEqual([component.options[1]]);

      component.filterOptions('value2');
      expect(component.filteredOptions).toEqual([component.options[2]]);

      component.isDropdownOpen = true;
    });

    it('should set the input value to undefined if there are no matching options', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      spyOn(component, 'setValue').and.stub();
      component.isSearchable = true;

      component.filterOptions('bad-search');
      expect(component.filteredOptions).toEqual([]);
      expect(component.setValue).toHaveBeenCalledWith(undefined as any, false);

      component['_options'] = undefined as any;
      component.filterOptions('1');
      expect(component.filteredOptions).toEqual([]);
      expect(component.setValue).toHaveBeenCalledWith(undefined as any, false);

      /* eslint-enable @typescript-eslint/dot-notation */
    });

    it('should call setDropdownMinHeight()', () => {
      spyOn(component, 'setDropdownMinHeight').and.stub();
      component.filterOptions('option');
      expect(component.setDropdownMinHeight).toHaveBeenCalled();
    });
  });

  describe('setValue()', () => {
    let option: SelectOption;

    beforeEach(() => {
      option = { label: 'label', value: 'value' };
    });

    it('should set the value to the provided value', () => {
      component.value = option;
      expect(component.value).toEqual(option);
    });

    it('should call onChange() with the current value, close the dropdown menu', fakeAsync(() => {
      /* eslint-disable @typescript-eslint/dot-notation */

      component.registerOnChange(() => {});
      expect(component['onChange']).toBeDefined();
      spyOn(component as any, 'onChange').and.callThrough();
      component.setValue(option);
      tick(1000);
      expect(component['onChange']).toHaveBeenCalledWith(option);
      expect(component.isDropdownOpen).toBeFalse();
      expect(component.searchInputControl.value).toEqual(option.label);
      discardPeriodicTasks();

      /* eslint-enable @typescript-eslint/dot-notation */
    }));

    it('should handle if the searchInputControl is undefined', fakeAsync(() => {
      /* eslint-disable @typescript-eslint/dot-notation */

      component.searchInputControl = undefined as any;

      component.registerOnChange(() => {});
      expect(component['onChange']).toBeDefined();
      spyOn(component as any, 'onChange').and.callThrough();
      component.setValue(option);
      tick(1000);
      expect(component['onChange']).toHaveBeenCalledWith(option);
      expect(component.isDropdownOpen).toBeFalse();
      expect(component.searchInputControl).toEqual(undefined as any);
      discardPeriodicTasks();

      /* eslint-enable @typescript-eslint/dot-notation */
    }));

    it('should handle if the value is undefined', fakeAsync(() => {
      /* eslint-disable @typescript-eslint/dot-notation */

      component.registerOnChange(() => {});
      expect(component['onChange']).toBeDefined();
      spyOn(component as any, 'onChange').and.callThrough();
      component.setValue(undefined as any);
      tick(1000);
      expect(component['onChange']).toHaveBeenCalledWith(undefined);
      expect(component.isDropdownOpen).toBeFalse();
      expect(component.searchInputControl.value).toEqual(undefined);
      discardPeriodicTasks();

      /* eslint-enable @typescript-eslint/dot-notation */
    }));

    it('should NOT close the dropdown and set the search input if setSearchInputControlValue flag is false', fakeAsync(() => {
      /* eslint-disable @typescript-eslint/dot-notation */

      component.isDropdownOpen = true;
      component.searchInputControl.setValue(undefined);

      component.registerOnChange(() => {});
      expect(component['onChange']).toBeDefined();
      spyOn(component as any, 'onChange').and.callThrough();
      component.setValue(option, false);
      tick(1000);
      expect(component['onChange']).toHaveBeenCalledWith(option);
      expect(component.isDropdownOpen).toBeTrue();
      expect(component.searchInputControl.value).toEqual(undefined);
      discardPeriodicTasks();

      /* eslint-enable @typescript-eslint/dot-notation */
    }));

    it('should call onTouched()', fakeAsync(() => {
      /* eslint-disable @typescript-eslint/dot-notation */

      component.registerOnTouched(() => {});
      expect(component['onTouched']).toBeDefined();
      spyOn(component as any, 'onTouched').and.callThrough();
      component.setValue(option);
      tick(1000);
      expect(component['onTouched']).toHaveBeenCalled();
      discardPeriodicTasks();

      /* eslint-enable @typescript-eslint/dot-notation */
    }));
  });

  describe('templateSetValueWrapper()', () => {
    it('should prevent the default event behavior, set the current option index, and set the value', () => {
      spyOn(component, 'setValue').and.stub();
      const event: KeyboardEvent = new KeyboardEvent('click');
      spyOn(event, 'preventDefault').and.stub();
      const option: SelectOption = { value: 'value', label: 'label '};
      component.templateSetValueWrapper(event, option, 1);
      expect(component.setValue).toHaveBeenCalledWith(option);
      expect(event.preventDefault).toHaveBeenCalled();
      // eslint-disable-next-line @typescript-eslint/dot-notation
      expect(component['_currentOptionIndex']).toEqual(1);
    });
  });

  describe('writeValue()', () => {
    it('should set the value', () => {
      const value: SelectOption = { label: 'label', value: 'value' };
      component.writeValue(value);
      expect(component.value).toEqual(value);
    });
  });

  describe('registerOnChange()', () => {
    it('should set onChange', () => {
      const onChange: () => void = () => {};
      component.registerOnChange(onChange);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      expect(component['onChange']).toEqual(onChange);
    });
  });

  describe('registerOnTouched()', () => {
    it('should set onTouched', () => {
      const onTouch: () => void = () => {};
      component.registerOnTouched(onTouch);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      expect(component['onTouched']).toEqual(onTouch);
    });
  });

  describe('setDisabledState()', () => {
    it('should set the isDisabled flag and call generateSelectClasses', () => {
      spyOn(component, 'generateSelectClasses').and.stub();
      component.setDisabledState(false);
      expect(component.isDisabled).toBeFalse();
      expect(component.generateSelectClasses).toHaveBeenCalled();
    });
  });

  describe('setDropdownMinHeight()', () => {
    it('should calculate the menuMinHeight based on the number of options', () => {
      component.options = [];
      component.setDropdownMinHeight();
      expect(component.menuMinHeight).toEqual(36);

      component.options = [
        { label: '', value: null },
        { label: '', value: null },
        { label: '', value: null },
      ];
      component.setDropdownMinHeight();
      expect(component.menuMinHeight).toEqual(36 * 4);

      component.options = [
        { label: '', value: null },
        { label: '', value: null },
        { label: '', value: null },
        { label: '', value: null },
        { label: '', value: null },
        { label: '', value: null },
        { label: '', value: null },
        { label: '', value: null },
        { label: '', value: null },
      ];
      component.setDropdownMinHeight();
      expect(component.menuMinHeight).toEqual(36 * 8);
    });
  });

  describe('toggleDropdown()', () => {
    it('should close the dropdown menu if it is open, otherwise open it', () => {
      component.isDropdownOpen = true;
      component.toggleDropdown();
      expect(component.isDropdownOpen).toBeFalse();

      component.isDropdownOpen = false;
      component.toggleDropdown();
      expect(component.isDropdownOpen).toBeTrue();
    });

    it('should set isDropdownOpen to false if isDisabled is true', () => {
      component.isDisabled = true;

      component.isDropdownOpen = true;
      component.toggleDropdown();
      expect(component.isDropdownOpen).toBeFalse();

      component.isDropdownOpen = false;
      component.toggleDropdown();
      expect(component.isDropdownOpen).toBeFalse();
    });
  });

  describe('onBlur()', () => {
    it('should call this.onTouch()', fakeAsync(() => {
      /* eslint-disable @typescript-eslint/dot-notation */

      component['onTouched'] = () => {};
      expect(component['onTouched']).toBeTruthy();
      spyOn(component as any, 'onTouched').and.stub();
      component.onBlur();
      tick(1000);
      expect(component['onTouched']).toHaveBeenCalled();
      discardPeriodicTasks();

      /* eslint-enable @typescript-eslint/dot-notation */
    }));
  });

  describe('onEnter()', () => {
    it('should call setValue() with the first option if there are any', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      component.isSearchable = true;

      const filterOptionsSpy: jasmine.Spy = spyOn(component, 'filterOptions').and.callThrough();
      const setValueSpy: jasmine.Spy = spyOn(component, 'setValue').and.callThrough();

      const options: SelectOption[] = [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
        { label: 'label3', value: 'value3' },
      ];

      // multiple results
      component['_options'] = cloneDeep(options);
      component.searchInputControl.setValue('label');
      component.onEnter();
      expect(component.filterOptions).toHaveBeenCalledWith('label');
      expect(component.setValue).toHaveBeenCalledWith(options[0]);

      filterOptionsSpy.calls.reset();
      setValueSpy.calls.reset();

      // one result
      component['_options'] = cloneDeep(options);
      component.searchInputControl.setValue('label2');
      component.onEnter();
      expect(component.filterOptions).toHaveBeenCalledWith('label2');
      expect(component.setValue).toHaveBeenCalledWith(options[1]);

      filterOptionsSpy.calls.reset();
      setValueSpy.calls.reset();

      // no results
      options[1].isDisabled = true;
      component['_options'] = cloneDeep(options);
      component.searchInputControl.setValue('label2');
      component.onEnter();
      expect(component.filterOptions).toHaveBeenCalledWith('label2');
      expect(component.setValue).not.toHaveBeenCalled();

      /* eslint-enable @typescript-eslint/dot-notation */
    });
  });

  describe('onArrowPress()', () => {
    let event: KeyboardEvent;
    let previousSibling: any;
    let nextSibling: any;

    let previousSiblingSpy: jasmine.Spy;
    let nextSiblingSpy: jasmine.Spy;

    beforeEach(() => {
      event = {
        target: {
          get previousSibling() { return {}; },
          set previousSibling(_v) {},
          get nextSibling() { return {}; },
          set nextSibling(_v) {},
        },
        preventDefault: () => {},
      } as unknown as KeyboardEvent;

      previousSibling = {
        getAttribute: () => {},
        focus: () => {},
        get previousSibling() { return {}; },
        set previousSibling(_v) {},
      };
      nextSibling = {
        getAttribute: () => {},
        focus: () => {},
        get nextSibling() { return {}; },
        set nextSibling(_v) {},
      };
  
      spyOn(previousSibling, 'getAttribute').and.returnValue(undefined);
      spyOn(previousSibling, 'focus').and.callThrough();
      spyOnProperty(previousSibling, 'previousSibling', 'get').and.returnValue(undefined);

      spyOn(nextSibling, 'getAttribute').and.returnValue(undefined);
      spyOn(nextSibling, 'focus').and.callThrough();
      spyOnProperty(nextSibling, 'nextSibling', 'get').and.returnValue(undefined);
      
      previousSiblingSpy = spyOnProperty(event.target as any, 'previousSibling', 'get');
      previousSiblingSpy.and.returnValue(previousSibling);
      nextSiblingSpy = spyOnProperty(event.target as any, 'nextSibling', 'get');
      nextSiblingSpy.and.returnValue(nextSibling);

      spyOn(event, 'preventDefault').and.callThrough();
    });

    it('should do nothing if the event (or the target) is undefined', () => {
      component.onArrowPress(undefined as any, 'UP');
      expect(event.preventDefault).not.toHaveBeenCalled();

      (event as any).target = undefined;
      component.onArrowPress(event, 'UP');
      expect(event.preventDefault).toHaveBeenCalled();
    });

    describe('UP', () => {
      it('should focus on the previous sibling if it is not disabled', () => {
        component.onArrowPress(event, 'UP');
        expect(previousSibling.focus).toHaveBeenCalled();

        (previousSibling.focus as jasmine.Spy).calls.reset();
        (previousSibling.getAttribute as jasmine.Spy).and.returnValue(true);
        previousSiblingSpy.and.returnValue(previousSibling);

        component.onArrowPress(event, 'UP');
        expect(previousSibling.focus).not.toHaveBeenCalled();
      });
    });

    describe('DOWN', () => {
      it('should focus on the previous sibling if it is not disabled', () => {
        component.onArrowPress(event, 'DOWN');
        expect(nextSibling.focus).toHaveBeenCalled();

        (nextSibling.focus as jasmine.Spy).calls.reset();
        (nextSibling.getAttribute as jasmine.Spy).and.returnValue(true);
        nextSiblingSpy.and.returnValue(nextSibling);

        component.onArrowPress(event, 'DOWN');
        expect(nextSibling.focus).not.toHaveBeenCalled();
      });
    });
  });

  describe('createCloseSelectSubscription()', () => {
    beforeEach(() => {
      spyOn(documentClickService.documentClickedTarget$, 'subscribe').and.callThrough();
      component.isDropdownOpen = true;
    });

    it('should create a subscription to the document click service to close the dropdown if there is an outside click', () => {
      component.createCloseSelectSubscription();
      expect(documentClickService.documentClickedTarget$.subscribe).toHaveBeenCalled();
      expect(component.isDropdownOpen).toBeTrue();
    });

    it('should do nothing if the clicked element is within the selectInput', () => {
      component.createCloseSelectSubscription();

      component.selectInput = new MockElementRef();
      spyOn(component.selectInput.nativeElement, 'contains').and.returnValue(true);

      documentClickService.documentClickedTarget$.next(document.createElement('div'));
      expect(component.isDropdownOpen).toBeTrue();
    });


    it('should close the menu if the clicked element is NOT within the selectInput', () => {
      component.createCloseSelectSubscription();

      component.selectInput = new MockElementRef();
      spyOn(component.selectInput.nativeElement, 'contains').and.returnValue(false);

      documentClickService.documentClickedTarget$.next(document.createElement('div'));
      expect(component.isDropdownOpen).toBeFalse();
    });
  });

  describe('generateSelectClasses()', () => {
    let defaultClasses: string[] = [];
    let expectedResult: string[] = [];

    beforeEach(() => {
      defaultClasses = [
        'f-select__classes-wrapper',
        'f-form__input-wrapper',
        'f-form__select-wrapper',
      ];
      expectedResult = [];
    });

    it('should append the default classes', () => {
      expectedResult = defaultClasses;
      component.generateSelectClasses();
      expect(component.selectClasses).toEqual(expectedResult);
    });

    it('should append a --disabled class when isDisabled is set to true', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_isDisabled'] = true;
      expectedResult = [...defaultClasses, 'f-form__input--disabled'];
      component.generateSelectClasses();
      expect(component.selectClasses).toEqual(expectedResult);
    });

    it('should append the custom classes', () => {
      component.cssClasses = ['class1', 'class2'];
      expectedResult = [...defaultClasses, 'class1', 'class2'];
      component.generateSelectClasses();
      expect(component.selectClasses).toEqual(expectedResult);
    });
  });

  describe('trackByFn()', () => {
    it('should return the provided index', () => {
      expect(component.trackByFn(1)).toEqual(1);
    });
  });
});
