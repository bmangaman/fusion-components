import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'fusion-ui-modal-content',
  template: '<ng-content></ng-content>',
})
export class ModalContentComponent {
  @HostBinding('attr.class') class = 'fusion-ui-modal__content';
}
