import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ValidationStylingDirective } from './validation-styling.directive';

@Component({
    template: `
    <form [formGroup]="validationStylingDemoForm">
      <input fusionUiValidationStyling formControlName="basicInput" />
    </form>
  `,
    standalone: false
})
class TestComponent implements OnInit {
  public validationStylingDemoForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.validationStylingDemoForm = this.formBuilder.group({
      basicInput: ['', [Validators.minLength(2)]]
    });
  }
}

describe('ValidationStylingDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  let inputEl: DebugElement;
  let inputWrapperEl: any;
  let inputIconEl: any;

  let directiveEl: ValidationStylingDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ValidationStylingDirective, TestComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

    inputEl = fixture.debugElement.query(By.css('[fusionUiValidationStyling]'));
    directiveEl = inputEl.injector.get(ValidationStylingDirective);

    inputWrapperEl = inputEl.nativeElement.parentNode;
    inputIconEl = inputWrapperEl.querySelector('span');
  });

  describe('ngOnInit', () => {
    it('wrapper should be created', () => {
      expect(inputWrapperEl).toBeDefined();
    });

    it('wrapper should not be created if already present', () => {
      expect(inputWrapperEl).toBeDefined();
      expect(fixture.debugElement.nativeElement.querySelectorAll('.f-form__input-wrapper').length).toBe(1);
      directiveEl.ngOnInit();
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('.f-form__input-wrapper').length).toBe(1);
    });

    it('should move the input element and create an icon span inside of it', () => {
      expect(inputWrapperEl.children.length).toEqual(2);
      expect(inputWrapperEl.querySelector('input')).toBeDefined();
      expect(inputWrapperEl.querySelector('.f-form__input-wrapper-status-icon')).toBeDefined();
    });
  });

  describe('input', () => {
    it('should add no styling if it has no value and not dirty', () => {
      expect(inputEl.nativeElement.classList).not.toContain('ng-dirty');
      expect(inputEl.nativeElement.value).toEqual('');
      expect(inputEl.nativeElement.classList).not.toContain('f-form__input--valid');
      expect(inputEl.nativeElement.classList).not.toContain('f-form__input--invalid');
    });

    it('should have f-form__input--invalid class if input is invalid', () => {
      spyOn(directiveEl, 'setStyling').and.callThrough();
      component.validationStylingDemoForm.controls['basicInput'].setValue('v');
      fixture.detectChanges();
      expect(directiveEl.setStyling).toHaveBeenCalledWith('INVALID');
      expect(inputEl.nativeElement.classList).toContain('f-form__input--invalid');
    });

    it('should have f-form__input--valid class if input is valid', () => {
      spyOn(directiveEl, 'setStyling').and.callThrough();
      component.validationStylingDemoForm.controls['basicInput'].setValue('value');
      fixture.detectChanges();
      expect(directiveEl.setStyling).toHaveBeenCalledWith('VALID');
      expect(inputEl.nativeElement.classList).toContain('f-form__input--valid');
    });
  });

  describe('icon', () => {
    it('should be created', () => {
      expect(inputIconEl).toBeDefined();
    });
  });
});
