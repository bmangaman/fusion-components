import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Injector,
  Renderer2,
  RendererFactory2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Event, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject } from 'rxjs';

import { DeepPartial } from '../lib/shared';

/**
 * Factory to return partial stubs of APIs.
 */
export class ComponentStubFactory {
  /**
   * Returns an instance of a stub for an Angular element's ElementRef.
   * Reference to NativeElement properties: https://www.w3schools.com/jsref/dom_obj_all.asp
   */
  static getElementRefStub(): Partial<ElementRef> {
    return {
      nativeElement: {
        closest: jasmine.createSpy('closest').and.returnValue(document.createElement('div')),
        querySelector: jasmine.createSpy('querySelector').and.returnValue(document.createElement('div')),
        querySelectorAll: jasmine.createSpy('querySelectorAll').and.returnValue(null),
        scrollIntoView: jasmine.createSpy('scrollIntoView'),
        get offsetHeight(): number {
          return null;
        },
        get offsetWidth(): number {
          return null;
        },
        focus: jasmine.createSpy('focus'),
        get el(): any {
          return null;
        },
      }
    };
  }

  /**
   * Returns an instance of a stub for an Angular element's TemplateRef.
   */
  static getTemplateRefStub(): Partial<TemplateRef<any>> {
    return {
      elementRef: ComponentStubFactory.getElementRefStub() as ElementRef,
    };
  }

  /**
   * Returns an instance of a stub for Angular's Router.
   */
  static getRouterStub(): Partial<Router> {
    return {
      get events(): Observable<Event> {
        return of(null);
      },
      navigate: jasmine.createSpy('navigate').and.returnValue(true),
      url: '/'
    };
  }

  /**
   * Returns an instance of a stub for an Angular element's ViewContainerRef.
   */
  static getViewContainerRefStub(): Partial<ViewContainerRef> {
    return {
      clear: jasmine.createSpy('clear'),
      createEmbeddedView: jasmine.createSpy('createEmbeddedView'),
      createComponent: jasmine.createSpy('createComponent').and.returnValue({ instance: {} }),
      element: {
        nativeElement: {
          appendChild: jasmine.createSpy('appendChild'),
          removeChild: jasmine.createSpy('removeChild'),
          nextSibling: {
            classList: jasmine.createSpy('classList'),
          },
          nextElementSibling: {
            classList: jasmine.createSpy('classList'),
          },
        },
      },
    };
  }

  /**
   * Returns an instance of a stub for Angular's DomSanitizer
   */
  static getDomSanitizerStub(): Partial<DomSanitizer> {
    return {
      bypassSecurityTrustHtml: jasmine.createSpy('bypassSecurityTrustHtml'),
      sanitize: jasmine.createSpy('sanitize')
    };
  }

  /**
   * Returns an instance of a stub for Angular's Component Factory Resolver.
   */
  static getComponentFactoryResolverStub(): Partial<ComponentFactoryResolver> {
    return {
      resolveComponentFactory: jasmine.createSpy('resolveComponentFactory'),
    };
  }

  /**
   * Returns an instance of a stub for Angular's Application Ref.
   */
  static getApplicationRefStub(): Partial<ApplicationRef> {
    return {
      attachView: jasmine.createSpy('attachView'),
    };
  }

  /**
   * Returns an instance of a stub for an Angular element's Renderer2.
   */
  static getRenderer2Stub(): Partial<Renderer2> {
    return {
      addClass: jasmine.createSpy('addClass'),
      removeClass: jasmine.createSpy('removeClass'),
      parentNode: jasmine.createSpy('parentNode'),
      createElement: jasmine.createSpy('createElement'),
      listen: jasmine.createSpy('listen'),
      appendChild: jasmine.createSpy('appendChild'),
      setAttribute: jasmine.createSpy('setAttribute'),
      insertBefore: jasmine.createSpy('insertBefore'),
    };
  }

  static getRendererFactory2(): Partial<RendererFactory2> {
    return {
      createRenderer: () => ComponentStubFactory.getRenderer2Stub() as Renderer2,
    };
  }

  /**
   * Returns an instance of a stub for Angular's Injector.
   */
  static getInjectorStub(): Partial<Injector> {
    return {};
  }

  /**
   * Returns an instance of a stub for Window. All methods are stubbed with Jasmine mocks.
   */
  static getWindowStub(): DeepPartial<Window> {
    return {
      open: jasmine.createSpy('open').and.returnValue({}),
      navigator: {
        get onLine(): boolean {
          return false;
        }
      },
      location: {
        href: ''
      },
      get innerWidth(): number {
        return undefined;
      },
      addEventListener: jasmine.createSpy('addEventListener'),
    };
  }

  static getNgControlStub(): DeepPartial<NgControl> {
    return {
      name: null,
      valueAccessor: null,
      validator: null,
      asyncValidator: null,
      viewToModelUpdate: null,
      valid: null,
      invalid: null,
      touched: null,
      control: null,
      statusChanges: new Subject<string>(),
      valueChanges: new Subject<any>(),
    };
  }

  /**
   * Returns an instance of a stub for Angular's ChangeDetectorRef.
   */
  static getChangeDetectorRefStub(): Partial<ChangeDetectorRef> {
    return {
      detectChanges: jasmine.createSpy('detectChanges'),
      markForCheck: jasmine.createSpy('markForCheck'),
    };
  }

  /**
   * Returns an instance of a stub for the TranslateService.
   */
  static getTranslateServiceStub(): TranslateService {
    return {
      addLangs: jasmine.createSpy('addLangs').and.stub(),
      getBrowserLang: jasmine.createSpy('getBrowserLang').and.returnValue('en'),
      setTranslation: jasmine.createSpy('setTranslation').and.stub(),
      setDefaultLang: jasmine.createSpy('setDefaultLang').and.stub(),
      instant: jasmine.createSpy('instant').and.returnValue(''),
      get: jasmine.createSpy('get').and.returnValue(of('')),
      use: jasmine.createSpy('use').and.returnValue(of('')),
      onLangChange: new EventEmitter(),
      onTranslationChange: new EventEmitter(),
      onDefaultLangChange: new EventEmitter(),
      currentLang: 'en',
    } as any as TranslateService;
  }
}
