import { ComponentRef, EventEmitter, Type } from '@angular/core';

import { FusionUiSize } from '../../shared';
import { ModalComponent } from './modal.component';


export enum ModalType {
  ALERT = 'alert',
  SIDE = 'side',
  FULL = 'full',
}

/**
 * Provides a base class that components can extend for use in modals.
 * The generic type used with the OpenModalConfig must contain this emitter.
 */
export class BaseModalComponent {
  modalClosed: EventEmitter<any> = new EventEmitter<any>();
}

export interface ModalConfig {
  // Determines what type the modal is. (Full, side, or alert)
  type?: ModalType;
  // The element (HTMLElement) or selector to find the element (string) to place the modal inside of.
  // If nothing is provided the service will use 'body'
  container?: string | HTMLElement;
  // Determines the size of the modal. Doesn't matter for type FULL.
  size?: FusionUiSize;
  // Additional classes to add to the modal window element.
  windowClasses?: string[];
  // Additional classes to add to the backdrop.
  backdropClasses?: string[];
  // Elements or selectors to adjust the height of the modal with. Use this to offset the modal by a certain elements height. (EX: top-bar)
  heightAdjustmentElements?: (string | HTMLElement)[];
  // Elements or selectors to adjust the width of the modal with. Use this to offset the modal by a certain elements width. (EX: side-bar)
  widthAdjustmentElements?: (string | HTMLElement)[];
  // Used to add extra offset width when stacking full size modals. Each stack will offset from the previous one.
  addOffSetWidth?: string;
}

/**
 * This config is what the modal service's openModal() method uses to build out a new modal.
 * Only the component property is required.
 * The component must either extend BaseModalComponent or implement it's own modalClosed event emitter.
 */
export interface OpenModalConfig<T extends BaseModalComponent> {
  id?: string;
  // The component that should be instantiated and placed inside the modal. It must contain the modalClosed emitter.
  component: Type<T>;
  // The modal config. See interface above for more information.
  modalConfig?: ModalConfig;
  // Used to provide inputs or values to the content component. The component will get these values after instantiation.
  componentProps?: { [key: string]: any };
}

/**
 * This interface is used to store active modal information after a modal has been opened via the modal service's openModal() method.
 * It contains properties that are only needed for cleanup purposes or dealing with the modal instances after creation.
 */
export interface ActiveModal<T extends BaseModalComponent> extends OpenModalConfig<T> {
  // Used to store the Modal component's ComponentRef. (The wrapping ModalComponent)
  componentRef?: ComponentRef<ModalComponent>;
  // Used to store the content component's ComponentRef. (The component that will be placed inside the modal)
  contentComponentRef?: ComponentRef<T>;
  // Used to store a reference to the modal element that was added to the DOM. Also used to remove the modal from the DOM.
  appendedElement?: HTMLElement;
}

export enum ModalAnimationState {
  // Old states that used for modal
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}

export enum ModalAnimationSpeeds {
  ALERT = 100,
  SIDE = 300,
  FULL = 300,
}

export interface ModalStyling {
  top: string;
  height: string;
  width: string;
}
