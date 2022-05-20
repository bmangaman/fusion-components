import { ComponentFixture } from '@angular/core/testing';

import { TooltipPageObject } from '@fusion-components/unit-test-helpers/page-objects/tooltip.spec.po';

import { TooltipTestComponent } from './tooltip.component.dom.spec';

export class TooltipComponentPageObject {
  private fixture: ComponentFixture<TooltipTestComponent>;
  tooltip: TooltipPageObject;

  constructor(fixture: ComponentFixture<TooltipTestComponent>) {
    this.fixture = fixture;
    this.tooltip = new TooltipPageObject(this.fixture);
  }
}
