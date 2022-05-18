import { ComponentFixture } from '@angular/core/testing';

import { CardPageObject } from '@fusion-ui/fusion-components/unit-test-helpers/page-objects/card.spec.po';

import { CardTestComponent } from './card.component.dom.spec';

export class CardComponentPageObject {
  private fixture: ComponentFixture<CardTestComponent>;
  card: CardPageObject;

  constructor(fixture: ComponentFixture<CardTestComponent>) {
    this.fixture = fixture;
    this.card = new CardPageObject(this.fixture);
  }
}
