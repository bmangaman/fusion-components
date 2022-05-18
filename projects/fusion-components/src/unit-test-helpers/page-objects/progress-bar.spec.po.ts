import { ComponentFixture } from '@angular/core/testing';

/**
 * PROGRESS BAR PAGE OBJECT
 *
 * Page object for the fusion-ui-progress-bar component.
 * Makes it easier to find and select certain fusion-ui-progress-bar attributes and elements.
 */
export class ProgressBarPageObject {
  private fixture: ComponentFixture<any>;
  private containerClass: string;

  get progressBar(): HTMLElement {
    // first, if a containerClass was provided, try to find the element that has that class
    const container: HTMLElement = this.containerClass ? this.fixture.nativeElement.querySelector(this.containerClass) : null;
    // if the container element was found, use that to query for the fusion-ui-progress-bar,
    // otherwise, just use the fusion-ui-progress-bar tag
    const progressBar: HTMLElement =
      (this.containerClass && container ? container : this.fixture.nativeElement).querySelector('fusion-ui-progress-bar');

    return progressBar;
  }

  get container(): HTMLElement {
    const progressBar: HTMLElement = this.progressBar;
    return progressBar ? progressBar.querySelector('.fusion-ui-progress-bar') : null;
  }

  get barClasses(): DOMTokenList {
    const progressBar: HTMLElement = this.progressBar;
    const bar: HTMLElement = progressBar ? progressBar.querySelector('.fusion-ui-progress-bar__bar') : null;
    return bar ? bar.classList : null;
  }

  get barValue(): string {
    const progressBar: HTMLElement = this.progressBar;
    const bar: HTMLElement = progressBar ? progressBar.querySelector('.fusion-ui-progress-bar__value') : null;
    return bar ? bar.innerText : null;
  }

  /**
   * Creates a page object for a fusion-ui-progress-bar DOM element based on the provided fixture and optional containerClass.
   *
   * @param fixture the parent DOM fixture/ element that houses the fusion-ui-progress-bar
   * @param containerClass optional, providing a css class of a parent element of the fusion-ui-progress-bar
   * will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, containerClass?: string) {
    this.fixture = fixture;
    this.containerClass = containerClass;
  }
}
