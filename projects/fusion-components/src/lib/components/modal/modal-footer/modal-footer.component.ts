import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'f-modal-footer',
  template: '<ng-content></ng-content>',
})
export class ModalFooterComponent {
  @HostBinding('attr.class') class = 'f-modal__footer';
}
