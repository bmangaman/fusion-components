import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalContentComponentPageObject } from './modal-content.component.spec.po';
import { ModalContentModule } from './modal-content.module';

@Component({
    selector: 'f-test-component',
    template: '<f-modal-content>Header Title</f-modal-content>',
    standalone: false
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

  it('should append the "f-modal__content" class to the component', () => {
    expect(page.content).toBeTruthy();
    expect(page.content.classList).toContain('f-modal__content');
  });

  it('should display the inner content', () => {
    expect(page.content).toBeTruthy();
    expect(page.content.innerText).toEqual('Header Title');
  });
});
