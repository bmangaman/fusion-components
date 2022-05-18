import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { FusionUiSize, FusionUiStatusLevel } from '../../shared';
import { BadgeStyling } from './badge.interface';

/**
 * BADGE COMPONENT
 *
 * The Badge Component provides the structure and styling for a badge.
 *
 * @example
 * <fusion-ui-badge
 *   [fillContainer]="false"
 *   [type]="FusionUiStatusLevel.SUCCESS"
 *   [size]="FusionUiSize.LARGE"
 *   text="Badge Text"
 *   subText="Badge Subtext">
 * </fusion-ui-badge>
 */
@Component({
  selector: 'fusion-ui-badge',
  templateUrl: 'badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  /**
   * Indicates any custom styling to append to the badge component e.g.:
   *
   * exampleBadge: BadgeStyling = {
   *   'background-color': '#d7d7d7',
   *   'text-color': '#454545',
   *   'font-weight': 'bold'
   * }
   */
  @Input() styling: BadgeStyling;

  /**
   * Determines the type of the badge (usually related to a status or level).
   * By default is BASE.
   */
  @Input() type: FusionUiStatusLevel = FusionUiStatusLevel.BASE;

  /**
   * Determines the size of the badge.
   * By default is MEDIUM.
   */
  @Input() size: FusionUiSize = FusionUiSize.MEDIUM;

  /**
   * Determines the main text of the badge.
   */
  @Input() text: string | number;

  /**
   * Determines the sub text of the badge.
   * Do NOT use with a XSMALL badge (will not show up).
   */
  @Input() subText: string | number;

  /**
   * Determines whether or not the badge should be the size of its container.
   * Primarily used in conjunction with the Widget Component.
   */
  @Input() fillContainer: boolean;

  /**
   * Determines any custom CSS classes to be appended the the host component element.
   */
  @Input() hostCssClasses: string[];

  /**
   * Determines the CSS classes to be appended to the component host that affect whether or not
   * the badge fills its container.
   */
  @HostBinding('class') get cssClasses(): string {
    const wrapper = 'fusion-ui-badge__wrapper';
    const classes: string[] = [wrapper];

    if (this.fillContainer) {
      classes.push(`${wrapper}--fill-container`);
    }

    if (!!this.hostCssClasses && !!this.hostCssClasses.length) {
      classes.push(...this.hostCssClasses);
    }

    return classes.join(' ');
  }
}
