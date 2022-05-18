import {
  ApplicationRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  Input,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

import { ComponentStubFactory } from '../../../unit-test-helpers/component-stub-factory.spec';

import { DomService } from './dom.service';

import Spy = jasmine.Spy;

@Component({
  selector: 'fusion-ui-test-component',
  template: '',
})
class TestComponent {
  @Input() stringInput: string;
  @Input() numberInput: number;
}

describe('DomService', () => {
  let service: DomService;
  let documentStub: Document;
  let componentFactoryResolver: ComponentFactoryResolver;
  let applicationRef: ApplicationRef;
  let injector: Injector;
  let renderer2: Renderer2;
  let rendererFactory2: RendererFactory2;

  beforeEach(() => {
    documentStub = document;
    componentFactoryResolver = ComponentStubFactory.getComponentFactoryResolverStub() as ComponentFactoryResolver;
    applicationRef = ComponentStubFactory.getApplicationRefStub() as ApplicationRef;
    injector = ComponentStubFactory.getInjectorStub() as Injector;
    rendererFactory2 = ComponentStubFactory.getRendererFactory2() as RendererFactory2;
    renderer2 = rendererFactory2.createRenderer(null, null);

    service = new DomService(
      documentStub,
      applicationRef,
      componentFactoryResolver,
      injector,
      rendererFactory2,
    );
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('createComponent()', () => {
    let mockComponentRef: ComponentRef<TestComponent>;
    let mockComponentFactory: ComponentFactory<TestComponent>;

    beforeEach(() => {
      mockComponentRef = generateMockComponentRef();
      mockComponentFactory = generateMockComponenFactory(mockComponentRef);

      spyOn(mockComponentFactory, 'create').and.callThrough();
      (componentFactoryResolver.resolveComponentFactory as Spy).and.returnValue(mockComponentFactory);
    });

    it('should create a component', () => {
      const resultingComponentRef: ComponentRef<TestComponent> = service.createComponent(TestComponent);
      expect(componentFactoryResolver.resolveComponentFactory).toHaveBeenCalledWith(TestComponent);
      expect(mockComponentFactory.create).toHaveBeenCalledWith(injector, undefined);
      expect(resultingComponentRef).toEqual(mockComponentRef);
      expect(applicationRef.attachView).toHaveBeenCalled();
    });

    it('should apply the provided component properties', () => {
      const componentInputs: any = { stringInput: 'string', numberInput: 100 };
      const resultingComponentRef: ComponentRef<TestComponent> = service.createComponent(TestComponent, componentInputs);
      expect(componentFactoryResolver.resolveComponentFactory).toHaveBeenCalledWith(TestComponent);
      expect(mockComponentFactory.create).toHaveBeenCalledWith(injector, undefined);
      expect(resultingComponentRef).toEqual(mockComponentRef);
      expect(resultingComponentRef.instance.numberInput).toEqual(100);
      expect(resultingComponentRef.instance.stringInput).toEqual('string');
    });

    it('should use provided ngContent when creating component', () => {
      const fakeContent = [[{}]];
      const resultingComponentRef: ComponentRef<TestComponent> = service.createComponent(TestComponent, undefined, fakeContent);
      expect(componentFactoryResolver.resolveComponentFactory).toHaveBeenCalledWith(TestComponent);
      expect(mockComponentFactory.create).toHaveBeenCalledWith(injector, fakeContent);
      expect(resultingComponentRef).toEqual(mockComponentRef);
    });
  });

  describe('attachComponent()', () => {
    let mockComponentRef: ComponentRef<TestComponent>;
    let body: HTMLElement;
    let element: HTMLElement;
    let appendToElement: HTMLElement;

    beforeEach(() => {
      body = documentStub.querySelector('body');

      element = documentStub.createElement('div');
      element.classList.add('component-element');

      mockComponentRef = generateMockComponentRef(element);

      appendToElement = documentStub.createElement('div');
      appendToElement.classList.add('appendto-element');
      body.appendChild(appendToElement);

      // eslint-disable-next-line @typescript-eslint/dot-notation
      renderer2 = service['renderer'];

      spyOn(documentStub, 'querySelector')
        .withArgs('body').and.returnValue(body)
        .withArgs('.unfound-element').and.returnValue(null)
        .withArgs('.appendto-element').and.returnValue(appendToElement);
    });

    it('should append the component to the body if appendTo is undefined', () => {
      service.attachComponent(mockComponentRef, null);
      expect(renderer2.appendChild).toHaveBeenCalledWith(body, element);
    });

    it('should append the component to the appendTo element if found (string)', () => {
      service.attachComponent(mockComponentRef, '.unfound-element');
      expect(renderer2.appendChild).toHaveBeenCalledWith(body, element);

      service.attachComponent(mockComponentRef, '.appendto-element');
      expect(renderer2.appendChild).toHaveBeenCalledWith(appendToElement, element);
    });

    it('should append the component to the appendTo element if found (element)', () => {
      service.attachComponent(mockComponentRef, appendToElement);
      expect(renderer2.appendChild).toHaveBeenCalledWith(appendToElement, element);
    });
  });

  describe('removeComponent()', () => {
    it('should remove the provided element', () => {
      const component: HTMLElement = documentStub.createElement('div');
      spyOn(component, 'remove').and.stub();

      service.removeComponent(null);
      expect(component.remove).not.toHaveBeenCalled();

      service.removeComponent(component);
      expect(component.remove).toHaveBeenCalled();
    });
  });

  /**
   * Helper function to generate a component factory.
   *
   * @param componentRef The component reference to be returned by the create function.
   * @returns The generated component factory.
   */
  function generateMockComponenFactory(componentRef: ComponentRef<TestComponent>): ComponentFactory<TestComponent> {
    return {
      create: (): ComponentRef<TestComponent> => componentRef,
    } as unknown as ComponentFactory<TestComponent>;
  }

  /**
   * Helper function to generate a component reference.
   *
   * @param element Optional; element returned by hostview rootNodes.
   * @returns The generated component reference.
   */
  function generateMockComponentRef(element?: HTMLElement): ComponentRef<TestComponent> {
    return {
      instance: {
        stringInput: null,
        numberInput: null,
      },
      hostView: {
        rootNodes: [
          !!element ? element : document.createElement('div'),
        ],
      },
    } as unknown as ComponentRef<TestComponent>;
  }
});
