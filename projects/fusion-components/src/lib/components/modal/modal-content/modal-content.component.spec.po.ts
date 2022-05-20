import { ComponentFixture } from '@angular/core/testing';

import { ModalContentTestComponent } from './modal-content.component.dom.spec';

export class ModalContentComponentPageObject {
  private fixture: ComponentFixture<ModalContentTestComponent>;

  constructor(fixture: ComponentFixture<ModalContentTestComponent>) {
    this.fixture = fixture;
  }

  get content(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.f-modal__content');
  }
}
