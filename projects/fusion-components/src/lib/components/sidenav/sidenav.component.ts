import { AfterContentInit, Component, ContentChildren, EventEmitter, HostListener, Inject, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { Data, Router, RoutesRecognized } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TemplateDirective } from '../../directives/template';
import { WINDOW } from '../../providers/window';
import { NavItem, SidenavTemplate } from './sidenav.interface';

/**
 * SIDENAV COMPONENT
 */
@Component({
  selector: 'f-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent implements AfterContentInit {
  readonly Observable = Observable;

  currentlySelectedItem: NavItem;
  isWindowWidthGreaterThan768px: boolean;

  @Input() minWidth: string = '200px';
  @Input() isMenuExpanded: boolean = true;
  @Input() navItems: NavItem[] = [];
  @Input() rootRoute: string;

  @Output() itemSelected: EventEmitter<NavItem> = new EventEmitter<NavItem>();

  /**
   * A list of all the TemplateDirectives nested within this component.
   * Used to generate the optional content that can be displayed either before or d
   * after the navItems.
   */
  @ContentChildren(TemplateDirective) templates !: QueryList<TemplateDirective>;

  private _sidenavTopTemplate: TemplateRef<any>;
  get sidenavTopTemplate(): TemplateRef<any> {
    return this._sidenavTopTemplate;
  }

  private _sidenavBottomTemplate: TemplateRef<any>;
  get sidenavBottomTemplate(): TemplateRef<any> {
    return this._sidenavBottomTemplate;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.determineIfSidenavIsExpanded();
  }

  constructor(
    private router: Router,
    @Inject(WINDOW) private window: Window,
  ) {
    this.expandNavItemBasedOnCurrentRoute();
    this.determineIfSidenavIsExpanded();
  }

  /**
   * Loops through all the found templates and if any "sidenavTop" or "sidenavBottom" templates are found, set
   * sidenavTopTemplate and sidenavBottomTemplate accordingly.
   */
  ngAfterContentInit(): void {
    this.templates.forEach((item: TemplateDirective) => {
      const name: string = item.getName();

      if (name === SidenavTemplate.TOP ) {
        this._sidenavTopTemplate = item.template;
      }

      if (name === SidenavTemplate.BOTTOM) {
        this._sidenavBottomTemplate = item.template;
      }
    });
  }

  /**
   * Determines whteher or not to expand or collapse the sidenav based on the curent window width.
   *
   * @param event If called on window resize, use the window.innerWidth from the event.
   */
  determineIfSidenavIsExpanded(): void {
    this.isWindowWidthGreaterThan768px = this.window && this.window.innerWidth >= 768;
    this.isMenuExpanded = this.isWindowWidthGreaterThan768px;
  }

  /**
   * Whenever a nav item is selected:
   *  - set the currentlySelectedItem variable to the nav item config
   *  - emit an event so that parent component(s) know that the selected nav item was changed
   *
   * @param item The nav item that was selected.
   */
  setCurrentSelectedNavItem(item: NavItem): void {
    this.currentlySelectedItem = item;
    this.itemSelected.emit(item);
  }

  /**'
   * When the component is first loaded (on page refresh/ first time navigating to the page), use the current url/ route
   * to figure if a nested nav item is active/ selected and then make sure to expand all of the necessary parent nav items.
   */
  expandNavItemBasedOnCurrentRoute(): void {
    this.getCurrentUrlSegments().subscribe((segments: string[]) => {
      const navItems: NavItem[] = this.findMatchingNavItem(this.navItems, segments, 0);

      if (!!navItems && !!navItems.length) {
        this.navItems = navItems;
      }
    });
  }

  /**
   * Recursive function that determines whether or not the navItem matches the provided route segment. If they match,
   * set isExpaded to true and continue to dig deeper into the children of the navItem. Otherwise, just return the navItem
   * to get out of the loop.
   *
   * @param navItems The navItems to check against the provided route segments.
   * @param segments The route segments to check against the provided navItems.
   * @param index The current depth of the navItems (children) - used to determine which route segment to check.
   */
  findMatchingNavItem(navItems: NavItem[], segments: string[], index: number): NavItem[] {
    if (!!navItems?.length && !!segments?.length) {
      const matchingIndex: number = navItems.findIndex((item: NavItem) => {
        const doesRouteMatch: boolean = !!item?.route?.includes(segments[index]);
        const doesIdMatch: boolean = !!item?.id?.includes(segments[index]);

        // If the title is an Observable, do not check if it matches the route segment
        // If the title is an Observable, HIGHLY recommend setting the id value of the NavItem to include the route segment
        const doesTitleMatch: boolean = typeof item?.title === 'string' || item?.title instanceof String
          ? item.title.toLowerCase()?.replace(' ', '-') === segments[index]
          : false;

        // If the text is an Observable, do not check if it matches the route segment
        // If the text is an Observable, HIGHLY recommend setting the id value of the NavItem to include the route segment
        const doesTextMatch: boolean = typeof item?.text === 'string' || item?.text instanceof String
          ? item.text.toLowerCase()?.replace(' ', '-') === segments[index]
          : false;

        return doesRouteMatch || doesIdMatch || doesTitleMatch || doesTextMatch;
      });

      if (matchingIndex > -1) {
        navItems[matchingIndex].isExpanded = true;

        if (!!navItems[matchingIndex].children?.length) {
          navItems[matchingIndex].children = this.findMatchingNavItem(navItems[matchingIndex].children!, segments, index + 1);
        }
      }
    }

    return navItems;
  }

  /**
   * Gets the url segments from the route and converts them to an array of strings to be used to check which navItems should be
   * expanded (if any) and selected/ active (if any).
   */
  getCurrentUrlSegments(): Observable<string[]> {
    return this.router.events.pipe(map((data: Data) => {
      if (!!data && data instanceof RoutesRecognized) {
        let urlSegments: string[] =  data.url ? data.url.split('/') : [];

        if (!!this.rootRoute) {
          const matchingRootRouteIndex: number = urlSegments.findIndex((segment: string) => segment === this.rootRoute);

          if (matchingRootRouteIndex > -1) {
            urlSegments.splice(0, Math.min(matchingRootRouteIndex + 1, urlSegments.length - 1));
          }
        }

        urlSegments = urlSegments.filter((segment: string) => !!segment); // remove empty segments ('')
        return urlSegments;
      }

      return [];
    }));
  }
}
