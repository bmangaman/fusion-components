import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { NgControl } from '@angular/forms';

import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let ngControl: NgControl;

  beforeEach(() => {
    ngControl = ComponentStubFactory.getNgControlStub() as NgControl;
    component = new CheckboxComponent(ngControl);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('getters', () => {
    describe('control', () => {
      it('should return the _control', () => {
        expect(component.control).toEqual(ngControl);
      });
    });
  });

  describe('@Input()', () => {
    describe('uuid', () => {
      it('should set the uuid if provided', () => {
        component.uuid = '';
        expect(component.uuid).toBeTruthy();

        component.uuid = 'custom-uuid';
        expect(component.uuid).toEqual('custom-uuid');
      });
    });

    describe('value', () => {
      it('should set the value to the provided value', () => {
        component.value = true;
        expect(component.value).toEqual(true);
      });

      it('should call onChange() with the current value', fakeAsync(() => {
        /* eslint-disable @typescript-eslint/dot-notation */

        component.registerOnChange(() => {});
        expect(component['onChange']).toBeDefined();
        spyOn(component as any, 'onChange').and.callThrough();
        component.value = true;
        tick(1000);
        expect(component['onChange']).toHaveBeenCalledWith(true);
        discardPeriodicTasks();

        /* eslint-enable @typescript-eslint/dot-notation */
      }));

      it('should call onTouched()', fakeAsync(() => {
        /* eslint-disable @typescript-eslint/dot-notation */

        component.registerOnTouched(() => {});
        expect(component['onTouched']).toBeDefined();
        spyOn(component as any, 'onTouched').and.callThrough();
        component.value = true;
        tick(1000);
        expect(component['onTouched']).toHaveBeenCalled();
        discardPeriodicTasks();

        /* eslint-enable @typescript-eslint/dot-notation */
      }));
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

  describe('toggleValue()', () => {
    it('should update the value when the input is not disabled', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      component['_value'] = false;

      component.toggleValue();
      expect(component.value).toBeTrue();

      component.toggleValue();
      expect(component.value).toBeFalse();

      component['_isDisabled'] = true;

      component.toggleValue();
      expect(component.value).toBeFalse();

      /* eslint-enable @typescript-eslint/dot-notation */
    });
  });

  describe('writeValue()', () => {
    it('should set the value', () => {
      component.writeValue(false);
      expect(component.value).toEqual(false);
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
      component.setDisabledState(false);
      expect(component.isDisabled).toBeFalse();
    });
  });
});
