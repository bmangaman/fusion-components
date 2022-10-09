import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, TemplateRef } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import { TooltipService } from '../../services/tooltip';
import { Position, MouseInteraction } from '../../shared';

/**
 * TOOLTIP DIRECTIVE
 *
 * The Tooltip Directive is used in conjunction with the Tooltip Component and Tooltip Service.
 * It creates a consistent way to display a tooltip when the element to which it is applied is
 * hovered.
 */
@Directive({
  selector: '[fusionUiTooltip]',
})
export class TooltipDirective implements OnDestroy {
  /**
   * Determines the text to be disaplyed in the tooltip.
   */
  @Input() text: string;

  /**
   * Determines the custom template to be displayed in the tooltip.
   * If provided, takes precedence over the text input.
   */
  @Input() template: TemplateRef<any> | null;

  /**
   * Determines the custom template with context to be displayed in the tooltip.
   * It takes precedence over the template and text input.
   */
  @Input() templateWithContext: { template?: TemplateRef<any> | null, context?: { $implicit: any } };

  /**
   * Determines the position of the tooltip.
   */
  @Input() position: Position = Position.TOP;

  /**
   * Determines whether or not any custom CSS classes are to be appended to the tooltip.
   */
  @Input() classes: string[];

  /**
   * Determines which action causes the tooltip to be displayed.
   * By default is on mouse enter (hover).
   */
  @Input() displayOn: MouseInteraction = MouseInteraction.MOUSE_ENTER;

  /**
   * Determines which actions causes the tooltip to be removed/ hidden.
   * By default is on mouse leave.
   */
  @Input() hideOn: MouseInteraction = MouseInteraction.MOUSE_LEAVE;

  /**
   * Determines whether or not there is a delay after the hideOn interaction.
   * Delays disappearance of tooltip by the value provided (milliseconds).
   */
  @Input() hideDelay: number;

  /**
   * Sets the zIndex for the TooltipComponent that gets added to the DOM.
   */
  @Input() tooltipZIndex: number = 1;

  /**
   * Determines the id of the tooltip.
   * If not provided, one is generated.
   */
  private _id: string = uuidv4();
  @Input()
  set id(id: string) {
    this._id = id || this._id;
  }

  get id(): string {
    return this._id;
  }

  @HostListener('mouseenter')
  @HostListener('focus')
  onMouseEnter(): void {
    const isDisplayed: boolean = this.tooltipService.isTooltipDisplayed(this.id);

    if ((this.displayOn === MouseInteraction.MOUSE_ENTER || this.displayOn === MouseInteraction.FOCUS) && !isDisplayed) {
      this.addTooltip();
    } else if ((this.hideOn === MouseInteraction.MOUSE_ENTER || this.hideOn === MouseInteraction.FOCUS) && isDisplayed) {
      this.destroy();
    }
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  onMouseLeave(): void {
    const isDisplayed: boolean = this.tooltipService.isTooltipDisplayed(this.id);

    if ((this.displayOn === MouseInteraction.MOUSE_LEAVE || this.displayOn === MouseInteraction.BLUR) && !isDisplayed) {
      this.addTooltip();
    } else if ((this.hideOn === MouseInteraction.MOUSE_LEAVE || this.hideOn === MouseInteraction.BLUR) && isDisplayed) {
      this.destroy();
    }
  }

  @HostListener('click')
  onMouseClick(): void {
    const isDisplayed: boolean = this.tooltipService.isTooltipDisplayed(this.id);

    if (this.displayOn === MouseInteraction.CLICK && !isDisplayed) {
      this.addTooltip();
    } else if (this.hideOn === MouseInteraction.CLICK && isDisplayed) {
      this.destroy();
    }
  }

  @HostBinding('attr.aria-describedBy')
  get ariaDescribedBy(): string {
    return this._id;
  }

  constructor(
    private element: ElementRef,
    private tooltipService: TooltipService,
  ) {
  }

  /**
   * Calls destroy() to remove the tooltip from the list of visible tooltips.
   */
  ngOnDestroy(): void {
    this.destroy();
  }

  /**
   * Remove the tooltip from the list of visible tooltips in the Tooltip Service.
   */
  destroy(): void {
    setTimeout(
      () => this.tooltipService.removeTooltip(this.id),
      this.hideDelay,
    );
  }

  /**
   * Sets the id (if one was not provided).
   * Adds the tooltip to the Tooltip Service so that is gets appended to the DOM.
   * Sets the isDisplayed flag to true;
   */
  addTooltip(): void {
    this.tooltipService.addTooltip({
      id: this.id,
      text: this.text,
      template: this.template,
      templateWithContext: this.templateWithContext,
      position: this.position,
      element: this.element,
      classes: this.classes,
      zIndex: this.tooltipZIndex,
    });
  }
}
