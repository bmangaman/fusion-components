import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { NavItem } from '../sidenav.interface';

/**
 * NAV ITEM COMPONENT
 */
@Component({
    selector: 'f-nav-item',
    templateUrl: './nav-item.component.html',
    animations: [
        trigger('inOutAnimation', [
            transition(':enter', [
                style({ height: 0, opacity: 0 }),
                animate('500ms ease-out', style({ height: '*', opacity: 1 })),
            ]),
            transition(':leave', [
                style({ height: '*', opacity: 1 }),
                animate('250ms ease-in', style({ height: 0, opacity: 1 })),
            ]),
        ]),
    ],
    standalone: false
})
export class NavItemComponent implements OnChanges {
  readonly Observable = Observable;

  linkCssClasses: string[];
  iconCssClasses: string[];

  /**
   * Dictates the title attribute of the nav item.
   */
  @Input() title: string | Observable<string>;

  /**
   * Dictates the text to be displayed in the nav item.
   */
  @Input() text: string | Observable<string>;

  /**
   * Dictates whether the nav item has an icon and what it is.
   */
  @Input() icon: string | undefined;

  /**
   * Dictates whether or not the nav item is expanded. This flag only does anything
   * when the nav item has children.
   */
  @Input() isExpanded: boolean;

  /**
   * Dictates whether or not the nav item is disabled. When disabled, it cannot be clicked.
   */
  @Input() isDisabled: boolean;

  /**
   * Dictates whether or not the path must fully match for the link to be detected as active/ matching.
   */
  @Input() isPathMatchFull: boolean;

  /**
   * Dictates whether or not the nav item links to a route external to the application.
   * Should use the href OR route attributes, but NOT both.
   */
  @Input() href: string | undefined;

  /**
   * Determines the target of a link (must use href and not route).
   */
  @Input() target: string | unknown;

  /**
   * Dictates the angular route within the application clicking the nav will bring the user to.
   * Should use the route OR href attributes, but NOT both.
   */
  @Input() route: string | undefined;

  /**
   * List of nested children nav items. If the nav item is expanded, the children nav items are
   * displayed as additional navigation options.
   */
  @Input() children: NavItem[] | undefined;

  /**
   * The index of the nav item. Represents how may layers deep (how may predecessor nav items) exist above
   * this nav item. Helps with the recursive function in the sidenav component to make sure to expand
   * and select the correct nav item based on the current route.
   */
  @Input() index: number = 0;

  /**
   * Determines the id of the route. Good to use when the title or text attributes to not mimic the route (e.g. params).
   * If not set, one is automatically generated.
   *
   * HIGHLY recommend manually setting this value to include the related route if text and/or title are Observables.
   * e.g. if route is /manage/deployments, set the id to `${some-unique-prefix}-manage-deployments`
   */
  private _id: string = this.generateNavItemId();
  @Input()
  set id(id: string | undefined) {
    this._id = id || this._id;
  }
  get id(): string {
    return this._id;
  }

  @Output() expansionToggled: EventEmitter<NavItem> = new EventEmitter<NavItem>();
  @Output() itemSelected: EventEmitter<NavItem> = new EventEmitter<NavItem>();

  /**
   * When certain inputs are changed, make updates to the state of the nav item accordingly.
   *
   * @param c Input changes.
   */
  ngOnChanges(c: SimpleChanges): void {
    if (c['icon']) {
      this.generateIconCssClasses();
    }

    if (c['children'] || c['isExpanded'] || c['isDisabled']) {
      this.generateLinkCssClasses();
    }
  }

  /**
   * If the nav item has children and is clicked, toggle the expasion of the nav item to either
   * reveal or hide those children nav items.
   */
  toggleExpansion(): void {
    if (!!this.children && !!this.children.length) {
      this.isExpanded = !this.isExpanded;
      this.generateLinkCssClasses();
      this.expansionToggled.emit(this.generateNavItemObject());
    }
  }

  /**
   * Generates the css classes to be appended to either the <a> or <button> tag.
   */
  generateLinkCssClasses(): void {
    const classes: string[] = ['f-navItem__link'];

    if (!!this.children && !!this.children.length) {
      classes.push('f-navItem__link--expandable');
    }

    if (this.isExpanded) {
      classes.push('f-navItem__link--expanded');
    }

    if (this.isDisabled) {
      classes.push('f-navItem__link--disabled');
    }

    this.linkCssClasses = classes;
  }

  /**
   * Generates the CSS classes to be appended to the icon <i> tag.
   */
  generateIconCssClasses(): void {
    const classes: string[] = ['f-navItem__icon'];

    if (!!this.icon) {
      if (this.icon.includes('mdi')) {
        classes.push('mdi');
      }

      classes.push(this.icon);
    }

    this.iconCssClasses = classes;
  }

  /**
   * Generates a nav item object for easy use with the two output event emitters.
   *
   * @returns The generated nav item object.
   */
  generateNavItemObject(): NavItem {
    return {
      id: this.id,
      title: this.title,
      text: this.text,
      icon: this.icon,
      isExpanded: this.isExpanded,
      isDisabled: this.isDisabled,
      href: this.href,
      route: this.route,
      children: this.children,
      index: this.index,
    };
  }

  /**
   * Emits an event to let the parent sidenav component know which nav item is the currently selected
   * nav item.
   *
   * @param item The selected nav item.
   */
  setCurrentSelectedNavItem(item?: NavItem): void {
    const currentItem: NavItem = item || this.generateNavItemObject();
    this.itemSelected.emit(currentItem);
  }

  /**
   * Generates a nav ID to be used for miscellaneous things.
   *
   * @returns the generated tab ID
   */
  generateNavItemId(): string {
    return `nav-item-${Math.random().toString(36).substr(2, 9)}`;
  }
}
