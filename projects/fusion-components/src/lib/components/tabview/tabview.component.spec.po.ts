import { ComponentFixture } from '@angular/core/testing';

import { TabviewPageObject } from '@fusion-components/unit-test-helpers/page-objects/tabview.spec.po';

import { TabviewTestComponent } from './tabview.component.dom.spec';

export class TabviewComponentPageObject {
  private fixture: ComponentFixture<TabviewTestComponent>;
  tabview: TabviewPageObject;

  constructor(fixture: ComponentFixture<TabviewTestComponent>) {
    this.fixture = fixture;
    this.tabview = new TabviewPageObject(this.fixture);
  }
}
