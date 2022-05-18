export enum NotificationTemplate {
  DETAILS = 'details',
}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export interface NotificationTranslations {
  showDetails?: string;
  hideDetails?: string;
  ariaTypeLabel?: {
    success?: string;
    warning?: string;
    info?: string;
    error?: string;
  };
  ariaCloseLabel?: string;
}
