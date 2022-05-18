import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalContentComponentPageObject } from './modal-content.component.spec.po';
import { ModalContentModule } from './modal-content.module';

@Component({
  selector: 'fusion-ui-test-component',
  template: '<fusion-ui-modal-content>Header Title</fusion-ui-modal-content>',
})
export class ModalContentTestComponent {}

describe('ModalContentComponent', () => {
  let component: ModalContentTestComponent;
  let fixture: ComponentFixture<ModalContentTestComponent>;
  let page: ModalContentComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalContentTestComponent],
      imports: [ModalContentModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContentTestComponent);
    component = fixture.componentInstance;
    page = new ModalContentComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should append the "fusion-ui-modal__content" class to the component', () => {
    expect(page.content).toBeTruthy();
    expect(page.content.classList).toContain('fusion-ui-modal__content');
  });

  it('should display the inner content', () => {
    expect(page.content).toBeTruthy();
    expect(page.content.innerText).toEqual('Header Title');
  });
});
