import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { FusionUiLocation, FusionUiPosition, FusionUiPositionConfig } from '../../shared';
import * as Utilities from '../../shared/utilities';

/**
 * TOOLTIP COMPONENT
 *
 * The Tooltip Component is used in conjunction with the Tooltip Directive and Tooltip Service.
 * It creates a reusable tooltip element that appears when a user hovers over an element with the
 * Tooltip Directive applied.
 */
@Component({
  selector: 'fusion-ui-tooltip',
  template: `
    <div class="fusion-ui-tooltip__content">
      <ng-container *ngIf="templateWithContext; else justTemplate">
        <ng-container *ngTemplateOutlet="templateWithContext?.template; context: templateWithContext?.context"></ng-container>
      </ng-container>
      <ng-template #justTemplate>
        <ng-container *ngIf="template; else justText">
          <ng-container *ngTemplateOutlet="template"></ng-container>
        </ng-container>
      </ng-template>
      <ng-template #justText>{{ text }}</ng-template>
    </div>
  `,
  styles: [':host:not(.fusion-ui-tooltip) { display: none; }']
})
export class TooltipComponent implements AfterViewInit, OnChanges {
  cssClasses: string[] = [];
  elementPosition: FusionUiPositionConfig = {};

  /**
   * Determines the id of the tooltip. Used for accssibility purposes.
   */
  @HostBinding('attr.id')
  @Input() id: string;

  /**
   * Determines the static text to tbe displayed in the tooltip.
   */
  @Input() text: string;

  /**
   * Determines the custom template to be displayed in the tooltip.
   * It takes precedence over the text input.
   */
  @Input() template: TemplateRef<any>;

  /**
   * Determines the custom template with context to be displayed in the tooltip.
   * It takes precedence over the template and text input.
   */
  @Input() templateWithContext: { template?: TemplateRef<any>, context?: { $implicit: any } };

  /**
   * The element to which the tooltip directive is appended. Is used in determining the location of the tooltip.
   */
  @Input() element: ElementRef;

  /**
   * Determines the position of the tooltip in relation to the provided element.
   * By default is set to TOP (above center).
   */
  @Input() position: FusionUiPosition | FusionUiLocation = FusionUiLocation.TOP;

  /**
   * Determines any additional CSS classes to be appended to the host element.
   */
  @Input() classes: string[];

  @Input() zIndex: number = 1;

  @HostBinding('class')
  get setHostClasses(): string {
    return !!this.cssClasses ? this.cssClasses.join(' ') : null;
  }

  @HostBinding('style.left')
  get setHostLeft(): string {
    return this.elementPosition.left;
  }

  @HostBinding('style.right')
  get setHostRight(): string {
    return this.elementPosition.right;
  }

  @HostBinding('style.top')
  get setHostTop(): string {
    return this.elementPosition.top;
  }

  @HostBinding('style.bottom')
  get setHostBottom(): string {
    return this.elementPosition.bottom;
  }

  @HostBinding('style.transform')
  get setHostTransform(): string {
    return this.elementPosition.transform;
  }

  @HostBinding('style.z-index')
  get setHostZIndex(): number {
    return this.zIndex;
  }

  @HostBinding('attr.role')
  get role(): string {
    return 'tooltip';
  }

  @HostBinding('attr.tabindex')
  get tabIndex(): number {
    return 0;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateTooltipPosition();
  }

  constructor(
    private elementRef: ElementRef,
  ) {
  }

  /**
   * After the view initializes:
   *  - generate the CSS classes to be appended to the host based on the provided inputs.
   *  - set the tooltip position in relation to the provided element.
   */
  ngAfterViewInit(): void {
    setTimeout(() => this.generateCssClasses());
    setTimeout(() => this.updateTooltipPosition());
  }

  /**
   * If the position of classes inputs changes, update the CSS classes appended to the host element.
   *
   * @param c The input changes.
   */
  ngOnChanges(c: SimpleChanges): void {
    if (c.position || c.classes) {
      this.generateCssClasses();
      this.updateTooltipPosition();
    }
  }

  /**
   * If the provided element is defined, update the positioning of the tooltip so that is appears in the correct location on the screen.
   */
  updateTooltipPosition(): void {
    if (!!this.element && !!this.elementRef) {
      const positioning: FusionUiPositionConfig = Utilities.getElementAbsolutePositioning(this.elementRef, this.element, this.position, 15);
      this.elementPosition.left = positioning.left;
      this.elementPosition.right = positioning.right;
      this.elementPosition.top = positioning.top;
      this.elementPosition.bottom = positioning.bottom;
      this.elementPosition.transform = positioning.transform;
    }
  }

  /**
   * Generates the CSS classes to be appended to the host element.
   */
  generateCssClasses(): void {
    const classes: string[] = ['fusion-ui-tooltip'];

    if (this.position) {
      classes.push(`fusion-ui-tooltip--${this.position}`);
    }

    classes.push(...this.classes);

    this.cssClasses = classes;
  }
}
