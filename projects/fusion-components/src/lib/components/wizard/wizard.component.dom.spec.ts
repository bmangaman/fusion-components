import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { cloneDeep } from 'lodash-es';

import { WizardComponentPageObject } from './wizard.component.spec.po';
import { WizardStep } from './wizard.interface';
import { WizardModule } from './wizard.module';

@Component({
    selector: 'f-test-component',
    template: `
    <f-wizard
      [steps]="steps"
      [disableNextSteps]="disableNextSteps"
      [disablePreviousSteps]="disablePreviousSteps"
      (stepsChanged)="stepsChanged($event)">
    <img class="f-wizard__brand-image" *ngIf="isBrandVisible" />
    Inner Content
    </f-wizard>
  `,
    standalone: false
})
export class WizardTestComponent {
  isBrandVisible: boolean;

  steps: WizardStep[];
  disableNextSteps: boolean;
  disablePreviousSteps: boolean;

  stepsChanged(_steps: WizardStep[]): void {}
}

describe('WizardComponent', () => {
  let component: WizardTestComponent;
  let fixture: ComponentFixture<WizardTestComponent>;
  let page: WizardComponentPageObject;

  const defaultSteps: WizardStep[] = [
    {
      title: 'Step 1',
      isCurrent: true,
    },
    {
      title: 'Step 2',
      isHidden: true,
    },
    {
      title: 'Step 3',
    },
    {
      title: 'Step 4',
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        WizardTestComponent,
      ],
      imports: [
        WizardModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(WizardTestComponent);
    component = fixture.componentInstance;
    page = new WizardComponentPageObject(fixture);
    component.steps = cloneDeep(defaultSteps);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(page.wizard).toBeTruthy();
    expect(page.wizard.stepNavigation).toBeTruthy();
    expect(page.wizard.stepContent).toBeTruthy();
  });

  describe('the step navigation', () => {
    it('should display the brand image if provided', () => {
      expect(page.wizard.brandImage).toBeFalsy();
      component.isBrandVisible = true;
      fixture.detectChanges();
      expect(page.wizard.brandImage).toBeTruthy();
    });

    it('should display the visible steps', () => {
      expect(page.wizard.stepNavigationButtons?.length).toEqual(3);
      expect(page.wizard.stepNavigationButtons?.item(0).textContent).toEqual('Step 1');
      expect(page.wizard.stepNavigationButtons?.item(1).textContent).toEqual('Step 3');
      expect(page.wizard.stepNavigationButtons?.item(2).textContent).toEqual('Step 4');
    });

    it('should emit an event when the steps change', () => {
      spyOn(component, 'stepsChanged').and.stub();

      const newSteps: WizardStep[] = cloneDeep(defaultSteps);
      newSteps.push({ title: 'Step 5 '});
      component.steps = newSteps;
      fixture.detectChanges();
      expect(component.stepsChanged).toHaveBeenCalledWith(newSteps);
    });

    it('should disable all previous steps if disablePreviousSteps is set to true', () => {
      expect(page.wizard.stepNavigationButtons?.item(0).disabled).toBeTruthy();
      expect(page.wizard.stepNavigationButtons?.item(1).disabled).toBeFalsy();
      expect(page.wizard.stepNavigationButtons?.item(2).disabled).toBeFalsy();
      page.wizard.stepNavigationButtons?.item(1).click();
      fixture.detectChanges();
      expect(page.wizard.stepNavigationButtons?.item(0).disabled).toBeFalsy();
      expect(page.wizard.stepNavigationButtons?.item(1).disabled).toBeTruthy();
      expect(page.wizard.stepNavigationButtons?.item(2).disabled).toBeFalsy();
      component.disablePreviousSteps = true;
      fixture.detectChanges();
      expect(page.wizard.stepNavigationButtons?.item(0).disabled).toBeTruthy();
      expect(page.wizard.stepNavigationButtons?.item(1).disabled).toBeTruthy();
      expect(page.wizard.stepNavigationButtons?.item(2).disabled).toBeFalsy();
    });

    it('should disable all next steps if disableNextSteps is set to true', () => {
      expect(page.wizard.stepNavigationButtons?.item(0).disabled).toBeTruthy();
      expect(page.wizard.stepNavigationButtons?.item(1).disabled).toBeFalsy();
      expect(page.wizard.stepNavigationButtons?.item(2).disabled).toBeFalsy();
      page.wizard.stepNavigationButtons?.item(1).click();
      fixture.detectChanges();
      expect(page.wizard.stepNavigationButtons?.item(0).disabled).toBeFalsy();
      expect(page.wizard.stepNavigationButtons?.item(1).disabled).toBeTruthy();
      expect(page.wizard.stepNavigationButtons?.item(2).disabled).toBeFalsy();
      component.disableNextSteps = true;
      fixture.detectChanges();
      expect(page.wizard.stepNavigationButtons?.item(0).disabled).toBeFalsy();
      expect(page.wizard.stepNavigationButtons?.item(1).disabled).toBeTruthy();
      expect(page.wizard.stepNavigationButtons?.item(2).disabled).toBeTruthy();
    });

    it('should correctly set the current and completed steps', () => {
      expect(page.wizard.stepNavigationButtons?.item(0).classList).not.toContain('f-wizard__step-navigation-button--completed');
      expect(page.wizard.stepNavigationButtons?.item(0).classList).toContain('f-wizard__step-navigation-button--current');
      expect(page.wizard.stepNavigationButtons?.item(1).classList).not.toContain('f-wizard__step-navigation-button--completed');
      expect(page.wizard.stepNavigationButtons?.item(1).classList).not.toContain('f-wizard__step-navigation-button--current');
      expect(page.wizard.stepNavigationButtons?.item(2).classList).not.toContain('f-wizard__step-navigation-button--completed');
      expect(page.wizard.stepNavigationButtons?.item(2).classList).not.toContain('f-wizard__step-navigation-button--current');
      page.wizard.stepNavigationButtons?.item(1).click();
      fixture.detectChanges();
      expect(page.wizard.stepNavigationButtons?.item(0).classList).toContain('f-wizard__step-navigation-button--completed');
      expect(page.wizard.stepNavigationButtons?.item(0).classList).not.toContain('f-wizard__step-navigation-button--current');
      expect(page.wizard.stepNavigationButtons?.item(1).classList).not.toContain('f-wizard__step-navigation-button--completed');
      expect(page.wizard.stepNavigationButtons?.item(1).classList).toContain('f-wizard__step-navigation-button--current');
      expect(page.wizard.stepNavigationButtons?.item(2).classList).not.toContain('f-wizard__step-navigation-button--completed');
      expect(page.wizard.stepNavigationButtons?.item(2).classList).not.toContain('f-wizard__step-navigation-button--current');
      page.wizard.stepNavigationButtons?.item(2).click();
      fixture.detectChanges();
      expect(page.wizard.stepNavigationButtons?.item(0).classList).toContain('f-wizard__step-navigation-button--completed');
      expect(page.wizard.stepNavigationButtons?.item(0).classList).not.toContain('f-wizard__step-navigation-button--current');
      expect(page.wizard.stepNavigationButtons?.item(1).classList).toContain('f-wizard__step-navigation-button--completed');
      expect(page.wizard.stepNavigationButtons?.item(1).classList).not.toContain('f-wizard__step-navigation-button--current');
      expect(page.wizard.stepNavigationButtons?.item(2).classList).not.toContain('f-wizard__step-navigation-button--completed');
      expect(page.wizard.stepNavigationButtons?.item(2).classList).toContain('f-wizard__step-navigation-button--current');
    });
  });

  describe('the inner content', () => {
    it('should be displayed', () => {
      expect(page.wizard.stepContent?.textContent).toEqual(' Inner Content ');
    });
  });
});
