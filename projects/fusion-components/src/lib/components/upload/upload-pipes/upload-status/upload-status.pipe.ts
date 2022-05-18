import { Pipe, PipeTransform } from '@angular/core';
import { ProgressBarStatus } from '../../../progress-bar';
import { UploadInfo } from '../../upload.interface';

/**
 * UPLOAD STATUS PIPE
 *
 * The Upload Status Pipe interprets and returns the status of the provided file upload info.
 */
@Pipe({ name: 'uploadStatus', pure: false })
export class UploadStatusPipe implements PipeTransform {

  /**
   * Gets the progress bar status based on the state of the provided file info.
   *  - undefined or no subscription, NOT STARTED
   *  - any errors, ERROR
   *  - no complete, IN PRORGRESS
   *  - otherwise, SUCCESS
   *
   * @param fileInfo The upload file info.
   * @returns The status of the upload to be used for the progress bar.
   */
  transform(fileInfo: UploadInfo): ProgressBarStatus {
    if (!fileInfo || !fileInfo.subscription) {
      return ProgressBarStatus.NOT_STARTED;
    } else if (fileInfo.error) {
      return ProgressBarStatus.ERROR;
    } else if (!fileInfo.isComplete) {
      return ProgressBarStatus.IN_PROGRESS;
    } else {
      return ProgressBarStatus.SUCCESS;
    }
  }
}
