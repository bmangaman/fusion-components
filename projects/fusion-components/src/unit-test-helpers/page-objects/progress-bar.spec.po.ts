import { ComponentFixture } from '@angular/core/testing';

/**
 * PROGRESS BAR PAGE OBJECT
 *
 * Page object for the f-progress-bar component.
 * Makes it easier to find and select certain f-progress-bar attributes and elements.
 */
export class ProgressBarPageObject {
  private fixture: ComponentFixture<any>;
  private containerClass: string | undefined;

  get progressBar(): HTMLElement {
    // first, if a containerClass was provided, try to find the element that has that class
    const container: HTMLElement = this.containerClass ? this.fixture.nativeElement.querySelector(this.containerClass) : null;
    // if the container element was found, use that to query for the f-progress-bar,
    // otherwise, just use the f-progress-bar tag
    const progressBar: HTMLElement =
      (this.containerClass && container ? container : this.fixture.nativeElement).querySelector('f-progress-bar');

    return progressBar;
  }

  get container(): HTMLElement | null {
    const progressBar: HTMLElement = this.progressBar;
    return progressBar ? progressBar.querySelector('.f-progress-bar') : null;
  }

  get barClasses(): DOMTokenList | null {
    const progressBar: HTMLElement = this.progressBar;
    const bar: HTMLElement | null = progressBar ? progressBar.querySelector('.f-progress-bar__bar') : null;
    return bar ? bar.classList : null;
  }

  get barValue(): string | null {
    const progressBar: HTMLElement = this.progressBar;
    const bar: HTMLElement | null = progressBar ? progressBar.querySelector('.f-progress-bar__value') : null;
    return bar ? bar.innerText : null;
  }

  /**
   * Creates a page object for a f-progress-bar DOM element based on the provided fixture and optional containerClass.
   *
   * @param fixture the parent DOM fixture/ element that houses the f-progress-bar
   * @param containerClass optional, providing a css class of a parent element of the f-progress-bar
   * will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, containerClass?: string) {
    this.fixture = fixture;
    this.containerClass = containerClass;
  }
}
