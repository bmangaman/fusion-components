import { ElementRef } from '@angular/core';

import { Subject, Subscription } from 'rxjs';

import { Location, Position, PositionConfig } from './interfaces';

export class Utilities {
  /**
   * Null-safe way to unsubscribe from a subscription
   *
   * @param sub the subscription to unsubscribe
   */
  static unsubscribe = (sub: Subscription): void => {
    if (!!sub && !sub.closed) {
      sub.unsubscribe();
    }
  };

  /**
   * Null-safe way to unsubscribe from an array of subscriptions
   *
   * @param subs the array of subscriptions from which to potentially unsubscribe
   */
   static unsubscribeAll = (subs: Subscription[]): void => {
    if (!!subs && !!subs.length) {
      subs.forEach(this.unsubscribe);
    }
  };

  /**
   * Destroys the provided Subject using next and complete.
   *
   * @param subject Rxjs subject of any type.
   */
  static unsubscribeSubject = (subject: Subject<any>): void => {
    if (subject) {
      subject.complete();
      subject.unsubscribe();
    }
  };

  /**
   * Function to generate the position values (left, right, top, bottom, transform) for an element based on the position
   * of the element that triggered the element (such as a button or icon).
   *
   * @param element The element to be absolutely positioned in reference to the trigger element and window.
   * @param triggerElement The element that triggered an element to be displayed. Uses its coordinates to generate the position values.
   * @param position The position relative to the trigger element.
   * @param spacing Adds additional spacing between the positions and the triggeredElement.
   * @param win The Window.
   * @param doc The Document.
   * @returns The calculated position values to be applied to the new element (menu, tooltip, etc.).
   */
  // eslint-disable-next-line complexity
  static getElementAbsolutePositioning = (
    element: ElementRef,
    triggerElement: ElementRef,
    position: Position | Location,
    spacing: number = 0,
    win: Window = window,
    doc: Document = document,
  ): PositionConfig => {
    if (!element || !element.nativeElement || !triggerElement || !triggerElement.nativeElement || !win || !doc) {
      return {};
    }

    const elementHeight: number = element.nativeElement.offsetHeight;
    const elementWidth: number = element.nativeElement.offsetWidth;

    const triggerElementRect: DOMRect = triggerElement.nativeElement.getBoundingClientRect();

    const triggerElementHeight: number = triggerElementRect.height || triggerElement.nativeElement.offsetHeight;
    const triggerElementWidth: number = triggerElementRect.width || triggerElement.nativeElement.offsetWidth;

    const scrollTop: number = (win.scrollY || doc.documentElement.scrollTop) - (doc.documentElement.clientTop || 0);
    const scrollLeft: number = (win.scrollX || doc.documentElement.scrollLeft) - (doc.documentElement.clientLeft || 0);

    const triggerElementLeft: number = triggerElementRect.left + scrollTop;
    const triggerElementTop: number = triggerElementRect.top + scrollLeft;

    switch (position) {
      case Position.TOP:
      case Location.TOP:
      default:
        return {
          top: `${triggerElementTop - elementHeight - spacing}px`,
          left: `${triggerElementLeft + (triggerElementWidth / 2)}px`,
          transform: 'translateX(-50%)',
        };

      case Location.TOP_LEFT:
        return {
          top: `${triggerElementTop - elementHeight - spacing}px`,
          left: `${triggerElementLeft}px`,
        };

      case Location.TOP_RIGHT:
        return {
          top: `${triggerElementTop - elementHeight - spacing}px`,
          left: `${triggerElementLeft + triggerElementWidth - elementWidth}px`,
        };

      case Position.BOTTOM:
      case Location.BOTTOM:
        return {
          top: `${triggerElementTop + triggerElementHeight + spacing}px`,
          left: `${triggerElementLeft + (triggerElementWidth / 2)}px`,
          transform: 'translateX(-50%)',
        };

      case Location.BOTTOM_LEFT:
        return {
          top: `${triggerElementTop + triggerElementHeight + spacing}px`,
          left: `${triggerElementLeft}px`,
        };

      case Location.BOTTOM_RIGHT:
        return {
          top: `${triggerElementTop + triggerElementHeight + spacing}px`,
          left: `${triggerElementLeft + triggerElementWidth - elementWidth}px`,
        };

      case Position.LEFT:
      case Location.LEFT:
        return {
          top: `${triggerElementTop + (triggerElementHeight / 2)}px`,
          left: `${triggerElementLeft - elementWidth - spacing}px`,
          transform: 'translateY(-50%)',
        };

      case Position.RIGHT:
      case Location.RIGHT:
        return {
          top: `${triggerElementTop + (triggerElementHeight / 2)}px`,
          left: `${triggerElementLeft + triggerElementWidth + spacing}px`,
          transform: 'translateY(-50%)',
        };

      case Position.CENTER:
      case Location.CENTER:
        return {
          top: `${triggerElementTop + triggerElementHeight / 2}px`,
          left: `${triggerElementLeft + triggerElementWidth / 2}px`,
          transform: 'translate(-50%, -50%)',
        };
        
    }
  };

  /**
   * Checks if the provided value is null or undefined.
   * @param val The value to be checked.
   * @returns True if the provided value is null or undefined; false otherwise.
   */
  static isNullOrUndefined = (val: any): boolean => {
    return val === null || val === 'undefined' || typeof val === 'undefined';
  }
}

/**
 * This is to apply Partial<> to all the nested objects inside the object.
 */
export type DeepPartial<T> = T extends Record<string, any> ? { [K in keyof T]?: DeepPartial<T[K]> } : T;
