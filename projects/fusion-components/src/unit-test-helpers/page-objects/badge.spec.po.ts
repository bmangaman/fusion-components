import { ComponentFixture } from '@angular/core/testing';

/**
 * BADGE PAGE OBJECT
 *
 * Page object for the f-badge component.
 * Makes it easier to find and select certain f-badge attributes and elements.
 */
export class BadgePageObject {
  private fixture: ComponentFixture<any>;
  private badgeClass: string;

  /**
   * Gets the host f-badge (component) HTML element based on whether or not a
   * badgeClass was provided.
   *
   * @returns The host f-badge (component) HTML element.
   */
  get host(): HTMLElement {
    // first try to get the f-badge element by a provided class
    const badgeClass: HTMLElement = this.badgeClass ? this.fixture.nativeElement.querySelector(this.badgeClass) : null;
    // if no provided class or element not found, try to find the f-badge element by the f-badge tag
    return badgeClass || this.fixture.nativeElement.querySelector('f-badge');
  }

  /**
   * Gets the inner .f-badge HTML element based on the host.
   *
   * @returns The inner .f-badge HTML.
   */
  get badge(): HTMLElement {
    const host = this.host;
    return host ? host.querySelector('.f-badge') : null;
  }

  /**
   * Gets the badge text.
   *
   * @returns The badge text.
   */
  get badgeText(): string {
    const badge: HTMLElement = this.badge;
    const textContainer: HTMLElement = badge ? badge.querySelector('.f-badge__text') : null;
    return textContainer ? textContainer.innerText : null;
  }

  /**
   * Gets the badge subtext.
   *
   * @returns The badge subtext.
   */
  get badgeSubtext(): string {
    const badge: HTMLElement = this.badge;
    const subtextContainer: HTMLElement = badge ? badge.querySelector('.f-badge__subtext') : null;
    return subtextContainer ? subtextContainer.innerText : null;
  }

  /**
   * Creates a page object for a f-badge DOM element based on the provided fixture and optional badgeClass
   *
   * @param fixture the parent DOM fixture/ element that houses the f-badge
   * @param badgeClass optional, providing a css class appended to a f-badge will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, badgeClass?: string) {
    this.fixture = fixture;
    this.badgeClass = badgeClass;
  }
}
