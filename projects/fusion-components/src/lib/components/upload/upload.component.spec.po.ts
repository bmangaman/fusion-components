import { ComponentFixture } from '@angular/core/testing';

import { UploadPageObject } from '@fusion-components/unit-test-helpers/page-objects/upload.spec.po';

import { UploadTestComponent } from './upload.component.dom.spec';

export class UploadComponentPageObject {
  private fixture: ComponentFixture<UploadTestComponent>;
  upload: UploadPageObject;

  constructor(fixture: ComponentFixture<UploadTestComponent>) {
    this.fixture = fixture;
    this.upload = new UploadPageObject(this.fixture);
  }
}
