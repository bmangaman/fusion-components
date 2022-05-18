import { ComponentFixture } from '@angular/core/testing';

/**
 * SELECT PAGE OBJECT
 *
 * Page object for the fusion-ui-select component.
 * Makes it easier to find and select certain fusion-ui-select attributes and elements.
 */
export class SelectPageObject {
  private fixture: ComponentFixture<any>;
  private selectClass: string;

  /**
   * Gets the wrapping div container element.
   */
  get select(): HTMLDivElement {
    // first try to get the fusion-ui-select element by a provided class
    const selectClass: HTMLElement = this.selectClass ? this.fixture.nativeElement.querySelector(this.selectClass) : null;
    // if no provided class or element not found, try to find the fusion-ui-select element by the fusion-ui-select tag
    const fusionSelect: HTMLElement = selectClass || this.fixture.nativeElement.querySelector('fusion-ui-select');
    // if fusion-ui-select found, find the actual <select> element by the .fusion-ui-select class
    const select: HTMLDivElement = fusionSelect ? fusionSelect.querySelector('.fusion-ui-select') : null;

    return select;
  }

  /**
   * Gets the classes appended to the classes-wrapper div element.
   *
   * @returns The CSS classes appended ot the classes-wrapper div element.
   */
  get classes(): DOMTokenList {
    const select: HTMLDivElement = this.select;
    const buttonWrapper: HTMLDivElement = select ? select.querySelector('.fusion-ui-select__classes-wrapper') : null;
    return buttonWrapper ? buttonWrapper.classList : null;
  }

  /**
   * Gets the label for the input.
   *
   * @returns The label element for the input.
   */
  get label(): HTMLLabelElement {
    const select: HTMLDivElement = this.select;
    return select ? select.querySelector('.fusion-ui-select__label') : null;
  }

  /**
   * Gets the button used to toggle the visibility of the dropdown menu of options.
   *
   * @returns The button element used to toggle the dropdown menu.
   */
  get inputButton(): HTMLButtonElement {
    const select: HTMLDivElement = this.select;
    return select ? select.querySelector('.fusion-ui-select__button') : null;
  }

  /**
   * Gets the input used to toggle the visibility of the dropdown menu of options and to search those options.
   *
   * @returns The button element used to toggle the dropdown menu.
   */
  get inputSearch(): HTMLInputElement {
    const select: HTMLDivElement = this.select;
    return select ? select.querySelector('.fusion-ui-select__input') : null;
  }

  /**
   * Gets the dropdown menu of options.
   *
   * @returns The dropdown menu element of options.
   */
  get dropdownMenu(): HTMLUListElement {
    const select: HTMLDivElement = this.select;
    return select ? select.querySelector('.fusion-ui-select__dropdown-menu') : null;
  }

  /**
   * Gets the list of all the options in the dropdown menu.
   *
   * @returns The list of all the options in the dropdown menu.
   */
  get options(): NodeListOf<HTMLLIElement> {
    const dropdownMenu: HTMLUListElement = this.dropdownMenu;
    return dropdownMenu ? dropdownMenu.querySelectorAll('.fusion-ui-select__dropdown-menu-option') : null;
  }

  /**
   * Gets the option of the dropdown menu at the provided index.
   *
   * @param index The index of the desired option.
   * @returns The desured option at the provided index.
   */
  getOptionAtIndex(index: number): HTMLLIElement {
    const options: NodeListOf<HTMLLIElement> = this.options;
    return options && !!options.length ? options.item(index) : null;
  }

  /**
   * Creates a page object for a fusion-ui-select DOM element based on the provided fixture and optional selectClass.
   *
   * @param fixture The parent DOM fixture/ element that houses the fusion-ui-select.
   * @param selectClass Optional, providing a css class appended to a fusion-ui-select will help make sure the correct one is selected.
   */
  constructor(fixture: ComponentFixture<any>, selectClass?: string) {
    this.fixture = fixture;
    this.selectClass = selectClass;
  }
}
