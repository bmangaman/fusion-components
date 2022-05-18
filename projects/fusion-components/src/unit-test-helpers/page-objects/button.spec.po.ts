import { ComponentFixture } from '@angular/core/testing';

/**
 * BUTTON PAGE OBJECT
 *
 * Page object for the fusion-ui-button component
 * Makes it easier to find and select certain fusion-ui-button attributes and elements
 */
export class ButtonPageObject {
  private fixture: ComponentFixture<any>;
  private buttonClass: string;

  get button(): HTMLButtonElement {
    // first try to get the fusion-ui-button element by a provided class
    const buttonClass: HTMLElement = this.buttonClass ? this.fixture.nativeElement.querySelector(this.buttonClass) : null;
    // if no provided class or element not found, try to find the fusion-ui-button element by the fusion-ui-button tag
    const fusionButton: HTMLElement = buttonClass || this.fixture.nativeElement.querySelector('fusion-ui-button');
    // if fusion-ui-button found, find the actual <button> element by the .fusion-ui-button class
    const button: HTMLButtonElement = fusionButton ? fusionButton.querySelector('.fusion-ui-button') : null;

    return button;
  }

  get classes(): DOMTokenList {
    const button: HTMLButtonElement = this.button;
    return button ? button.classList : null;
  }

  get textContainer(): HTMLElement {
    const button: HTMLButtonElement = this.button;
    return button ? button.querySelector('.fusion-ui-button__text') : null;
  }

  get text(): string {
    const textContainer: HTMLElement = this.textContainer;
    return textContainer ? textContainer.textContent : null;
  }

  get icon(): HTMLElement {
    const button: HTMLButtonElement = this.button;
    return button ? button.querySelector('.fusion-ui-button__icon:not(.mdi-chevron-down)') : null;
  }

  get opensMenuIcon(): HTMLElement {
    const button: HTMLButtonElement = this.button;
    return button ? button.querySelector('.fusion-ui-button__icon.mdi-chevron-down') : null;
  }

  get loadingSpinner(): HTMLElement {
    const button: HTMLButtonElement = this.button;
    return button ? button.querySelector('fusion-ui-loading-spinner') : null;
  }

  /**
   * Creates a page object for a fusion-ui-button DOM element based on the provided fixture and optional buttonClass
   *
   * @param fixture the parent DOM fixture/ element that houses the fusion-ui-button
   * @param buttonClass optional, providing a css class appended to a fusion-ui-button will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, buttonClass?: string) {
    this.fixture = fixture;
    this.buttonClass = buttonClass;
  }
}
