import { ComponentFixture } from '@angular/core/testing';

import { ButtonPageObject } from '@fusion-ui/fusion-components/unit-test-helpers/page-objects/button.spec.po';

import { ButtonTestComponent } from './button.component.dom.spec';

export class ButtonComponentPageObject {
  private fixture: ComponentFixture<ButtonTestComponent>;
  button: ButtonPageObject;

  constructor(fixture: ComponentFixture<ButtonTestComponent>) {
    this.fixture = fixture;
    this.button = new ButtonPageObject(this.fixture);
  }
}
