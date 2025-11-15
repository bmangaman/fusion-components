import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'f-modal-content',
    template: '<ng-content></ng-content>',
    standalone: false
})
export class ModalContentComponent {
  @HostBinding('attr.class') class = 'f-modal__content';
}
