import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { cloneDeep } from 'lodash';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

import { ErrorMessage } from '../../error-message.interface';
import { GetSingleErrorPipe } from './get-single-error.pipe';

describe('GetSingleErrorPipe', () => {
  let pipe: GetSingleErrorPipe;

  const errorMessages: ErrorMessage[] = [
    {
      priority: 1,
      translation: of('required'),
      error: 'required',
    },
    {
      priority: 2,
      translation: of('cannot start with a hyphen'),
      error: 'noStartHyphen',
    },
    {
      priority: 3,
      translation: of('no special characters'),
      error: 'noSpecialCharacters',
    },
  ];
  const errors = { required: true, noStartHyphen: true, noSpecialCharacters: true };

  beforeEach(() => {
    pipe = new GetSingleErrorPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform()', () => {
    let testErrorMessages: ErrorMessage[];
    let testErrors: any;
    let testControl: AbstractControl;

    beforeEach(() => {
      testErrorMessages = cloneDeep(errorMessages);
      testErrors = cloneDeep(errors);
      testControl = new UntypedFormControl();
      testControl.setErrors(testErrors);
    });

    describe('sorting the errors by priority', () => {
      it('should return the highest priority error text', (done: DoneFn) => {
        pipe.transform(testErrorMessages, testControl.errors).pipe(take(1)).subscribe((res: string | SafeHtml) => {
          expect(res).toEqual('required');
          done();
        });
      });

      it('should handle if there are more errors than error messages', (done: DoneFn) => {
        testErrorMessages.splice(0, 1);
        pipe.transform(testErrorMessages, testControl.errors).pipe(take(1)).subscribe((res: string | SafeHtml) => {
          expect(res).toEqual('cannot start with a hyphen');
          done();
        });
      });

      it('should handle if there are errors but error messages are undefined', (done: DoneFn) => {
        testErrorMessages = undefined;
        pipe.transform(testErrorMessages, testControl.errors).pipe(take(1)).subscribe((res: string | SafeHtml) => {
          expect(res).toEqual('');
          done();
        });
      });

      it('should handle if there are errors but no error messages', (done: DoneFn) => {
        testErrorMessages = [];
        pipe.transform(testErrorMessages, testControl.errors).pipe(take(1)).subscribe((res: string | SafeHtml) => {
          expect(res).toEqual('');
          done();
        });
      });

      it('should handle if the control is undefined', (done: DoneFn) => {
        pipe.transform(testErrorMessages, undefined).pipe(take(1)).subscribe((res: string | SafeHtml) => {
          expect(res).toEqual('');
          done();
        });
      });

      it('should handle a mixture of errors with and without priorities', (done: DoneFn) => {
        delete testErrorMessages[0].priority;
        pipe.transform(testErrorMessages, testControl.errors).pipe(take(1)).subscribe((res: string | SafeHtml) => {
          expect(res).toEqual('cannot start with a hyphen');
          done();
        });
      });

      it('should return the first found item if all errors have no priorities', (done: DoneFn) => {
        delete testErrorMessages[0].priority;
        delete testErrorMessages[1].priority;
        delete testErrorMessages[2].priority;
        pipe.transform(testErrorMessages, testControl.errors).pipe(take(1)).subscribe((res: string | SafeHtml) => {
          expect(res).toEqual('required');
          done();
        });
      });
    });

    describe('finding applicable errors', () => {
      it('should only return applicable errors (all errors)', (done: DoneFn) => {
        testControl.setErrors(testErrors);
        pipe.transform(testErrorMessages, testControl.errors).pipe(take(1)).subscribe((res: string | SafeHtml) => {
          expect(res).toEqual('required');
          done();
        });
      });

      it('should only return applicable errors (errors 2 and 3)', (done: DoneFn) => {
        delete testErrors.required;
        testControl.setErrors(testErrors);
        pipe.transform(testErrorMessages, testControl.errors).pipe(take(1)).subscribe((res: string | SafeHtml) => {
          expect(res).toEqual('cannot start with a hyphen');
          done();
        });
      });

      it('should only return applicable errors (error 3)', (done: DoneFn) => {
        delete testErrors.required;
        delete testErrors.noStartHyphen;
        testControl.setErrors(testErrors);
        pipe.transform(testErrorMessages, testControl.errors).pipe(take(1)).subscribe((res: string | SafeHtml) => {
          expect(res).toEqual('no special characters');
          done();
        });
      });

      it('should only return applicable errors (no errors)', (done: DoneFn) => {
        testControl.setErrors(null);
        pipe.transform(testErrorMessages, testControl.errors).pipe(take(1)).subscribe((res: string | SafeHtml) => {
          expect(res).toEqual('');
          done();
        });
      });

    });
  });
});
