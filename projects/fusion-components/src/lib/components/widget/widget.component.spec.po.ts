import { ComponentFixture } from '@angular/core/testing';

import { WidgetPageObject } from '@fusion-ui/fusion-components/unit-test-helpers/page-objects/widget.spec.po';

import { WidgetTestComponent } from './widget.component.dom.spec';

export class WidgetComponentPageObject {
  private fixture: ComponentFixture<WidgetTestComponent>;
  widget: WidgetPageObject;

  constructor(fixture: ComponentFixture<WidgetTestComponent>) {
    this.fixture = fixture;
    this.widget = new WidgetPageObject(this.fixture);
  }
}
