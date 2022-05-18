import { Component, Input } from '@angular/core';

import { FusionUiSize } from '@fusion-ui/fusion-components/lib/shared/interfaces';

/**
 * LOADING SPINNER COMPONENT
 *
 * The loading component provides a consistent way of displaying loading spinners across applications.
 * This component should be used when the state of an element is unknown while an asynchronous call/ action
 * is in progress.
 *
 * <example-url>../../loading-spinner?embedded</example-url>
 *
 * @example
 * <fusion-ui-loading-spinner
 *              [size]="FusionUiSize.MEDIUM"
 *              [opacity]="1"
 *              [minWidth]="100"
 *              [ariaLabel]="'Loading'">
 * </fusion-ui-loading-spinner>
 *
 */
@Component({
  selector: 'fusion-ui-loading-spinner',
  styleUrls: ['./loading-spinner.component.scss'],
  template: `
    <div
      class="fusion-ui-loading-spinner__spinner fusion-ui-loading-spinner__spinner--{{ size }}"
      [style.minWidth]="minWidth"
      aria-hidden="false"
      [attr.aria-label]="ariaLabel">
      <div *ngFor="let dot of dots"
        class="fusion-ui-loading-spinner__bounce fusion-ui-loading-spinner__bounce--{{ size }} fusion-ui-loading-spinner__bounce--{{ dot }}"
        [style.opacity]="opacity">
      </div>
    </div>
  `
})
export class LoadingSpinnerComponent {
  readonly FusionUiSize = FusionUiSize;
  readonly dots: string[] = ['one', 'two', 'three'];

  /**
   * Dictates the size of the dots.
   */
  @Input() size: FusionUiSize = FusionUiSize.MEDIUM;

  /**
   * Dictates the opacity of the dots.
   */
  @Input() opacity: number = 1;

  /**
   * Dictates the minimum width of the div.fusion-ui-loading-spinner__spinner element to make it automatically
   * fill certain containers correctly. This was primarily developed to be used with the button component.
   */
  @Input() minWidth: string;

  /**
   * Dictates the aria label to be appended to the loading spinner to help indicate what is happening and what data should be displayed
   * once the data is ready and the loading spinner disappears.
   */
  @Input() ariaLabel: string = 'Loading';
}
