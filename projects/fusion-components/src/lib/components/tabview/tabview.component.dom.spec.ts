import { Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TemplateModule } from '@fusion-ui/fusion-components/lib/directives/template';
import { TabPageObject } from '@fusion-ui/fusion-components/unit-test-helpers/page-objects/tabview.spec.po';

import { TabviewComponentPageObject } from './tabview.component.spec.po';
import { TabviewType } from './tabview.interface';
import { TabviewModule } from './tabview.module';

export interface TestTabConfig {
  id: string;
  isDisabled: boolean;
  route: string;
  tabTitle: string;
  tabContent: string;
}

@Component({
  selector: 'fusion-ui-test-component',
  template: `
  <fusion-ui-tabview
    *ngIf="loadTabs"
    [lazyLoading]="lazyLoading"
    [unloadOnUnselect]="unloadOnUnselect"
    [routingParent]="routingParent"
    [type]="type">
    <fusion-ui-tabview-tab
      *ngFor="let tab of tabConfigs"
      [id]="tab.id"
      [isDisabled]="tab.isDisabled"
      [route]="tab.route">
      <ng-template hccTemplate="tabHeader">
        {{ tab.tabTitle }}
      </ng-template>
      <ng-template hccTemplate="tabContent">
        {{ tab.tabContent }}
      </ng-template>
    </fusion-ui-tabview-tab>
  </fusion-ui-tabview>
  `,
})
export class TabviewTestComponent implements OnInit {
  tabConfigs: TestTabConfig[] = [
    {
      id: '0',
      isDisabled: false,
      route: 'tab-0',
      tabTitle: 'tab title 0',
      tabContent: 'tab content 0',
    },
    {
      id: '1',
      isDisabled: false,
      route: 'tab-1',
      tabTitle: 'tab title 1',
      tabContent: 'tab content 1',
    },
  ];

  lazyLoading: boolean = true;
  unloadOnUnselect: boolean;
  routingParent: string;
  type: TabviewType = TabviewType.CONTENT;
  loadTabs: boolean;

  ngOnInit(): void {
    this.loadTabs = true;
  }
}

describe('TabviewComponent', () => {
  let component: TabviewTestComponent;
  let fixture: ComponentFixture<TabviewTestComponent>;
  let page: TabviewComponentPageObject;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TabviewTestComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            redirectTo: 'tab-0',
            pathMatch: 'full',
          },
          {
            path: 'tab-0',
            component: TabviewTestComponent,
          },
          {
            path: 'tab-1',
            component: TabviewTestComponent,
          },
        ]),
        TabviewModule,
        TemplateModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(TabviewTestComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    page = new TabviewComponentPageObject(fixture);
    await waitForComponentToLoad();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should automatically set the first tab to be selected and loaded', () => {
    const tabs: TabPageObject[] = page.tabview.tabs;

    testTabSelectedAndLoaded(tabs[0], true, true);
    testTabSelectedAndLoaded(tabs[1], false, false);
  });

  it('should automatically set the first non-disabled tab to be selected and loaded', async () => {
    component.tabConfigs[0].isDisabled = true;
    await reloadComponent();

    const tabs: TabPageObject[] = page.tabview.tabs;

    testTabSelectedAndLoaded(tabs[0], false, false);
    testTabSelectedAndLoaded(tabs[1], true, true);
  });

  it('should NOT load the unselected tabs if lazyloading is set to true', async () => {
    component.lazyLoading = true;
    await reloadComponent();

    const tabs: TabPageObject[] = page.tabview.tabs;

    testTabSelectedAndLoaded(tabs[0], true, true);
    testTabSelectedAndLoaded(tabs[1], false, false);
  });

  it('should load the unselected tabs if lazyloading is set to false', async () => {
    component.lazyLoading = false;
    await reloadComponent();

    const tabs: TabPageObject[] = page.tabview.tabs;

    testTabSelectedAndLoaded(tabs[0], true, true);
    testTabSelectedAndLoaded(tabs[1], false, true);
  });

  it('should NOT unload unselected tabs if unloadOnUnselect is set to false', async () => {
    let tabs: TabPageObject[];

    component.lazyLoading = true;
    component.unloadOnUnselect = false;
    await reloadComponent();

    tabs = page.tabview.tabs;
    testTabSelectedAndLoaded(tabs[0], true, true);
    testTabSelectedAndLoaded(tabs[1], false, false);

    tabs[1].button.click();
    await waitForComponentToLoad();

    tabs = page.tabview.tabs;
    testTabSelectedAndLoaded(tabs[0], false, true);
    testTabSelectedAndLoaded(tabs[1], true, true);

    tabs[0].button.click();
    await waitForComponentToLoad();

    tabs = page.tabview.tabs;
    testTabSelectedAndLoaded(tabs[0], true, true);
    testTabSelectedAndLoaded(tabs[1], false, true);
  });

  it('should unload unselected tabs if unloadOnUnselect is set to true', async () => {
    let tabs: TabPageObject[];

    component.lazyLoading = true;
    component.unloadOnUnselect = true;
    await reloadComponent();

    tabs = page.tabview.tabs;
    testTabSelectedAndLoaded(tabs[0], true, true);
    testTabSelectedAndLoaded(tabs[1], false, false);

    tabs[1].button.click();
    await waitForComponentToLoad();

    tabs = page.tabview.tabs;
    testTabSelectedAndLoaded(tabs[0], false, false);
    testTabSelectedAndLoaded(tabs[1], true, true);

    tabs[0].button.click();
    await waitForComponentToLoad();

    tabs = page.tabview.tabs;
    testTabSelectedAndLoaded(tabs[0], true, true);
    testTabSelectedAndLoaded(tabs[1], false, false);
  });

  it('should load the correct tab if routing was provided', async () => {
    let tabs: TabPageObject[];

    component.routingParent = '';
    router.navigate(['tab-1']);
    await reloadComponent();

    tabs = page.tabview.tabs;
    testTabSelectedAndLoaded(tabs[0], false, false);
    testTabSelectedAndLoaded(tabs[1], true, true);

    tabs[0].button.click();
    await waitForComponentToLoad();

    tabs = page.tabview.tabs;
    testTabSelectedAndLoaded(tabs[0], true, true);
    testTabSelectedAndLoaded(tabs[1], false, true);
    expect(router.url).toEqual('/tab-0');
  });

  /**
   * Helper function that tests whether or not the provided tab is selected and/ or loaded
   *
   * @param tab the tab to be tested
   * @param isSelected if true, expect the provided tab to be selected; if false, unselected
   * @param isLoaded if true, expect the provided tab to be loaded; if false, unloaded
   */
  function testTabSelectedAndLoaded(tab: TabPageObject, isSelected: boolean, isLoaded: boolean): void {
    expect(tab).toBeTruthy();
    expect(tab.button).toBeTruthy();

    const navButtonClasslist: DOMTokenList = tab.button.classList;

    if (isSelected) {
      const panelClasslist: DOMTokenList = tab.content.classList;

      expect(navButtonClasslist.contains('selected')).toBeTruthy(`${tab} should be selected`);
      expect(panelClasslist.contains('selected')).toBeTruthy();
    } else {
      expect(navButtonClasslist.contains('selected')).toBeFalsy(`${tab} should NOT be selected`);
    }

    if (isLoaded) {
      expect(tab.content).toBeTruthy(`${tab} should be loaded`);
    } else {
      expect(tab.content).toBeFalsy(`${tab} should NOT be loaded`);
    }
  }

  /**
   * Helper function that makes the tests wait for the component to load
   */
  async function waitForComponentToLoad(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
  }

  /**
   * Helper function that reloads the tabview component so that it picks up/ loads with any updated Inputs
   */
  async function reloadComponent(): Promise<void> {
    component.loadTabs = false;
    await waitForComponentToLoad();
    component.loadTabs = true;
    await waitForComponentToLoad();
  }
});
