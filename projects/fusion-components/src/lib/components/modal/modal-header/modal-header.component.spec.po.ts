import { ComponentFixture } from '@angular/core/testing';

import { ModalHeaderTestComponent } from './modal-header.component.dom.spec';

export class ModalHeaderComponentPageObject {
  private fixture: ComponentFixture<ModalHeaderTestComponent>;

  constructor(fixture: ComponentFixture<ModalHeaderTestComponent>) {
    this.fixture = fixture;
  }

  get header(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.fusion-ui-modal__header');
  }

  get fullHeader(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.fusion-ui-modal__full-header');
  }

  get fullHeaderTopBar(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.fusion-ui-modal__full-header-top-bar');
  }

  get closeButton(): HTMLButtonElement {
    return this.fixture.nativeElement.querySelector('.fusion-ui-modal__header-close-button');
  }
}
