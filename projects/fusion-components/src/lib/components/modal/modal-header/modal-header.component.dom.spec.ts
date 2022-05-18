import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalHeaderComponentPageObject } from './modal-header.component.spec.po';
import { ModalHeaderModule } from './modal-header.module';

@Component({
  selector: 'fusion-ui-test-component',
  template: `
    <fusion-ui-modal-header
      [hideCloseButton]="hideCloseButton"
      [isFullModal]="isFullModal"
      [disableCloseButton]="disableCloseButton">
      Header Text
    </fusion-ui-modal-header>'`
})
export class ModalHeaderTestComponent {
  hideCloseButton = false;
  disableCloseButton = false;
  isFullModal = false;
}

describe('ModalHeaderComponent', () => {
  let component: ModalHeaderTestComponent;
  let fixture: ComponentFixture<ModalHeaderTestComponent>;
  let page: ModalHeaderComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalHeaderTestComponent],
      imports: [ModalHeaderModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHeaderTestComponent);
    component = fixture.componentInstance;
    page = new ModalHeaderComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should append the "fusion-ui__header" class to the component', () => {
    expect(page.header).toBeTruthy();
    expect(page.header.classList).toContain('fusion-ui-modal__header');
  });

  it('should display the inner content', () => {
    expect(page.header).toBeTruthy();
    expect(page.header.innerText).toEqual('Header Text');
  });

  it('should display full modal classes when isFullModal is true', () => {
    expect(page.header).toBeTruthy();
    expect(page.fullHeader).toBeFalsy();

    component.isFullModal = true;
    fixture.detectChanges();

    expect(page.header).toBeFalsy();
    expect(page.fullHeader).toBeTruthy();
    expect(page.fullHeaderTopBar).toBeTruthy();
  });

  describe('the close button', () => {
    it('should be displayed if hideCloseButton is false', () => {
      component.hideCloseButton = false;
      fixture.detectChanges();
      expect(page.closeButton).toBeTruthy();
    });

    it('should be disabled if disableCloseButton is true', () => {
      component.disableCloseButton = false;
      fixture.detectChanges();
      expect(page.closeButton.hasAttribute('disabled')).toBeFalsy();

      component.disableCloseButton = true;
      fixture.detectChanges();
      expect(page.closeButton.hasAttribute('disabled')).toBeTruthy();
    });

    it('should be hidden if hideCloseButton is true', () => {
      component.hideCloseButton = true;
      fixture.detectChanges();
      expect(page.closeButton).toBeFalsy();
    });
  });
});
