import { ComponentFixture } from '@angular/core/testing';

export interface TabPageObject {
  button: HTMLButtonElement | null;
  content: HTMLElement | null;
}

export interface TabviewPageObjectType {
  container: HTMLElement | null;
  el: HTMLElement | null;
  navContainer: HTMLElement | null;
  panelsContainer: HTMLElement | null;
}

/**
 * TABVIEW PAGE OBJECT
 *
 * Page object for the f-tabview component
 * Makes it easier to find and select certain f-tabview attributes and elements
 */
export class TabviewPageObject {
  private fixture: ComponentFixture<any>;
  private containerClass: string | undefined;

  get tabview(): TabviewPageObjectType | undefined {
    // first, if a containerClass was provided, try to find the element that has that class
    const container: HTMLElement = this.containerClass ? this.fixture.nativeElement.querySelector(this.containerClass) : null;
    // if the container element was found, use that to query for the f-tabview, otherwise, just use the f-tabview tag
    const tabview: HTMLElement = (this.containerClass && container ? container : this.fixture.nativeElement).querySelector('f-tabview');

    if (tabview) {
      return {
        container,
        el: tabview,
        navContainer: tabview.querySelector('.f-tabview__nav'),
        panelsContainer: tabview.querySelector('.f-tabview__panels'),
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
    const tabview: TabviewPageObjectType | undefined = this.tabview;

    if (tabview) {
      const tabs: TabPageObject[] = [];
      const navButtons: NodeListOf<HTMLButtonElement> | undefined = tabview.navContainer?.querySelectorAll('button.f-tabview-tab__button');

      navButtons?.forEach((navButton: HTMLButtonElement) => {
        const navButtonId: string = navButton.getAttribute('id')?.toString() || '';
        // trim 'tab-' off the beginning of the tab ID.
        const baseId: string = navButtonId.slice(4);
        const coorespondingPanel: HTMLElement | null = tabview.panelsContainer ? tabview.panelsContainer.querySelector(`#panel-${baseId}`) : null;

        tabs.push({
          button: navButton,
          content: coorespondingPanel,
        });
      });

      return tabs;
    }

    return [];
  }

  /**
   * Creates a page object for a f-tabview DOM element based on the provided fixture and optional containerClass
   *
   * @param fixture the parent DOM fixture/ element that houses the f-tabview
   * @param containerClass optional, providing a css class of a parent element of the f-tabview
   * will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, containerClass?: string) {
    this.fixture = fixture;
    this.containerClass = containerClass;
  }
}
