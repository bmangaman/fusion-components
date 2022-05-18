import { ElementRef } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';

import { ComponentStubFactory } from '@fusion-ui/fusion-components/unit-test-helpers/component-stub-factory.spec';

import { AutofocusDirective } from './autofocus.directive';

describe('AutofocusDirective', () => {
  let directive: AutofocusDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    elementRef = ComponentStubFactory.getElementRefStub() as ElementRef;
    directive = new AutofocusDirective(elementRef);
  });

  describe('@Input', () => {
    describe('set fusionUiAutofocus()', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      it('should set _focus', () => {
        directive['_focus'] = null;
        directive.fusionUiAutofocus = false;
        expect(directive['_focus']).toBeFalse();

        directive['_focus'] = null;
        directive.fusionUiAutofocus = true;
        expect(directive['_focus']).toBeTrue();
      });

      it('should call setAutoFocus()', () => {
        spyOn(directive, 'setAutofocus').and.stub();
        directive.fusionUiAutofocus = true;
        expect(directive.setAutofocus).toHaveBeenCalled();
      });

      /* eslint-enable @typescript-eslint/dot-notation */
    });
  });

  describe('ngAfterViewInit()', () => {
    it('should call setAutoFocus()', () => {
      spyOn(directive, 'setAutofocus').and.stub();
      directive.ngAfterViewInit();
      expect(directive.setAutofocus).toHaveBeenCalled();
    });
  });

  describe('setAutoFocus()', () => {
    it('shdould focus on the element if _focus is true', fakeAsync(() => {
      directive.fusionUiAutofocus = false;
      // eslint-disable-next-line @typescript-eslint/dot-notation
      expect(directive['_focus']).toBeFalse();
      directive.ngAfterViewInit();
      tick();
      expect(elementRef.nativeElement.focus).not.toHaveBeenCalled();

      directive.fusionUiAutofocus = true;
      // eslint-disable-next-line @typescript-eslint/dot-notation
      expect(directive['_focus']).toBeTrue();
      directive.ngAfterViewInit();
      tick();
      expect(elementRef.nativeElement.focus).toHaveBeenCalled();

      discardPeriodicTasks();
    }));
  });
});
