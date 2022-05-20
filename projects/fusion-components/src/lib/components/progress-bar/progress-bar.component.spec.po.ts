import { ComponentFixture } from '@angular/core/testing';

import { ProgressBarPageObject } from '@fusion-components/unit-test-helpers/page-objects/progress-bar.spec.po';

import { ProgressBarTestComponent } from './progress-bar.component.dom.spec';

export class ProgressBarComponentPageObject {
  private fixture: ComponentFixture<ProgressBarTestComponent>;
  progressBar: ProgressBarPageObject;

  constructor(fixture: ComponentFixture<ProgressBarTestComponent>) {
    this.fixture = fixture;
    this.progressBar = new ProgressBarPageObject(this.fixture);
  }
}
