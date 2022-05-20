import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NotificationType } from '@fusion-components/lib/components/notification/notification.interface';
/**
 * NOTIFICATION PAGE OBJECT
 *
 * Page object for a single f-notification component
 * Makes it easier to find certain f-notification attributes and elements
 */
export class NotificationPageObject {

  get notification(): DebugElement {
    if (this.selector) {
      return this.fixture.debugElement.query(By.css(this.selector));
    } else {
      return this.fixture.debugElement.query(By.css('f-notification'));
    }
  }

  get text(): string {
    const innerNotification = this.notification.query(By.css('.f-notification__inner'));
    return innerNotification?.nativeElement.innerText.trim() ?? '';
  }

  get type(): NotificationType {
    if (this.classList.contains('f-notification__info')) {
      return NotificationType.INFO;
    }

    if (this.classList.contains('f-notification__success')) {
      return NotificationType.SUCCESS;
    }

    if (this.classList.contains('f-notification__warning')) {
      return NotificationType.WARNING;
    }

    if (this.classList.contains('f-notification__error')) {
      return NotificationType.ERROR;
    }

    return NotificationType.UNKNOWN;
  }

  get role(): string {
    return this.notification.nativeElement.attributes.role.value;
  }

  get id(): string {
    return this.notification.nativeElement.id;
  }

  get classList(): DOMTokenList {
    return this.notification.nativeElement.classList;
  }

  get closeButton(): HTMLButtonElement {
    return this.notification.nativeElement.querySelector('.f-notification__close-button');
  }

  get closeButtonIcon(): HTMLElement {
    return this.notification.query(By.css('.f-notification__close-button-icon'))?.nativeElement;
  }

  get notificationIcon(): HTMLElement {
    return this.notification.query(By.css('.f-notification__icon'))?.nativeElement;
  }

  get detailsButton(): HTMLButtonElement {
    return this.notification.query(By.css('.f-notification__details-button'))?.nativeElement;
  }

  get detailsContent(): HTMLElement {
    return this.notification.query(By.css('.f-notification__details-content'))?.nativeElement;
  }

  /**
   * Creates a page object for a f-notification DOM element based on the provided fixture
   *
   * @param fixture the parent DOM fixture/element that houses the f-notification
   * @param selector The selector to use in which to find the banner
   */
  constructor(fixture: ComponentFixture<any>, private selector?: string) {
    this.fixture = fixture;
  }
  private fixture: ComponentFixture<any>;

  /**
   * Helper method to get a notification based on its id.
   *
   * @param fixture the fixture for the test bed.
   * @param id the id to check with.
   * @returns the NotificationPageObject of the notification or null if it can't be found.
   */
  static getNotificationById(fixture: ComponentFixture<any>, id: string): NotificationPageObject {
    return new NotificationPageObject(fixture, `#${id}`);
  }

  /**
   * Checks if notification is of the provided type
   *
   * @param type the banner type to check against.
   * @returns the DebugElement of the notification or null if it can't be found.
   */
  isType(type: NotificationType): boolean {
    return this.notification.nativeElement.classList.contains(`f-notification__${type}`);
  }

  /**
   * Clicks on the details button to expand the details section.
   */
  openDetails(): void {
    this.detailsButton.click();
  }

  /**
   * Clicks on the close button to dismiss the notification. Will cause the bannerDismissed event to emit.
   */
  dismiss(): void {
    this.closeButton.click();
  }
}
