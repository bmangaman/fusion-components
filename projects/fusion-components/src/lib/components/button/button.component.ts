import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { FusionUiSize, FusionUiState } from '@fusion-ui/fusion-components/lib/shared/interfaces';

import { ButtonAria, ButtonInputType, ButtonType } from './button.interface';

/**
 * BUTTON COMPONENT
 *
 * The button component simplifies the creation and use of the fusion-ui button. It provides an easy way
 * to specify the button type, size, content, etc. It also supports disabled and loading states.
 */
@Component({
  selector: 'fusion-ui-button',
  templateUrl: 'button.component.html',
})
export class ButtonComponent implements AfterViewInit, OnChanges {
  readonly FusionUiState = FusionUiState;
  readonly FusionUiSize = FusionUiSize;

  isButtonDisabled: boolean;
  buttonClasses: string[];
  loadingSpinnerSize: FusionUiSize = FusionUiSize.MEDIUM;

  /**
   * Used for when the button goes into the "loading" state - helps make the button keep the same width
   * when the button content is replaced with the loading spinner (keeps the button from changing sizes).
   */
  contentMinWidth: string;

  /**
   * Determines the button type; default is PRIMARY.
   * Currently either PRIMARY, SECONDARY, or TERTIARY
   */
  @Input() type: ButtonType = ButtonType.PRIMARY;

  /**
   * Determines the button input type; default is BUTTON.
   * Options include: BUTTON, SUBMIT, or RESET.
   * Use SUBMIT and RESET with form, BUTTON for everything else.
   */
  @Input() inputType: ButtonInputType = ButtonInputType.BUTTON;

  /**
   * Determines the size of the button; default is MEDIUM.
   */
  @Input() size: FusionUiSize = FusionUiSize.MEDIUM;

  /**
   * Determines the icon to be displayed in the button to the left of the button content/ text.
   */
  @Input() icon: string;

  /**
   * Determines whether or not to show the button content or a loading spinner.
   * The default state is LOADED.
   * When the button is LOADING, it is also disabled.
   */
  @Input() state: FusionUiState = FusionUiState.LOADED;

  /**
   * Determines whether or not the button is disabled.
   */
  @Input() isDisabled: boolean;

  /**
   * Determines if the button should be focused upon (usually used in conjuntion with the menu component).
   */
  @Input() isAutofocused: boolean;

  /**
   * Determines if the button should have 'selected' styling (usually used with a SECONDARY button).
   */
  @Input() isSelected: boolean;

  /**
   * Determines if the button opens a menu.
   * Adds a 'down-chevron' icon to the right of the button content/ text.
   */
  @Input() opensMenu: boolean;

  /**
   * Allows the addition of custom CSS classes to the button element.
   */
  @Input() classes: string[];

  /**
   * Allows the addition of aria attributes to the button.
   * Should always be used with:
   *  - 'icon-only' buttons,
   *  - buttons that open menus,
   *  - and buttons that could have a LOADING state
   */
  @Input() aria: ButtonAria = {
    loadingSpinner: 'Loading',
    menuIconAriaLabel: 'Opens Menu',
  };

  /**
   * Determines if the button should have a visible border (usually used with a SECONDARY button).
   */
  @Input() noBorder: boolean;

  /**
   * Determines if the button should be full width.
   */
  @Input() fullWidth: boolean;

  /**
   * Determines the text to be displayed in the button.
   */
  @Input() text: string;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('buttonContent') buttonContent: ElementRef;

  /**
   * After the view initializes, calls setContentMinWidth() to set contentMinWidth.
   */
  ngAfterViewInit(): void {
    this.setContentMinWidth();
  }

  /**
   * When inputs change, update how the button looks and behaves.
   *
   * @param c Input changes.
   */
  // eslint-disable-next-line complexity
  ngOnChanges(c: SimpleChanges): void {
    if (c.text || c.icon || c.opensMenu) {
      setTimeout(() => this.setContentMinWidth());
    }

    if (c.isDisabled || c.state) {
      this.isButtonDisabled = this.isDisabled || this.state === FusionUiState.LOADING;
    }

    if (c.size) {
      this.loadingSpinnerSize = this.size !== FusionUiSize.LARGE ? this.size : FusionUiSize.MEDIUM;
    }

    if (c.type || c.size || c.state || c.isSelected || c.noBorder || c.fullWidth || c.isDisabled || c.icon || c.text || c.classes) {
      this.buttonClasses = this.generateButtonClasses();
    }
  }

  /**
   * If buttonContent is defined, grabs its offsetWidth and sets contentMinWidth to that value.
   * contentMinWidth is used with the loading spinner component to maintain the button width when it goes from LOADED to LOADING.
   */
  setContentMinWidth(): void {
    if (!!this.buttonContent) {
      this.contentMinWidth = `${this.buttonContent.nativeElement.offsetWidth}px`;
    }
  }

  /**
   * When the button is clicked, emit an event.
   */
  buttonClicked(): void {
    this.buttonClick.emit();
  }

  /**
   * Generates button CSS classes based on the provided inputs.
   *
   * @returns The generated CSS classes.
   */
  // eslint-disable-next-line complexity
  generateButtonClasses(): string[] {
    const classes: string[] = ['fusion-ui-button'];

    if (!!this.type) {
      classes.push(`fusion-ui-button--${this.type}`);
    }

    if (!!this.size) {
      classes.push(`fusion-ui-button--${this.size}`);
    }

    if (!!this.state) {
      classes.push(`fusion-ui-button--${this.state}`);
    }

    if (!!this.isSelected) {
      classes.push('fusion-ui-button--selected');
    }

    if (!!this.isDisabled || (!!this.state && this.state === FusionUiState.LOADING)) {
      classes.push('fusion-ui-button--disabled');
    }

    if (!!this.noBorder) {
      classes.push('fusion-ui-button--noBorder');
    }

    if (!!this.fullWidth) {
      classes.push('fusion-ui-button--full-width');
    }

    if (!this.icon && !!this.text) {
      classes.push('fusion-ui-button--text');
    }

    if (!this.text && !!this.icon) {
      classes.push('fusion-ui-button--icon');
    }

    if (this.classes) {
      classes.push(...this.classes);
    }

    return classes;
  }
}
