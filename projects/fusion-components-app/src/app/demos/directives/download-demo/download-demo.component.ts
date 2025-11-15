import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'fusion-demo-download',
    templateUrl: './download-demo.component.html',
    styleUrls: ['./download-demo.component.scss'],
    standalone: false
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
