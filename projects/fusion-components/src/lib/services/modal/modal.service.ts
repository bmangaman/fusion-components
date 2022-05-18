import { ComponentRef, Injectable } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  ActiveModal,
  BaseModalComponent,
  ModalComponent,
  ModalAnimationSpeeds,
  ModalConfig,
  ModalType,
  OpenModalConfig,
} from '../../components/modal';
import { FusionUiSize } from '../../shared/interfaces';
import { DomService } from '../dom';


/**
 * This service should be used to open all modals so that we may have on central service that knows about all open modals.
 * All options for the modal should be provided at the time of opening through the OpenModalConfig param.
 *
 * EX:
 const myModalConfig = {
   type: ModalType.FULL,
   container: 'body',
 }
 const openModalConfig: OpenModalConfig<InnerModalComponent> = {
   component: InnerModalComponent,
   modalConfig: myModalConfig,
   componentProps: {
     stringProp: 'my-string',
     numberProp: 2,
     objectProp: { id: 'blah' }
   },
 }
 this.modalService.openModal(openModalConfig).subscribe(closeEvent => {
   // Handle modal close here.
 })
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly FULL_MODAL_OFFSET = 40;
  private readonly BASE_CONFIG: ModalConfig = {
    type: ModalType.ALERT,
    container: 'body',
    size: FusionUiSize.MEDIUM,
    windowClasses: [],
    backdropClasses: [],
    heightAdjustmentElements: [],
    widthAdjustmentElements: [],
  };

  private _modals: ActiveModal<any>[] = [];
  get modals(): ActiveModal<any>[] {
    return [].concat(this._modals);
  }

  constructor(
    private domService: DomService,
  ) {
  }

  /**
   * Opens a modal using the OpenModalConfig provided.
   * This method will provide each modal with an Id and a modal config if they were not provided.
   * This method will also handle adding offset width to a stacked modal if necessary.
   *
   * @param config The config containing the necessary parts to instantiate the modal with its inner component.
   * @returns An observable containing the closeEvent that is emitted by the inner components
   * modalClosed event.This object can be whatever the inner component sets it to be.
   */
  openModal<T extends BaseModalComponent>(config: OpenModalConfig<T>): Observable<any> {
    // Assign an ID to the modal if no ID was provided.
    if (!config.id) {
      config.id = uuidv4();
    }

    // Give the config the BASE_CONFIG if none was provided.
    if (!config.modalConfig) {
      config.modalConfig = this.BASE_CONFIG;
    } else {
      // Override base config with provided config.
      config.modalConfig = {
        ...this.BASE_CONFIG,
        ...config.modalConfig,
      };
    }

    // If opening a FULL modal on top of another FULL modal then offset it.
    if (config.modalConfig.type === ModalType.FULL) {
      const existingFullModals: ActiveModal<any>[] = this._modals.filter(x => x.modalConfig.type === ModalType.FULL);

      if (existingFullModals.length) {
        config.modalConfig.addOffSetWidth = `${this.FULL_MODAL_OFFSET * existingFullModals.length}px`;
      }
    }

    // Create the content component
    const contentComponentRef: ComponentRef<T> = this.domService.createComponent<T>(config.component, config.componentProps);
    const ngContent: any[][] = [[contentComponentRef.location.nativeElement]];

    // Create the modal component with the content component as it's projected nodes.
    const componentRef: ComponentRef<ModalComponent> = this.domService.createComponent<ModalComponent>(
      ModalComponent,
      {
        config: config.modalConfig,
      },
      ngContent);
    const modalComponent: ModalComponent = componentRef.instance;

    const appendedElement: HTMLElement = this.domService.attachComponent(componentRef, config.modalConfig.container);

    // Initialize the modal component after it has been added to the DOM. The modal component needs to be in the DOM
    // for many of its initialization methods to work.
    modalComponent.init();

    this._modals.push({ ...config, appendedElement, componentRef, contentComponentRef });
    return contentComponentRef.instance.modalClosed
      .pipe(tap(() => {
        // Set the state so that the modal can animate out.
        modalComponent.changeState();
        setTimeout(
          () => {
            // After the modal has animated out remove it from the DOM.
            this.closeModal(config.id);
          },
          ModalAnimationSpeeds[config.modalConfig.type.toUpperCase()] + 100);
      }));
  }

  /**
   * Closes a modal by its Id. If no modal is found by that Id then it will do nothing.
   *
   * @param id
   */
  closeModal(id: string): void {
    const index: number = this._modals.findIndex((component: OpenModalConfig<any>) => component.id === id);

    if (index > -1) {
      // Clean up modal component and content component by calling destroy(). This will trigger the
      // ngOnDestroy lifecycle hook before the elements are removed from the DOM.
      const openModal: ActiveModal<any> = this.modals[index];
      openModal.componentRef.destroy();
      openModal.contentComponentRef.destroy();
      this.domService.removeComponent(openModal.appendedElement);
      this._modals.splice(index, 1);
    }
  }

  /**
   * Closes all modals that this service knows about.
   */
  closeAllModals(): void {
    while(this._modals.length > 0) {
      this.closeModal(this._modals[0].id);
    }
  }
}
