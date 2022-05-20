import { ComponentFixture } from '@angular/core/testing';

import { NotePageObject } from '@fusion-components/unit-test-helpers/page-objects/note.spec.po';

import { NoteTestComponent } from './note.component.dom.spec';

export class NoteComponentPageObject {
  private fixture: ComponentFixture<NoteTestComponent>;
  note: NotePageObject;

  constructor(fixture: ComponentFixture<NoteTestComponent>) {
    this.fixture = fixture;
    this.note = new NotePageObject(this.fixture);
  }
}
