import { ElementRef, Renderer2 } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';

import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { PasswordVisibilityToggleDirective } from './password-visibility-toggle.directive';

import Spy = jasmine.Spy;

describe('PasswordVisibilityToggleDirective', () => {
  /* eslint-disable @typescript-eslint/dot-notation */

  let directive: PasswordVisibilityToggleDirective;

  let elementRef: ElementRef;
  let renderer2: Renderer2;

  let inputElement: HTMLInputElement;
  let parentElement: HTMLElement;
  let statusIcon: HTMLElement;
  let inputInner: HTMLElement;
  let newPasswordVisibilityToggleButton: HTMLButtonElement;

  beforeEach(() => {
    inputElement = document.createElement('input');
    parentElement = document.createElement('div');
    statusIcon = document.createElement('span');
    statusIcon.classList.add('f-form__input-wrapper-status-icon');
    inputInner = document.createElement('div');
    newPasswordVisibilityToggleButton = document.createElement('button');

    elementRef = ComponentStubFactory.getElementRefStub() as ElementRef;
    renderer2 = ComponentStubFactory.getRenderer2Stub() as Renderer2;

    spyOnProperty(elementRef.nativeElement, 'el').and.returnValue(inputElement);
    (renderer2.parentNode as Spy).and.returnValue(parentElement);
    (renderer2.createElement as Spy).and.returnValue(newPasswordVisibilityToggleButton);

    directive = new PasswordVisibilityToggleDirective(elementRef, renderer2);
  });

  it('should be created', () => {
    expect(directive).toBeTruthy();
  });

  describe('isPasswordVisible', () => {
    it('should call updatePasswordToggleButtonButton(), when updated', () => {
      spyOn(directive, 'updatePasswordToggleButtonButton').and.stub();

      directive.isPasswordVisible = true;
      expect(directive['_isPasswordVisible']).toBeTruthy();
      expect(directive.updatePasswordToggleButtonButton).toHaveBeenCalled();

      directive.isPasswordVisible = false;
      expect(directive['_isPasswordVisible']).toBeFalse();
      expect(directive.updatePasswordToggleButtonButton).toHaveBeenCalled();
    });
  });

  describe('@HostBinding()', () => {
    describe('type', () => {
      it('should return text if isPasswordVisible is true, password otherwise', () => {
        directive['_isPasswordVisible'] = true;
        expect(directive.type).toEqual('text');

        directive['_isPasswordVisible'] = false;
        expect(directive.type).toEqual('password');

        directive['_isPasswordVisible'] = undefined as any;
        expect(directive.type).toEqual('password');
      });
    });
  });

  describe('appendPasswordToggleButton()', () => {
    it('should create the inner wrapper container if a status icon was found', fakeAsync(() => {
      parentElement.appendChild(statusIcon);

      (renderer2.parentNode as Spy).and.returnValue(parentElement);
      (renderer2.createElement as Spy).and.returnValues(inputInner, newPasswordVisibilityToggleButton);

      directive = new PasswordVisibilityToggleDirective(elementRef, renderer2);
      directive['_passwordToggleButton'] = document.createElement('button');

      tick();

      expect(renderer2.createElement).toHaveBeenCalledTimes(2);
      expect((renderer2.createElement as Spy).calls.all()[0].args[0]).toEqual('div');
      expect((renderer2.createElement as Spy).calls.all()[1].args[0]).toEqual('button');

      discardPeriodicTasks();
    }));
  });

  describe('updatePasswordToggleButtonButton()', () => {
    it('should not do anything if passwordToggleButton is not defined', () => {
      directive['_passwordToggleButton'] = undefined as any;
      directive.updatePasswordToggleButtonButton();
      expect(directive['_passwordToggleButton']).toEqual(undefined as any);
    });

    it('should add and remove the correct CSS classes from the passwordToggleButton', () => {
      directive['_passwordToggleButton'] = document.createElement('button');

      directive['_isPasswordVisible'] = false;
      directive.updatePasswordToggleButtonButton();
      expect(directive['_passwordToggleButton'].classList).toContain('mdi-eye');
      expect(directive['_passwordToggleButton'].classList).not.toContain('mdi-eye-off');

      directive['_isPasswordVisible'] = true;
      directive.updatePasswordToggleButtonButton();
      expect(directive['_passwordToggleButton'].classList).toContain('mdi-eye-off');
      expect(directive['_passwordToggleButton'].classList).not.toContain('mdi-eye');
    });
  });

  describe('onPasswordTogglebuttonClick()', () => {
    it('should toggle the isPasswordVisible flag and emit that the password visibility was toggled', () => {
      spyOn(directive.passwordVisibilityToggled, 'emit').and.stub();
      spyOn(directive, 'updatePasswordToggleButtonButton').and.stub();
      directive['_isPasswordVisible'] = false;

      directive.onPasswordTogglebuttonClick();
      expect(directive.isPasswordVisible).toBeTrue();
      expect(directive.passwordVisibilityToggled.emit).toHaveBeenCalledWith(true);

      directive.onPasswordTogglebuttonClick();
      expect(directive.isPasswordVisible).toBeFalse();
      expect(directive.passwordVisibilityToggled.emit).toHaveBeenCalledWith(false);
    });
  });

  /* eslint-enable @typescript-eslint/dot-notation */
});
