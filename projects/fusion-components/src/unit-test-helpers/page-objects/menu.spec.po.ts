import { ComponentFixture } from '@angular/core/testing';

/**
 * MENU PAGE OBJECT
 *
 * Page object for the f-menu component
 * Makes it easier to find and select certain f-menu attributes and elements
 */
export class MenuPageObject {
  private fixture: ComponentFixture<any>;
  private containerClass: string | undefined;

  get menu(): HTMLElement {
    // first, if a containerClass was provided, try to find the element that has that class
    const container: HTMLElement = this.containerClass ? this.fixture.nativeElement.querySelector(this.containerClass) : null;
    // if the container element was found, use that to query for the f-menu, otherwise, just use the f-tabview tag
    const menu: HTMLElement = (this.containerClass && container ? container : this.fixture.nativeElement).querySelector('f-menu');

    return menu;
  }

  get menuButtonContainer(): HTMLElement | null {
    return this.menu ? this.menu.querySelector('.f-menu__button') : null;
  }

  get menuButton(): HTMLButtonElement | null {
    return this.menuButtonContainer ? this.menuButtonContainer.querySelector('button') : null;
  }

  get menuDialog(): HTMLElement | null {
    return this.menu ? this.menu.querySelector('.f-menu__dialog') : null;
  }

  get menuDialogHeader(): HTMLElement | null {
    return this.menuDialog ? this.menu.querySelector('.f-menu__dialog--header') : null;
  }

  get menuDialogHeaderCloseButton(): HTMLButtonElement | null {
    return this.menuDialogHeader ? this.menu.querySelector('.f-menu__dialog--close-button') : null;
  }

  get menuDialogContent(): HTMLElement | null {
    return this.menuDialog ? this.menu.querySelector('.f-menu__dialog--content') : null;
  }

  /**
   * Creates a page object for a f-button DOM element based on the provided fixture and optional buttonClass
   *
   * @param fixture the parent DOM fixture/ element that houses the f-button
   * @param containerClass optional, providing a css class of a parent element of the f-menu
   * will help make sure the correct one is selected
   **/
  constructor(fixture: ComponentFixture<any>, containerClass?: string) {
    this.fixture = fixture;
    this.containerClass = containerClass;
  }
}
