import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2, Type,
} from '@angular/core';

/**
 * DOM SERVICE
 *
 * The DOM Service provides a consistent way to append new components to the DOM and remove
 * existing elements from the DOM.
 */
@Injectable({
  providedIn: 'root'
})
export class DomService {
  private renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private rendererFactory: RendererFactory2,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  /**
   * Creates the component to be appended to the DOM.
   *
   * @param component The component to be appended to the DOM.
   * @param componentProps The properties the appended component should have. These are usually @Inputs.
   * @param projectedContent The content to insert into the created component.
   * @returns The generated component reference created using the component factory resolver.
   */
  createComponent<T>(component: Type<T>, componentProps?: Record<string, any>, projectedContent?: any[][]): ComponentRef<T> {
    const factory: ComponentFactory<T> = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef: ComponentRef<T> = factory.create(this.injector, projectedContent);

    if (!!componentProps && componentRef.instance instanceof Object) {
      Object.assign(componentRef.instance, componentProps);
    }

    // Attach the new component to the application view so that it can be dirty checked on change detection cycles.
    this.appRef.attachView(componentRef.hostView);

    return componentRef;
  }

  /**
   * Attaches the created component to the DOM to the appendedTo element.
   * If the appendTo element is undefined or could not be found, append the element to the 'body'.
   *
   * @param componentRef The component to be appended to the appendTo element.
   * @param appendTo The element to which the component is supposed to be appended.
   * @returns The appended component as an HTML element.
   */
  attachComponent(componentRef: ComponentRef<any>, appendTo: Element | string = 'body'): HTMLElement {
    this.appRef.attachView(componentRef.hostView);
    const domElem: HTMLElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];

    const body: Element | null = this.document.querySelector('body');

    if (!appendTo) {
      this.renderer.appendChild(body, domElem);
    } else if (typeof appendTo === 'string') {
      const element: Element | null = document.querySelector(appendTo);
      this.renderer.appendChild(!!element ? element : body, domElem);
    } else {
      this.renderer.appendChild(appendTo, domElem);
    }

    return domElem;
  }

  /**
   * Removes the provided component from the DOM.
   *
   * @param component The component to be removed.
   */
  removeComponent(component: HTMLElement): void {
    if (!!component) {
      component.remove();
    }
  }
}
