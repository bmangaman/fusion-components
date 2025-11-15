import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { Utilities, Size, StatusLevel } from '../../shared';

import { BadgeStyling } from './badge.interface';

/**
 * BADGE COMPONENT
 *
 * The Badge Component provides the structure and styling for a badge.
 *
 * @example
 * <f-badge
 *   [fillContainer]="false"
 *   [type]="StatusLevel.SUCCESS"
 *   [size]="Size.LARGE"
 *   text="Badge Text"
 *   subText="Badge Subtext">
 * </f-badge>
 */
@Component({
    selector: 'f-badge',
    templateUrl: 'badge.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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
  private _type: StatusLevel = StatusLevel.BASE;
  @Input()
  set type(type: StatusLevel | undefined) {
    this._type = Utilities.isNullOrUndefined(type) ? StatusLevel.BASE : type!;
  }
  get type(): StatusLevel {
    return this._type;
  }

  /**
   * Determines the size of the badge.
   * By default is MEDIUM.
   */
  @Input() size: Size = Size.MEDIUM;

  /**
   * Determines the main text of the badge.
   */
  @Input() text: string | number | undefined;

  /**
   * Determines the sub text of the badge.
   * Do NOT use with a XSMALL badge (will not show up).
   */
  @Input() subText: string | number | undefined;

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
    const wrapper = 'f-badge__wrapper';
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
