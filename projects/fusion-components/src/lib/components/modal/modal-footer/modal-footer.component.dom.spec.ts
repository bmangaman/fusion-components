import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalFooterComponentPageObject } from './modal-footer.component.spec.po';
import { ModalFooterModule } from './modal-footer.module';

@Component({
  selector: 'f-test-component',
  template: '<f-modal-footer>Footer Content</f-modal-footer>',
})
export class ModalFooterTestComponent {}

describe('ModalFooterComponent', () => {
  let component: ModalFooterTestComponent;
  let fixture: ComponentFixture<ModalFooterTestComponent>;
  let page: ModalFooterComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFooterTestComponent],
      imports: [ModalFooterModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFooterTestComponent);
    component = fixture.componentInstance;
    page = new ModalFooterComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should append the "f-modal__footer" class to the component', () => {
    expect(page.footer).toBeTruthy();
    expect(page.footer.classList).toContain('f-modal__footer');
  });

  it('should display the inner content', () => {
    expect(page.footer).toBeTruthy();
    expect(page.footer.innerText).toEqual('Footer Content');
  });
});
