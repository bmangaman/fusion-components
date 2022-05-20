import { ComponentFixture } from '@angular/core/testing';

import { AccordionPageObject } from '@fusion-components/unit-test-helpers/page-objects/accordion.spec.po';

import { AccordionTestComponent } from './accordion.component.dom.spec';

export class AccordionComponentPageObject {
  private fixture: ComponentFixture<AccordionTestComponent>;
  accordion: AccordionPageObject;

  constructor(fixture: ComponentFixture<AccordionTestComponent>) {
    this.fixture = fixture;
    this.accordion = new AccordionPageObject(this.fixture);
  }
}
