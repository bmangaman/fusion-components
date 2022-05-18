import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'fusion-ui-modal-footer',
  template: '<ng-content></ng-content>',
})
export class ModalFooterComponent {
  @HostBinding('attr.class') class = 'fusion-ui-modal__footer';
}
