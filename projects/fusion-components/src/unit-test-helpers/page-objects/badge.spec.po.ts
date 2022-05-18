import { ComponentFixture } from '@angular/core/testing';

/**
 * BADGE PAGE OBJECT
 *
 * Page object for the fusion-ui-badge component.
 * Makes it easier to find and select certain fusion-ui-badge attributes and elements.
 */
export class BadgePageObject {
  private fixture: ComponentFixture<any>;
  private badgeClass: string;

  /**
   * Gets the host fusion-ui-badge (component) HTML element based on whether or not a
   * badgeClass was provided.
   *
   * @returns The host fusion-ui-badge (component) HTML element.
   */
  get host(): HTMLElement {
    // first try to get the fusion-ui-badge element by a provided class
    const badgeClass: HTMLElement = this.badgeClass ? this.fixture.nativeElement.querySelector(this.badgeClass) : null;
    // if no provided class or element not found, try to find the fusion-ui-badge element by the fusion-ui-badge tag
    return badgeClass || this.fixture.nativeElement.querySelector('fusion-ui-badge');
  }

  /**
   * Gets the inner .fusion-ui-badge HTML element based on the host.
   *
   * @returns The inner .fusion-ui-badge HTML.
   */
  get badge(): HTMLElement {
    const host = this.host;
    return host ? host.querySelector('.fusion-ui-badge') : null;
  }

  /**
   * Gets the badge text.
   *
   * @returns The badge text.
   */
  get badgeText(): string {
    const badge: HTMLElement = this.badge;
    const textContainer: HTMLElement = badge ? badge.querySelector('.fusion-ui-badge__text') : null;
    return textContainer ? textContainer.innerText : null;
  }

  /**
   * Gets the badge subtext.
   *
   * @returns The badge subtext.
   */
  get badgeSubtext(): string {
    const badge: HTMLElement = this.badge;
    const subtextContainer: HTMLElement = badge ? badge.querySelector('.fusion-ui-badge__subtext') : null;
    return subtextContainer ? subtextContainer.innerText : null;
  }

  /**
   * Creates a page object for a fusion-ui-badge DOM element based on the provided fixture and optional badgeClass
   *
   * @param fixture the parent DOM fixture/ element that houses the fusion-ui-badge
   * @param badgeClass optional, providing a css class appended to a fusion-ui-badge will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, badgeClass?: string) {
    this.fixture = fixture;
    this.badgeClass = badgeClass;
  }
}
