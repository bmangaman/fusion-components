import { Component, Input } from '@angular/core';

import { FusionUiSize, FusionUiState } from '../../shared';
import {
  DEFAULT_STATE_HEADLINES,
  DEFAULT_STATE_MESSAGES,
  StateCssClasses,
  StateHeadlines,
  StateLocation,
  StateMessages,
  StateMessageTemplates,
} from './state.interface';

/**
 * STATE COMPONENT
 *
 * The state component makes it easy to display consitent states througout an application. Developed to be used with
 * the STATE DIRECTIVE, but can be used in isolation.
 */
@Component({
  selector: 'fusion-ui-state',
  templateUrl: './state.component.html',
})
export class StateComponent {
  readonly FusionUiSize = FusionUiSize;
  readonly FusionUiState = FusionUiState;

  cssClasses: StateCssClasses;

  /**
   * Determines the state of components. Used to generate the appropriate classes,
   * which appends the correct styling and displays the correct images.
   *
   * Currently supports LOADING, NOT_LOADED, NO_RESULTS, and ERROR.
   */
  private _state: FusionUiState;
  @Input()
  set state(state: FusionUiState) {
    this._state = state;
    this.generateCssClasses();
  }
  get state(): FusionUiState {
    return this._state;
  }

  /**
   * Determines the location of the component. Used to generate the appropriate classes,
   * which appends the correct styling and displays the correct images.
   *
   * Currently either TABLE or GENERIC.
   */
  private _location: StateLocation;
  @Input()
  set location(location: StateLocation) {
    this._location = location;
    this.generateCssClasses();
  }
  get location(): StateLocation {
    return this._location;
  }

  /**
   * Determines the text of the headlines.
   */
  private _headlines: StateHeadlines = DEFAULT_STATE_HEADLINES;
  @Input()
  set headlines(headlines: StateHeadlines) {
    this._headlines = { ...this._headlines, ...headlines };
  }
  get headlines(): StateHeadlines {
    return this._headlines;
  }

  /**
   * Determines the text of the messages.
   */
  private _messages: StateMessages = DEFAULT_STATE_MESSAGES;
  @Input()
  set messages(messages: StateMessages) {
    this._messages = { ...this._messages, ...messages };
  }
  get messages(): StateMessages {
    return this._messages;
  }

  /**
   * Determines the custom template of the messages. If set, overrides and is displayed instead
   * of the message text. Should be used if the message content has actions (links, refresh, etc.).
   */
  @Input() messageTemplates: StateMessageTemplates;

  /**
   * Determines the aria-label attribute of the loading spinner (for the LOADING state).
   */
  @Input() loadingAriaLabel: string;

  /**
   * Generates the CSS classes for
   *  - the wrapper div
   *  - the inner div
   *  - the inner div graphic i
   *  - the inner div content div
   */
  generateCssClasses(): void {
    const base = 'fusion-ui-state';

    const wrapper: string[] = [base];
    const inner: string[] = [`${base}__inner`];
    const graphic: string[] = [`${base}__inner-graphic`];
    const content: string[] = [`${base}__inner-content`];

    if (!!this.state) {
      wrapper.push(`${base}--${this.state}`);
      inner.push(`${base}__inner--${this.state}`);
      graphic.push(`${base}__inner-graphic--${this.state}`);
      content.push(`${base}__inner-content--${this.state}`);
    }

    if (!!this.location) {
      wrapper.push(`${base}--${this.location}`);
      inner.push(`${base}__inner--${this.location}`);
      graphic.push(`${base}__inner-graphic--${this.location}`);
      content.push(`${base}__inner-content--${this.location}`);
    }

    this.cssClasses = { wrapper, inner, graphic, content };
  }
}
