import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Size } from '../../shared';

import { ModalComponentPageObject } from './modal.component.spec.po';
import { ModalComponent } from './modal.component';
import { ModalModule } from './modal.module';
import { ModalConfig, ModalType } from './modal.interface';

@Component({
    selector: 'f-test-component',
    template: `
    <body>
      <div class="height-adjustment-element" style="display: block; height: 50px;"></div>
      <div class="width-adjustment-element" style="display: block; width: 50px;"></div>

      <div class="container-element"></div>

      <f-modal>

        <f-modal-header>Header Text</f-modal-header>

        <f-modal-content>Content</f-modal-content>

        <f-modal-footer>
          <div class="f-modal__footer-buttons">
            <button type="button" class="f-button f-button--secondary cancel-button">Cancel</button>
          </div>
        </f-modal-footer>
      </f-modal>
    </body>
  `,
    standalone: false
})
export class ModalTestComponent {
  @ViewChild(ModalComponent) modalComponent: ModalComponent;
  config: ModalConfig;

  init(): void {
    this.modalComponent.config = this.config;
    this.modalComponent.init();
  }
}

describe('ModalComponent', () => {
  let component: ModalTestComponent;
  let fixture: ComponentFixture<ModalTestComponent>;
  let page: ModalComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTestComponent],
      imports: [NoopAnimationsModule, ModalModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTestComponent);
    component = fixture.componentInstance;
    component.config = {
      type: ModalType.ALERT,
      container: 'body',
      size: Size.MEDIUM,
      windowClasses: [],
      backdropClasses: [],
      heightAdjustmentElements: [],
      widthAdjustmentElements: [],
    };
    page = new ModalComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('the inner modal-header, modal-content, and modal-footer components', () => {
    it('should be appended and display their content', () => {
      fixture.detectChanges();
      component.init();
      fixture.detectChanges();
      expect(page.modalBackdrop).toBeTruthy();
      expect(page.modalHeader).toBeTruthy();
      expect(page.modalHeader.innerText).toEqual('Header Text');
      expect(page.modalHeaderClose).toBeTruthy();
      expect(page.modalContent).toBeTruthy();
      expect(page.modalContent.innerText).toEqual('Content');
      expect(page.modalFooter).toBeTruthy();
      expect(page.modalFooterButtons.length).toEqual(1);
    });
  });

  describe('the modal config', () => {
    describe('type', () => {
      it('should append the appropriate class based on the provided modal type', () => {
        let type: ModalType;

        type = ModalType.ALERT;
        component.modalComponent.config = { ...component.config, type };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.classList).toContain(`f-modal__window--${type}`);

        type = ModalType.FULL;
        component.config = { ...component.config, type };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.classList).toContain(`f-modal__window--${type}`);

        type = ModalType.SIDE;
        component.config = { ...component.config, type };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.classList).toContain(`f-modal__window--${type}`);
      });
    });

    describe('size', () => {
      it('should append the appropriate class based on the provided size', () => {
        let size: Size;
        size = Size.SMALL;
        component.config = { ...component.config, size };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.classList).toContain(`f-modal__window--alert--${size}`);

        size = Size.MEDIUM;
        component.config = { ...component.config, size };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.classList).toContain(`f-modal__window--alert--${size}`);

        size = Size.LARGE;
        component.config = { ...component.config, size };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.classList).toContain(`f-modal__window--alert--${size}`);
      });
    });

    describe('windowClasses', () => {
      it('should append the appropriate classes based on the provided window classes', () => {
        const customWindowClasses: string[] = ['custom-class-1', 'custom-class-2'];

        component.config = { ...component.config, windowClasses: [] };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.classList).not.toContain('custom-class-1');
        expect(page.modalWindow.classList).not.toContain('custom-class-2');

        component.config = { ...component.config, windowClasses: customWindowClasses };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.classList).toContain('custom-class-1');
        expect(page.modalWindow.classList).toContain('custom-class-2');
      });
    });

    describe('backdropClasses', () => {
      it('should append the appropriate classes based on the provided backdrop classes', () => {
        const customBackdropClasses: string[] = ['custom-class-1', 'custom-class-2'];

        component.config = { ...component.config, backdropClasses: [] };
        component.init();
        fixture.detectChanges();
        expect(page.modalBackdrop.classList).not.toContain('custom-class-1');
        expect(page.modalBackdrop.classList).not.toContain('custom-class-2');

        component.config = { ...component.config, backdropClasses: customBackdropClasses };
        component.init();
        fixture.detectChanges();
        expect(page.modalBackdrop.classList).toContain('custom-class-1');
        expect(page.modalBackdrop.classList).toContain('custom-class-2');
      });
    });

    describe('heightAdjustmentElements', () => {
      it('should NOT append the top and height styles if the modal type is NOT FULL', () => {

        component.config = { ...component.config, type: ModalType.ALERT, heightAdjustmentElements: ['.height-adjustment-element'] };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.height).toBeFalsy();
        expect(page.modalWindow.style.top).toBeFalsy();

        component.config = { ...component.config, type: ModalType.SIDE, heightAdjustmentElements: ['.height-adjustment-element'] };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.height).toBeFalsy();
        expect(page.modalWindow.style.top).toBeFalsy();

        component.config = { ...component.config, type: ModalType.FULL, heightAdjustmentElements: ['.height-adjustment-element'] };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.height).toBeTruthy();
        expect(page.modalWindow.style.top).toBeTruthy();
      });

      it('should update the top and height styles of the modal based on the provided elements', () => {
        component.config = { ...component.config, type: ModalType.FULL, heightAdjustmentElements: [] };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.height).toEqual('100%');
        expect(page.modalWindow.style.top).toEqual('0px');

        component.config = { ...component.config, type: ModalType.FULL, heightAdjustmentElements: ['.height-adjustment-element'] };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.height).toEqual('calc(100% - 50px)');
        expect(page.modalWindow.style.top).toEqual('50px');
      });

      it('should allow a HTMLElement to be passed in as an heightAdjustableElment', () => {
        const heightAdjustmentElement: HTMLElement = fixture.nativeElement.querySelector('.height-adjustment-element');

        component.config = { ...component.config, type: ModalType.FULL, heightAdjustmentElements: [heightAdjustmentElement] };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.height).toEqual('calc(100% - 50px)');
        expect(page.modalWindow.style.top).toEqual('50px');
      });
    });

    describe('widthAdjustmentElements', () => {
      it('should NOT append the width style if the modal type is NOT FULL', () => {

        component.config = { ...component.config, type: ModalType.ALERT, widthAdjustmentElements: ['.width-adjustment-element'] };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.width).toBeFalsy();

        component.config = { ...component.config, type: ModalType.SIDE, widthAdjustmentElements: ['.width-adjustment-element'] };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.width).toBeFalsy();

        component.config = { ...component.config, type: ModalType.FULL, widthAdjustmentElements: ['.width-adjustment-element'] };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.width).toBeTruthy();
      });

      it('should update the width style of the modal based on the provided elements', () => {
        component.config = { ...component.config, type: ModalType.FULL, widthAdjustmentElements: [] };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.width).toEqual('100%');

        component.config = { ...component.config, type: ModalType.FULL, widthAdjustmentElements: ['.width-adjustment-element'] };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.width).toEqual('calc(100% - 50px)');
      });

      it('should allow a HTMLElement to be passed in as an widthAdjustableElement', () => {
        const widthAdjustmentElement: HTMLElement = fixture.nativeElement.querySelector('.width-adjustment-element');

        component.config = { ...component.config, type: ModalType.FULL, widthAdjustmentElements: [widthAdjustmentElement] };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.width).toEqual('calc(100% - 50px)');
      });

      it('should correctly add offset width (w/o adjustment element)', () => {
        component.config = { ...component.config, type: ModalType.FULL, addOffSetWidth: '40px' };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.width).toEqual('calc(100% - 40px)');
      });

      it('should correctly add offset width (w/ adjustment element)', () => {
        component.config = {
          ...component.config,
          type: ModalType.FULL,
          addOffSetWidth: '40px',
          widthAdjustmentElements: ['.width-adjustment-element']
        };
        component.init();
        fixture.detectChanges();
        expect(page.modalWindow.style.width).toEqual('calc((100% - 50px) - 40px)');
      });
    });
  });
});
