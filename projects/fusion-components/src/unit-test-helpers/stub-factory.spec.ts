import { ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject, of } from 'rxjs';

/**
 * Factory to return stub instances of services and components which are not related to the APIs. Third party components,
 * Angular components, JS built ins (eg Window), and commonly used components and services can be obtained from this
 * factory.
 */
 export class StubFactory {
  /**
   * Returns an intstance of a stub for Angular's Activated Route.
   */
  static getActivetedRouteStub(): Partial<ActivatedRoute> {
    return {
      url: of(),
      params: of(),
      queryParams: of(),
      fragment: of(),
    };
  }

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
        get offsetHeight(): number | null {
          return null;
        },
        get offsetWidth(): number | null {
          return null;
        },
        focus: jasmine.createSpy('focus'),
      }
    };
  }

  /**
   * Returns an instance of a stub for Angular's Router.
   */
   static getRouterStub(): Partial<Router> {
    return {
      navigate: jasmine.createSpy('navigate').and.returnValue(true),
      url: '/',
      events: new Subject(),
      createUrlTree: jasmine.createSpy('createUrlTree').and.stub(),
      serializeUrl: jasmine.createSpy('serializeUrl').and.returnValue(''),
    };
  }
}
