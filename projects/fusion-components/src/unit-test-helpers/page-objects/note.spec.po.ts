import { ComponentFixture } from '@angular/core/testing';

/**
 * NOTE PAGE OBJECT
 *
 * Page object for the f-note component.
 * Makes it easier to find and select certain f-note attributes and elements.
 */
export class NotePageObject {
  private fixture: ComponentFixture<any>;
  private noteClass: string | undefined;

  get note(): HTMLElement | null {
    // first try to get the f-note element by a provided class
    const noteClass: HTMLElement = this.noteClass ? this.fixture.nativeElement.querySelector(this.noteClass) : null;
    // if no provided class or element not found, try to find the f-note element by the f-note tag
    const fusionNote: HTMLElement = noteClass || this.fixture.nativeElement.querySelector('f-note');
    // if f-note found, find the actual <note> element by the .f-note class
    const note: HTMLElement | null = fusionNote ? fusionNote.querySelector('.f-note') : null;

    return note;
  }

  /**
   * Creates a page object for a f-note DOM element based on the provided fixture and optional noteClass
   *
   * @param fixture the parent DOM fixture/ element that houses the f-note
   * @param noteClass optional, providing a css class appended to a f-note will help make sure the correct one is selected
   */
  constructor(fixture: ComponentFixture<any>, noteClass?: string) {
    this.fixture = fixture;
    this.noteClass = noteClass;
  }
}
