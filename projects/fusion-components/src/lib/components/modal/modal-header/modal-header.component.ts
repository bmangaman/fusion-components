import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ModalType } from '../modal.interface';

@Component({
    selector: 'f-modal-header',
    templateUrl: './modal-header.component.html',
    standalone: false
})
export class ModalHeaderComponent {
  readonly ModalType = ModalType;

  /**
   * Determines whether or not the close button (x) is hidden. By default is false (and thus displays the close button).
   */
  @Input() hideCloseButton: boolean;

  /**
   * Determines whether or not to disable the close (x) button. By default is false (the close button is enabled).
   */
  @Input() disableCloseButton: boolean;

  /**
   * Boolean to indicate this header is used in a full modal. Used to determine how the header should be styled.
   *
   * NOTE: If using a full modal the header text will not be in the header and must be defined at the top of the content. This is to allow
   * for a static top bar with scrolling.
   */
  @Input() isFullModal: boolean;

  /**
   * Emits an event when the close (x) button is clicked.
   */
  @Output() modalClosed: EventEmitter<any> = new EventEmitter<any>(undefined);

  @HostBinding('attr.class')
  get hostClasses(): string {
    return this.isFullModal ? 'f-modal__full-header' : 'f-modal__header';
  }

  /**
   * Emit an event that indicates that the close button was clicked (and thus the modal should be closed).
   */
  close(): void {
    this.modalClosed.emit();
  }
}
