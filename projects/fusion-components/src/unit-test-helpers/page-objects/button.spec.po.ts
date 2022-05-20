import { ComponentFixture } from '@angular/core/testing';

/**
 * BUTTON PAGE OBJECT
 *
 * Page object for the f-button component
 * Makes it easier to find and select certain f-button attributes and elements
 */
export class ButtonPageObject {
  private fixture: ComponentFixture<any>;
  private buttonClass: string;

  get button(): HTMLButtonElement {
    // first try to get the f-button element by a provided class
    const buttonClass: HTMLElement = this.buttonClass ? this.fixture.nativeElement.querySelector(this.buttonClass) : null;
    // if no provided class or element not found, try to find the f-button element by the f-button tag
    const fusionButton: HTMLElement = buttonClass || this.fixture.nativeElement.querySelector('f-button');
    // if f-button found, find the actual <button> element by the .f-button class
    const button: HTMLButtonElement = fusionButton ? fusionButton.querySelector('.f-button') : null;

    return button;
  }

  get classes(): DOMTokenList {
    const button: HTMLButtonElement = this.button;
    return button ? button.classList : null;
  }

  get textContainer(): HTMLElement {
    const button: HTMLButtonElement = this.button;
    return button ? button.querySelector('.f-button__text') : null;
  }

  get text(): string {
    const textContainer: HTMLElement = this.textContainer;
    return textContainer ? textContainer.textContent : null;
  }

  get icon(): HTMLElement {
    const button: HTMLButtonElement = this.button;
    return button ? button.querySelector('.f-button__icon:not(.mdi-chevron-down)') : null;
  }

  get opensMenuIcon(): HTMLElement {
    const button: HTMLButtonElement = this.button;
    return button ? button.querySelector('.f-button__icon.mdi-chevron-down') : null;
  }

  get loadingSpinner(): HTMLElement {
    const button: HTMLButtonElement = this.button;
    return button ? button.querySelector('f-loading-spinner') : null;
  }

  /**
   * Creates a page object for a f-button DOM element based on the provided fixture and optional buttonClass
   *
   * @param fixture the parent DOM fixture/ element that houses the f-button
   * @param buttonClass optional, providing a css class appended to a f-button will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, buttonClass?: string) {
    this.fixture = fixture;
    this.buttonClass = buttonClass;
  }
}
