import { ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { BaseModalComponent, Size, ModalConfig, ModalService, ModalType, OpenModalConfig, ButtonType } from '@fusion-components';

@Component({
    selector: 'fusion-demo-modal',
    templateUrl: './modal-demo.component.html',
    styleUrls: ['./modal-demo.component.scss'],
    standalone: false
})
export class ModalDemoComponent {
  readonly ButtonType = ButtonType;
  readonly Size = Size;
  readonly ModalType = ModalType;

  modalForm: UntypedFormGroup;
  modalConfig: ModalConfig;

  constructor(
    private fb: UntypedFormBuilder,
    private modalService: ModalService
  ) {
    this.buildModalForm();
  }

  buildModalForm(): void {
    this.modalForm = this.fb.group({
      type: [ModalType.ALERT],
      container: ['body'],
      size: [Size.MEDIUM],
      heightAdjustmentElements: [''],
      widthAdjustmentElements: [''],
    });

    this.setModalConfig();

    this.modalForm.valueChanges.subscribe(() => {
      this.setModalConfig();
    });
  }

  setModalConfig(): void {
    const modalForm: UntypedFormGroup = this.modalForm;

    this.modalConfig = {
      type: modalForm.get('type')?.value,
      container: modalForm.get('container')?.value,
      size: modalForm.get('size')?.value,
      heightAdjustmentElements: modalForm.get('heightAdjustmentElements')?.value,
      widthAdjustmentElements: modalForm.get('widthAdjustmentElements')?.value,
    }
  }

  openModal(): void {
    const openModalConfig: OpenModalConfig<InnerModalComponent> = {
      component: InnerModalComponent,
      modalConfig: this.modalConfig,
      componentProps: {
        modalForm: this.modalForm,
        modalConfig: this.modalConfig
      },
    }
    this.modalService.openModal(openModalConfig).subscribe(closeEvent => {
      console.log('closed with: ', closeEvent);
      this.setModalConfig();
    })
  }
}

@Component({
    selector: 'fusion-demo-inner-content',
    styleUrls: ['./modal-demo.component.scss'],
    template: `
    <f-modal-header [isFullModal]="modalConfig.type === 'full'" (modalClosed)="modalClosed.emit('header (x) button')">Header</f-modal-header>
    <f-modal-content>
      @if (modalConfig?.type === 'full') {
        <h2 class="f-modal__full-header-content">Header</h2>
      }
      Content
      <br>
        Show Long content <input type="checkbox" [ngModel]="longContent.show" (ngModelChange)="change($event)">
        @if (longContent.show) {
          <div>
            @for (x of paragraphs; track x) {
              <span>{{longContent.text}} <br></span>
            }
          </div>
        }
        <br>
          <f-button (buttonClick)="openModal()" text="Open Modal"></f-button>
        </f-modal-content>
        <f-modal-footer>
          <div
            [ngClass]="{'f-modal__footer-buttons-left': modalConfig.type === ModalType.FULL}"
            class="f-modal__footer-buttons"
            >
            <f-button text="Submit" (buttonClick)="modalClosed.emit('submit button')"></f-button>
            <f-button text="Cancel" [type]="ButtonType.SECONDARY" (buttonClick)="modalClosed.emit('cancel button')"></f-button>
          </div>
        </f-modal-footer>
    `,
    standalone: false
})
export class InnerModalComponent extends BaseModalComponent {
  readonly ButtonType = ButtonType;
  readonly ModalType = ModalType;

  modalConfig: ModalConfig;
  modalForm: UntypedFormGroup;
  longContent = {
    show: false,
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum ultricies lacus, eu fermentum turpis gravida vitae.
     Nulla cursus velit at ante lacinia iaculis. Curabitur commodo magna et mattis convallis. Duis consequat sagittis hendrerit.
     Aliquam dolor odio, facilisis a blandit sit amet, fermentum et nunc. Donec in facilisis lorem, vel mollis sapien. Mauris tincidunt
     placerat ante id dapibus. Suspendisse in dui felis. Pellentesque at pharetra dui, commodo posuere ante. Donec eget maximus est,
     vitae aliquam urna. Quisque laoreet a nunc dignissim lobortis.`
  }

  paragraphs = Array(20).fill('x');

  constructor(private modalService: ModalService, private cdr: ChangeDetectorRef) {
    super();
  }

  change(x: boolean): void {
    this.longContent.show = x;
    this.cdr.detectChanges();
  }

  openModal(): void {
    const openModalConfig: OpenModalConfig<InnerModalComponent> = {
      component: InnerModalComponent,
      modalConfig: this.modalConfig,
      componentProps: {
        modalForm: this.modalForm,
        modalConfig: this.modalConfig
      },
    }
    this.modalService.openModal(openModalConfig).subscribe(closeEvent => {
      console.log('closed with: ', closeEvent);
    })
  }
}
