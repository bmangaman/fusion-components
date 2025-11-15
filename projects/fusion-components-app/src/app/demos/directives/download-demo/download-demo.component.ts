import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { ButtonModule } from '../../../../../../fusion-components/src/lib/components/button/button.module';
import { DownloadModule } from '../../../../../../fusion-components/src/lib/directives/download/download.module';

@Component({
    selector: 'fusion-demo-download',
    templateUrl: './download-demo.component.html',
    styleUrls: ['./download-demo.component.scss'],
    imports: [DemoComponent, FormsModule, ReactiveFormsModule, ButtonModule, DownloadModule]
})
export class DownloadDemoComponent {
  downloadForm: UntypedFormGroup;
  downloadContent = ['example', 'download', 'content'];

  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.buildDownloadform();
  }

  buildDownloadform(): void {
    this.downloadForm = this.fb.group({
      fileName: ['example-filename', Validators.required],
    });
  }
}
