import { ComponentFixture } from '@angular/core/testing';

import { WizardPageObject } from '@fusion-ui/fusion-components/unit-test-helpers/page-objects/wizard.spec.po';

import { WizardTestComponent } from './wizard.component.dom.spec';

export class WizardComponentPageObject {
  private fixture: ComponentFixture<WizardTestComponent>;
  wizard: WizardPageObject;

  constructor(fixture: ComponentFixture<WizardTestComponent>) {
    this.fixture = fixture;
    this.wizard = new WizardPageObject(this.fixture);
  }
}
