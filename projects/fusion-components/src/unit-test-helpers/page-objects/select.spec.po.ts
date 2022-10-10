import { ComponentFixture } from '@angular/core/testing';

/**
 * SELECT PAGE OBJECT
 *
 * Page object for the f-select component.
 * Makes it easier to find and select certain f-select attributes and elements.
 */
export class SelectPageObject {
  private fixture: ComponentFixture<any>;
  private selectClass: string | undefined;

  /**
   * Gets the wrapping div container element.
   */
  get select(): HTMLDivElement | null {
    // first try to get the f-select element by a provided class
    const selectClass: HTMLElement = this.selectClass ? this.fixture.nativeElement.querySelector(this.selectClass) : null;
    // if no provided class or element not found, try to find the f-select element by the f-select tag
    const fusionSelect: HTMLElement = selectClass || this.fixture.nativeElement.querySelector('f-select');
    // if f-select found, find the actual <select> element by the .f-select class
    const select: HTMLDivElement | null = fusionSelect ? fusionSelect.querySelector('.f-select') : null;

    return select;
  }

  /**
   * Gets the classes appended to the classes-wrapper div element.
   *
   * @returns The CSS classes appended ot the classes-wrapper div element.
   */
  get classes(): DOMTokenList | null {
    const select: HTMLDivElement | null = this.select;
    const buttonWrapper: HTMLDivElement | null = select ? select.querySelector('.f-select__classes-wrapper') : null;
    return buttonWrapper ? buttonWrapper.classList : null;
  }

  /**
   * Gets the label for the input.
   *
   * @returns The label element for the input.
   */
  get label(): HTMLLabelElement | null {
    const select: HTMLDivElement | null = this.select;
    return select ? select.querySelector('.f-select__label') : null;
  }

  /**
   * Gets the button used to toggle the visibility of the dropdown menu of options.
   *
   * @returns The button element used to toggle the dropdown menu.
   */
  get inputButton(): HTMLButtonElement | null {
    const select: HTMLDivElement | null = this.select;
    return select ? select.querySelector('.f-select__button') : null;
  }

  /**
   * Gets the input used to toggle the visibility of the dropdown menu of options and to search those options.
   *
   * @returns The button element used to toggle the dropdown menu.
   */
  get inputSearch(): HTMLInputElement | null {
    const select: HTMLDivElement | null = this.select;
    return select ? select.querySelector('.f-select__input') : null;
  }

  /**
   * Gets the dropdown menu of options.
   *
   * @returns The dropdown menu element of options.
   */
  get dropdownMenu(): HTMLUListElement | null {
    const select: HTMLDivElement | null = this.select;
    return select ? select.querySelector('.f-select__dropdown-menu') : null;
  }

  /**
   * Gets the list of all the options in the dropdown menu.
   *
   * @returns The list of all the options in the dropdown menu.
   */
  get options(): NodeListOf<HTMLLIElement> | null {
    const dropdownMenu: HTMLUListElement | null = this.dropdownMenu;
    return dropdownMenu ? dropdownMenu.querySelectorAll('.f-select__dropdown-menu-option') : null;
  }

  /**
   * Gets the option of the dropdown menu at the provided index.
   *
   * @param index The index of the desired option.
   * @returns The desured option at the provided index.
   */
  getOptionAtIndex(index: number): HTMLLIElement | null {
    const options: NodeListOf<HTMLLIElement> | null = this.options;
    return options && !!options.length ? options.item(index) : null;
  }

  /**
   * Creates a page object for a f-select DOM element based on the provided fixture and optional selectClass.
   *
   * @param fixture The parent DOM fixture/ element that houses the f-select.
   * @param selectClass Optional, providing a css class appended to a f-select will help make sure the correct one is selected.
   */
  constructor(fixture: ComponentFixture<any>, selectClass?: string) {
    this.fixture = fixture;
    this.selectClass = selectClass;
  }
}
