import { ElementRef } from '@angular/core';

import { BaseModalComponent } from '@fusion-components';
import { StubFactory } from '../../../unit-test-helpers/stub-factory.spec'
import { Size } from '../../shared';

import { ModalConfig, ModalType } from './modal.interface';
import { ModalComponent } from './modal.component';

import Spy = jasmine.Spy;

describe('ModalComponent', () => {
  let component: ModalComponent;
  let documentStub: Document;
  let elemRef: ElementRef;

  beforeEach(() => {
    elemRef = StubFactory.getElementRefStub() as ElementRef;
    documentStub = document;
    component = new ModalComponent(documentStub, elemRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input()', () => {
    describe('config', () => {
      it('should set the config by combining the current config with the set config', () => {
        const newConfig: ModalConfig = { size: Size.SMALL };
        component.config = newConfig;
        expect(component.config).toEqual(newConfig);
      });
    });
  });

  describe('@HostBinding()', () => {
    describe('attr.class', () => {
      it('should return "visible" always', () => {
        expect(component.hostClasses).toEqual('f-modal--visible');
      });
    });
  });

  describe('@HostListener()', () => {
    describe('window:keydown', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      let focusableElements: HTMLElement[];
      let button1FocusSpy: Spy;
      let button2FocusSpy: Spy;
      let keyEvent: KeyboardEvent;

      beforeEach(() => {
        documentStub = {
          get activeElement(): any { return null; },
          createElement: (type: string) => document.createElement(type),
        } as Document;
        component = new ModalComponent(documentStub, elemRef);

        focusableElements = [];

        const button1: HTMLElement = documentStub.createElement('button');
        button1.setAttribute('id', 'button-01');
        const button2: HTMLElement = documentStub.createElement('button');
        button2.setAttribute('id', 'button-02');

        focusableElements.push(button1, button2);
        component['_focusableElements'] = focusableElements as any as NodeListOf<Element>;
        button1FocusSpy = spyOn((component.focusableElements[0] as HTMLElement), 'focus');
        button2FocusSpy = spyOn((component.focusableElements[1] as HTMLElement), 'focus');

        keyEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      });

      it('should NOT do anything if the modal is NOT dispalyed and the key event is NOT "Tab"', () => {
        // component['_isDisplayed'] = false;
        keyEvent = new KeyboardEvent('keydown', { key: 'Tab' });
        expect(button1FocusSpy).not.toHaveBeenCalled();
        component.onKeyDown(keyEvent);

        // component['_isDisplayed'] = true;
        keyEvent = new KeyboardEvent('keydown', { key: 'KeyA' });
        component.onKeyDown(keyEvent);
        expect(button1FocusSpy).not.toHaveBeenCalled();

        // component['_isDisplayed'] = true;
        keyEvent = new KeyboardEvent('keydown', { key: 'Tab' });
        component['_focusableElements'] = null as any;
        component.onKeyDown(keyEvent);
        expect(button1FocusSpy).not.toHaveBeenCalled();
      });

      it('should do nothing if the focusableElements.length === 1', () => {
        component['_focusableElements'] = [focusableElements[0]] as any as NodeListOf<Element>;
        expect(component.focusableElements.length).toEqual(1);

        // component['_isDisplayed'] = true;
        keyEvent = new KeyboardEvent('keydown', { key: 'Tab' });

        component.onKeyDown(keyEvent);
        expect(button1FocusSpy).not.toHaveBeenCalled();
      });

      it('should move to the first element if at the last of the focusable elements', () => {
        spyOnProperty(documentStub, 'activeElement').and.returnValue(component.focusableElements[1]);
        // component['_isDisplayed'] = true;
        keyEvent = new KeyboardEvent('keydown', { key: 'Tab' });

        component.onKeyDown(keyEvent);
        expect(button1FocusSpy).toHaveBeenCalled();
        expect(button2FocusSpy).not.toHaveBeenCalled();
      });

      it('should move to the last element if at the first of the focusable elements', () => {
        spyOnProperty(documentStub, 'activeElement').and.returnValue(component.focusableElements[0]);
        // component['_isDisplayed'] = true;
        keyEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });

        component.onKeyDown(keyEvent);
        expect(button1FocusSpy).not.toHaveBeenCalled();
        expect(button2FocusSpy).toHaveBeenCalled();
      });

      it('should move to the previous element (via default event behavior)', () => {
        spyOnProperty(documentStub, 'activeElement').and.returnValue(component.focusableElements[1]);
        // component['_isDisplayed'] = true;
        keyEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });

        component.onKeyDown(keyEvent);
        // preventDefault not called on first element if focus not called.
        expect(button1FocusSpy).not.toHaveBeenCalled();
        // preventDefault not called on second element if focus not called.
        expect(button2FocusSpy).not.toHaveBeenCalled();
      });

      /* eslint-enable @typescript-eslint/dot-notation */
    });

    describe('window:resize', () => {
      it('should call necessary methods on resize', () => {
        spyOn(component, 'adjustModalWidth').and.stub();
        spyOn(component, 'adjustModalHeight').and.stub();

        component.onResize();

        expect(component.adjustModalHeight).toHaveBeenCalledTimes(1);
        expect(component.adjustModalHeight).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ngOnDestroy()', () => {
    it('should call setContainerOverflow', () => {
      spyOn(component, 'setContainerOverflow').and.stub();

      component.ngOnDestroy();

      expect(component.setContainerOverflow).toHaveBeenCalled();
    });
  });

  describe('init()', () => {
    it('should call initialization methods', () => {
      spyOn(component, 'findFocusableElements').and.stub();
      spyOn(component, 'changeState').and.stub();
      spyOn(component, 'setContainerOverflow').and.stub();
      spyOn(component, 'adjustModalWidth').and.stub();
      spyOn(component, 'adjustModalHeight').and.stub();
      spyOn(component as any, 'getModalWindowClasses').and.stub();
      spyOn(component as any, 'getModalContainerClasses').and.stub();
      component.init();
      expect(component.findFocusableElements).toHaveBeenCalled();
      expect(component.changeState).toHaveBeenCalled();
      expect(component.setContainerOverflow).toHaveBeenCalled();
      expect(component.adjustModalWidth).toHaveBeenCalled();
      expect(component.adjustModalHeight).toHaveBeenCalled();
      expect((component as any).getModalWindowClasses).toHaveBeenCalled();
      expect((component as any).getModalContainerClasses).toHaveBeenCalled();
    });
  });

  // NOTE: this function is tested further with DOM unit tests
  describe('findFocusableElements()', () => {
    it('should set focusableElements', () => {
      const div1 = documentStub.createElement('div');
      const div2 = documentStub.createElement('div');
      spyOn(div1, 'focus');
      elemRef.nativeElement.querySelectorAll.and.returnValue([div1, div2]);
      component.findFocusableElements();
      expect(component.focusableElements).toBeDefined();
      expect(div1.focus).toHaveBeenCalled();
    });

    it('should set focusableElements', () => {
      const div1 = documentStub.createElement('div');
      spyOn(div1, 'focus');
      elemRef.nativeElement.querySelectorAll.and.returnValue([]);
      component.findFocusableElements();
      expect(component.focusableElements).toBeDefined();
      expect(div1.focus).not.toHaveBeenCalled();
    });
  });

  describe('adjustModalHeight()', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = documentStub.createElement('div');
      element.setAttribute('height', '50px');
      component.config = {};
    });

    it('should not do anything if the modal type is NOT FULL', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_modalStyling'] = { top: '0px', height: '100%', width: '100%' };
      component.config.type = ModalType.ALERT;

      component.config.heightAdjustmentElements = [element];
      spyOnProperty((component.config.heightAdjustmentElements[0] as HTMLElement), 'offsetHeight').and.returnValue(50);

      component.adjustModalHeight();
      expect(component.modalStyling).toEqual({ top: '0px', height: '100%', width: '100%' });
    });

    it('should calculate the new height and top modal values if the modal type is FULL', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_modalStyling'] = { top: '0px', height: '100%', width: '100%' };
      component.config.type = ModalType.FULL;

      component.config.heightAdjustmentElements = [element];
      spyOnProperty((component.config.heightAdjustmentElements[0] as HTMLElement), 'offsetHeight').and.returnValue(50);

      component.adjustModalHeight();
      expect(component.modalStyling).toEqual({ top: '50px', height: 'calc(100% - 50px)', width: '100%' });
    });

    it('should use default values if element not found', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_modalStyling'] = { top: '0px', height: '100%', width: '100%' };
      component.config.type = ModalType.FULL;

      component.config.heightAdjustmentElements = ['fake-element'];

      component.adjustModalHeight();
      expect(component.modalStyling).toEqual({ top: '0px', height: 'calc(100% - 0px)', width: '100%' });
    });
  });

  describe('adjustModalWidth()', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = documentStub.createElement('div');
      element.setAttribute('width', '50px');
      component.config = {};
    });

    it('should not do anything if the modal type is NOT FULL', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_modalStyling'] = { top: '0px', height: '100%', width: '100%' };
      component.config.type = ModalType.ALERT;

      component.config.widthAdjustmentElements = [element];
      spyOnProperty((component.config.widthAdjustmentElements[0] as HTMLElement), 'offsetWidth').and.returnValue(50);

      component.adjustModalWidth();
      expect(component.modalStyling).toEqual({ top: '0px', height: '100%', width: '100%' });
    });

    it('should calculate the new width and top modal values if the modal type is FULL', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_modalStyling'] = { top: '0px', height: '100%', width: '100%' };
      component.config.type = ModalType.FULL;

      component.config.widthAdjustmentElements = [element];
      spyOnProperty((component.config.widthAdjustmentElements[0] as HTMLElement), 'offsetWidth').and.returnValue(50);

      component.adjustModalWidth();
      expect(component.modalStyling).toEqual({ top: '0px', height: '100%', width: 'calc(100% - 50px)' });
    });

    it('should use default values if element not found', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_modalStyling'] = { top: '0px', height: '100%', width: '100%' };
      component.config.type = ModalType.FULL;

      component.config.widthAdjustmentElements = ['fake-element'];

      component.adjustModalWidth();
      expect(component.modalStyling).toEqual({ top: '0px', width: 'calc(100% - 0px)', height: '100%' });
    });

    it('should add offset width if provided (with adjustment element)', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_modalStyling'] = { top: '0px', height: '100%', width: '100%' };
      component.config.type = ModalType.FULL;
      component.config.addOffSetWidth = '40px';
      component.config.widthAdjustmentElements = [element];
      spyOnProperty((component.config.widthAdjustmentElements[0] as HTMLElement), 'offsetWidth').and.returnValue(50);

      component.adjustModalWidth();
      expect(component.modalStyling).toEqual({ top: '0px', width: 'calc(calc(100% - 50px) - 40px)', height: '100%' });
    });

    it('should add offset width if provided (without adjustment element)', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_modalStyling'] = { top: '0px', height: '100%', width: '100%' };
      component.config.type = ModalType.FULL;
      component.config.addOffSetWidth = '40px';

      component.adjustModalWidth();
      expect(component.modalStyling).toEqual({ top: '0px', width: 'calc(100% - 40px)', height: '100%' });
    });
  });

  describe('changeState', () => {
    /* eslint-disable @typescript-eslint/dot-notation */
    it('should set the currentState to the current modal type', () => {
      component.config = {type: ModalType.FULL};
      component['_currentState'] = null as any;

      component.changeState();
      expect(component.currentState).toEqual(ModalType.FULL);

      component.config = {type: ModalType.SIDE};
      component['_currentState'] = null as any;

      component.changeState();
      expect(component.currentState).toEqual(ModalType.SIDE);
    });

    it('should set the currentState to undefined if it is already set', () => {
      component['_currentState'] = ModalType.FULL;

      component.changeState();
      expect(component.currentState).toEqual(undefined);
    });
    /* eslint-enable @typescript-eslint/dot-notation */
  });

  describe('setContainerOverflow()', () => {
    it('should update the overflow value of the container element if it is found', () => {
      (component as any)._currentState = ModalType.FULL;
      (component as any).elemRef.nativeElement = {
        parentElement: {
          style: {}
        }
      };
      component.setContainerOverflow();
      expect((component as any).elemRef.nativeElement.parentElement.style.overflow).toBe('hidden');

      (component as any)._currentState = null;
      component.setContainerOverflow();
      expect((component as any).elemRef.nativeElement.parentElement.style.overflow).toBe('auto');
    });

    it('should NOT update the overflow value if the container element if it is NOT found', () => {
      component.setContainerOverflow();

      expect((component as any).elemRef.nativeElement.parentElement?.style.overflow).toBeUndefined();
    });
  });

  describe('getModalWindowClasses', () => {
    it('should return all the applicable classes', () => {
      let classes: string[];
      let expectedClasses: string[];
      component.config = {};

      // non-string container, no windowClasses
      component.config.type = ModalType.ALERT;
      component.config.size = Size.MEDIUM;
      component.config.container = documentStub.createElement('div');
      component.config.windowClasses = [];
      expectedClasses = ['f-modal__window--alert', 'f-modal__window--alert--medium'];
      classes = (component as any).getModalWindowClasses();
      expect(classes).toEqual(expectedClasses);

      // string container
      component.config.type = ModalType.ALERT;
      component.config.size = Size.MEDIUM;
      component.config.container = 'body';
      component.config.windowClasses = [];
      expectedClasses = ['f-modal__window--alert', 'f-modal__window--alert--medium', 'f-modal__window--alert--container-body'];
      classes = (component as any).getModalWindowClasses();
      expect(classes).toEqual(expectedClasses);

      // string container AND windowClasses
      component.config.type = ModalType.ALERT;
      component.config.size = Size.MEDIUM;
      component.config.container = 'body';
      component.config.windowClasses = ['fake-class'];
      expectedClasses = ['f-modal__window--alert', 'f-modal__window--alert--medium', 'f-modal__window--alert--container-body', 'fake-class'];
      classes = (component as any).getModalWindowClasses();
      expect(classes).toEqual(expectedClasses);
    });
  });

  describe('getModalContainerClasses', () => {
    it('should return all the applicable classes', () => {
      let classes: string[];
      let expectedClasses: string[];
      component.config = {};

      component.config.type = ModalType.ALERT;
      component.config.size = Size.MEDIUM;
      expectedClasses = ['f-modal__container', 'f-modal__container--medium', 'f-modal__container--alert'];
      classes = (component as any).getModalContainerClasses();
      expect(classes).toEqual(expectedClasses);

      component.config.type = ModalType.FULL;
      component.config.size = Size.SMALL;
      expectedClasses = ['f-modal__container', 'f-modal__container--small', 'f-modal__container--full'];
      classes = (component as any).getModalContainerClasses();
      expect(classes).toEqual(expectedClasses);

      component.config.type = ModalType.SIDE;
      component.config.size = Size.LARGE;
      expectedClasses = ['f-modal__container', 'f-modal__container--large', 'f-modal__container--side'];
      classes = (component as any).getModalContainerClasses();
      expect(classes).toEqual(expectedClasses);
    });
  });

  describe('BaseModalComponent', () => {
    it('should contain the modalClosed emitter', () => {
      const baseComponent = new BaseModalComponent();

      expect(baseComponent.modalClosed).toBeDefined();
    });
  });
});
