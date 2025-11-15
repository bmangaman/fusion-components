import { Component, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

/**
 * CHECKBOX COMPONENT
 */
@Component({
    selector: 'f-checkbox',
    templateUrl: './checkbox.component.html',
    standalone: false
})
export class CheckboxComponent implements ControlValueAccessor {
  private onChange: (...args: unknown[]) => void;
  private onTouched: () => void;

  private _isDisabled: boolean;
  get isDisabled(): boolean {
    return this._isDisabled;
  }

  get control(): NgControl {
    return this._control;
  }

  private _value: boolean;
  set value(value: boolean) {
    this._value = value;

    if (this.onChange) {
      this.onChange(this._value);
    }

    if (this.onTouched) {
      this.onTouched();
    }
  }
  get value(): boolean {
    return this._value;
  }

  /**
   * Determines the uuid for the component. Is applied to the label and input elements.
   */
  private _uuid: string = uuidv4();
  @Input()
  set uuid(id: string) {
    this._uuid = id || this._uuid;
  }
  get uuid(): string {
    return this._uuid;
  }

  @HostBinding('class.f-form__fieldset') hostCssClasses = true;

  constructor(
    private _control: NgControl,
  ) {
    this._control.valueAccessor = this;
  }

  /**
   * Function required to implement the ControlValueAccessor interface.
   *
   * Writes a new value to the element.
   * This method is called by the forms API to write to the view when programmatic
   * changes from model to view are requested.
   *
   * @param value The new value for the element.
   */
  writeValue(value: any): void {
    this.value = value;
  }

  /**
   * Function required to implement the ControlValueAccessor interface.
   *
   * Registers a callback function that is called when the control's value
   * changes in the UI.
   * This method is called by the forms API on initialization to update the form
   * model when values propagate from the view to the model.
   */
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  /**
   * Function required to implement the ControlValueAccessor interface.
   *
   * Registers a callback function is called by the forms API on initialization
   * to update the form model on blur.
   * When implementing `registerOnTouched` in your own value accessor, save the given
   * function so your class calls it when the control should be considered
   * blurred or "touched".
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Function from the ControlValueAccessor interface.
   *
   * Function that is called by the forms API when the control status changes to
   * or from 'DISABLED'. Depending on the status, it enables or disables the
   * appropriate DOM element.
   */
  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  /**
   * Sets the input to touched when it is blurred/ touched.
   */
  onBlur(): void {
    setTimeout(() => this.onTouched());
  }

  /**
   * If the checkbox input is not disabled, toggles the current value of the checkbox.
   */
  toggleValue(): void {
    if (!this.isDisabled) {
      this.value = this.value ? false : true;
    }
  }
}
