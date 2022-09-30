import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { cloneDeep } from 'lodash';
import { of, zip } from 'rxjs';
import { take } from 'rxjs/operators';

import { ErrorMessage } from '../../error-message.interface';
import { GetAllErrorsPipe } from './get-all-errors.pipe';

describe('GetAllErrorsPipe', () => {
  let pipe: GetAllErrorsPipe;

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
  const errors: any = { required: true, noStartHyphen: true, noSpecialCharacters: true };

  beforeEach(() => {
    pipe = new GetAllErrorsPipe();
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

    it('should return an empty observable if no errors', (done: DoneFn) => {
      zip(...pipe.transform([], testControl.errors!)).pipe(take(1)).subscribe((messages: string[] | SafeHtml[]) => {
        expect(messages.length).toEqual(1);
        expect(messages[0]).toEqual(undefined);
        done();
      });
    });

    it('should return an empty observable if an undefined control', (done: DoneFn) => {
      zip(...pipe.transform(testErrorMessages, undefined!)).pipe(take(1)).subscribe((messages: string[] | SafeHtml[]) => {
        expect(messages.length).toEqual(1);
        expect(messages[0]).toEqual(undefined);
        done();
      });
    });

    it('should only return applicable errors (all errors)', (done: DoneFn) => {
      zip(...pipe.transform(testErrorMessages, testControl.errors!)).pipe(take(1)).subscribe((messages: string[] | SafeHtml[]) => {
        expect(messages).toBeDefined();
        expect(messages.length).toEqual(3);
        expect(messages[0]).toEqual('required');
        expect(messages[1]).toEqual('cannot start with a hyphen');
        expect(messages[2]).toEqual('no special characters');
        done();
      });
    });

    it('should only return applicable errors (errors 2 and 3)', (done: DoneFn) => {
      delete testErrors.required;
      testControl.setErrors(testErrors);

      zip(...pipe.transform(testErrorMessages, testControl.errors!)).pipe(take(1)).subscribe((messages: string[] | SafeHtml[]) => {
        expect(messages).toBeDefined();
        expect(messages.length).toEqual(2);
        expect(messages[0]).toEqual('cannot start with a hyphen');
        expect(messages[1]).toEqual('no special characters');
        done();
      });
    });
  });
});
