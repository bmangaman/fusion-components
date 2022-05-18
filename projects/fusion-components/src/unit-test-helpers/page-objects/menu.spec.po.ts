import { ComponentFixture } from '@angular/core/testing';

/**
 * MENU PAGE OBJECT
 *
 * Page object for the fusion-ui-menu component
 * Makes it easier to find and select certain fusion-ui-menu attributes and elements
 */
export class MenuPageObject {
  private fixture: ComponentFixture<any>;
  private containerClass: string;

  get menu(): HTMLElement {
    // first, if a containerClass was provided, try to find the element that has that class
    const container: HTMLElement = this.containerClass ? this.fixture.nativeElement.querySelector(this.containerClass) : null;
    // if the container element was found, use that to query for the fusion-ui-menu, otherwise, just use the fusion-ui-tabview tag
    const menu: HTMLElement = (this.containerClass && container ? container : this.fixture.nativeElement).querySelector('fusion-ui-menu');

    return menu;
  }

  get menuButtonContainer(): HTMLElement {
    return this.menu ? this.menu.querySelector('.fusion-ui-menu__button') : null;
  }

  get menuButton(): HTMLButtonElement {
    return this.menuButtonContainer ? this.menuButtonContainer.querySelector('button') : null;
  }

  get menuDialog(): HTMLElement {
    return this.menu ? this.menu.querySelector('.fusion-ui-menu__dialog') : null;
  }

  get menuDialogHeader(): HTMLElement {
    return this.menuDialog ? this.menu.querySelector('.fusion-ui-menu__dialog--header') : null;
  }

  get menuDialogHeaderCloseButton(): HTMLButtonElement {
    return this.menuDialogHeader ? this.menu.querySelector('.fusion-ui-menu__dialog--close-button') : null;
  }

  get menuDialogContent(): HTMLElement {
    return this.menuDialog ? this.menu.querySelector('.fusion-ui-menu__dialog--content') : null;
  }

  /**
   * Creates a page object for a fusion-ui-button DOM element based on the provided fixture and optional buttonClass
   *
   * @param fixture the parent DOM fixture/ element that houses the fusion-ui-button
   * @param containerClass optional, providing a css class of a parent element of the fusion-ui-menu
   * will help make sure the correct one is selected
   **/
  constructor(fixture: ComponentFixture<any>, containerClass?: string) {
    this.fixture = fixture;
    this.containerClass = containerClass;
  }
}
