import { ComponentFixture } from '@angular/core/testing';

import { SelectPageObject } from '@fusion-ui/fusion-components/unit-test-helpers/page-objects/select.spec.po';

import { SelectTestComponent } from './select.component.dom.spec';

export class SelectComponentPageObject {
  private fixture: ComponentFixture<SelectTestComponent>;
  select: SelectPageObject;

  constructor(fixture: ComponentFixture<SelectTestComponent>) {
    this.fixture = fixture;
    this.select = new SelectPageObject(this.fixture);
  }
}
