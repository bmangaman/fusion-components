import { ComponentFixture } from '@angular/core/testing';

import { ModalTestComponent } from './modal.component.dom.spec';

export class ModalComponentPageObject {
  private fixture: ComponentFixture<ModalTestComponent>;

  get modalComponent(): HTMLElement {
    return this.fixture.nativeElement.querySelector('fusion-ui-modal');
  }

  get modalWindow(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.fusion-ui-modal__window');
  }

  get modalHeader(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.fusion-ui-modal__header');
  }
  get modalHeaderClose(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.fusion-ui-modal__header-close-button');
  }

  get modalContent(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.fusion-ui-modal__content');
  }

  get modalFooter(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.fusion-ui-modal__footer');
  }
  get modalFooterButtons(): HTMLButtonElement[] {
    return this.fixture.nativeElement.querySelectorAll('.fusion-ui-modal__footer button') as HTMLButtonElement[];
  }

  get modalBackdrop(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.fusion-ui-modal__backdrop');
  }

  constructor(fixture: ComponentFixture<ModalTestComponent>) {
    this.fixture = fixture;
  }
}
