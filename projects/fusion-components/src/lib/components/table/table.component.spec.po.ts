import { ComponentFixture } from '@angular/core/testing';

import { TablePageObject } from '@fusion-ui/fusion-components/unit-test-helpers/page-objects/table.spec.po';

export class TableComponentPageObject {
  private fixture: ComponentFixture<any>;
  table: TablePageObject;

  constructor(fixture: ComponentFixture<any>) {
    this.fixture = fixture;
    this.table = new TablePageObject(this.fixture);
  }
}
