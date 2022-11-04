import { Pipe, PipeTransform } from '@angular/core';

import { EMPTY, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UploadInfo, UploadTranslations } from '../../upload.interface';

enum UploadState {
  PENDING = 'pending',
  UPLOADING = 'uploading',
  SUCCESSFUL = 'successful',
  ERROR = 'error',
}

/**
 * UPLOAD FILE STATUS PIPE
 *
 * Converts the array of file name(s) to a string to be displayed.
 */
@Pipe({ name: 'uploadFileStatus', pure: false })
export class UploadFileStatusPipe implements PipeTransform {

  /**
   * Gets the status of the file upload, using custom translations if provided and base translations if not.
   *
   * @param fileInfo The upload file info.
   * @param translations The static text to be displayed.
   * @returns The status text of the file upload.
   */
  // eslint-disable-next-line complexity
  transform(fileInfo: UploadInfo, translations?: UploadTranslations): Observable<string> {
    let statusKey: UploadState;
    if (!fileInfo || !fileInfo.subscription) {
      statusKey = UploadState.PENDING;
    } else if (fileInfo.subscription && !fileInfo.isComplete) {
      statusKey = UploadState.UPLOADING;
    } else if (fileInfo.isComplete && !fileInfo.error) {
      statusKey = UploadState.SUCCESSFUL;
    } else {
      statusKey = UploadState.ERROR;
    }

    // use translations from parent component, if provided
    if (translations) {
      if (statusKey === UploadState.ERROR) {
       /**
        * null-safe check for specific error translation; if it does not exist,
        * fall back to error message from network request.
        */
        return translations.errors?.[fileInfo.error!.status] ?
          of(translations.errors?.[fileInfo.error!.status]) :
          of(fileInfo.error!.message);
      }
      return of(translations.statuses?.[statusKey]!);
    }

    // otherwise fall back to "base" translations for app:
    // error states do not have base translations; check network request error message
    if (statusKey === UploadState.ERROR) {
      return of(fileInfo.error!.message);
    }

    return of('');
  }
}
