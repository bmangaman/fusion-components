import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseModalComponent, FusionUiSize, ModalConfig, ModalService, ModalType, OpenModalConfig } from '@fusion-ui/fusion-components';

@Component({
  selector: 'fusion-demo-modal',
  templateUrl: './modal-demo.component.html',
  styleUrls: ['./modal-demo.component.scss']
})
export class ModalDemoComponent {
  readonly FusionUiSize = FusionUiSize;
  readonly ModalType = ModalType;

  modalForm: FormGroup;
  modalConfig: ModalConfig;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.buildModalForm();
  }

  buildModalForm(): void {
    this.modalForm = this.fb.group({
      type: [ModalType.ALERT],
      container: ['body'],
      size: [FusionUiSize.MEDIUM],
      heightAdjustmentElements: [''],
      widthAdjustmentElements: [''],
    });

    this.setModalConfig();

    this.modalForm.valueChanges.subscribe(() => {
      this.setModalConfig();
    });
  }

  setModalConfig(): void {
    const modalForm: FormGroup = this.modalForm;

    this.modalConfig = {
      type: modalForm.get('type').value,
      container: modalForm.get('container').value,
      size: modalForm.get('size').value,
      heightAdjustmentElements: modalForm.get('heightAdjustmentElements').value,
      widthAdjustmentElements: modalForm.get('widthAdjustmentElements').value,
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
    <fusion-ui-modal-header [isFullModal]="modalConfig?.type === 'full'" (modalClosed)="modalClosed.emit('header (x) button')">Header</fusion-ui-modal-header>
    <fusion-ui-modal-content>
      <h2 *ngIf="modalConfig?.type === 'full'" class="fusion-ui-modal__full-header-content">Header</h2>
      Content
      <br>
      Show Long content <input type="checkbox" [ngModel]="longContent.show" (ngModelChange)="change($event)">
      <div *ngIf="longContent.show">
        <span *ngFor="let x of paragraphs">{{longContent.text}} <br></span>
      </div>
      <br>
      <fusion-ui-button (buttonClick)="openModal()" text="Open Modal"></fusion-ui-button>
    </fusion-ui-modal-content>
    <fusion-ui-modal-footer>
      <div
        [ngClass]="{'fusion-ui-modal__footer-buttons-left': modalConfig?.type === ModalType.FULL}"
        class="fusion-ui-modal__footer-buttons"
      >
        <fusion-ui-button text="Submit" (buttonClick)="modalClosed.emit('submit button')"></fusion-ui-button>
        <fusion-ui-button text="Cancel" type="secondary" (buttonClick)="modalClosed.emit('cancel button')"></fusion-ui-button>
      </div>
    </fusion-ui-modal-footer>
  `
})
export class InnerModalComponent extends BaseModalComponent {
  modalConfig: ModalConfig;
  modalForm: FormGroup;
  readonly ModalType = ModalType;
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

  change(x): void {
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
