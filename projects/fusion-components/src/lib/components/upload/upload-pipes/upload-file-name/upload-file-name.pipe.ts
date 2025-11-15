import { Pipe, PipeTransform } from '@angular/core';

import { UploadInfo } from '../../upload.interface';

/**
 * UPLOAD FILE NAME PIPE
 *
 * Converts the array of file name(s) to a string to be displayed.
 */
@Pipe({
    name: 'uploadFileName',
    standalone: false
})
export class UploadFileNamePipe implements PipeTransform {

  /**
   * Gets the name(s) of the file(s) provided.
   *
   * @param fileInfo The upload file info.
   * @returns The name(s) of the file(s) provided.
   */
  transform(fileInfo: UploadInfo): string {
    return !!fileInfo && !!fileInfo.files ? fileInfo.files.map((file: File) => file.name).join(', ') : '';
  }
}
