import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { ErrorMessage } from './error-message.interface';
import { ErrorMessageModule } from './error-message.module';

@Component({
  selector: 'fusion-ui-error-test-component',
  template: `
    <form [formGroup]="testForm" class="fusion-ui-form">
      <div class="fusion-ui-form__fieldset">
        <label class="fusion-ui-form__label" for="test-input">Test Input Label</label>
        <input formControlName="testInput" class="fusion-ui-form__input" id="test-input" type="text" />
          <fusion-ui-error-message
            [control]="testForm.get('testInput')"
            [errors]="testInputErrors"
            id="single-error-message">
          </fusion-ui-error-message>
          <fusion-ui-error-message
            [control]="testForm.get('testInput')"
            [errors]="testInputErrors"
            [displayMultiple]="true"
            id="multiple-error-messages">
          </fusion-ui-error-message>
      </div>
    </form>`
})
class TestComponent implements OnInit {
  testForm: FormGroup;
  testInputErrors: ErrorMessage[] = [
    {
      priority: 1,
      translation: of('Required'),
      error: 'required',
    },
    {
      priority: 2,
      translation: of('Minimum of 5 characters'),
      error: 'minlength',
    },
    {
      priority: 3,
      translation: of('Maximum of 10 characters'),
      error: 'maxlength',
    },
    {
      priority: 4,
      translation: of('No numbers'),
      error: 'pattern'
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
      testInput: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(5),
          Validators.pattern(/^\D*$/),
        ],
      ],
    });
  }
}

describe('ErrorMessageComponent', () => {
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ErrorMessageModule,
        ReactiveFormsModule,
      ],
      declarations: [
        TestComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;

    fixture.detectChanges();
  });

  function getSingleErrorMessage(): DebugElement {
    return fixture.debugElement.query(By.css('#single-error-message .fusion-ui-error-message'));
  }

  function getMultipleErrorMessages(): {el: DebugElement, messages: DebugElement[]} {
    return {
      el: fixture.debugElement.query(By.css('#multiple-error-messages .fusion-ui-error-messages')),
      messages: fixture.debugElement.queryAll(By.css('#multiple-error-messages .fusion-ui-error-messages .fusion-ui-error-message')),
    };
  }

  beforeEach(() => {
    testComponent.testForm.get('testInput').setValue('');
    testComponent.testForm.get('testInput').markAsPristine();
    fixture.detectChanges();
  });

  describe('displaying a single error at a time', () => {
    it('should not display any errors if there are none', () => {
      testComponent.testForm.get('testInput').setValue('valid');
      testComponent.testForm.get('testInput').markAsDirty();
      fixture.detectChanges();
      expect(!!getSingleErrorMessage()).toBeFalsy('error message should NOT be visible');
    });

    it('should not display any errors if the input is pristine (not dirty)', () => {
      // NOTE: setValue does not mark the input as "dirty"
      testComponent.testForm.get('testInput').setValue('');
      fixture.detectChanges();
      expect(!!getSingleErrorMessage()).toBeFalsy('error message should NOT be visible');

      testComponent.testForm.get('testInput').setValue('two');
      fixture.detectChanges();
      expect(!!getSingleErrorMessage()).toBeFalsy('error message should NOT be visible');

      testComponent.testForm.get('testInput').setValue('more-than-ten-characters');
      fixture.detectChanges();
      expect(!!getSingleErrorMessage()).toBeFalsy('error message should NOT be visible');
    });

    it('should display the correct error', () => {
      testComponent.testForm.get('testInput').setValue('two');
      testComponent.testForm.get('testInput').markAsDirty();
      fixture.detectChanges();
      expect(testComponent.testForm.get('testInput').hasError('minlength')).toBeTruthy('should have the minlength error');
      expect(!!getSingleErrorMessage()).toBeTruthy('error message should be visible');
      expect(getSingleErrorMessage().nativeElement.innerText).toEqual('Minimum of 5 characters');

      testComponent.testForm.get('testInput').setValue('more-than-ten-characters');
      testComponent.testForm.get('testInput').markAsDirty();
      fixture.detectChanges();
      expect(testComponent.testForm.get('testInput').hasError('maxlength')).toBeTruthy('should have the maxlength error');
      expect(!!getSingleErrorMessage()).toBeTruthy('error message should be visible');
      expect(getSingleErrorMessage().nativeElement.innerText).toEqual('Maximum of 10 characters');

      testComponent.testForm.get('testInput').setValue('');
      testComponent.testForm.get('testInput').markAsDirty();
      fixture.detectChanges();
      expect(testComponent.testForm.get('testInput').hasError('required')).toBeTruthy('should have the required error');
      expect(!!getSingleErrorMessage()).toBeTruthy('error message should be visible');
      expect(getSingleErrorMessage().nativeElement.innerText).toEqual('Required');
    });
  });

  describe('displaying multiple errors at a time', () => {
    it('should not display any errors if there are none', () => {
      testComponent.testForm.get('testInput').setValue('valid');
      testComponent.testForm.get('testInput').markAsDirty();
      fixture.detectChanges();
      expect(!!getMultipleErrorMessages().el).toBeFalsy('error message should NOT be visible');
    });

    it('should not display any errors if the input is pristine (not dirty)', () => {
      // NOTE: setValue does not mark the input as "dirty"
      testComponent.testForm.get('testInput').setValue('');
      fixture.detectChanges();
      expect(!!getMultipleErrorMessages().el).toBeFalsy('error message should NOT be visible');

      testComponent.testForm.get('testInput').setValue('two');
      fixture.detectChanges();
      expect(!!getMultipleErrorMessages().el).toBeFalsy('error message should NOT be visible');

      testComponent.testForm.get('testInput').setValue('more-than-ten-characters');
      fixture.detectChanges();
      expect(!!getMultipleErrorMessages().el).toBeFalsy('error message should NOT be visible');
    });

    it('should display the correct errors', () => {
      testComponent.testForm.get('testInput').setValue('');
      testComponent.testForm.get('testInput').markAsDirty();
      fixture.detectChanges();
      expect(testComponent.testForm.get('testInput').hasError('required')).toBeTruthy('should have the required error');
      expect(!!getMultipleErrorMessages().el).toBeTruthy('error message should be visible');
      expect(getMultipleErrorMessages().messages[0].nativeElement.innerText).toEqual('Required');

      testComponent.testForm.get('testInput').setValue('two');
      testComponent.testForm.get('testInput').markAsDirty();
      fixture.detectChanges();
      expect(testComponent.testForm.get('testInput').hasError('minlength')).toBeTruthy('should have the minlength error');
      expect(!!getMultipleErrorMessages().el).toBeTruthy('error message should be visible');
      expect(getMultipleErrorMessages().messages[0].nativeElement.innerText).toEqual('Minimum of 5 characters');

      testComponent.testForm.get('testInput').setValue('8');
      testComponent.testForm.get('testInput').markAsDirty();
      fixture.detectChanges();
      expect(testComponent.testForm.get('testInput').hasError('minlength')).toBeTruthy('should have the minlength error');
      expect(testComponent.testForm.get('testInput').hasError('pattern')).toBeTruthy('should have the pattern error');
      expect(!!getMultipleErrorMessages().el).toBeTruthy('error message should be visible');
      expect(getMultipleErrorMessages().messages[0].nativeElement.innerText).toEqual('Minimum of 5 characters');
      expect(getMultipleErrorMessages().messages[1].nativeElement.innerText).toEqual('No numbers');
    });
  });
});
