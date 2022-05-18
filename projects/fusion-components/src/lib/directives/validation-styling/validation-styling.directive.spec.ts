import { ElementRef, Renderer2 } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { FormInputStatus } from '@fusion-ui/fusion-components';
import { ComponentStubFactory } from '@fusion-ui/fusion-components/unit-test-helpers/component-stub-factory.spec';
import { Subject } from 'rxjs';
import { ValidationStylingDirective } from './validation-styling.directive';

describe('ValidationStylingDirective', () => {
  let directive: ValidationStylingDirective;
  let elementRefStub: ElementRef;
  let renderer2Stub: Renderer2;
  let controlStub: NgControl;

  beforeEach(() => {
    elementRefStub = ComponentStubFactory.getElementRefStub() as ElementRef;
    renderer2Stub = ComponentStubFactory.getRenderer2Stub() as Renderer2;
    controlStub = ComponentStubFactory.getNgControlStub() as NgControl;
    directive = new ValidationStylingDirective(
      elementRefStub,
      renderer2Stub,
      controlStub,
    );
  });

  describe('ngOnDestroy', () => {
    it('should cleanup on destroy', () => {
      spyOn((directive as any).unsubscribe$, 'next');
      spyOn((directive as any).unsubscribe$, 'complete');
      directive.ngOnDestroy();
      expect((directive as any).unsubscribe$.next).toHaveBeenCalled();
      expect((directive as any).unsubscribe$.complete).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      (directive as any).control.control = new FormControl();
    });

    it('should set setup everything and call the necessary functions', () => {
      spyOn(directive, 'createParentWrapper').and.stub();
      spyOn(directive, 'buildIconSpan').and.stub();
      spyOn(directive, 'setStyling').and.stub();
      (directive as any).control.control.status = 'FAKE-STATUS';
      spyOn((directive as any).control.statusChanges, 'subscribe').and.stub();
      directive.ngOnInit();
      expect((directive as any).inputElement).toBeDefined();
      expect(directive.createParentWrapper).toHaveBeenCalled();
      expect(directive.buildIconSpan).toHaveBeenCalled();
      expect(directive.setStyling).toHaveBeenCalledWith('FAKE-STATUS');
      expect((directive as any).control.statusChanges.subscribe).toHaveBeenCalled();
    });

    it('should call setStyling on status changes', () => {
      spyOn(directive, 'createParentWrapper').and.stub();
      spyOn(directive, 'buildIconSpan').and.stub();
      spyOn(directive, 'setStyling').and.stub();
      directive.ngOnInit();

      (controlStub.statusChanges as Subject<string>).next('VALID');
      expect(directive.setStyling).toHaveBeenCalledWith('VALID');

    });
  });

  describe('createParentWrapper', () => {
    /**
     * Sets the inputElement up with a parentNode containing certain classes.
     *
     * @param classToAdd The classes to add to the parent node.
     * @returns The parent node to be used for comparisons.
     */
    function setup(classToAdd: string): HTMLDivElement {
      const el = document.createElement('div');
      el.classList.add(classToAdd);
      (directive as any).inputElement = {
        parentNode: el
      };
      return el;
    }

    it('should set wrapper to parentNode if the element is already wrapped', () => {
      expect((directive as any).wrapperElement).not.toBeDefined();
      const parent = setup('fusion-ui-form__input-wrapper');
      directive.createParentWrapper();

      expect(renderer2Stub.insertBefore).not.toHaveBeenCalled();
      expect(renderer2Stub.appendChild).not.toHaveBeenCalled();
      expect((directive as any).wrapperElement).toEqual(parent);
    });

    it('should create an element when not properly wrapped.', () => {
      expect((directive as any).wrapperElement).not.toBeDefined();
      (renderer2Stub.createElement as jasmine.Spy).and.returnValue(document.createElement('div'));
      setup('other-class');
      directive.createParentWrapper();

      expect(renderer2Stub.insertBefore).toHaveBeenCalled();
      expect(renderer2Stub.appendChild).toHaveBeenCalled();
      expect((directive as any).wrapperElement).toBeDefined();
    });

    it('should set wrapper to parentNode if parent is a select wrapper', () => {
      expect((directive as any).wrapperElement).not.toBeDefined();
      const parent = setup('fusion-ui-form__select-wrapper');

      directive.createParentWrapper();

      expect(renderer2Stub.insertBefore).not.toHaveBeenCalled();
      expect(renderer2Stub.appendChild).not.toHaveBeenCalled();
      expect((directive as any).wrapperElement).toEqual(parent);
      expect((directive as any).wrapperElement.classList.contains('fusion-ui-form__input-wrapper')).toBeTrue();
    });
  });

  describe('buildIconSpan', () => {
    it('should not build anything if span exists', () => {
      const wrapperEl = document.createElement('div');
      const el = document.createElement('div');
      el.classList.add('fusion-ui-form__input-wrapper-status-icon');
      wrapperEl.appendChild(el);
      (directive as any).wrapperElement = wrapperEl;
      directive.buildIconSpan();

      expect(renderer2Stub.createElement).not.toHaveBeenCalled();
      expect(renderer2Stub.appendChild).not.toHaveBeenCalled();
    });

    it('should create a span and append it if needed', () => {
      (renderer2Stub.createElement as jasmine.Spy).and.returnValue(document.createElement('div'));
      (directive as any).wrapperElement = document.createElement('div');
      directive.buildIconSpan();

      expect(renderer2Stub.createElement).toHaveBeenCalled();
      expect(renderer2Stub.appendChild).toHaveBeenCalled();
    });
  });

  describe('setStyling', () => {
    beforeEach(() => {
      const el = document.createElement('div');
      el.classList.add('fusion-ui-form__input--invalid', 'fusion-ui-form__input--valid');
      (directive as any).inputElement = el;
    });

    it('should remove previous style classes', () => {
      expect((directive as any).inputElement.classList.contains('fusion-ui-form__input--invalid')).toBeTrue();
      expect((directive as any).inputElement.classList.contains('fusion-ui-form__input--valid')).toBeTrue();

      directive.setStyling('');

      expect((directive as any).inputElement.classList.contains('fusion-ui-form__input--invalid')).toBeFalse();
      expect((directive as any).inputElement.classList.contains('fusion-ui-form__input--valid')).toBeFalse();
    });

    it('should add valid class when control is valid', () => {
      (directive as any).control.value = 'blah';
      directive.setStyling(FormInputStatus.VALID);

      expect((directive as any).inputElement.classList.contains('fusion-ui-form__input--valid')).toBeTrue();
      expect((directive as any).inputElement.classList.contains('fusion-ui-form__input--invalid')).toBeFalse();
    });

    it('should add invalid class when control is invalid', () => {
      (directive as any).control.value = 'blah';
      directive.setStyling(FormInputStatus.INVALID);

      expect((directive as any).inputElement.classList.contains('fusion-ui-form__input--valid')).toBeFalse();
      expect((directive as any).inputElement.classList.contains('fusion-ui-form__input--invalid')).toBeTrue();
    });
  });
});
