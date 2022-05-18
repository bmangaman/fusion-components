export interface WizardStep {
  title: string;
  isDisabled?: boolean;
  isCompleted?: boolean;
  isCurrent?: boolean;
  isHidden?: boolean;
  uuid?: string;
}
