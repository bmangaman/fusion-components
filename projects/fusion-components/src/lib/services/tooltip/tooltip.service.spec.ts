import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, RendererFactory2 } from '@angular/core';

import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { DomService } from '../';
import { TooltipConfig } from './tooltip.interface';
import { TooltipService } from './tooltip.service';

describe('TooltipService', () => {
  let service: TooltipService;

  let domService: DomService;
  let documentStub: Document;
  let applicationRef: ApplicationRef;
  let componentFactoryResolver: ComponentFactoryResolver;
  let injector: Injector;
  let rendererFactory2: RendererFactory2;

  beforeEach(() => {
    documentStub = document;
    applicationRef = ComponentStubFactory.getApplicationRefStub() as ApplicationRef;
    componentFactoryResolver = ComponentStubFactory.getComponentFactoryResolverStub() as ComponentFactoryResolver;
    injector = ComponentStubFactory.getInjectorStub() as Injector;
    rendererFactory2 = ComponentStubFactory.getRendererFactory2() as RendererFactory2;
    domService = new DomService(document, applicationRef, componentFactoryResolver, injector, rendererFactory2);
    service = new TooltipService(domService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should allow access to the components array', () => {
    const components: TooltipConfig[] = [ { id: '1' }, { id: '2'} ];
    // eslint-disable-next-line @typescript-eslint/dot-notation
    service['_components'] = components;
    expect(service.components).toEqual(components);
  });

  describe('addTooltip()', () => {
    it('should create and append the elements generated from the provided config', () => {
      const element: HTMLElement = documentStub.createElement('div');
      const config: TooltipConfig = { id: '1' };

      spyOn(domService, 'createComponent').and.returnValue({} as ComponentRef<any>);
      spyOn(domService, 'attachComponent').and.returnValue(element);

      service.addTooltip(config);
      expect(service.components[0]).toEqual({ ...config, appendedElement: element });
    });
  });

  describe('removeTooltip()', () => {
    it('should remove the tooltip with the provided id', () => {
      spyOn(domService, 'removeComponent').and.callThrough();

      const components: TooltipConfig[] = [
        { id: '1' },
        { id: '2', appendedElement: document.createElement('div') }
      ];
      // eslint-disable-next-line @typescript-eslint/dot-notation
      service['_components'] = components;
      expect(service.components.length).toEqual(2);

      service.removeTooltip('3');
      expect(service.components.length).toEqual(2);
      expect(service.components).toEqual(components);

      service.removeTooltip('2');
      expect(domService.removeComponent).toHaveBeenCalled();
      expect(service.components.length).toEqual(1);
      expect(service.components).toEqual([ components[0] ]);

      service.removeTooltip('1');
      expect(domService.removeComponent).toHaveBeenCalled();
      expect(service.components.length).toEqual(0);
      expect(service.components).toEqual([]);
    });
  });

  describe('isTooltipDisplayed()', () => {
    it('should return true if a tooltip with the provided id exists in the components array', () => {
      const components: TooltipConfig[] = [ { id: '1' }, { id: '2'} ];
      // eslint-disable-next-line @typescript-eslint/dot-notation
      service['_components'] = components;

      expect(service.isTooltipDisplayed(null as any)).toBeFalse();
      expect(service.isTooltipDisplayed('0')).toBeFalse();
      expect(service.isTooltipDisplayed('1')).toBeTrue();
      expect(service.isTooltipDisplayed('2')).toBeTrue();
    });
  });
});
