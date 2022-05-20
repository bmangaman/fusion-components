import { Size, State } from '@fusion-components/lib/shared';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum ButtonInputType {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

export interface GenerateButtonClassesPipeConfig {
  type: ButtonType;
  size: Size;
  isSelected: boolean;
  noBorder: boolean;
  icon: string;
  text: string;
  classes: string[];
}

export interface IsButtonDisabledPipeConfig {
  isDisabled: boolean;
  state: State;
}

export interface ButtonAria {
  label?: string;
  haspopup?: boolean;
  controls?: string;
  expanded?: boolean;
  loadingSpinner?: string;
  iconAriaLabel?: string;
  menuIconAriaLabel?: string;
}
