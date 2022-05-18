import { ComponentFixture } from '@angular/core/testing';

/**
 * WIZARD PAGE OBJECT
 *
 * Page object for the fusion-ui-wizard component.
 * Makes it easier to find and select certain fusion-ui-wizard attributes and elements.
 */
export class WizardPageObject {
  private fixture: ComponentFixture<any>;
  private wizardClass: string;

  get wizard(): HTMLDivElement {
    // first try to get the fusion-ui-wizard element by a provided class
    const wizardClass: HTMLElement = this.wizardClass ? this.fixture.nativeElement.querySelector(this.wizardClass) : null;
    // if no provided class or element not found, try to find the fusion-ui-wizard element by the fusion-ui-wizard tag
    const fusionWizard: HTMLElement = wizardClass || this.fixture.nativeElement.querySelector('fusion-ui-wizard');
    // if fusion-ui-wizard found, find the actual <wizard> element by the .fusion-ui-wizard class
    const wizard: HTMLDivElement = fusionWizard ? fusionWizard.querySelector('.fusion-ui-wizard') : null;

    return wizard;
  }

  /**
   * Gets the step navigation section of the wizard.
   *
   * @returns The step navigation section of the wizard.
   */
  get stepNavigation(): HTMLDivElement {
    const wizard: HTMLDivElement = this.wizard;
    return wizard ? wizard.querySelector('.fusion-ui-wizard__step-navigation') : null;
  }

  /**
   * Gets the brand image of the wizard.
   *
   * @returns The branch image of the wizard.
   */
  get brandImage(): HTMLDivElement {
    const stepNavigation: HTMLDivElement = this.stepNavigation;
    return stepNavigation ? stepNavigation.querySelector('.fusion-ui-wizard__brand-image') : null;
  }

  /**
   * Gets the step buttons used to navgate through the wizard.
   *
   * @returns The array of step buttons used to navigate through the wizard.
   */
  get stepNavigationButtons(): NodeListOf<HTMLButtonElement> {
    const stepNavigation: HTMLDivElement = this.stepNavigation;
    return stepNavigation ? stepNavigation.querySelectorAll('.fusion-ui-wizard__step-navigation-button') : null;
  }

  /**
   * Gets inner content of the wizard.
   *
   * @returns The inner content of the wizard.
   */
  get stepContent(): HTMLDivElement {
    const wizard: HTMLDivElement = this.wizard;
    return wizard ? wizard.querySelector('.fusion-ui-wizard__step-content') : null;
  }

  /**
   * Creates a page object for a fusion-ui-wizard DOM element based on the provided fixture and optional wizardClass.
   *
   * @param fixture The parent DOM fixture/ element that houses the fusion-ui-wizard.
   * @param wizardClass Pptional, providing a css class appended to a fusion-ui-wizard will help make sure the correct one is selected.
   */
  constructor(fixture: ComponentFixture<any>, wizardClass?: string) {
    this.fixture = fixture;
    this.wizardClass = wizardClass;
  }
}
