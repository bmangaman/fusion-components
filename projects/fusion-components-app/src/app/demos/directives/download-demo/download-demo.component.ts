import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fusion-demo-download',
  templateUrl: './download-demo.component.html',
  styleUrls: ['./download-demo.component.scss']
})
export class DownloadDemoComponent {
  downloadForm: FormGroup;
  downloadContent = ['example', 'download', 'content'];

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildDownloadform();
  }

  buildDownloadform(): void {
    this.downloadForm = this.fb.group({
      fileName: ['example-filename', Validators.required],
    });
  }
}
