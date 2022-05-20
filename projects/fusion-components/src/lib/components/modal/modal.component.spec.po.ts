import { ComponentFixture } from '@angular/core/testing';

import { ModalTestComponent } from './modal.component.dom.spec';

export class ModalComponentPageObject {
  private fixture: ComponentFixture<ModalTestComponent>;

  get modalComponent(): HTMLElement {
    return this.fixture.nativeElement.querySelector('f-modal');
  }

  get modalWindow(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.f-modal__window');
  }

  get modalHeader(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.f-modal__header');
  }
  get modalHeaderClose(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.f-modal__header-close-button');
  }

  get modalContent(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.f-modal__content');
  }

  get modalFooter(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.f-modal__footer');
  }
  get modalFooterButtons(): HTMLButtonElement[] {
    return this.fixture.nativeElement.querySelectorAll('.f-modal__footer button') as HTMLButtonElement[];
  }

  get modalBackdrop(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.f-modal__backdrop');
  }

  constructor(fixture: ComponentFixture<ModalTestComponent>) {
    this.fixture = fixture;
  }
}
