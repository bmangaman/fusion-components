import { ComponentFixture } from '@angular/core/testing';

import { BadgePageObject } from '@fusion-ui/fusion-components/unit-test-helpers/page-objects/badge.spec.po';

import { BadgeTestComponent } from './badge.component.dom.spec';

export class BadgeComponentPageObject {
  private fixture: ComponentFixture<BadgeTestComponent>;
  badge: BadgePageObject;

  constructor(fixture: ComponentFixture<BadgeTestComponent>) {
    this.fixture = fixture;
    this.badge = new BadgePageObject(this.fixture);
  }
}
