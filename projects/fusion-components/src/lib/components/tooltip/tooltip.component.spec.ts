import { ElementRef, SimpleChange } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';

import { ComponentStubFactory } from '@fusion-ui/fusion-components/unit-test-helpers/component-stub-factory.spec';
import { FusionUiPosition, FusionUiPositionConfig } from '../../shared';
import * as Utilities from '../../shared/utilities';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let elementRef: ElementRef;

  beforeEach(() => {
    elementRef = ComponentStubFactory.getElementRefStub() as ElementRef;
    component = new TooltipComponent(elementRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@HostBinding()', () => {
    describe('class', () => {
      it('should return the cssClasses as a string', () => {
        component.cssClasses = null;
        expect(component.setHostClasses).toEqual(null);

        component.cssClasses = [];
        expect(component.setHostClasses).toEqual('');

        component.cssClasses = ['class1'];
        expect(component.setHostClasses).toEqual('class1');

        component.cssClasses = ['class1', 'class2'];
        expect(component.setHostClasses).toEqual('class1 class2');
      });
    });

    describe('style.left', () => {
      it('should return elementPosition.leff', () => {
        component.elementPosition.left = null;
        expect(component.setHostLeft).toEqual(null);

        component.elementPosition.left = '100px';
        expect(component.setHostLeft).toEqual('100px');
      });
    });

    describe('style.right', () => {
      it('should return elementPosition.right', () => {
        component.elementPosition.right = null;
        expect(component.setHostRight).toEqual(null);

        component.elementPosition.right = '100px';
        expect(component.setHostRight).toEqual('100px');
      });
    });

    describe('style.top', () => {
      it('should return elementPosition.top', () => {
        component.elementPosition.top = null;
        expect(component.setHostTop).toEqual(null);

        component.elementPosition.top = '100px';
        expect(component.setHostTop).toEqual('100px');
      });
    });

    describe('style.bottom', () => {
      it('should return elementPosition.bottom', () => {
        component.elementPosition.bottom = null;
        expect(component.setHostBottom).toEqual(null);

        component.elementPosition.bottom = '100px';
        expect(component.setHostBottom).toEqual('100px');
      });
    });

    describe('style.transform', () => {
      it('should return elementPosition.transform', () => {
        component.elementPosition.transform = null;
        expect(component.setHostTransform).toEqual(null);

        component.elementPosition.transform = 'translate(-50%, -50%)';
        expect(component.setHostTransform).toEqual('translate(-50%, -50%)');
      });
    });

    describe('style.z-index', () => {
      it('should return zIndex', () => {
        component.zIndex = null;
        expect(component.setHostZIndex).toEqual(null);

        component.zIndex = 20;
        expect(component.setHostZIndex).toEqual(20);
      });
    });

    describe('attr.role', () => {
      it('should return the hardcoded role of tooltip', () => {
        expect(component.role).toEqual('tooltip');
      });
    });

    describe('attr.tabindex', () => {
      it('should return the hardcoded tabindex of 0', () => {
        expect(component.tabIndex).toEqual(0);
      });
    });
  });

  describe('@HostListener', () => {
    describe('window.resize', () => {
      it('should call updateTooltipPosition', () => {
        spyOn(component, 'updateTooltipPosition').and.stub();
        component.onWindowResize();
        expect(component.updateTooltipPosition).toHaveBeenCalled();
      });
    });
  });

  describe('ngAfterViewInit()', () => {
    it('should call generateCssClasses() and updateTooltipPosition()', fakeAsync(() => {
      spyOn(component, 'generateCssClasses').and.stub();
      spyOn(component, 'updateTooltipPosition').and.stub();
      component.ngAfterViewInit();
      tick();
      expect(component.generateCssClasses).toHaveBeenCalled();
      expect(component.updateTooltipPosition).toHaveBeenCalled();
      discardPeriodicTasks();
    }));
  });

  describe('ngOnChanges()', () => {
    it('should call generateCssClasses() and updateTooltipPosition() if position or classes changes', () => {
      spyOn(component, 'generateCssClasses').and.stub();
      spyOn(component, 'updateTooltipPosition').and.stub();

      component.position = undefined;
      component.classes = undefined;

      component.text = 'text';
      component.ngOnChanges({
        text: new SimpleChange(null, component.text, false),
      });
      expect(component.generateCssClasses).not.toHaveBeenCalled();
      expect(component.updateTooltipPosition).not.toHaveBeenCalled();

      component.position = FusionUiPosition.LEFT;
      component.ngOnChanges({
        position: new SimpleChange(null, component.position, false),
      });
      expect(component.generateCssClasses).toHaveBeenCalled();
      expect(component.updateTooltipPosition).toHaveBeenCalled();

      component.classes = ['classes'];
      component.ngOnChanges({
        classes: new SimpleChange(null, component.classes, false),
      });
      expect(component.generateCssClasses).toHaveBeenCalled();
      expect(component.updateTooltipPosition).toHaveBeenCalled();
    });
  });

  describe('updateTooltipPosition()', () => {
    let positionConfig: FusionUiPositionConfig;

    beforeEach(() => {
      positionConfig = {
        top: '100px',
        left: '100px',
        right: '100px',
        bottom: '100px',
        transform: 'translate(-50%, -50%)',
      };
      const spy = jasmine.createSpy('getElementAbsolutePositioning').and.returnValue(positionConfig);
      spyOnProperty(Utilities, 'getElementAbsolutePositioning').and.returnValue(spy);
    });

    it('should do nothing if the provided element is undefined', () => {
      component.elementPosition = {};
      component.element = null;
      component.updateTooltipPosition();
      expect(Utilities.getElementAbsolutePositioning).not.toHaveBeenCalled();
      expect(component.elementPosition).toEqual({});
    });

    it('should update the elementPosition based on the response from getElementAbsolutePositioning()', () => {
      component.elementPosition = {};
      component.element = new ElementRef(document.createElement('div'));
      component.updateTooltipPosition();
      expect(Utilities.getElementAbsolutePositioning).toHaveBeenCalled();
      expect(component.elementPosition).toEqual(positionConfig);
    });
  });

  describe('generateCssClasses()', () => {
    it('should append the correct CSS classes', () => {
      const base = 'fusion-ui-tooltip';
      let expectedResult: string[];

      expectedResult = [base];
      component.position = null;
      component.classes = null;
      component.generateCssClasses();
      expect(component.cssClasses).toEqual(expectedResult);

      expectedResult = [base, `${base}--left`];
      component.position = FusionUiPosition.LEFT;
      component.classes = null;
      component.generateCssClasses();
      expect(component.cssClasses).toEqual(expectedResult);

      expectedResult = [base, `${base}--right`];
      component.position = FusionUiPosition.RIGHT;
      component.classes = null;
      component.generateCssClasses();
      expect(component.cssClasses).toEqual(expectedResult);

      expectedResult = [base, `${base}--top`];
      component.position = FusionUiPosition.TOP;
      component.classes = null;
      component.generateCssClasses();
      expect(component.cssClasses).toEqual(expectedResult);

      expectedResult = [base, `${base}--bottom`];
      component.position = FusionUiPosition.BOTTOM;
      component.classes = null;
      component.generateCssClasses();
      expect(component.cssClasses).toEqual(expectedResult);

      expectedResult = [base, 'class1'];
      component.position = null;
      component.classes = ['class1'];
      component.generateCssClasses();
      expect(component.cssClasses).toEqual(expectedResult);

      expectedResult = [base, 'class1', 'class2'];
      component.position = null;
      component.classes = ['class1', 'class2'];
      component.generateCssClasses();
      expect(component.cssClasses).toEqual(expectedResult);
    });
  });
});
