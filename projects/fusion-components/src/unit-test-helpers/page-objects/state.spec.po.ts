import { ComponentFixture } from '@angular/core/testing';

/**
 * STATE PAGE OBJECT
 *
 * Page object for the f-state component.
 * Makes it easier to find and select certain f-state attributes and elements.
 */
export class StatePageObject {
  private fixture: ComponentFixture<any>;
  private containerClass: string;

  get state(): HTMLElement {
    // first, if a containerClass was provided, try to find the element that has that class
    const container: HTMLElement = this.containerClass ? this.fixture.nativeElement.querySelector(this.containerClass) : null;
    // if the container element was found, use that to query for the f-state,
    // otherwise, just use the f-state tag
    const state: HTMLElement =
      (this.containerClass && container ? container : this.fixture.nativeElement).querySelector('f-state');

    return state;
  }

  /**
   * Gets the top-level wrapping container div element.
   *
   * @returns The werapping div element.
   */
  get container(): HTMLElement {
    const state: HTMLElement = this.state;
    return state ? state.querySelector('.f-state') : null;
  }

  /**
   * Gets the inner wrapper div. element
   *
   * @returns The inner wrapper div element.
   */
  get inner(): HTMLElement {
    const container: HTMLElement = this.container;
    return container ? container.querySelector('.f-state__inner') : null;
  }

  /**
   * Gets graphic icon element.
   *
   * @returns The graphic icon element.
   */
  get graphic(): HTMLElement {
    const container: HTMLElement = this.container;
    return container ? container.querySelector('.f-state__inner-graphic') : null;
  }

  /**
   * Gets the content div element.
   *
   * @returns The content div element.
   */
  get content(): HTMLElement {
    const container: HTMLElement = this.container;
    return container ? container.querySelector('.f-state__inner-content') : null;
  }

  /**
   * Gets the headline h3 element.
   *
   * @returns The headline h3 element.
   */
  get headline(): HTMLElement {
    const content: HTMLElement = this.content;
    return content ? content.querySelector('.f-state__inner-content-headline') : null;
  }

  /**
   * Gets the message div element.
   *
   * @returns The message div element.
   */
  get message(): HTMLElement {
    const content: HTMLElement = this.content;
    return content ? content.querySelector('.f-state__inner-content-message') : null;
  }

  /**
   * Gets the loading spinner (component) element.
   *
   * @returns The loading spinner (component) element.
   */
  get loadingSpinner(): HTMLElement {
    const container: HTMLElement = this.container;
    return container ? container.querySelector('f-loading-spinner') : null;
  }

  /**
   * Creates a page object for a f-state DOM element based on the provided fixture and optional containerClass.
   *
   * @param fixture The parent DOM fixture/ element that houses the f-state.
   * @param containerClass Optional, providing a css class of a parent element of the f-state
   * will help make sure the correct one is selected.
   */
  constructor(fixture: ComponentFixture<any>, containerClass?: string) {
    this.fixture = fixture;
    this.containerClass = containerClass;
  }
}
