import { ComponentFixture } from '@angular/core/testing';

/**
 * ACCORDION PAGE OBJECT
 *
 * Page object for the fusion-ui-accordion component.
 * Makes it easier to find and select certain fusion-ui-accordion attributes and elements.
 */
export class AccordionPageObject {
  private fixture: ComponentFixture<any>;
  private containerClass: string;

  /**
   * Gets the "fusion-ui-accordion" element.
   *
   * @returns the "fusion-ui-accordion" element
   */
  get accordion(): HTMLElement {
    // first, if a containerClass was provided, try to find the element that has that class
    const container: HTMLElement = this.containerClass ? this.fixture.nativeElement.querySelector(this.containerClass) : null;
    // if the container element was found, use that to query for the fusion-ui-accordion,
    // otherwise, just use the fusion-ui-accordion tag
    const accordion: HTMLElement =
      (this.containerClass && container ? container : this.fixture.nativeElement).querySelector('fusion-ui-accordion');

    return accordion;
  }

  /**
   * Gets the outermost container div element.
   *
   * @returns the outermost container div element
   */
  get container(): HTMLElement {
    const accordion: HTMLElement = this.accordion;
    return accordion ? accordion.querySelector('.fusion-ui-accordion') : null;
  }

  /**
   * Gets all of the panels within the accordion.
   *
   * @returns all fo the panels within the accordion
   */
  get panels(): NodeListOf<HTMLElement> {
    const accordion: HTMLElement = this.accordion;
    return accordion ? accordion.querySelectorAll('.fusion-ui-accordion-panel') : null;
  }

  /**
   * Gets the panel at the provied index.
   *
   * @param index the index of the panel
   * @returns the panel at the provided index
   */
  getPanelAtIndex(index: number): HTMLElement {
    const panels: NodeListOf<HTMLElement> = this.panels;
    return panels ? panels.item(index) : null;
  }

  /**
   * Gets the title button element of the panel at the provied index.
   *
   * @param index the index of the panel
   * @returns the title button element of the panel at the provided index
   */
  getTitleOfPanelAtIndex(index: number): HTMLButtonElement {
    const panel: HTMLElement = this.getPanelAtIndex(index);
    return panel ? panel.querySelector('.fusion-ui-accordion-panel__title') : null;
  }

  /**
   * Gets the content element of the panel at the provided index.
   *
   * @param index the index of the panel
   * @returns the content element of the panel at the provided index
   */
  getContentOfPanelAtIndex(index: number): HTMLButtonElement {
    const panel: HTMLElement = this.getPanelAtIndex(index);
    return panel ? panel.querySelector('.fusion-ui-accordion-panel__content-container') : null;
  }

  /**
   * Creates a page object for a fusion-ui-accordion DOM element based on the provided fixture and optional containerClass.
   *
   * @param fixture the parent DOM fixture/ element that houses the fusion-ui-accordion
   * @param containerClass optional, providing a css class of a parent element of the fusion-ui-accordion
   * will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, containerClass?: string) {
    this.fixture = fixture;
    this.containerClass = containerClass;
  }
}
