import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { camelCase, cloneDeep } from 'lodash';

import { FusionUiState } from '../../shared';
import { StateComponentPageObject } from './state.component.spec.po';
import {
  DEFAULT_STATE_HEADLINES,
  DEFAULT_STATE_MESSAGES,
  StateHeadlines,
   StateLocation,
   StateMessages,
   StateMessageTemplates,
  } from './state.interface';
import { StateComponentsModule } from './state.module';

@Component({
  selector: 'fusion-ui-test-component',
  template: `
  <fusion-ui-state
    [state]="state"
    [location]="location"
    [headlines]="headlines"
    [messages]="messages"
    [messageTemplates]="messageTemplates"
    [loadingAriaLabel]="loadingAriaLabel">
  </fusion-ui-state>

  <ng-template #notLoaded>Not Loaded</ng-template>
  <ng-template #noResults>No Results</ng-template>
  <ng-template #error>Error</ng-template>
  `,
})
export class StateTestComponent {
  @ViewChild('error') [FusionUiState.ERROR]: TemplateRef<any>;

  // These next two should correspond to the FusionUiState enum as well, but they had dashes in them
  // and the compiler was not happy about that, so we comprimised by camelCasing the enum values where needed.
  // @ts-ignore
  @ViewChild('notLoaded') [camelCase(FusionUiState.NOT_LOADED)]: TemplateRef<any>;
  // @ts-ignore
  @ViewChild('noResults') [camelCase(FusionUiState.NO_RESULTS)]: TemplateRef<any>;

  state: FusionUiState;
  location: StateLocation;
  headlines: StateHeadlines = DEFAULT_STATE_HEADLINES;
  messages: StateMessages = DEFAULT_STATE_MESSAGES;
  messageTemplates: StateMessageTemplates = {};
  loadingAriaLabel: string;
}

describe('StateComponent', () => {
  let component: StateTestComponent;
  let fixture: ComponentFixture<StateTestComponent>;
  let page: StateComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        StateTestComponent,
      ],
      imports: [
        StateComponentsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(StateTestComponent);
    component = fixture.componentInstance;
    page = new StateComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(page.state.state).toBeTruthy();
  });

  describe('the LOADING state', () => {
    beforeEach(() => {
      component.state = FusionUiState.LOADING;
      fixture.detectChanges();
    });

    it('should append the correct classes to the wrapper and inner elements', () => {
      expect(page.state.container).toBeTruthy();
      expect(page.state.container.classList).toContain('fusion-ui-state');
      expect(page.state.container.classList).toContain('fusion-ui-state--loading');

      expect(page.state.inner).toBeTruthy();
      expect(page.state.inner.classList).toContain('fusion-ui-state__inner');
      expect(page.state.inner.classList).toContain('fusion-ui-state__inner--loading');
    });

    it('should display the loading spinner', () => {
      expect(page.state.graphic).toBeFalsy();
      expect(page.state.content).toBeFalsy();
      expect(page.state.loadingSpinner).toBeTruthy();
    });
  });

  describe('the NOT_LOADED state', () => {
    beforeEach(() => {
      component.state = FusionUiState.NOT_LOADED;
      fixture.detectChanges();
    });

    it('should display the graphic and content elements', () => {
      expect(page.state.graphic).toBeTruthy();
      expect(page.state.content).toBeTruthy();
    });

    it('should append the correct classes to the wrapper, inner, graphic, and content elements', () => {
      component.location = StateLocation.GENERIC;
      fixture.detectChanges();
      testClasses(FusionUiState.NOT_LOADED, StateLocation.GENERIC);

      component.location = StateLocation.TABLE;
      fixture.detectChanges();
      testClasses(FusionUiState.NOT_LOADED, StateLocation.TABLE);
    });

    it('should display the correct headline text based on the provided input', () => {
      expect(page.state.headline).toBeTruthy();
      expect(page.state.headline.innerText).toEqual(DEFAULT_STATE_HEADLINES[FusionUiState.NOT_LOADED]);

      const customHeadline = 'Custom Headline';
      setComponentHeadlines(FusionUiState.NOT_LOADED, customHeadline);
      fixture.detectChanges();
      expect(page.state.headline.innerText).toEqual(customHeadline);
    });

    it('should display the correct message text based on the provided input', () => {
      expect(page.state.message).toBeTruthy();
      expect(page.state.message.innerText).toEqual(DEFAULT_STATE_MESSAGES[FusionUiState.NOT_LOADED]);

      const customMessage = 'Custom Message';
      setComponentMessages(FusionUiState.NOT_LOADED, customMessage);
      fixture.detectChanges();
      expect(page.state.message.innerText).toEqual(customMessage);
    });

    it('should display the correct message template based on the provided input', () => {
      expect(page.state.message).toBeTruthy();
      expect(page.state.message.innerText).toEqual(DEFAULT_STATE_MESSAGES[FusionUiState.NOT_LOADED]);

      setComponentMessageTemplates(FusionUiState.NOT_LOADED, true);
      fixture.detectChanges();
      expect(page.state.message.innerText).toEqual('Not Loaded');
    });
  });

  describe('the NO_RESULTS state', () => {
    beforeEach(() => {
      component.state = FusionUiState.NO_RESULTS;
      fixture.detectChanges();
    });

    it('should display the graphic and content elements', () => {
      expect(page.state.graphic).toBeTruthy();
      expect(page.state.content).toBeTruthy();
    });

    it('should append the correct classes to the wrapper, inner, graphic, and content elements', () => {
      component.location = StateLocation.GENERIC;
      fixture.detectChanges();
      testClasses(FusionUiState.NO_RESULTS, StateLocation.GENERIC);

      component.location = StateLocation.TABLE;
      fixture.detectChanges();
      testClasses(FusionUiState.NO_RESULTS, StateLocation.TABLE);
    });

    it('should display the correct headline text based on the provided input', () => {
      expect(page.state.headline).toBeTruthy();
      expect(page.state.headline.innerText).toEqual(DEFAULT_STATE_HEADLINES[FusionUiState.NO_RESULTS]);

      const customHeadline = 'Custom Headline';
      setComponentHeadlines(FusionUiState.NO_RESULTS, customHeadline);
      fixture.detectChanges();
      expect(page.state.headline.innerText).toEqual(customHeadline);
    });

    it('should display the correct message text based on the provided input', () => {
      expect(page.state.message).toBeFalsy();

      const customMessage = 'Custom Message';
      setComponentMessages(FusionUiState.NO_RESULTS, customMessage);
      fixture.detectChanges();
      expect(page.state.message).toBeTruthy();
      expect(page.state.message.innerText).toEqual(customMessage);
    });

    it('should display the correct message template based on the provided input', () => {
      expect(page.state.message).toBeFalsy();

      setComponentMessageTemplates(FusionUiState.NO_RESULTS, true);
      fixture.detectChanges();
      expect(page.state.message).toBeTruthy();
      expect(page.state.message.innerText).toEqual('No Results');
    });
  });

  describe('the ERROR state', () => {
    beforeEach(() => {
      component.state = FusionUiState.ERROR;
      fixture.detectChanges();
    });

    it('should display the graphic and content elements', () => {
      expect(page.state.graphic).toBeTruthy();
      expect(page.state.content).toBeTruthy();
    });

    it('should append the correct classes to the wrapper, inner, graphic, and content elements', () => {
      component.location = StateLocation.GENERIC;
      fixture.detectChanges();
      testClasses(FusionUiState.ERROR, StateLocation.GENERIC);

      component.location = StateLocation.TABLE;
      fixture.detectChanges();
      testClasses(FusionUiState.ERROR, StateLocation.TABLE);
    });

    it('should display the correct headline text based on the provided input', () => {
      expect(page.state.headline).toBeTruthy();
      expect(page.state.headline.innerText).toEqual(DEFAULT_STATE_HEADLINES[FusionUiState.ERROR]);

      const customHeadline = 'Custom Headline';
      setComponentHeadlines(FusionUiState.ERROR, customHeadline);
      fixture.detectChanges();
      expect(page.state.headline.innerText).toEqual(customHeadline);
    });

    it('should display the correct message text based on the provided input', () => {
      expect(page.state.message).toBeTruthy();
      expect(page.state.message.innerText).toEqual(DEFAULT_STATE_MESSAGES[FusionUiState.ERROR]);

      const customMessage = 'Custom Message';
      setComponentMessages(FusionUiState.ERROR, customMessage);
      fixture.detectChanges();
      expect(page.state.message.innerText).toEqual(customMessage);
    });

    it('should display the correct message template based on the provided input', () => {
      expect(page.state.message).toBeTruthy();
      expect(page.state.message.innerText).toEqual(DEFAULT_STATE_MESSAGES[FusionUiState.ERROR]);

      setComponentMessageTemplates(FusionUiState.ERROR, true);
      fixture.detectChanges();
      expect(page.state.message.innerText).toEqual('Error');
    });
  });

  /**
   * Helper function to test that the correct DOM elements are appended with the correct classes based
   * on the provided state and location inputs.
   *
   * @param state The state (FusionUiSTate) of the component.
   * @param location the location (StateLocation) of the component.
   */
  function testClasses(state: FusionUiState, location: StateLocation): void {
    expect(page.state.container).toBeTruthy();
    expect(page.state.container.classList).toContain('fusion-ui-state');
    expect(page.state.container.classList).toContain(`fusion-ui-state--${state}`);
    expect(page.state.container.classList).toContain(`fusion-ui-state--${location}`);

    expect(page.state.inner).toBeTruthy();
    expect(page.state.inner.classList).toContain('fusion-ui-state__inner');
    expect(page.state.inner.classList).toContain(`fusion-ui-state__inner--${state}`);
    expect(page.state.inner.classList).toContain(`fusion-ui-state__inner--${location}`);

    expect(page.state.graphic).toBeTruthy();
    expect(page.state.graphic.classList).toContain('fusion-ui-state__inner-graphic');
    expect(page.state.graphic.classList).toContain(`fusion-ui-state__inner-graphic--${state}`);
    expect(page.state.graphic.classList).toContain(`fusion-ui-state__inner-graphic--${location}`);

    expect(page.state.content).toBeTruthy();
    expect(page.state.content.classList).toContain('fusion-ui-state__inner-content');
    expect(page.state.content.classList).toContain(`fusion-ui-state__inner-content--${state}`);
    expect(page.state.content.classList).toContain(`fusion-ui-state__inner-content--${location}`);
  }

  /**
   * Updates the test component's headlines variable based on the provided state and headline inputs.
   *
   * @param state The state (FusionUiState) of the component.
   * @param headline The custom headline string;
   */
  function setComponentHeadlines(state: FusionUiState, headline: string): void {
    const headlines: StateHeadlines = cloneDeep(component.headlines);
    headlines[state] = headline;
    component.headlines = cloneDeep(headlines);
  }

  /**
   * Updates the test component's messages variable based on the provided state and message inputs.
   *
   * @param state The state (FusionUiState) of the component.
   * @param message The custom message string;
   */
  function setComponentMessages(state: FusionUiState, message: string): void {
    const messages: StateMessages = cloneDeep(component.messages);
    messages[state] = message;
    component.messages = cloneDeep(messages);
  }

  /**
   * Updates the test component's messageTemplates variable based on the provided state and whether or not is should be set.
   *
   * @param state The state (FusionUiState) of the component.
   * @param isSet Determines whether or not to set the message template to null or the templateRef.
   */
  function setComponentMessageTemplates(state: FusionUiState, isSet: boolean): void {
    const messageTemplates: StateMessageTemplates = cloneDeep(component.messageTemplates);
    messageTemplates[state] = isSet ? component[camelCase(state)] : null;
    component.messageTemplates = cloneDeep(messageTemplates);
  }
});
