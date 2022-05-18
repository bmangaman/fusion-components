import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { Router } from '@angular/router';

import { unsubscribeAll } from '@hcc/app/shared/utilities/utils';

import { Subscription } from 'rxjs';

import { TabviewTabComponent } from './tab/tabview-tab.component';
import { TabviewType } from './tabview.interface';

/**
 * TABVIEW COMPONENT
 *
 * The tabview component is made of tabs and panels. There are three (3) types (TOP, CONTENT, and INNER_CONTENT)
 * that affect the tab styling. Routing is also supported if parent route and child routes are provided.
 *
 * <example-url>../../tabview?embedded</example-url>
 *
 * @example
 * <fusion-ui-tabview [type]="TabviewType.CONTENT" tablistAriaLabel="Test tabs">
 *   <fusion-ui-tabview-tab route="tabview">
 *     <ng-template fusionUiTemplate="tabHeader"><h3>Tab title 1</h3></ng-template>
 *     <ng-template fusionUiTemplate="tabContent">Tab Content 1</ng-template>
 *   </fusion-ui-tabview-tab>
 *   <fusion-ui-tabview-tab route="tabview" [isDisabled]="true">
 *     <ng-template fusionUiTemplate="tabHeader"><h3>Tab Title 2</h3></ng-template>
 *     <ng-template fusionUiTemplate="tabContent">Tab Content 2</ng-template>
 *   </fusion-ui-tabview-tab>
 * </fusion-ui-tabview>
 */
@Component({
  selector: 'fusion-ui-tabview',
  templateUrl: 'tabview.component.html',
})
export class TabviewComponent implements AfterContentInit, OnDestroy {
  /**
   * Sets the aria-label of tab container element (with role="tablist").
   */
  @Input() tablistAriaLabel: string;

  /**
   * Determines whether or not to load (rendering in the DOM) the content of all the tabs at once or only once selected.
   */
  @Input() lazyLoading: boolean = true;

  /**
   * Determines whether or not to "unload" (do not render it in the DOM) tab content once it is unselected.
   * Is essentially ignored when using tabs with routing, since navigating to a new route is basically like reloading the page.
   */
  @Input() unloadOnUnselect: boolean = false;

  /**
   * Sets the parent routing segment to be used to associate a tab with a particular route.
   * If not set, the tabs will not be associated with any routes.
   */
  @Input() routingParent: string;

  /**
   * Sets the tabview type which affects the styling of the tab:
   *  - CONTENT = usually nested within page content (blue rectangle when selected)
   *  - INNER_CONTENT = similar to content, but used when the tabs should not be as bold or emphasized (blue underline when selected)
   *  - TOP = usually at the top of the page with routing (grey background always, blue underline when selected)
   */
  @Input() type: TabviewType = TabviewType.CONTENT;

  /**
   * Allows the addition of custom CSS classes to div.fusion-ui-tabview.
   */
  @Input() classes: string[] = [];

  /**
   * Emits when a tab is changed with the currently selected TabviewTabComponent.
   */
  @Output() tabChanged: EventEmitter<TabviewTabComponent> = new EventEmitter<TabviewTabComponent>();

  /**
   * A list of all the TabviewTabComponents nested within this component
   * Used to generate the tab navigation and panels
   */
  @ContentChildren(TabviewTabComponent) tabs !: QueryList<TabviewTabComponent>;

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
  ) {}

  /**
   * Initializes and selects the correct tab one of two ways:
   *   1. If routing is enabled loops through the tabs checking whether or not the current route contains a tab route.
   *      If it does and the tab is NOT disabled, select and load that tab.
   *   2. Otherwise if routing disabled (default):
   *      Open the first not-disabled tab and only load the content of that one if lazyLoading is true.
   */
  ngAfterContentInit(): void {
    this.initializeTabStatus();
    /**
     * This subscription catches tabs which do not initialize before the AfterContentInit hook fires.
     *
     * This is usually the result of something like an attribute directive on the tab (e.g. Upgrades -> Compute Firmware)
     * Adding this check allows us to detect the tab after the original initialization code has run, and initialize it
     * as well.
     */
    this.tabs.changes.subscribe(() => this.initializeTabStatus());
  }

  ngOnDestroy(): void {
    unsubscribeAll(this.subscriptions);
  }

  /**
   * Generates the CSS classes to be appended to the host element.
   *
   * @returns A string of CSS classes.
   */
  @HostBinding('attr.class')
  get hostClasses(): string {
    const classes: string[] = ['fusion-ui-tabview'];

    if (!!this.type) {
      classes.push(`fusion-ui-tabview-type-${this.type}`);
    }

    classes.push(...this.classes);

    return classes.join(' ');
  }

  initializeTabStatus(): void {
    if (this.routingParent !== undefined && this.routingParent !== null) {
      this.tabs.toArray().forEach((tab: TabviewTabComponent) => {
        if (!tab.isDisabled) {
          const urlSegments: string[] = this.router.url.split('/');
          // Trim off any query params before comparing.
          const trimmedLastSegment: string = urlSegments[urlSegments.length - 1].split('?')[0];
          const routeEquals: boolean = trimmedLastSegment === tab.route;
          tab.isSelected = routeEquals;
          tab.isLoaded = routeEquals;

          if (routeEquals) {
            this.tabChanged.emit(tab);
          }
        }
      });
    } else {
      const firstAvailableTab: TabviewTabComponent = this.tabs.find((tab: TabviewTabComponent) => !tab.isDisabled);

      if (firstAvailableTab) {
        firstAvailableTab.isSelected = true;

        if (this.lazyLoading) {
          firstAvailableTab.isLoaded = true;
        } else {
          this.tabs.forEach((tab: TabviewTabComponent) => tab.isLoaded = !tab.isDisabled);
        }

        this.tabChanged.emit(firstAvailableTab);
      }
    }
  }

  /**
   * When a tab (header) is clicked, changes the tab one of two ways:
   *   1. If routing is enabled for the tabview component, navigates to the new route and displays the appropriate tab
   *   2. Otherwise, loops through each tab and only loads and displays the appropriate tab
   *
   * @param openedTab The tab to be selected and loaded.
   */
  selectTab(openedTab: TabviewTabComponent): void {
    if (this.routingParent !== undefined && this.routingParent !== null) {
      const urlSegments: string[] = this.router.url.split('/');

      if (urlSegments[urlSegments.length - 1].toString() !== this.routingParent) {
        urlSegments.pop();
      }

      urlSegments.push(`${openedTab.route}`);
      this.router.navigate([`${urlSegments.toString().replace(/,/g, '/')}`]);
    }

    /**
     * If the tab is disabled, do NOT load or select it.
     * If the tab is NOT disabled, set selected to true.
     * If unloading, only load if the tab is selected.
     * If NOT unloading:
     *  - and tab selected, load the tab
     *  - and tab is not selected, keep the tab's current loaded value (casted to boolean)
     */
    this.tabs.toArray().forEach((tab: TabviewTabComponent) => {
      if (!tab.isDisabled) {
        if (tab === openedTab) {
          tab.isSelected = true;
          tab.isLoaded = true;
          this.tabChanged.emit(tab);
        } else {
          tab.isSelected = false;
          tab.isLoaded = this.unloadOnUnselect ? false : !!tab.isLoaded;
        }
      } else {
        tab.isSelected = false;
        tab.isLoaded = false;
      }
    });
  }
}
