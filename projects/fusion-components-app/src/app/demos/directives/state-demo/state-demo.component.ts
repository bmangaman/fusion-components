import { Component, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DEFAULT_STATE_HEADLINES,
  DEFAULT_STATE_MESSAGES,
  FusionUiState,
  StateLocation,
  StateHeadlines,
  StateMessages,
  StateMessageTemplates,
} from '@fusion-ui/fusion-components';

@Component({
  selector: 'fusion-demo-state',
  templateUrl: './state-demo.component.html',
  styleUrls: ['./state-demo.component.scss']
})
export class StateDemoComponent {
  readonly FusionUiState = FusionUiState;
  readonly StateLocation = StateLocation;

  headlines: StateHeadlines;
  messages: StateMessages;
  messageTemplates: StateMessageTemplates;

  stateForm: FormGroup;

  @ViewChild('customErrorMessage') customErrorMessage: TemplateRef<any>;
  @ViewChild('customNotLoadedMessage') customNotLoadedMessage: TemplateRef<any>;
  @ViewChild('customNoResultsMessage') customNoResultsMessage: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildStateForm();
  }

  buildStateForm(): void {
    this.stateForm = this.fb.group({
      state: [FusionUiState.LOADED, Validators.required],
      location: [StateLocation.GENERIC, Validators.required],

      noResultsHeadline: [DEFAULT_STATE_HEADLINES[FusionUiState.NO_RESULTS]],
      noResultsMessage: [DEFAULT_STATE_MESSAGES[FusionUiState.NO_RESULTS]],
      useCustomNoResultsMessageTemplate: [false],

      notLoadedHeadline: [DEFAULT_STATE_HEADLINES[FusionUiState.NOT_LOADED]],
      notLoadedMessage: [DEFAULT_STATE_MESSAGES[FusionUiState.NOT_LOADED]],
      useCustomNotLoadedMessageTemplate: [false],

      errorHeadline: [DEFAULT_STATE_HEADLINES[FusionUiState.ERROR]],
      errorMessage: [DEFAULT_STATE_MESSAGES[FusionUiState.ERROR]],
      useCustomErrorMessageTemplate: [false],

      useCustomError: [false],
      useCustomLoading: [false],
      useCustomNoResults: [false],
      useCustomNotLoaded: [false],
    });

    this.stateForm.valueChanges.subscribe(() => {
      const form: FormGroup = this.stateForm;

      this.headlines = {
        [FusionUiState.NOT_LOADED]: form.get('notLoadedHeadline').value,
        [FusionUiState.NO_RESULTS]: form.get('noResultsHeadline').value,
        [FusionUiState.ERROR]: form.get('errorHeadline').value,
      };

      this.messages = {
        [FusionUiState.NOT_LOADED]: form.get('notLoadedMessage').value,
        [FusionUiState.NO_RESULTS]: form.get('noResultsMessage').value,
        [FusionUiState.ERROR]: form.get('errorMessage').value,
      };

      this.messageTemplates = {
        [FusionUiState.NOT_LOADED]: form.get('useCustomNotLoadedMessageTemplate').value ? this.customNotLoadedMessage : null,
        [FusionUiState.NO_RESULTS]:form.get('useCustomNoResultsMessageTemplate').value ? this.customNoResultsMessage : null,
        [FusionUiState.ERROR]: form.get('useCustomErrorMessageTemplate').value ? this.customErrorMessage : null,
      }
    });
  }
}
