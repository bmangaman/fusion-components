import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { DEFAULT_UPLOAD_TRANSLATIONS, UploadInfo, UploadTranslations } from '../../upload.interface';
import { UploadFileStatusPipe } from './upload-file-status.pipe';

describe('UploadFileStatusPipe', () => {
  let pipe: UploadFileStatusPipe;
  let fileInfo: UploadInfo;
  let translations: UploadTranslations;

  beforeEach(() => {
    translations = { ...DEFAULT_UPLOAD_TRANSLATIONS };
    fileInfo = {} as UploadInfo;
    pipe = new UploadFileStatusPipe();
  });

  describe('transform()', () => {
    describe('translation behavior', () => {
      it('should use custom translations if provided', (done: DoneFn) => {
        pipe.transform(null as any, translations).subscribe((status: string) => {
          expect(status).toBe(translations.statuses!.pending as string);
          done();
        });
      });
    });

    it('should correctly detect and set PENDING status if no data available yet', (done: DoneFn) => {
      pipe.transform(null as any, translations).subscribe((status: string) => {
        expect(status).toBe(translations.statuses!.pending as string);
        done();
      });
    });

    it('should correctly detect and set PENDING status if upload is ongoing', (done: DoneFn) => {
      fileInfo.subscription = null as any;
      fileInfo.isComplete = false;
      fileInfo.error = null;

      pipe.transform(fileInfo, translations).subscribe((status: string) => {
        expect(status).toBe(translations.statuses!.pending as string);
        done();
      });
    });

    it('should correctly detect and set UPLOADING status', (done: DoneFn) => {
      fileInfo.subscription = new Subscription();
      fileInfo.isComplete = false;
      fileInfo.error = null;

      pipe.transform(fileInfo, translations).subscribe((status: string) => {
        expect(status).toBe(translations.statuses!.uploading as string);
        done();
      });
    });

    it('should correctly detect and set SUCCESSFUL status', (done: DoneFn) => {
      fileInfo.subscription = new Subscription();
      fileInfo.isComplete = true;
      fileInfo.error = null;

      pipe.transform(fileInfo, translations).subscribe((status: string) => {
        expect(status).toBe(translations.statuses!.successful as string);
        done();
      });
    });

    it('should select appropriate error key from provided translations', (done: DoneFn) => {
      fileInfo.subscription = new Subscription();
      fileInfo.isComplete = true;
      fileInfo.error = new HttpErrorResponse({ status: 404, statusText: 'Not Found'});

      translations.errors = { 404: 'Custom Error Message' };
      pipe.transform(fileInfo, translations).subscribe((status: string) => {
        expect(status).toBe(translations.errors![404] as string);
        done();
      });
    });

    it('should use the message backup if no translations were found', (done: DoneFn) => {
      fileInfo.subscription = new Subscription();
      fileInfo.isComplete = true;
      const errorMessage = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
      (errorMessage as any).message = 'error message';
      fileInfo.error = errorMessage;

      pipe.transform(fileInfo, translations).subscribe((status: string) => {
        expect(status).toBe('error message');
        done();
      });
    });

    it('should use the message backup if no translations were provided', (done: DoneFn) => {
      fileInfo.subscription = new Subscription();
      fileInfo.isComplete = true;
      const errorMessage = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
      (errorMessage as any).message = 'error message';
      fileInfo.error = errorMessage;

      pipe.transform(fileInfo, undefined).subscribe((status: string) => {
        expect(status).toBe('error message');
        done();
      });
    });

    it('should return an empty string if no translations', (done: DoneFn) => {
      fileInfo.subscription = new Subscription();
      fileInfo.isComplete = true;
      fileInfo.error = null;

      pipe.transform(fileInfo, undefined).subscribe((status: string) => {
        expect(status).toBe('');
        done();
      });
    });
  });
});
