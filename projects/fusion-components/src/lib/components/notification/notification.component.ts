import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';

import { TemplateDirective } from '@fusion-components/lib/directives';
import { FusionComponentsTranslationService } from '@fusion-components/lib/services';
import { TranslatedComponent } from '@fusion-components/lib/shared';

import { WINDOW } from '@fusion-components/lib/providers';
import { v4 as uuidv4 } from 'uuid';
import { NotificationTemplate, NotificationTranslations, NotificationType } from './notification.interface';

@Component({
  selector: 'f-notification',
  templateUrl: './notification.component.html',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent extends TranslatedComponent implements OnInit, AfterContentInit {
  /**
   * The icon class to use for the notification. Can be any mdi icon class. EX: power-plug.
   */
  private _notificationIconClass: string;
  get notificationIconClass(): string {
    return this._notificationIconClass;
  }

  /**
   * Boolean to indicate if the details should be shown or hidden.
   *
   * @private
   */
  private _isDetailsExpanded: boolean = false;
  get isDetailsExpanded(): boolean {
    return this._isDetailsExpanded;
  }

  /**
   * Holds an instance of the details template ref if it was provided.
   *
   * @private
   */
  private _details: TemplateRef<any>;
  get details(): TemplateRef<any> {
    return this._details;
  }

  /**
   * The boolean that indicates if a notification has been dismissed. If true then height and opacity are set to 0 until removed from
   * the DOM.
   */
  private _dismissed: boolean;
  /**
   * Notification types that are not dismissible by default. Only used when dismissible isn't set.
   */
  notDismissibleByDefault: NotificationType[] = [NotificationType.ERROR];

  /**
   * Applies the disabled attribute to the angular animations for the component. If true no animations will be used.
   */
  @Input() disableAnimations: boolean;

  /**
   * (Optional.) Additional css classes to put on the f-notification element. Note that this is the only way to
   * append classes; anything added in the DOM will be overwritten by the host binding on attr.class.
   */
  @Input() classList: string[] = [];

  /**
   * Apply fade out animation to host element.
   */
  @HostBinding('@fadeOut') fadeOut: string;

  /**
   * Applied the disabled animation attribute to the host element.
   */
  @HostBinding('@.disabled')
  get animationsAreDisabled(): boolean {
    return !!this.disableAnimations;
  }

  /**
   * Apply the correct role to the host element.
   */
  @HostBinding('attr.role')
  get role(): string {
    return this.notificationType === NotificationType.INFO ? 'status' : 'alert';
  }

  /**
   * Apply the Id to the host element.
   */
  @HostBinding('attr.id')
  get _id(): string {
    return this.id;
  }

  /**
   * Apply the necessary classes to the host element.
   */
  @HostBinding('attr.class')
  get hostClasses(): string {
    const classes: string[] = ['f-notification', ...this.classList];

    if (this.sticky) {
      classes.push('sticky-msg-position');
    }

    if (this._notificationType) {
      classes.push(`f-notification__${this._notificationType}`);
    }

    if (this._dismissed) {
      classes.push('dismissed');
    }

    return classes.join(' ');
  }

  private idFromInput: string = uuidv4();

  /**
   * The id of the host.
   */
  @Input()
  set id(id: string) {
    this.idFromInput = !!id ? id : uuidv4();
  }

  get id(): string {
    return this.idFromInput;
  }

  /**
   * Returns the aria type label if provided otherwise null.
   */
  get ariaTypeLabel(): string {
    return this.translations?.ariaTypeLabel?.[this.notificationType] || '';
  }

  /**
   * Sets the dismissible flag for the notification. If true the close button will be visible and it will dismiss the notification on click.
   */
  @Input() dismissible: boolean;
  /**
   * Sets the sticky flag for the notification.
   */
  @Input() sticky: boolean;

  /**
   * The max height the details section can expand to before it starts to scroll. If not provided it will default to 240px;
   *
   * @private
   */
  private _detailsMaxHeight: string = '240px';
  @Input()
  set detailsMaxHeight(maxHeight: string) {
    this._detailsMaxHeight = maxHeight || '240px';
  }

  get detailsMaxHeight(): string {
    return this._detailsMaxHeight;
  }

  /**
   * Sets the notification banner notification icon
   */
  private _notificationIcon: string;
  @Input()
  set notificationIcon(icon: string) {
    this._notificationIcon = icon;
    this.setNotificationIconClass();
  }

  get notificationIcon(): string {
    return this._notificationIcon;
  }

  /**
   * Sets the type of the notification banner
   */
  private _notificationType: NotificationType;
  @Input()
  set notificationType(notificationType: NotificationType) {
    this.setNotificationType(notificationType);
  }
  get notificationType(): NotificationType {
    return this._notificationType;
  }

  private _timeoutId: number | undefined;

  /**
   * If set, the notification will be automatically dismissed after this many milliseconds.
   *
   * @param delayMs {number} dismiss the notification after this many milliseconds
   */
  @Input()
  set disappearDelay(delayMs: number) {
    if (this._timeoutId) {
      this.window.clearTimeout(this._timeoutId);
      this._timeoutId = undefined;
    }
    if (delayMs && delayMs > 0) {
      this._timeoutId = this.window.setTimeout(() => this.dismissBanner(), delayMs);
    }
  }

  /**
   * Determines the static text used in the notification component.
   */
  @Input() translations: NotificationTranslations;

  /**
   * Query for instances of fusionUiTemplate so we can know if a details template was provided.
   */
  @ContentChildren(TemplateDirective) templates !: QueryList<TemplateDirective>;

  /**
   * Event emitter for when a banner is dismissed. It is then the parent component's responsibility to remove the
   * component from the DOM to completely 'clean up' the DOM.
   */
  @Output() bannerDismissed: EventEmitter<void> = new EventEmitter();

  constructor(
    @Inject(WINDOW) private window: Window,
    protected _translationService: FusionComponentsTranslationService,
  ) {
    super(_translationService);
  }

  /**
   * On component initialization set notification type.
   */
  ngOnInit(): void {
    this.setNotificationType();
  }

  /**
   * Check each template provided and if a details template is found then set the appropriate member variable.
   */
  ngAfterContentInit(): void {
    this.templates.forEach((item: TemplateDirective) => {
      const name: string = item.getName();

      switch (name) {
        case NotificationTemplate.DETAILS:
          this._details = item.template;
          break;
      }
    });
  }

  /**
   * Sets the dismissed flag to true and emits that the banner has been dismissed.
   */
  dismissBanner(): void {
    this._dismissed = true;
    this.bannerDismissed.emit();
  }

  /**
   * Sets the notificationType
   *  - if provided, used that value
   *  - if notificationType already set, use that
   *  - if none of the above, set to NotificationBannerType.INFO
   * If type is ERROR, set dismissible to false by default, if dismissible is defined will use it
   * Set the notification icon class
   *
   * @param notificationType the type of notification message
   */
  setNotificationType(notificationType?: NotificationType): void {
    this._notificationType = notificationType || this._notificationType || NotificationType.INFO;

    this.dismissible = this.dismissible !== undefined ? this.dismissible : !this.notDismissibleByDefault.includes(this._notificationType);

    this.setNotificationIconClass();
  }

  /**
   * Sets the notification icon class
   *  - If notificationIcon is set, use it to create a material design icon class
   *  - Otherwise, use a pre-defined icon class based on the notification banner type (notificationType)
   */
  setNotificationIconClass(): void {
    if (this.notificationIcon) {
      this._notificationIconClass = `mdi-${this.notificationIcon}`;
    } else {
      switch (this._notificationType) {
        case NotificationType.SUCCESS:
          this._notificationIconClass = 'mdi-check-circle';
          break;
        case NotificationType.ERROR:
          this._notificationIconClass = 'mdi-close-circle';
          break;
        case NotificationType.INFO:
          this._notificationIconClass = 'mdi-information';
          break;
        case NotificationType.WARNING:
          this._notificationIconClass = 'mdi-alert';
          break;
        default:
          this._notificationIconClass = 'mdi-information';
          break;
      }
    }
  }

  /**
   * Toggles the boolean that shows/hides the details section (if provided);
   */
  toggleDetailsSection(): void {
    this._isDetailsExpanded = !this._isDetailsExpanded;
  }
}
