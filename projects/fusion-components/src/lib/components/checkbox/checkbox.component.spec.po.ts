import { ComponentFixture } from '@angular/core/testing';

import { CheckboxPageObject } from '@fusion-components/unit-test-helpers/page-objects/checkbox.spec.po';

import { CheckboxTestComponent } from './checkbox.component.dom.spec';

export class CheckboxComponentPageObject {
  private fixture: ComponentFixture<CheckboxTestComponent>;
  checkbox: CheckboxPageObject;

  constructor(fixture: ComponentFixture<CheckboxTestComponent>) {
    this.fixture = fixture;
    this.checkbox = new CheckboxPageObject(this.fixture);
  }
}
