import { ComponentFixture } from '@angular/core/testing';

import { KeyValueTablePageObject } from '@fusion-ui/fusion-components/unit-test-helpers/page-objects/key-value-table.spec.po';

import { KeyValueTableTestComponent } from './key-value-table.component.dom.spec';

export class KeyValueTableComponentPageObject {
  private fixture: ComponentFixture<KeyValueTableTestComponent>;
  table: KeyValueTablePageObject;

  constructor(fixture: ComponentFixture<KeyValueTableTestComponent>) {
    this.fixture = fixture;
    this.table = new KeyValueTablePageObject(this.fixture);
  }
}
