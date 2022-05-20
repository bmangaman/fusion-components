import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject, OnDestroy,
  Output,
} from '@angular/core';

import { ModalContentComponent } from './modal-content';
import { ModalFooterComponent } from './modal-footer';
import { ModalHeaderComponent } from './modal-header';
import { ModalAnimationSpeeds, ModalConfig, ModalStyling, ModalType } from './modal.interface';

@Component({
  selector: 'f-modal',
  template: `
    <div class="f-modal">
      <div
        class="f-modal__backdrop"
        [ngClass]="config?.backdropClasses"
        [@alertFadeAnimation]="config?.type === ModalType.ALERT ? currentState : null"
        [@sideFadeAnimation]="config?.type === ModalType.SIDE ? currentState : null"
        [@fullFadeAnimation]="config?.type === ModalType.FULL ? currentState : null">
      </div>
      <div
        class="f-modal__window"
        [ngStyle]="config?.type === ModalType.FULL ? modalStyling : undefined"
        [ngClass]="windowClasses"
        [@fadeAndScaleAnimation]="config?.type === ModalType.ALERT ? currentState : null"
        [@sideSlideAnimation]="config?.type === ModalType.SIDE ? currentState : null"
        [@fullSlideAnimation]="config?.type === ModalType.FULL ? currentState : null">
        <div [ngClass]="containerClasses">
          <div class="f-modal__content-wrapper">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('alertFadeAnimation', [
      state(ModalType.ALERT, style({opacity: 1})),
      state('*', style({opacity: 0})),
      transition(`* <=> ${ModalType.ALERT}`, animate(`${ModalAnimationSpeeds.ALERT}ms ease-out`)),
    ]),
    trigger('sideFadeAnimation', [
      state(ModalType.SIDE, style({opacity: 1})),
      state('*', style({opacity: 0})),
      transition(`* <=> ${ModalType.SIDE}`, animate(`${ModalAnimationSpeeds.SIDE}ms ease-out`)),
    ]),
    trigger('fullFadeAnimation', [
      state(ModalType.FULL, style({opacity: 1})),
      state('*', style({opacity: 0})),
      transition(`* <=> ${ModalType.FULL}`, animate(`${ModalAnimationSpeeds.FULL}ms ease-out`)),
    ]),
    trigger('fadeAndScaleAnimation', [
      state(ModalType.ALERT, style({opacity: 1, transform: 'scale(1)'})),
      state('*', style({opacity: 0, transform: 'scale(0.5)'})),
      transition(`* <=> ${ModalType.ALERT}`, animate(`${ModalAnimationSpeeds.ALERT}ms ease-out`)),
    ]),
    trigger('sideSlideAnimation', [
      state(ModalType.SIDE, style({opacity: 1, transform: 'translateX(0)'})),
      state('*', style({opacity: 0, transform: 'translateX(50%)'})),
      transition(`* <=> ${ModalType.SIDE}`, animate(`${ModalAnimationSpeeds.SIDE}ms ease-out`)),
    ]),
    trigger('fullSlideAnimation', [
      state(ModalType.FULL, style({opacity: 1, transform: 'translateX(0)'})),
      state('*', style({opacity: 0, transform: 'translateX(100%)'})),
      transition(`* <=> ${ModalType.FULL}`, animate(`${ModalAnimationSpeeds.FULL}ms ease-out`)),
    ]),
  ]
})
export class ModalComponent implements OnDestroy {
  readonly ModalType = ModalType;

  private _focusableElements: NodeListOf<Element>;
  get focusableElements(): NodeListOf<Element> {
    return this._focusableElements;
  }

  private _currentState: ModalType | undefined;
  get currentState(): ModalType | undefined {
    return this._currentState;
  }

  private _modalStyling: ModalStyling = { top: '0', height: '100vh', width: '100vw' };
  get modalStyling(): ModalStyling {
    return this._modalStyling;
  }

  windowClasses: string[];
  containerClasses: string[];

  /**
   * Determines the configuration of the modal.
   */
  private _config: ModalConfig;
  set config(config: ModalConfig) {
    this._config = config;
  }
  get config(): ModalConfig {
    return this._config;
  }

  @HostBinding('attr.class')
  get hostClasses(): string {
    return 'f-modal--visible';
  }

  /**
   * Emits when the modal is closed.
   */
  @Output() modalClosed: EventEmitter<any> = new EventEmitter<any>(undefined);

  @ContentChild(ModalHeaderComponent) modalHeader !: ModalHeaderComponent;
  @ContentChild(ModalFooterComponent) modalFooter !: ModalFooterComponent;
  @ContentChild(ModalContentComponent) modalContent !: ModalContentComponent;

  /**
   * Prevents the focus from leaving the modal by causing keyboard navigation to only focus on 'focusable' elements
   * within the modal. If the user gets to the last 'focusable' element in the modal, if just loops around to the first element.
   *
   * @param event a keydown event
   */
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this._focusableElements && event.key === 'Tab') {
      if (this._focusableElements.length === 1) {
        event.preventDefault();
      }

      if (event.shiftKey) {
        if (this.document.activeElement === this._focusableElements[0]) {
          event.preventDefault();
          (this._focusableElements[this._focusableElements.length - 1] as HTMLElement).focus();
        }
      } else {
        if (this.document.activeElement === this._focusableElements[this._focusableElements.length - 1]) {
          event.preventDefault();
          (this._focusableElements[0] as HTMLElement).focus();
        }
      }
    }
  }

  /**
   * On window resize, adjust the modal width and height based on the modal type, heightAdjustmentElements, and widthAdjustmentElements.
   */
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.adjustModalHeight();
    this.adjustModalWidth();
  }

  constructor(
    @Inject(DOCUMENT) private document: any,
    private elemRef: ElementRef,
  ) {}

  ngOnDestroy(): void {
    this.setContainerOverflow();
  }

  // Initializes the modal component. This method is called from the modal service after the component has been attached to the DOM.
  init(): void {
    // Set initial state, container overflow, and focusable elements.
    this.changeState();
    this.setContainerOverflow();
    this.findFocusableElements();

    // Get classes
    this.windowClasses = this.getModalWindowClasses();
    this.containerClasses = this.getModalContainerClasses();

    // Adjust height and width.
    this.adjustModalHeight();
    this.adjustModalWidth();
  }

  /**
   * Finds all the 'focusable' elements in the modal.
   * Automatically focuses on the first 'focusable' element.
   */
  findFocusableElements(): void {
    this._focusableElements = this.elemRef.nativeElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    if (this._focusableElements && this._focusableElements.length) {
      (this._focusableElements[0] as HTMLElement).focus();
    }
  }

  /**
   * Adjusts the modal height based on the heightAdjustmentsElements provided in the modal configuration.
   * Looks through the body of the DOM and subtracts the offset height of these elements from the height of the modal.
   * This only applies to FULL modals.
   */
  adjustModalHeight(): void {
    const canAdjustHeight: boolean =
      this.config.type === ModalType.FULL &&
      !!this.config.heightAdjustmentElements?.length;

    if (canAdjustHeight) {
      let adjustedHeightAmount = 0;

      this.config.heightAdjustmentElements?.forEach((element: string | HTMLElement) => {
        const el: HTMLElement = typeof element !== 'string' ? element : this.elemRef.nativeElement.closest('body').querySelector(element);
        if (!!el) {
          adjustedHeightAmount += el.offsetHeight;
        }
      });

      this._modalStyling.top = `${adjustedHeightAmount}px`;
      this._modalStyling.height = `calc(100% - ${this.modalStyling.top})`;
    } else {
      this._modalStyling.top = '0px';
      this._modalStyling.height = '100%';
    }
  }

  /**
   * Adjusts the modal width based on the widthAdjustmentsElements provided in the modal configuration.
   * Looks through the body of the DOM and subtracts the offset width of these elements from the width of the modal.
   * This only applies to FULL modals.
   */
  adjustModalWidth(): void {
    const canAdjustWidth: boolean =
      this.config.type === ModalType.FULL &&
      !!this.config.widthAdjustmentElements?.length;

    if (canAdjustWidth) {
      let adjustedWidthAmount = 0;

      this.config.widthAdjustmentElements?.forEach((element: string | HTMLElement) => {
        const el: HTMLElement = typeof element !== 'string' ? element : this.elemRef.nativeElement.closest('body').querySelector(element);
        if (!!el) {
          adjustedWidthAmount += el.offsetWidth;
        }
      });

      this._modalStyling.width = `calc(100% - ${adjustedWidthAmount}px)`;
    } else {
      this._modalStyling.width = '100%';
    }

    if (this.config.addOffSetWidth) {
      this._modalStyling.width = `calc(${this._modalStyling.width} - ${this.config.addOffSetWidth})`;
    }
  }

  /**
   * Updates the animation state of the modal.
   * Sets the state equal to the type of the modal if it's not already set.
   * If the state is already set then sets it to null.
   */
  changeState(): void {
    if (!this.currentState) {
      this._currentState = this.config.type!;
    } else {
      this._currentState = undefined;
    }
  }

  /**
   * When the modal:
   *  - has a current state (IE: is shown), sets the container element to be overflow: hidden to hide its scrollbar
   *  - does not have a current state (IE: not shown), sets the container element to be overflow: auto to show its scrollbar
   */
  setContainerOverflow(): void {
    const parentContainer: HTMLElement = this.elemRef.nativeElement.parentElement;

    if (parentContainer) {
      parentContainer.style.overflow = this.currentState ? 'hidden' : 'auto';
    }
  }

  /**
   * Generates the modal window classes based on the modal type, size, and container.
   *
   * @returns The array of classes (as strings) to be appended to the 'hcc-modal__window` div.
   */
  private getModalWindowClasses(): string[] {
    const classes: string[] = [];

    classes.push(`f-modal__window--${this.config.type}`);
    classes.push(`f-modal__window--${this.config.type}--${this.config.size}`);
    if (typeof this.config.container === 'string') {
      classes.push(`f-modal__window--${this.config.type}--container-${this.config.container}`);
    }

    if (this.config.windowClasses) {
      classes.push(...this.config.windowClasses);
    }

    return classes;
  }

  /**
   * Generates the modal container CSS classes based on the provided size and type config options.
   *
   * @returns the generated CSS classes
   */
  private getModalContainerClasses(): string[] {
    return [
      'f-modal__container',
      `f-modal__container--${this.config.size}`,
      `f-modal__container--${this.config.type}`,
    ];
  }
}
