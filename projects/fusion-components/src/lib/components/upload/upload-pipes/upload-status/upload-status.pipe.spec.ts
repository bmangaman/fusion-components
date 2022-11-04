import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { ProgressBarStatus } from '../../../progress-bar';
import { UploadInfo } from '../../upload.interface';
import { UploadStatusPipe } from './upload-status.pipe';

describe('UploadStatusPipe', () => {
  let pipe: UploadStatusPipe;

  beforeEach(() => {
    pipe = new UploadStatusPipe();
  });

  describe('transform()', () => {
    it('should return the progress bar upload status based on the fileInfo', () => {
      const fileInfo: UploadInfo = {} as UploadInfo;

      // undefined and/ or no subscription
      expect(pipe.transform(null as any)).toEqual(ProgressBarStatus.NOT_STARTED);
      expect(pipe.transform(fileInfo)).toEqual(ProgressBarStatus.NOT_STARTED);

      // subscription
      fileInfo.subscription = new Subscription();
      expect(pipe.transform(fileInfo)).toEqual(ProgressBarStatus.IN_PROGRESS);

      // subscription and error
      fileInfo.error = new HttpErrorResponse({});
      expect(pipe.transform(fileInfo)).toEqual(ProgressBarStatus.ERROR);

      // complete and error
      fileInfo.isComplete = true;
      expect(pipe.transform(fileInfo)).toEqual(ProgressBarStatus.ERROR);

      // complete and NO error
      fileInfo.isComplete = true;
      fileInfo.error = null;
      expect(pipe.transform(fileInfo)).toEqual(ProgressBarStatus.SUCCESS);
    });
  });

});
