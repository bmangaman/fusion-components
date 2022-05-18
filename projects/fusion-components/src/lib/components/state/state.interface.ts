import { TemplateRef } from '@angular/core';
import { FusionUiState } from '../../shared';

export enum StateLocation {
  TABLE = 'table',
  GENERIC = 'generic',
}

export interface StateCssClasses {
  wrapper: string[];
  inner: string[];
  graphic: string[];
  content: string[];
}

export interface StateHeadlines {
  [FusionUiState.ERROR]?: string;
  [FusionUiState.NOT_LOADED]?: string;
  [FusionUiState.NO_RESULTS]?: string;
}

export const DEFAULT_STATE_HEADLINES: StateHeadlines = {
  [FusionUiState.ERROR]: "This content couldn't be loaded.",
  [FusionUiState.NOT_LOADED]: "This content couldn't be loaded.",
  [FusionUiState.NO_RESULTS]: 'No Results',
};

export interface StateMessages {
  [FusionUiState.ERROR]?: string;
  [FusionUiState.NOT_LOADED]?: string;
  [FusionUiState.NO_RESULTS]?: string;
}

export const DEFAULT_STATE_MESSAGES: StateMessages = {
  [FusionUiState.ERROR]: 'Refresh the page to try again. If the problem persists, contact your technical support engineer.',
  [FusionUiState.NOT_LOADED]: 'There was a problem generating this view. Check your permissions and try again.',
  [FusionUiState.NO_RESULTS]: null,
};

export interface StateMessageTemplates {
  [FusionUiState.ERROR]?: TemplateRef<any>;
  [FusionUiState.NOT_LOADED]?: TemplateRef<any>;
  [FusionUiState.NO_RESULTS]?: TemplateRef<any>;
}
