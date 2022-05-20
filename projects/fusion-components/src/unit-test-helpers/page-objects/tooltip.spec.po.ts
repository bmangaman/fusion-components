import { ComponentFixture } from '@angular/core/testing';
import { PositionConfig } from '@fusion-components/lib/shared';

/**
 * TOOLTIP PAGE OBJECT
 *
 * Page object for the f-tooltip component.
 * Makes it easier to find and select certain f-tooltip attributes and elements.
 */
export class TooltipPageObject {
  private fixture: ComponentFixture<any>;
  private tooltipClass: string;

  /**
   * Gets the base tooltip DOM element.
   *
   * @returns The base tooltip DOM element.
   */
  get tooltip(): HTMLElement {
    // first try to get the f-button element by a provided class
    const tooltipClass: HTMLElement = this.tooltipClass ? this.fixture.nativeElement.querySelector(this.tooltipClass) : null;
    // if no provided class or element not found, try to find the f-tooltip element by the f-tooltip tag
    return  tooltipClass || this.fixture.nativeElement.querySelector('f-tooltip');
  }

  /**
   * Gets the CSS classes on the tooltip.
   *
   * @returns The CSS classes of the tooltip.
   */
  get classes(): DOMTokenList {
    const tooltip: HTMLElement = this.tooltip;
    return tooltip ? tooltip.classList : null;
  }

  /**
   * Gets the inner content of the tooltip.
   *
   * @returns The innter content of the tooltip.
   */
  get contentContainer(): HTMLElement {
    const button: HTMLElement = this.tooltip;
    return button ? button.querySelector('.f-tooltip__content') : null;
  }

  /**
   * Gets the text of the tooltip.
   *
   * @returns The tooltip text.
   */
  get text(): string {
    const contentContainer: HTMLElement = this.contentContainer;
    return contentContainer ? contentContainer.textContent : null;
  }

  /**
   * Gets the left, right, top, bottom, and transform styling attributes of the tooltip.
   *
   * @returns The position-related attributes of the tooltip.
   */
  get position(): PositionConfig {
    const tooltip: HTMLElement = this.tooltip;

    if (tooltip) {
      return {
        left: tooltip.style.left,
        right: tooltip.style.right,
        top: tooltip.style.top,
        bottom: tooltip.style.right,
        transform: tooltip.style.transform,
      };
    }

    return {};
  }

  /**
   * Creates a page object for a f-tooltip DOM element based on the provided fixture and optional tooltipClass
   *
   * @param fixture the parent DOM fixture/ element that houses the f-tooltip
   * @param tooltipClass optional, providing a css class appended to a f-tooltip will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, tooltipClass?: string) {
    this.fixture = fixture;
    this.tooltipClass = tooltipClass;
  }
}
