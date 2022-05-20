import { ComponentFixture } from '@angular/core/testing';

/**
 * ACCORDION PAGE OBJECT
 *
 * Page object for the f-accordion component.
 * Makes it easier to find and select certain f-accordion attributes and elements.
 */
export class AccordionPageObject {
  private fixture: ComponentFixture<any>;
  private containerClass: string;

  /**
   * Gets the "f-accordion" element.
   *
   * @returns the "f-accordion" element
   */
  get accordion(): HTMLElement {
    // first, if a containerClass was provided, try to find the element that has that class
    const container: HTMLElement = this.containerClass ? this.fixture.nativeElement.querySelector(this.containerClass) : null;
    // if the container element was found, use that to query for the f-accordion,
    // otherwise, just use the f-accordion tag
    const accordion: HTMLElement =
      (this.containerClass && container ? container : this.fixture.nativeElement).querySelector('f-accordion');

    return accordion;
  }

  /**
   * Gets the outermost container div element.
   *
   * @returns the outermost container div element
   */
  get container(): HTMLElement {
    const accordion: HTMLElement = this.accordion;
    return accordion ? accordion.querySelector('.f-accordion') : null;
  }

  /**
   * Gets all of the panels within the accordion.
   *
   * @returns all fo the panels within the accordion
   */
  get panels(): NodeListOf<HTMLElement> {
    const accordion: HTMLElement = this.accordion;
    return accordion ? accordion.querySelectorAll('.f-accordion-panel') : null;
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
    return panel ? panel.querySelector('.f-accordion-panel__title') : null;
  }

  /**
   * Gets the content element of the panel at the provided index.
   *
   * @param index the index of the panel
   * @returns the content element of the panel at the provided index
   */
  getContentOfPanelAtIndex(index: number): HTMLButtonElement {
    const panel: HTMLElement = this.getPanelAtIndex(index);
    return panel ? panel.querySelector('.f-accordion-panel__content-container') : null;
  }

  /**
   * Creates a page object for a f-accordion DOM element based on the provided fixture and optional containerClass.
   *
   * @param fixture the parent DOM fixture/ element that houses the f-accordion
   * @param containerClass optional, providing a css class of a parent element of the f-accordion
   * will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, containerClass?: string) {
    this.fixture = fixture;
    this.containerClass = containerClass;
  }
}
