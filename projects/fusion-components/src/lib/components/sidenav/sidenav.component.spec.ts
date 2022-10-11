import { QueryList } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

import { of } from 'rxjs';

import { cloneDeep } from 'lodash-es';

import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { MockTemplateDirective } from '@fusion-components/unit-test-helpers/mock-utils.spec';

import { TemplateDirective } from '../../directives/template';
import { SidenavComponent } from './sidenav.component';
import { NavItem } from './sidenav.interface';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let router: Router;
  let mockWindow: Window;

  beforeEach(() => {
    router = ComponentStubFactory.getRouterStub() as Router;
    mockWindow = ComponentStubFactory.getWindowStub() as Window;
    component = new SidenavComponent(router, mockWindow);
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  describe('@HostListener()', () => {
    describe('onResize (window.resize)', () => {
      it('should call determineIfSidenavIsExpanded()', () => {
        spyOn(component, 'determineIfSidenavIsExpanded').and.callThrough();
        component.onResize();
        expect(component.determineIfSidenavIsExpanded).toHaveBeenCalled();
      });
    });
  });

  describe('ngAfterContentInit()', () => {
    it('should NOT set sidenavTopTemplate or sidenavButtonTemplate if no templates were found', () => {
      setTemplates([]);
      component.ngAfterContentInit();
      expect(component.sidenavTopTemplate).toBeFalsy();
      expect(component.sidenavBottomTemplate).toBeFalsy();
    });

    it('should NOT set sidenavTopTemplate or sidenavButtonTemplate if the correct template types were NOT found', () => {
      setTemplates(['badTemplateName', 'anotherBadTemplateName']);
      component.ngAfterContentInit();
      expect(component.sidenavTopTemplate).toBeFalsy();
      expect(component.sidenavBottomTemplate).toBeFalsy();
    });

    it('should set sidenavTopTemplate and sidenavButtonTemplate if the correct template types were found', () => {
      setTemplates(['sidenavTop', 'sidenavBottom']);
      component.ngAfterContentInit();
      expect(component.sidenavTopTemplate).toBeTruthy();
      expect(component.sidenavBottomTemplate).toBeTruthy();
    });
  });

  describe('determineIfSidenavIsExpanded()', () => {
    it('should set the isWindowWidthGreaterThan768px and isMenuExpanded flags', () => {
      component.isWindowWidthGreaterThan768px = undefined as any;
      component.isMenuExpanded = undefined as any;

      const mockWindowSpy: jasmine.Spy = spyOnProperty(mockWindow, 'innerWidth').and.returnValue(100);
      component.determineIfSidenavIsExpanded();
      expect(component.isWindowWidthGreaterThan768px).toBeFalse();
      expect(component.isMenuExpanded).toBeFalsy();

      mockWindowSpy.and.returnValue(1000);
      component.determineIfSidenavIsExpanded();
      expect(component.isWindowWidthGreaterThan768px).toBeTrue();
      expect(component.isMenuExpanded).toBeTrue();
    });
  });

  describe('setCurrentSelectedNavItem()', () => {
    it('should set the currentlySelectedItem and emit that an item was selected', () => {
      const expectedItem: NavItem = { title: 'title', route: 'parent/child' };
      spyOn(component.itemSelected, 'emit');
      component.setCurrentSelectedNavItem(expectedItem);
      expect(component.currentlySelectedItem).toEqual(expectedItem);
      expect(component.itemSelected.emit).toHaveBeenCalledWith(expectedItem);
    });
  });

  describe('expandNavItemBasedOnCurrentRoute()', () => {
    it('should expand navItems if one of their children are selected', () => {
      spyOn(component, 'getCurrentUrlSegments').and.returnValue(of(['segment0', 'segment1', 'segment2']));
      spyOn(component, 'findMatchingNavItem').and.callThrough();
      component.expandNavItemBasedOnCurrentRoute();
      expect(component.getCurrentUrlSegments).toHaveBeenCalled();
      expect(component.findMatchingNavItem).toHaveBeenCalled();

      component.navItems = [{ route: 'segment0' }];
      component.expandNavItemBasedOnCurrentRoute();
      expect(component.navItems[0].isExpanded).toBeTrue();
    });
  });

  describe('findMatchingNavItem()', () => {
    let navItems: NavItem[];
    let index: number;
    let expectedResults: NavItem[];
    let segments: string[];

    beforeEach(() => {
      navItems = [];
      index = 0;
      expectedResults = [];
      segments = [];
    });

    it('should look at the route, id, title, and text attributes to try to find a matching route', () => {
      navItems = [
        { route: 'nav-item-route' },
        { id: 'nav-item-id' },
        { title: 'nav-item-title' },
        { text: 'nav-item-text' },
      ];
      index = 0;

      expectedResults = [];
      segments = [];

      segments = ['nav-item-route'];
      expectedResults = cloneDeep(navItems);
      expectedResults[0].isExpanded = true;
      expect(component.findMatchingNavItem(navItems, segments, index)).toEqual(expectedResults);

      segments = ['nav-item-id'];
      expectedResults = cloneDeep(navItems);
      expectedResults[1].isExpanded = true;
      expect(component.findMatchingNavItem(navItems, segments, index)).toEqual(expectedResults);

      segments = ['nav-item-title'];
      expectedResults = cloneDeep(navItems);
      expectedResults[2].isExpanded = true;
      expect(component.findMatchingNavItem(navItems, segments, index)).toEqual(expectedResults);

      segments = ['nav-item-text'];
      expectedResults = cloneDeep(navItems);
      expectedResults[3].isExpanded = true;
      expect(component.findMatchingNavItem(navItems, segments, index)).toEqual(expectedResults);

      segments = ['unfound-segment'];
      expectedResults = cloneDeep(navItems);
      expect(component.findMatchingNavItem(navItems, segments, index)).toEqual(expectedResults);
    });

    it('should recursively loop through the navItems and their children to find matching routes', () => {
      navItems = [
        { route: 'nav-item-route', children: [ { route: 'nav-item-child-route' } ]},
        { id: 'nav-item-id', children: [ { id: 'nav-item-child-id' } ] },
        { title: 'nav-item-title', children: [] },
      ];
      index = 0;

      expectedResults = [];
      segments = [];

      segments = ['nav-item-route', 'nav-item-child-route'];
      expectedResults = cloneDeep(navItems);
      expectedResults[0].isExpanded = true;
      expectedResults[0].children![0].isExpanded = true;
      expect(component.findMatchingNavItem(navItems, segments, index)).toEqual(expectedResults);

      segments = ['nav-item-id', 'unfound--child-route'];
      expectedResults = cloneDeep(navItems);
      expectedResults[1].isExpanded = true;
      expect(component.findMatchingNavItem(navItems, segments, index)).toEqual(expectedResults);

      segments = ['nav-item-id', 'nav-item-child-title'];
      expectedResults = cloneDeep(navItems);
      expectedResults[1].isExpanded = true;
      expect(component.findMatchingNavItem(navItems, segments, index)).toEqual(expectedResults);
    });
  });

  describe('getCurrentUrlSegments', () => {
    it('should return an empty array if the routes is undefiend', (done: DoneFn) => {
      spyOnProperty(router, 'events').and.returnValue(of(null as any));

      component.getCurrentUrlSegments().subscribe((segments: string[]) => {
        expect(segments).toEqual([]);
        done();
      });
    });

    it('should return an empty array if the url is empty/ undefined', (done: DoneFn) => {
      spyOnProperty(router, 'events').and.returnValue(
        of(new RoutesRecognized(undefined as any, undefined as any, undefined as any, undefined as any)));

      component.getCurrentUrlSegments().subscribe((segments: string[]) => {
        expect(segments).toEqual([]);
        done();
      });
    });

    it('should return the current url segments of the current route as an array of strings', (done: DoneFn) => {
      spyOnProperty(router, 'events').and.returnValue(
        of(new RoutesRecognized(undefined as any, '/segment0/segment1/segment2', undefined as any, undefined as any)));

      component.getCurrentUrlSegments().subscribe((segments: string[]) => {
        expect(segments).toEqual(['segment0', 'segment1', 'segment2']);
        done();
      });
    });

    it('should not remove anything before the rootRoute if the routeRoute was not found', (done: DoneFn) => {
      spyOnProperty(router, 'events').and.returnValue(
        of(new RoutesRecognized(undefined as any, '/segment0/segment1/segment2', undefined as any, undefined as any)));
      component.rootRoute = 'segment10';

      component.getCurrentUrlSegments().subscribe((segments: string[]) => {
        expect(segments).toEqual(['segment0', 'segment1', 'segment2']);
        done();
      });
    });

    it('should remove anything before the rootRoute', (done: DoneFn) => {
      spyOnProperty(router, 'events').and.returnValue(
        of(new RoutesRecognized(undefined as any, '/segment0/segment1/segment2', undefined as any, undefined as any )));
      component.rootRoute = 'segment0';

      component.getCurrentUrlSegments().subscribe((segments: string[]) => {
        expect(segments).toEqual(['segment1', 'segment2']);
        done();
      });
    });
  });

  function setTemplates(templatesTypes?: string[]): void {
    const templates: MockTemplateDirective[] = [];

    if (templatesTypes && !!templatesTypes.length) {
      for (const templateName of templatesTypes) {
        const template: MockTemplateDirective = new MockTemplateDirective();
        template.name = templateName;
        templates.push(template);
      }
    }

    component.templates = new QueryList<TemplateDirective>();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    component.templates['_results'] = templates;
  }
});
