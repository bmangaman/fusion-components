import { ComponentFixture } from '@angular/core/testing';

export interface TabPageObject {
  button: HTMLButtonElement;
  content: HTMLElement;
}

export interface TabviewPageObjectType {
  container: HTMLElement;
  el: HTMLElement;
  navContainer: HTMLElement;
  panelsContainer: HTMLElement;
}

/**
 * TABVIEW PAGE OBJECT
 *
 * Page object for the fusion-ui-tabview component
 * Makes it easier to find and select certain fusion-ui-tabview attributes and elements
 */
export class TabviewPageObject {
  private fixture: ComponentFixture<any>;
  private containerClass: string;

  get tabview(): TabviewPageObjectType {
    // first, if a containerClass was provided, try to find the element that has that class
    const container: HTMLElement = this.containerClass ? this.fixture.nativeElement.querySelector(this.containerClass) : null;
    // if the container element was found, use that to query for the fusion-ui-tabview, otherwise, just use the fusion-ui-tabview tag
    const tabview: HTMLElement = (this.containerClass && container ? container : this.fixture.nativeElement).querySelector('fusion-ui-tabview');

    if (tabview) {
      return {
        container,
        el: tabview,
        navContainer: tabview.querySelector('.fusion-ui-tabview__nav'),
        panelsContainer: tabview.querySelector('.fusion-ui-tabview__panels'),
      };
    } else {
      return undefined;
    }
  }

  /**
   * Gets all the tabs in a tabview component
   *
   * @returns all the tabs with their title and content elements
   */
  get tabs(): TabPageObject[] {
    if (this.tabview) {
      const tabs: TabPageObject[] = [];
      const navButtons: NodeListOf<HTMLButtonElement> = this.tabview.navContainer.querySelectorAll('button.fusion-ui-tabview-tab__button');

      navButtons.forEach((navButton: HTMLButtonElement) => {
        const navButtonId: string = navButton.getAttribute('id').toString();
        // trim 'tab-' off the beginning of the tab ID.
        const baseId: string = navButtonId.slice(4);
        const coorespondingPanel: HTMLElement = this.tabview.panelsContainer.querySelector(`#panel-${baseId}`);

        tabs.push({
          button: navButton,
          content: coorespondingPanel,
        });
      });

      return tabs;
    }

    return null;
  }

  /**
   * Creates a page object for a fusion-ui-tabview DOM element based on the provided fixture and optional containerClass
   *
   * @param fixture the parent DOM fixture/ element that houses the fusion-ui-tabview
   * @param containerClass optional, providing a css class of a parent element of the fusion-ui-tabview
   * will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, containerClass?: string) {
    this.fixture = fixture;
    this.containerClass = containerClass;
  }
}