import { Directive, ElementRef, EventEmitter, HostBinding, Output, Renderer2 } from '@angular/core';

/**
 * PASSWORD VISIBILITY TOGGLE DIRECTIVE
 *
 * The password visibility toggle directive appends a toggle button the right of the input to which the
 * directive applied. When the button is clicked, the visibility of the input text is toggled. This is
 * done by toggling the input type between 'text' and 'password'.
 *
 * @example
 * <form class="fusion-ui-form">
 *   <div class="fusion-ui-form__fieldset">
 *     <label class="fusion-ui-form__input-label">Example</label>
 *     <div class="fusion-ui-form__input-wrapper">
 *       <input class="fusion-ui-form__input" type="password" fusionUiPasswordVisibilityToggle />
 *       <span class="fusion-ui-form__input-wrapper-status-icon"></span>
 *     </div>
 *   </div>
 * </form>
 */
@Directive({
  selector: '[fusionUiPasswordVisibilityToggle]'
})
export class PasswordVisibilityToggleDirective {
  private _isPasswordVisible: boolean;
  set isPasswordVisible(isVisible: boolean) {
    this._isPasswordVisible = isVisible;
    this.updatePasswordToggleButtonButton();
  }
  get isPasswordVisible(): boolean {
    return this._isPasswordVisible;
  }

  private _passwordToggleButton: HTMLButtonElement;

  @HostBinding('attr.type')
  get type(): string {
    return this.isPasswordVisible ? 'text' : 'password';
  }

  /**
   * Emits when the password visibility is toggled with the current visibility status.
   */
  @Output() passwordVisibilityToggled: EventEmitter<boolean> = new EventEmitter(null);

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    // setTimeout is used to give the DOM a chance to render the input and status icon before appending the
    // additional password visibility toggle directive CSS classes and DOM elements.
    setTimeout(() => this.appendPasswordToggleButton());
  }

  /**
   * Does the following:
   *  - Appends the necessary CSS class to the parent element
   *  - If a status icon is being used, create an inner wrapper to handle positioning
   *  - Creates a toggle button in this new parent element
   *  - Appends the appropriate classes to the new parent and toggle button
   *  - Adds a listener to the button so that it toggles the isPasswordVisible flag
   */
  appendPasswordToggleButton(): void {
    // Get the parent element of the input element to which this directive is applied and add the appropriate CSS class
    const parentElement: HTMLElement = this.renderer.parentNode(this.el.nativeElement);
    parentElement.classList.add('fusion-ui-form__input-password-visibility-toggle-wrapper');

    // If a status icon exists, create a inner wrapper for the input and icon
    const statusIcon: HTMLElement = parentElement.querySelector('.fusion-ui-form__input-wrapper-status-icon');

    if (statusIcon) {
      const inputInner: HTMLElement = this.renderer.createElement('div');
      this.renderer.addClass(inputInner, 'fusion-ui-form__input-password-visibility-toggle-inner');
      this.renderer.appendChild(parentElement, inputInner);
      this.renderer.appendChild(inputInner, this.el.nativeElement);
      this.renderer.appendChild(inputInner, statusIcon);
    }

    // Create a new password toggle button and append the appropriate CSS classes
    const newPasswordVisibilityToggleButton: HTMLButtonElement = this.renderer.createElement('button');
    this.renderer.addClass(newPasswordVisibilityToggleButton, 'fusion-ui-form__input-password-visibility-toggle-button');
    this.renderer.addClass(newPasswordVisibilityToggleButton, 'mdi');
    this.renderer.setAttribute(newPasswordVisibilityToggleButton, 'aria-hidden', 'true');

    // Append the the password toggle button to the right of the input
    this.renderer.appendChild(parentElement, newPasswordVisibilityToggleButton);
    this._passwordToggleButton = newPasswordVisibilityToggleButton;

    // Add a listener to the toggle button so that when it is clicked, it updates the icon class of the button
    this.renderer.listen(newPasswordVisibilityToggleButton, 'click', this.onPasswordTogglebuttonClick.bind(this));
    this.updatePasswordToggleButtonButton();
  }

  /**
   * Exchanges (adds/ removes) the material design icon classes of the toggle button based on whether or not the
   * password is currently visible.
   */
  updatePasswordToggleButtonButton(): void {
    if (!!this._passwordToggleButton) {
      this._passwordToggleButton.classList.remove(this.isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off');
      this._passwordToggleButton.classList.add(this.isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye');
    }
  }

  /**
   * When the toggle button is clicked, toggle the isPassword flag to control:
   *  - the mdi classes on the toggle button
   *  - the type (text vs password) of the input
   */
  onPasswordTogglebuttonClick(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordVisibilityToggled.emit(this.isPasswordVisible);
  }
 }
