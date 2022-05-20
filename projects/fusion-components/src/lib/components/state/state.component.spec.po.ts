import { ComponentFixture } from '@angular/core/testing';

import { StatePageObject } from '@fusion-components/unit-test-helpers/page-objects/state.spec.po';

import { StateTestComponent } from './state.component.dom.spec';

export class StateComponentPageObject {
  private fixture: ComponentFixture<StateTestComponent>;
  state: StatePageObject;

  constructor(fixture: ComponentFixture<StateTestComponent>) {
    this.fixture = fixture;
    this.state = new StatePageObject(this.fixture);
  }
}
