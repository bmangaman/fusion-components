import { ComponentFixture } from '@angular/core/testing';

import { MenuPageObject } from '@fusion-ui/fusion-components/unit-test-helpers/page-objects/menu.spec.po';

import { MenuTestComponent } from './menu.component.dom.spec';

export class MenuComponentPageObject {
  private fixture: ComponentFixture<MenuTestComponent>;
  menu: MenuPageObject;

  constructor(fixture: ComponentFixture<MenuTestComponent>) {
    this.fixture = fixture;
    this.menu = new MenuPageObject(this.fixture);
  }
}
