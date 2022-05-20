import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FormInputStatus } from '@fusion-components/lib/shared';

/**
 * VALIDATION STYLING DIRECTIVE
 *
 * The validation style directive handles adding wrapper and icon elements to a form control.
 *
 * @example
 * <div class="f-form__fieldset">
 *   <label class="f-form__input-label">Default</label>
 *   <div class="f-form__input-wrapper">
 *     <input class="f-form__input" type="text" fusionUiValidationStyling/>
 *   </div>
 * </div>
 *
 * OR (since it will add a wrapper if one isn't already present)
 *
 * <div class="f-form__fieldset">
 *   <label class="f-form__input-label">Default</label>
 *   <input class="f-form__input" type="text" fusionUiValidationStyling/>
 * </div>
 */
@Directive({
  selector: '[fusionUiValidationStyling]'
})
export class ValidationStylingDirective implements OnInit, OnDestroy {
  private inputElement: any;
  private wrapperElement: any;
  private validityIcon: any;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control: NgControl
  ) {
  }

  /**
   * Complete the subject to clean up subscriptions.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Set up all the correct elements and wrappers. Also listen to status changes on the control.
   */
  ngOnInit(): void {
    this.inputElement = this.el.nativeElement;

    this.createParentWrapper();
    this.buildIconSpan();
    this.setStyling(this.control.control.status);

    this.control.statusChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(status => {
      this.setStyling(status);
    });
  }

  /**
   * Create a div around an input with the necessary wrapper classes.
   */
  createParentWrapper(): void {
    // If the input is already wrapped correctly then we don't need to add it ourselves.
    if (this.inputElement.parentNode.classList.contains('f-form__input-wrapper')) {
      this.wrapperElement = this.inputElement.parentNode;
      return;
    }

    // If the input is inside a select wrapper than we do not need to create a new element.
    if (this.inputElement.parentNode.classList.contains('f-form__select-wrapper')) {
      this.wrapperElement = this.inputElement.parentNode;
    } else {
      // There was no wrapper element around the input so create one and move the input inside of it.
      this.wrapperElement = this.renderer.createElement('div');
      this.renderer.insertBefore(this.inputElement.parentNode, this.wrapperElement, this.inputElement);
      this.renderer.appendChild(this.wrapperElement, this.inputElement);
    }

    this.wrapperElement.classList.add('f-form__input-wrapper');
  }

  /**
   * Create a span inside the wrapper element which contains the icon.
   */
  buildIconSpan(): void {
    if (this.wrapperElement.querySelectorAll('.f-form__input-wrapper-status-icon').length) {
      return;
    }
    this.validityIcon = this.renderer.createElement('span');
    this.validityIcon.classList.add('f-form__input-wrapper-status-icon');
    this.renderer.appendChild(this.wrapperElement, this.validityIcon);
  }

  /**
   * Replaces current styling with either valid or invalid styling depending on if
   * input is either valid or invalid
   */
  setStyling(status: string): void {
    this.inputElement.classList.remove('f-form__input--valid', 'f-form__input--invalid');

    if (this.control.dirty || this.control.value) {
      if (status === FormInputStatus.VALID && this.control.value) {
        this.inputElement.classList.add('f-form__input--valid');
      }

      if (status === FormInputStatus.INVALID) {
        this.inputElement.classList.add('f-form__input--invalid');
      }
    }
  }
}
