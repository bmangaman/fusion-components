import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Size } from '../../shared';
import { ProgressBarComponentPageObject } from './progress-bar.component.spec.po';
import { ProgressBarStatus } from './progress-bar.interface';
import { ProgressBarModule } from './progress-bar.module';

@Component({
  selector: 'f-test-component',
  template: `
  <f-progress-bar
    [value]="value"
    [minValue]="minValue"
    [maxValue]="maxValue"
    [isValueDisplayed]="isValueDisplayed"
    [minDisplayedPercent]="minDisplayedPercent"
    [size]="size"
    [status]="status"
    [displayText]="displayText"
    [classes]="classes"
    [ariaValueText]="ariaValueText">
  </f-progress-bar>
  `,
})
export class ProgressBarTestComponent {
  value: number;
  minValue: number;
  maxValue: number;
  isValueDisplayed: boolean;
  minDisplayedPercent: number;
  size: Size;
  status: ProgressBarStatus;
  displayText: string;
  classes: string[] = [];
  ariaValueText: string;
}

describe('ProgressBarComponent', () => {
  let component: ProgressBarTestComponent;
  let fixture: ComponentFixture<ProgressBarTestComponent>;
  let page: ProgressBarComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProgressBarTestComponent,
      ],
      imports: [
        ProgressBarModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ProgressBarTestComponent);
    component = fixture.componentInstance;
    page = new ProgressBarComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the calculated value if it is above the minDisplayedPercent and isValueDisplayed is true', () => {
    component.value = 50;
    component.minValue = 0;
    component.maxValue = 100;

    component.isValueDisplayed = true;
    component.minDisplayedPercent = 5;
    fixture.detectChanges();
    expect(page.progressBar.barValue).toEqual('50%');

    component.isValueDisplayed = false;
    component.minDisplayedPercent = 60;
    fixture.detectChanges();
    expect(page.progressBar.barValue).toBeNull();

    component.isValueDisplayed = false;
    component.minDisplayedPercent = 5;
    fixture.detectChanges();
    expect(page.progressBar.barValue).toBeNull();

    component.isValueDisplayed = true;
    component.minDisplayedPercent = 60;
    fixture.detectChanges();
    expect(page.progressBar.barValue).toBeNull();
  });

  it('should display custom text if provided', () => {
    component.value = 50;
    component.minValue = 0;
    component.maxValue = 100;
    component.minDisplayedPercent = 5;
    component.displayText = 'Custom Display Text';

    component.isValueDisplayed = true;
    fixture.detectChanges();
    expect(page.progressBar.barValue).toEqual('Custom Display Text');

    component.isValueDisplayed = false;
    fixture.detectChanges();
    expect(page.progressBar.barValue).toBeNull();
  });

  it('should append the correct classes to the progress bar based on the provided inputs', () => {
    component.value = 0;
    component.minValue = 0;
    component.maxValue = 100;

    fixture.detectChanges();
    expect(page.progressBar.barClasses).toContain('f-progress-bar__bar--not-started');

    component.value = 50;
    fixture.detectChanges();
    expect(page.progressBar.barClasses).toContain('f-progress-bar__bar--in-progress');

    component.value = 100;
    fixture.detectChanges();
    expect(page.progressBar.barClasses).toContain('f-progress-bar__bar--success');

    component.status = ProgressBarStatus.ERROR;
    fixture.detectChanges();
    expect(page.progressBar.barClasses).toContain('f-progress-bar__bar--error');

    component.status = ProgressBarStatus.IN_PROGRESS;
    fixture.detectChanges();
    expect(page.progressBar.barClasses).toContain('f-progress-bar__bar--in-progress');

    component.status = ProgressBarStatus.NOT_STARTED;
    fixture.detectChanges();
    expect(page.progressBar.barClasses).toContain('f-progress-bar__bar--not-started');

    component.status = ProgressBarStatus.PAUSED;
    fixture.detectChanges();
    expect(page.progressBar.barClasses).toContain('f-progress-bar__bar--paused');

    component.status = ProgressBarStatus.SUCCESS;
    fixture.detectChanges();
    expect(page.progressBar.barClasses).toContain('f-progress-bar__bar--success');

    component.status = ProgressBarStatus.WARNING;
    fixture.detectChanges();
    expect(page.progressBar.barClasses).toContain('f-progress-bar__bar--warning');

    component.size = Size.SMALL;
    fixture.detectChanges();
    expect(page.progressBar.barClasses).toContain('f-progress-bar__bar--small');

    component.size = Size.MEDIUM;
    fixture.detectChanges();
    expect(page.progressBar.barClasses).toContain('f-progress-bar__bar--medium');

    component.size = Size.LARGE;
    fixture.detectChanges();
    expect(page.progressBar.barClasses).toContain('f-progress-bar__bar--large');
  });

  it('should append the correct aria attributes to the container', () => {
    component.value = 50;
    component.minValue = 0;
    component.maxValue = 100;

    fixture.detectChanges();
    expect(page.progressBar.container?.getAttribute('aria-valuenow')).toEqual('50');
    expect(page.progressBar.container?.getAttribute('aria-valuemin')).toEqual('0');
    expect(page.progressBar.container?.getAttribute('aria-valuemax')).toEqual('100');
    expect(page.progressBar.container?.getAttribute('aria-valuetext')).toEqual('50% : in-progress');

    component.ariaValueText = '50% of 100% completed.';
    fixture.detectChanges();
    expect(page.progressBar.container?.getAttribute('aria-valuetext')).toEqual('50% of 100% completed.');
  });
});
