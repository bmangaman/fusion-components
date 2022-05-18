import { FactoryProvider, InjectionToken } from '@angular/core';

/**
 * Provide and injection token for the window global to facilitate testing and AOT
 * see: {@link https://stackoverflow.com/questions/36222845/how-to-get-domain-name-for-service-in-angular2|Stack Overflow}
 */
export const WINDOW = new InjectionToken<Window>('window');

export const WindowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: getWindow,
};

export function getWindow(): Window {
  return window;
}
