import { Directive, TemplateRef } from '@angular/core';

export class MockRendererService {
  setAttribute = jasmine.createSpy('setAttribute');
  removeAttribute = jasmine.createSpy('removeAttribute');
  addClass = jasmine.createSpy('addClass');
  removeClass = jasmine.createSpy('removeClass');
  appendChild = jasmine.createSpy('appendChild');
}

export class MockElementRef {
  nativeElement = {
    getAttribute(_element: string): string {
      return '';
    },
    getBoundingClientRect(): any {
      return {
        left: null,
        right: null,
        top: null,
        bottom: null,
      };
    },
    querySelector(_element: string): any {
      return {
        scrollLeft: null,
      };
    },
    contains: (_element: any) => true,
  };
}

export class MockTemplateRef {
  elementRef = new MockElementRef();
  createEmbeddedView = jasmine.createSpy('createEmbeddedView');
}

export class MockViewContainerRef {
  get = jasmine.createSpy('get').and.returnValue(null);
  clear = jasmine.createSpy('clear');
  createEmbeddedView = jasmine.createSpy('createEmbeddedView');
  createComponent = jasmine.createSpy('createComponent');
  element = new MockElementRef();
}

export class MockComponentFactoryResolver {
  resolveComponentFactory = jasmine.createSpy('resolveComponentFactory');
}

@Directive({
    selector: '[fusionUiTemplate]',
    standalone: false
})
export class MockTemplateDirective {
  name: string;
  type: string;
  template: TemplateRef<any> = 'mock-template' as any as TemplateRef<any>;

  getName(): string {
    return this.name;
  }

  getType(): string {
    return this.type;
  }
}
