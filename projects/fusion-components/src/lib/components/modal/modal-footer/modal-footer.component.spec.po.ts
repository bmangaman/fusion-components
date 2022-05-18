import { ComponentFixture } from '@angular/core/testing';

import { ModalFooterTestComponent } from './modal-footer.component.dom.spec';

export class ModalFooterComponentPageObject {
  private fixture: ComponentFixture<ModalFooterTestComponent>;

  constructor(fixture: ComponentFixture<ModalFooterTestComponent>) {
    this.fixture = fixture;
  }

  get footer(): HTMLElement {
    return this.fixture.nativeElement.querySelector('.fusion-ui-modal__footer');
  }
}
