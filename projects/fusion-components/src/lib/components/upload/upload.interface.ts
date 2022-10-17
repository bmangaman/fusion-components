import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

export interface UploadTranslations {
  instructions: string;
  buttons: {
    browse: string;
    upload: string;
    cancel: string;
    remove: string;
    dismiss: string;
  };
  statuses: {
    pending: string;
    uploading: string;
    successful: string;
  };
  errors: { [key: string]: string; };
}

export const DEFAULT_UPLOAD_TRANSLATIONS: UploadTranslations = {
  instructions: 'Browse to upload file.',
  buttons: {
    browse: 'Browse...',
    upload: 'Upload File',
    cancel: 'Cancel Upload',
    remove: 'Remove File',
    dismiss: 'Dismiss',
  },
  statuses: {
    pending: 'Pending',
    uploading: 'Uploading...',
    successful: 'File uploaded successfully.',
  },
  errors: {},
};

/**
 * Status object for a file upload operation, an array of these is emitted for sf-upload onSelection, onProgress, and onFinished outputs.
 */
export interface UploadInfo {
  /** The array of File objects (if sf-upload multiple option is true) defining file(s) being uploaded. */
  files: File[];
  /** Number of bytes uploaded so far. */
  progressBytes: number;
  /** Total number of bytes to upload. */
  totalBytes: number;
  /** Null, or http error object if http request fails. */
  error: HttpErrorResponse | null;
  /** True if upload is finished, whether it succeeded or an error was returned. */
  isComplete: boolean;
  /** The subscription returned by uploadFunction, for internal use. */
  subscription?: Subscription;
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
