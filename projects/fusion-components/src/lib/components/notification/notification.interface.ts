export enum NotificationTemplate {
  DETAILS = 'details',
}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  UNKNOWN = 'unknown',
}

export interface NotificationTranslations {
  showDetails: string;
  hideDetails: string;
  ariaCloseLabel: string;
  ariaTypeLabel: {
    success: string;
    warning: string;
    info: string;
    error: string;
    unknown: string;
  };
}

export const DEFAULT_NOTIFICATION_TRANSLATIONS: NotificationTranslations = {
  showDetails: 'Show Details',
  hideDetails: 'Hide Details',
  ariaCloseLabel: 'Close',
  ariaTypeLabel: {
    success: 'success',
    warning: 'warning',
    info: 'info',
    error: 'error',
    unknown: 'unknown',
  },
};
