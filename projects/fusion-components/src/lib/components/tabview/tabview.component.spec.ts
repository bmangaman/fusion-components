import { QueryList } from '@angular/core';
import { Router } from '@angular/router';

import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';

import { TabviewTabComponent } from './tab/tabview-tab.component';
import { TabviewComponent } from './tabview.component';
import { TabviewType } from './tabview.interface';

describe('TabviewComponent', () => {
  let component: TabviewComponent;
  let router: Router;

  beforeEach(() => {
    router = ComponentStubFactory.getRouterStub() as Router;
    component = new TabviewComponent(router);
    setTabs();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('@HostBinding', () => {
    describe('attr.class - get hostClasses()', () => {
      it('should generate and return classes based on component inputs', () => {
        let expectedResult: string;
        let actualResult: string;

        component.type = null;
        component.classes = null;
        expectedResult = 'f-tabview';
        actualResult = component.hostClasses;
        expect(actualResult).toEqual(expectedResult);

        component.type = TabviewType.CONTENT;
        component.classes = null;
        expectedResult = 'f-tabview f-tabview-type-content';
        actualResult = component.hostClasses;
        expect(actualResult).toEqual(expectedResult);

        component.type = TabviewType.TOP;
        component.classes = null;
        expectedResult = 'f-tabview f-tabview-type-top';
        actualResult = component.hostClasses;
        expect(actualResult).toEqual(expectedResult);

        component.type = TabviewType.INNER_CONTENT;
        component.classes = null;
        expectedResult = 'f-tabview f-tabview-type-inner-content';
        actualResult = component.hostClasses;
        expect(actualResult).toEqual(expectedResult);

        component.type = null;
        component.classes = ['custom-class-1'];
        expectedResult = 'f-tabview custom-class-1';
        actualResult = component.hostClasses;
        expect(actualResult).toEqual(expectedResult);

        component.type = null;
        component.classes = ['custom-class-1', 'custom-class-2'];
        expectedResult = 'f-tabview custom-class-1 custom-class-2';
        actualResult = component.hostClasses;
        expect(actualResult).toEqual(expectedResult);

        component.type = TabviewType.CONTENT;
        component.classes = ['custom-class-1', 'custom-class-2'];
        expectedResult = 'f-tabview f-tabview-type-content custom-class-1 custom-class-2';
        actualResult = component.hostClasses;
        expect(actualResult).toEqual(expectedResult);
      });
    });
  });

  describe('ngAfterContentInit()', () => {
    beforeEach(() => {
      setTabs(2);
      spyOn(component.tabChanged, 'emit');
    });

    it('should call initializeTabStatus', () => {
      spyOn(component, 'initializeTabStatus');
      component.ngAfterContentInit();
      expect(component.initializeTabStatus).toHaveBeenCalledTimes(1);
    });

    it('should call initializeTabStatus again if tabs changes', () => {
      spyOn(component, 'initializeTabStatus');
      component.ngAfterContentInit();
      component.tabs.notifyOnChanges();
      expect(component.initializeTabStatus).toHaveBeenCalledTimes(2);
    });
  });

  describe('initializeTabStatus', () => {
    beforeEach(() => {
      spyOn(component.tabChanged, 'emit');
    });

    it('should select the tab with the correct route if routingParent is defined', () => {
      setTabs(2);
      (router.url as any) = 'grand-parent/parent/tab-0';
      component.routingParent = 'parent';
      component.ngAfterContentInit();
      expect(component.tabs.toArray()[0].isSelected).toBeTruthy();
      expect(component.tabs.toArray()[0].isLoaded).toBeTruthy();
      expect(component.tabs.toArray()[1].isSelected).toBeFalsy();
      expect(component.tabs.toArray()[1].isLoaded).toBeFalsy();
      expect(component.tabChanged.emit).toHaveBeenCalled();
    });

    it('should not select any tabs if the route does not match any tabs', () => {
      setTabs(2);
      (router.url as any) = 'grand-parent/parent/bad-route';
      component.routingParent = 'parent';
      component.ngAfterContentInit();
      expect(component.tabs.toArray()[0].isSelected).toBeFalsy();
      expect(component.tabs.toArray()[0].isLoaded).toBeFalsy();
      expect(component.tabs.toArray()[1].isSelected).toBeFalsy();
      expect(component.tabs.toArray()[1].isLoaded).toBeFalsy();
      expect(component.tabChanged.emit).not.toHaveBeenCalled();
    });

    it('should not select any tabs if the tab with the matching route is disabbled', () => {
      setTabs(2);
      (router.url as any) = 'grand-parent/parent/tab-0';
      component.routingParent = 'parent';
      component.tabs.toArray()[0].isDisabled = true;
      component.ngAfterContentInit();
      expect(component.tabs.toArray()[0].isSelected).toBeFalsy();
      expect(component.tabs.toArray()[0].isLoaded).toBeFalsy();
      expect(component.tabs.toArray()[1].isSelected).toBeFalsy();
      expect(component.tabs.toArray()[1].isLoaded).toBeFalsy();
      expect(component.tabChanged.emit).not.toHaveBeenCalled();
    });

    it('should set the first tab to be selected if no routingParent is definied', () => {
      setTabs(2);
      component.routingParent = null;
      component.ngAfterContentInit();
      expect(component.tabs.toArray()[0].isSelected).toBeTruthy();
      expect(component.tabs.toArray()[0].isLoaded).toBeTruthy();
      expect(component.tabs.toArray()[1].isSelected).toBeFalsy();
      expect(component.tabs.toArray()[1].isLoaded).toBeFalsy();
      expect(component.tabChanged.emit).toHaveBeenCalled();
    });

    it('should set the second tab to be selected if no routingParent is definied and the first tab is disabled', () => {
      setTabs(2);
      component.tabs.toArray()[0].isDisabled = true;
      component.routingParent = null;
      component.ngAfterContentInit();
      expect(component.tabs.toArray()[0].isSelected).toBeFalsy();
      expect(component.tabs.toArray()[0].isLoaded).toBeFalsy();
      expect(component.tabs.toArray()[1].isSelected).toBeTruthy();
      expect(component.tabs.toArray()[1].isLoaded).toBeTruthy();
      expect(component.tabChanged.emit).toHaveBeenCalled();
    });

    it('should not select any tabs if all tabs are disabled', () => {
      setTabs(2);
      component.tabs.toArray()[0].isDisabled = true;
      component.tabs.toArray()[1].isDisabled = true;
      component.routingParent = null;
      component.ngAfterContentInit();
      expect(component.tabs.toArray()[0].isSelected).toBeFalsy();
      expect(component.tabs.toArray()[0].isLoaded).toBeFalsy();
      expect(component.tabs.toArray()[1].isSelected).toBeFalsy();
      expect(component.tabs.toArray()[1].isLoaded).toBeFalsy();
      expect(component.tabChanged.emit).not.toHaveBeenCalled();
    });

    it('should load all tabs if lazyLoading is set to false', () => {
      setTabs(2);
      component.routingParent = null;
      component.lazyLoading = false;
      component.ngAfterContentInit();
      expect(component.tabs.toArray()[0].isSelected).toBeTruthy();
      expect(component.tabs.toArray()[0].isLoaded).toBeTruthy();
      expect(component.tabs.toArray()[1].isSelected).toBeFalsy();
      expect(component.tabs.toArray()[1].isLoaded).toBeTruthy();
      expect(component.tabChanged.emit).toHaveBeenCalled();
    });
  });

  describe('selectTab()', () => {
    beforeEach(() => {
      spyOn(component.tabChanged, 'emit');
    });

    it('should call router.navigate with the correct path if routingParent is defined', () => {
      (router.url as any) = 'grand-parent/parent';
      component.routingParent = 'parent';
      component.selectTab(component.tabs.toArray()[0]);
      expect(router.navigate).toHaveBeenCalledWith(['grand-parent/parent/tab-0']);
      expect(component.tabChanged.emit).toHaveBeenCalled();

      (router.url as any) = 'grand-parent/parent/sibling';
      component.routingParent = 'parent';
      component.selectTab(component.tabs.toArray()[0]);
      expect(router.navigate).toHaveBeenCalledWith(['grand-parent/parent/tab-0']);
      expect(component.tabChanged.emit).toHaveBeenCalled();
    });

    it('should NOT call router.navigate if a routingParent was not provided', () => {
      component.routingParent = null;
      component.selectTab(component.tabs.toArray()[0]);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should not load or select tabs if they are disabled', () => {
      setTabs(2);
      component.tabs.toArray()[0].isDisabled = true;
      component.tabs.toArray()[1].isDisabled = true;
      component.lazyLoading = false;
      component.selectTab(component.tabs.toArray()[0]);
      expect(component.tabs.toArray()[0].isSelected).toEqual(false);
      expect(component.tabs.toArray()[0].isLoaded).toEqual(false);
      expect(component.tabs.toArray()[1].isSelected).toEqual(false);
      expect(component.tabs.toArray()[1].isLoaded).toEqual(false);
      expect(component.tabChanged.emit).not.toHaveBeenCalled();
    });

    it('should loop through all the tabs and set the isSelected and isLoaded values (unloadOnUnselect false)', () => {
      setTabs(2);
      component.unloadOnUnselect = false;
      component.selectTab(component.tabs.toArray()[0]);
      expect(component.tabs.toArray()[0].isSelected).toEqual(true);
      expect(component.tabs.toArray()[0].isLoaded).toEqual(true);
      expect(component.tabs.toArray()[1].isSelected).toEqual(false);
      expect(component.tabs.toArray()[1].isLoaded).toEqual(false);
      expect(component.tabChanged.emit).toHaveBeenCalled();
      component.selectTab(component.tabs.toArray()[1]);
      expect(component.tabs.toArray()[0].isSelected).toEqual(false);
      expect(component.tabs.toArray()[0].isLoaded).toEqual(true);
      expect(component.tabs.toArray()[1].isSelected).toEqual(true);
      expect(component.tabs.toArray()[1].isLoaded).toEqual(true);
      expect(component.tabChanged.emit).toHaveBeenCalled();
    });

    it('should loop through all the tabs and set the isSelected and isLoaded values (unloadOnUnselect true)', () => {
      setTabs(2);
      component.unloadOnUnselect = true;
      component.selectTab(component.tabs.toArray()[0]);
      expect(component.tabs.toArray()[0].isSelected).toEqual(true);
      expect(component.tabs.toArray()[0].isLoaded).toEqual(true);
      expect(component.tabs.toArray()[1].isSelected).toEqual(false);
      expect(component.tabs.toArray()[1].isLoaded).toEqual(false);
      expect(component.tabChanged.emit).toHaveBeenCalled();
      component.selectTab(component.tabs.toArray()[1]);
      expect(component.tabs.toArray()[0].isSelected).toEqual(false);
      expect(component.tabs.toArray()[0].isLoaded).toEqual(false);
      expect(component.tabs.toArray()[1].isSelected).toEqual(true);
      expect(component.tabs.toArray()[1].isLoaded).toEqual(true);
      expect(component.tabChanged.emit).toHaveBeenCalled();
    });
  });

  /**
   * Helper function that generates tabs for component.tabs.
   *
   * @param numTabComponents the number of tabs wanted to generated and added to component.tabs
   */
  function setTabs(numTabComponents: number = 1): void {
    const tabs: TabviewTabComponent[] = [];

    for (let i = 0; i < numTabComponents; i++) {
      const tab: TabviewTabComponent = new TabviewTabComponent();
      tab.route = `tab-${i}`;
      tabs.push(tab);
    }

    component.tabs = new QueryList<TabviewTabComponent>();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    component.tabs['_results'] = tabs;
  }
});
