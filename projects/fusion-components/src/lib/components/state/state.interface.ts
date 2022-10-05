import { TemplateRef } from '@angular/core';
import { State } from '../../shared';

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

export type StateHeadlines = { [key in State]?: string };

export const DEFAULT_STATE_HEADLINES: StateHeadlines = {
  [State.ERROR]: "This content couldn't be loaded.",
  [State.NOT_LOADED]: "This content couldn't be loaded.",
  [State.NO_RESULTS]: 'No Results',
};

export type StateMessages = { [key in State]?: string };

export const DEFAULT_STATE_MESSAGES: StateMessages = {
  [State.ERROR]: 'Refresh the page to try again. If the problem persists, contact your technical support engineer.',
  [State.NOT_LOADED]: 'There was a problem generating this view. Check your permissions and try again.',
  [State.NO_RESULTS]: '',
};

export type StateMessageTemplates = { [key in State]?: TemplateRef<any> };
