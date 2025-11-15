import { Component, ViewChild, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {
  DEFAULT_STATE_HEADLINES,
  DEFAULT_STATE_MESSAGES,
  State,
  StateLocation,
  StateHeadlines,
  StateMessages,
  StateMessageTemplates,
} from '@fusion-components';

@Component({
    selector: 'fusion-demo-state',
    templateUrl: './state-demo.component.html',
    styleUrls: ['./state-demo.component.scss'],
    standalone: false
})
export class StateDemoComponent {
  readonly State = State;
  readonly StateLocation = StateLocation;

  headlines: StateHeadlines;
  messages: StateMessages;
  messageTemplates: StateMessageTemplates;

  stateForm: UntypedFormGroup;

  @ViewChild('customErrorMessage') customErrorMessage: TemplateRef<any>;
  @ViewChild('customNotLoadedMessage') customNotLoadedMessage: TemplateRef<any>;
  @ViewChild('customNoResultsMessage') customNoResultsMessage: TemplateRef<any>;

  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.buildStateForm();
  }

  buildStateForm(): void {
    this.stateForm = this.fb.group({
      state: [State.LOADED, Validators.required],
      location: [StateLocation.GENERIC, Validators.required],

      noResultsHeadline: [DEFAULT_STATE_HEADLINES[State.NO_RESULTS]],
      noResultsMessage: [DEFAULT_STATE_MESSAGES[State.NO_RESULTS]],
      useCustomNoResultsMessageTemplate: [false],

      notLoadedHeadline: [DEFAULT_STATE_HEADLINES[State.NOT_LOADED]],
      notLoadedMessage: [DEFAULT_STATE_MESSAGES[State.NOT_LOADED]],
      useCustomNotLoadedMessageTemplate: [false],

      errorHeadline: [DEFAULT_STATE_HEADLINES[State.ERROR]],
      errorMessage: [DEFAULT_STATE_MESSAGES[State.ERROR]],
      useCustomErrorMessageTemplate: [false],

      useCustomError: [false],
      useCustomLoading: [false],
      useCustomNoResults: [false],
      useCustomNotLoaded: [false],
    });

    this.stateForm.valueChanges.subscribe(() => {
      const form: UntypedFormGroup = this.stateForm;

      this.headlines = {
        [State.NOT_LOADED]: form.get('notLoadedHeadline')?.value,
        [State.NO_RESULTS]: form.get('noResultsHeadline')?.value,
        [State.ERROR]: form.get('errorHeadline')?.value,
      };

      this.messages = {
        [State.NOT_LOADED]: form.get('notLoadedMessage')?.value,
        [State.NO_RESULTS]: form.get('noResultsMessage')?.value,
        [State.ERROR]: form.get('errorMessage')?.value,
      };

      this.messageTemplates = {
        [State.NOT_LOADED]: form.get('useCustomNotLoadedMessageTemplate')?.value ? this.customNotLoadedMessage : null,
        [State.NO_RESULTS]:form.get('useCustomNoResultsMessageTemplate')?.value ? this.customNoResultsMessage : null,
        [State.ERROR]: form.get('useCustomErrorMessageTemplate')?.value ? this.customErrorMessage : null,
      }
    });
  }
}
