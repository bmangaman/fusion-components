import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

/**
 * AUTOFOCUS DIRECTIVE
 *
 * The autofocus directive sets the browser document focus on the element on which it is applied if
 * fusionUiAutofocus is set to true.
 */
@Directive({
  selector: '[fusionUiAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  private _focus: boolean = true;

  /**
   * Determines whether or not the browser document should focus on eth element on which this
   * directive is applied.
   */
  @Input()
  set fusionUiAutofocus(condition: boolean) {
    this._focus = !!condition;
    this.setAutofocus();
  }

  constructor(
    private el: ElementRef,
  ) {}

  /**
   * On component initialization, set the browser document focus on this element if _focus is true.
   */
  ngAfterViewInit(): void {
    this.setAutofocus();
  }

  /**
   * Sets the browser document focus on this element if _focus is true.
   */
  setAutofocus(): void {
    if (this._focus) {
      this.el.nativeElement.focus();
    }
  }
}
