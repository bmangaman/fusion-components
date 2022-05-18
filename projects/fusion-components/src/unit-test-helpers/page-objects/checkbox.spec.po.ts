import { ComponentFixture } from '@angular/core/testing';

/**
 * CHECKBOX PAGE OBJECT
 *
 * Page object for the fusion-ui-checkbox component.
 * Makes it easier to find and select certain fusion-ui-checkbox attributes and elements.
 */
export class CheckboxPageObject {
  private readonly baseClass: string = '.fusion-ui-form__checkbox';

  private fixture: ComponentFixture<any>;
  private checkboxClass: string;

  /**
   * Gets the wrapping div container element.
   */
  get checkbox(): HTMLElement {
    // first try to get the fusion-ui-checkbox element by a provided class
    const fusionCheckboxByClass: HTMLElement = this.checkboxClass ? this.fixture.nativeElement.querySelector(this.checkboxClass) : null;
    // if no provided class or element not found, try to find the fusion-ui-checkbox element by the fusion-ui-checkbox tag
    const fusionCheckbox: HTMLElement = fusionCheckboxByClass || this.fixture.nativeElement.querySelector('fusion-ui-checkbox');
    // if fusion-ui-checkbox found, find the actual <checkbox> element by the .fusion-ui-checkbox class
    const checkbox: HTMLElement = fusionCheckbox ? fusionCheckbox.querySelector(this.baseClass) : null;

    return checkbox;
  }

  /**
   * Gets the label for the input.
   *
   * @returns The label element for the input.
   */
  get label(): HTMLLabelElement {
    const checkbox: HTMLElement = this.checkbox;
    return checkbox ? checkbox.querySelector(`${this.baseClass}-label`) : null;
  }

  /**
   * Gets the label text container for the input.
   *
   * @returns The label element for the input.
   */
  get labelText(): HTMLSpanElement {
    const checkbox: HTMLElement = this.checkbox;
    return checkbox ? checkbox.querySelector(`${this.baseClass}-label-text`) : null;
  }

    /**
     * Gets the label for the input.
     *
     * @returns The label element for the input.
     */
  get input(): HTMLInputElement {
    const checkbox: HTMLElement = this.checkbox;
    return checkbox ? checkbox.querySelector(`${this.baseClass}-input`) : null;
  }

  /**
   * Creates a page object for a fusion-ui-checkbox DOM element based on the provided fixture and optional checkboxClass.
   *
   * @param fixture The parent DOM fixture/ element that houses the fusion-ui-checkbox.
   * @param checkboxClass Optional, providing a css class appended to a fusion-ui-checkbox will help make sure the correct one is selected.
   */
  constructor(fixture: ComponentFixture<any>, checkboxClass?: string) {
    this.fixture = fixture;
    this.checkboxClass = checkboxClass;
  }
}
