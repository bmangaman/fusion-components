import { ComponentFixture } from '@angular/core/testing';

/**
 * NOTE PAGE OBJECT
 *
 * Page object for the fusion-ui-note component.
 * Makes it easier to find and select certain fusion-ui-note attributes and elements.
 */
export class NotePageObject {
  private fixture: ComponentFixture<any>;
  private noteClass: string;

  get note(): HTMLElement {
    // first try to get the fusion-ui-note element by a provided class
    const noteClass: HTMLElement = this.noteClass ? this.fixture.nativeElement.querySelector(this.noteClass) : null;
    // if no provided class or element not found, try to find the fusion-ui-note element by the fusion-ui-note tag
    const fusionNote: HTMLElement = noteClass || this.fixture.nativeElement.querySelector('fusion-ui-note');
    // if fusion-ui-note found, find the actual <note> element by the .fusion-ui-note class
    const note: HTMLElement = fusionNote ? fusionNote.querySelector('.fusion-ui-note') : null;

    return note;
  }

  /**
   * Creates a page object for a fusion-ui-note DOM element based on the provided fixture and optional noteClass
   *
   * @param fixture the parent DOM fixture/ element that houses the fusion-ui-note
   * @param noteClass optional, providing a css class appended to a fusion-ui-note will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, noteClass?: string) {
    this.fixture = fixture;
    this.noteClass = noteClass;
  }
}
