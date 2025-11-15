import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';

import { CheckboxComponentPageObject } from './checkbox.component.spec.po';
import { CheckboxModule } from './checkbox.module';

@Component({
    selector: 'f-test-component',
    template: `
    <f-checkbox [formControl]="control">{{ label }}</f-checkbox>
  `,
    standalone: false
})
export class CheckboxTestComponent {
  control: UntypedFormControl = new UntypedFormControl();
  label: string;
}

describe('CheckboxComponent', () => {
  let component: CheckboxTestComponent;
  let fixture: ComponentFixture<CheckboxTestComponent>;
  let page: CheckboxComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckboxTestComponent,
      ],
      imports: [
        CheckboxModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(CheckboxTestComponent);
    component = fixture.componentInstance;
    page = new CheckboxComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(page.checkbox.checkbox).toBeTruthy();
  });

  it('should display the label', () => {
    component.label = 'label';
    fixture.detectChanges();
    expect(page.checkbox.labelText?.innerText).toEqual('label');
  });

  it('should update the value when the checkbox is clicked', () => {
    expect(component.control.value).toBeFalsy();
    expect(page.checkbox.input?.checked).toBeFalsy();

    page.checkbox.input?.click();
    fixture.detectChanges();
    expect(component.control.value).toBeTruthy();
    expect(page.checkbox.input?.checked).toBeTruthy();

    page.checkbox.input?.click();
    fixture.detectChanges();
    expect(component.control.value).toBeFalsy();
    expect(page.checkbox.input?.checked).toBeFalsy();
  });

  it('should disable the input if isDisabled is true', () => {
    expect(component.control.disabled).toBeFalsy();
    expect(page.checkbox.input?.disabled).toBeFalsy();

    component.control.disable();
    fixture.detectChanges();
    expect(page.checkbox.input?.disabled).toBeTruthy();

    component.control.enable();
    fixture.detectChanges();
    expect(page.checkbox.input?.disabled).toBeFalsy();
  });
});
