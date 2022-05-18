import { ComponentFixture } from '@angular/core/testing';
import { TooltipPageObject } from './tooltip.spec.po';

/**
 * LINEAR GAUGE PAGE OBJECT
 *
 * Page object for the fusion-ui-linear-gauge component.
 * Makes it easier to find and select certain fusion-ui-linear-gauge attributes and elements.
 */
export class LinearGaugePageObject {
  private readonly _baseCssClass: string = '.fusion-ui-linear-gauge';

  private fixture: ComponentFixture<any>;
  private containerClass: string;

  get linearGauge(): HTMLElement {
    // first, if a containerClass was provided, try to find the element that has that class
    const container: HTMLElement = this.containerClass ? this.fixture.nativeElement.querySelector(this.containerClass) : null;
    // if the container element was found, use that to query for the fusion-ui-linear-gauge,
    // otherwise, just use the fusion-ui-linear-gauge tag
    const gauge: HTMLElement =
      (this.containerClass && container ? container : this.fixture.nativeElement).querySelector('fusion-ui-linear-gauge');

    return gauge;
  }

  /**
   * Gets the top-level wrapping container div element.
   *
   * @returns The werapping div element.
   */
  get container(): HTMLElement {
    const state: HTMLElement = this.linearGauge;
    return state ? state.querySelector(this._baseCssClass) : null;
  }

  /**
   * Gets the title div that houses the status icon and text.
   *
   * @returns The title div.
   */
  get title(): HTMLElement {
    const container: HTMLElement = this.container;
    return container ? container.querySelector(`${this._baseCssClass}__title`) : null;
  }

  /**
   * Gets the title icon.
   *
   * @returns The title icon.
   */
  get titleIcon(): HTMLElement {
    const title: HTMLElement = this.title;
    return title ? title.querySelector(`${this._baseCssClass}__title-icon`) : null;
  }

  /**
   * Gets the title text.
   *
   * @returns The title icon.
   */
  get titleText(): HTMLElement {
    const title: HTMLElement = this.title;
    return title ? title.querySelector(`${this._baseCssClass}__title-text`) : null;
  }

  /**
   * Gets the total text.
   *
   * @returns The total text.
   */
  get total(): string {
    const container: HTMLElement = this.container;
    const totalContainer: HTMLElement = container ? container.querySelector(`${this._baseCssClass}__total`) : null;
    return totalContainer ? totalContainer.innerText : null;
  }

  /**
   * Gets the percentage text.
   *
   * @returns The percentage text.
   */
  get percentage(): string {
    const container: HTMLElement = this.container;
    const percentageContainer: HTMLElement = container ? container.querySelector(`${this._baseCssClass}__percentage`) : null;
    return percentageContainer ? percentageContainer.innerText : null;
  }

  /**
   * Gets the value bar.
   *
   * @returns The value bar.
   */
  get valueBar(): HTMLElement {
    const container: HTMLElement = this.container;
    return container ? container.querySelector(`${this._baseCssClass}__value-bar`) : null;
  }

  /**
   * Gets the list of all the thresholds.
   *
   * @returns The list of thresholds.
   */
  get thresholds(): NodeListOf<HTMLButtonElement> {
    const container: HTMLElement = this.container;
    return container ? container.querySelectorAll(`${this._baseCssClass}__threshold`) : null;
  }

  /**
   * Gets the tooltip of a threshold (that appears when hovered over).
   *
   * @returns The tooltip of a threshold.
   */
  get thresholdTootip(): TooltipPageObject {
    return new TooltipPageObject(this.fixture, `${this._baseCssClass}__treshold-tooltip`);
  }

  /**
   * Creates a page object for a fusion-ui-linear-gauge DOM element based on the provided fixture and optional containerClass.
   *
   * @param fixture The parent DOM fixture/ element that houses the fusion-ui-linear-gauge.
   * @param containerClass Optional, providing a css class of a parent element of the fusion-ui-linear-gauge
   * will help make sure the correct one is selected.
   */
  constructor(fixture: ComponentFixture<any>, containerClass?: string) {
    this.fixture = fixture;
    this.containerClass = containerClass;
  }
}
