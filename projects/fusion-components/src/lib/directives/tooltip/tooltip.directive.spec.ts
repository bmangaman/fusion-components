import { ApplicationRef, ComponentFactoryResolver, ElementRef, Injector, RendererFactory2 } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';

import { ComponentStubFactory } from '@fusion-ui/fusion-components/unit-test-helpers/component-stub-factory.spec';

import { DomService, TooltipService } from '../../services';
import { FusionUiPosition, MouseInteraction } from '../../shared';
import { TooltipDirective } from './tooltip.directive';

import Spy = jasmine.Spy;

describe('TooltipDirective', () => {
  let directive: TooltipDirective;

  let elementRef: ElementRef;
  let domService: DomService;
  let applicationRef: ApplicationRef;
  let componentFactoryResolver: ComponentFactoryResolver;
  let injector: Injector;
  let rendererFactory2: RendererFactory2;
  let tooltipService: TooltipService;

  beforeEach(() => {
    elementRef = ComponentStubFactory.getElementRefStub() as ElementRef<any>;

    applicationRef = ComponentStubFactory.getApplicationRefStub() as ApplicationRef;
    componentFactoryResolver = ComponentStubFactory.getComponentFactoryResolverStub() as ComponentFactoryResolver;
    injector = ComponentStubFactory.getInjectorStub() as Injector;
    rendererFactory2 = ComponentStubFactory.getRendererFactory2() as RendererFactory2;
    domService = new DomService(document, applicationRef, componentFactoryResolver, injector, rendererFactory2);
    tooltipService = new TooltipService(domService);

    directive = new TooltipDirective(elementRef, tooltipService);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  describe('@Input()', () => {
    describe('id', () => {
      it('should correctly be set', () => {
        /* eslint-disable @typescript-eslint/dot-notation */
        directive['_id'] = null;
        directive.id = 'id';
        expect(directive.id).toEqual('id');
        expect(directive['_id']).toEqual('id');
        /* eslint-enable @typescript-eslint/dot-notation */
      });
    });
  });

  describe('@HostBinding', () => {
    describe('attr.aria-describedby', () => {
      it('should return the id', () => {
        directive.id = null;
        expect(directive.ariaDescribedBy).not.toEqual(null);

        directive.id = 'id';
        expect(directive.ariaDescribedBy).toEqual('id');
      });
    });
  });

  describe('@HostListener()', () => {
    let isTooltipDisplayedSpy: Spy;

    beforeEach(() => {
      spyOn(directive, 'addTooltip').and.stub();
      spyOn(directive, 'destroy').and.stub();
      isTooltipDisplayedSpy = spyOn(tooltipService, 'isTooltipDisplayed').and.callThrough();
    });

    describe('mouseenter', () => {
      it('should call addTooltip() if the displayOn input is MOUSE_ENTER and the tooltip is NOT visible', () => {
        directive.displayOn = null;
        isTooltipDisplayedSpy.and.returnValue(false);
        directive.onMouseEnter();
        expect(directive.addTooltip).not.toHaveBeenCalled();

        directive.displayOn = MouseInteraction.CLICK;
        isTooltipDisplayedSpy.and.returnValue(false);
        directive.onMouseEnter();
        expect(directive.addTooltip).not.toHaveBeenCalled();

        directive.displayOn = MouseInteraction.MOUSE_ENTER;
        isTooltipDisplayedSpy.and.returnValue(true);
        directive.onMouseEnter();
        expect(directive.addTooltip).not.toHaveBeenCalled();

        directive.displayOn = MouseInteraction.MOUSE_ENTER;
        isTooltipDisplayedSpy.and.returnValue(false);
        directive.onMouseEnter();
        expect(directive.addTooltip).toHaveBeenCalled();
      });

      it('should call destroy() if the hideOn input is MOUSE_ENTER and the tooltip is visible', () => {
        directive.hideOn = null;
        isTooltipDisplayedSpy.and.returnValue(true);
        directive.onMouseEnter();
        expect(directive.destroy).not.toHaveBeenCalled();

        directive.hideOn = MouseInteraction.CLICK;
        isTooltipDisplayedSpy.and.returnValue(true);
        directive.onMouseEnter();
        expect(directive.destroy).not.toHaveBeenCalled();

        directive.hideOn = MouseInteraction.MOUSE_ENTER;
        isTooltipDisplayedSpy.and.returnValue(false);
        directive.onMouseEnter();
        expect(directive.destroy).not.toHaveBeenCalled();

        directive.hideOn = MouseInteraction.MOUSE_ENTER;
        isTooltipDisplayedSpy.and.returnValue(true);
        directive.onMouseEnter();
        expect(directive.destroy).toHaveBeenCalled();
      });
    });

    describe('mouseLeave', () => {
      it('should call addTooltip() if the displayOn input is MOUSE_LEAVE and the tooltip is NOT visible', () => {
        directive.displayOn = null;
        isTooltipDisplayedSpy.and.returnValue(false);
        directive.onMouseLeave();
        expect(directive.addTooltip).not.toHaveBeenCalled();

        directive.displayOn = MouseInteraction.CLICK;
        isTooltipDisplayedSpy.and.returnValue(false);
        directive.onMouseLeave();
        expect(directive.addTooltip).not.toHaveBeenCalled();

        directive.displayOn = MouseInteraction.MOUSE_LEAVE;
        isTooltipDisplayedSpy.and.returnValue(true);
        directive.onMouseLeave();
        expect(directive.addTooltip).not.toHaveBeenCalled();

        directive.displayOn = MouseInteraction.MOUSE_LEAVE;
        isTooltipDisplayedSpy.and.returnValue(false);
        directive.onMouseLeave();
        expect(directive.addTooltip).toHaveBeenCalled();
      });

      it('should call destroy() if the hideOn input is MOUSE_LEAVE and the tooltip is visible', () => {
        directive.hideOn = null;
        isTooltipDisplayedSpy.and.returnValue(true);
        directive.onMouseLeave();
        expect(directive.destroy).not.toHaveBeenCalled();

        directive.hideOn = MouseInteraction.CLICK;
        isTooltipDisplayedSpy.and.returnValue(true);
        directive.onMouseLeave();
        expect(directive.destroy).not.toHaveBeenCalled();

        directive.hideOn = MouseInteraction.MOUSE_LEAVE;
        isTooltipDisplayedSpy.and.returnValue(false);
        directive.onMouseLeave();
        expect(directive.destroy).not.toHaveBeenCalled();

        directive.hideOn = MouseInteraction.MOUSE_LEAVE;
        isTooltipDisplayedSpy.and.returnValue(true);
        directive.onMouseLeave();
        expect(directive.destroy).toHaveBeenCalled();
      });
    });

    describe('click', () => {
      it('should not do anything if displayOn and/ or hideOn is not CLICK', () => {
        directive.displayOn = null;
        directive.hideOn = null;
        directive.onMouseClick();
        expect(directive.destroy).not.toHaveBeenCalled();
        expect(directive.addTooltip).not.toHaveBeenCalled();

        directive.displayOn = MouseInteraction.MOUSE_ENTER;
        directive.hideOn = MouseInteraction.MOUSE_LEAVE;
        directive.onMouseClick();
        expect(directive.destroy).not.toHaveBeenCalled();
        expect(directive.addTooltip).not.toHaveBeenCalled();
      });

      it('should call addTooltip() if the tooltip is NOT already displayed and displayOn input is CLICK', () => {
        directive.displayOn = MouseInteraction.CLICK;

        isTooltipDisplayedSpy.and.returnValue(true);
        directive.onMouseClick();
        expect(directive.addTooltip).not.toHaveBeenCalled();

        isTooltipDisplayedSpy.and.returnValue(false);
        directive.onMouseClick();
        expect(directive.addTooltip).toHaveBeenCalled();
      });

      it('should call destroy() if the tooltip is already displayed and hideOn input is CLICK', () => {
        directive.hideOn = MouseInteraction.CLICK;

        isTooltipDisplayedSpy.and.returnValue(false);
        directive.onMouseClick();
        expect(directive.destroy).not.toHaveBeenCalled();

        isTooltipDisplayedSpy.and.returnValue(true);
        directive.onMouseClick();
        expect(directive.destroy).toHaveBeenCalled();
      });
    });
  });

  describe('ngOnDestroy()', () => {
    it('should call destroy()', () => {
      spyOn(directive, 'destroy').and.stub();
      directive.ngOnDestroy();
      expect(directive.destroy).toHaveBeenCalled();
    });
  });

  describe('destroy()', () => {
    it('should call tooltipService.removeTooltip()', fakeAsync(() => {
      spyOn(tooltipService, 'removeTooltip').and.stub();
      directive.id = 'id';
      directive.destroy();
      tick(1000);
      expect(tooltipService.removeTooltip).toHaveBeenCalledWith('id');

      discardPeriodicTasks();
    }));
  });

  describe('addTooltip()', () => {
    beforeEach(() => {
      spyOn(tooltipService, 'addTooltip').and.stub();
    });

    it('shoudl generate an id if one was not provided', () => {
      directive.id = null;
      directive.addTooltip();
      expect(directive.id).toBeTruthy();
    });

    it('should call tooltipService.addTooltip()', () => {
      directive.id = 'id';
      directive.text = 'text';
      directive.template = null;
      directive.position = FusionUiPosition.LEFT;
      directive.classes = [];

      directive.addTooltip();

      expect(tooltipService.addTooltip).toHaveBeenCalledWith({
        id: 'id',
        text: 'text',
        template: null,
        templateWithContext: undefined,
        position: FusionUiPosition.LEFT,
        element: elementRef,
        classes: [],
        zIndex: 1,
      });
    });
  });
});
