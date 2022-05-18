import { ComponentFixture } from '@angular/core/testing';
import { LinearGaugePageObject } from '@fusion-ui/fusion-components/unit-test-helpers/page-objects/linear-gauge.spec.po';

import { LinearGaugeTestComponent } from './linear-gauge.component.dom.spec';

export class LinearGaugeComponentPageObject {
  private fixture: ComponentFixture<LinearGaugeTestComponent>;
  linearGauge: LinearGaugePageObject;

  constructor(fixture: ComponentFixture<LinearGaugeTestComponent>) {
    this.fixture = fixture;
    this.linearGauge = new LinearGaugePageObject(this.fixture);
  }
}
