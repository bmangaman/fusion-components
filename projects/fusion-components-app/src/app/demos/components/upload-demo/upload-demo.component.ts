import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { UploadInfo } from '@fusion-components';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'fusion-demo-upload',
  templateUrl: './upload-demo.component.html',
  styleUrls: ['./upload-demo.component.scss']
})
export class UploadDemoComponent {
  uploadForm: UntypedFormGroup;

  fileSelectionCount: number = 0;
  uploadUpdatedCount: number = 0;
  uploadFinishedCount: number = 0;
  uploadCancelledCount: number = 0;

  constructor(
    private fb: UntypedFormBuilder,
    private http: HttpClient,
  ) {
    this.buildUploadForm();
  }

  /**
   * Generates the uploadForm.
   */
  buildUploadForm(): void {
    this.uploadForm = this.fb.group({
      isBrowseHidden: [false],
      isBrowseDisabled: [false],
      validFileTypes: [],
      areMultipleFilesAllowed: [false],
      areFilesUploadedTogether: [false],
      isUploadManual: [false],
      isSizeHidden: [false],
      isDismissButtonHidden: [false],
      isCancelButtonHidden: [false],
      isProgressSectionHidden: [false],
      isProgressInBytes: [false],
      makeUploadError: [false],
    });
  }

  /**
   * Function that mimics uploading a file to a real server.
   *
   * @param files The files to be uploaded.
   * @returns The response of the endpoint.
   */
  uploadFilesFunction(files: File[]): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    let req: HttpRequest<any>;

    files.forEach((file: File) => formData.append('file', file, file.name));

    if (this.uploadForm.get('makeUploadError')?.value) {
      req = new HttpRequest('POST', '/upload-error', formData, { reportProgress: true });
    } else {
      req = new HttpRequest('POST', '/upload-file', formData, {reportProgress: true});
    }

    return this.http.request(req);
  }

  /**
   * Function that mimics removing a file from a server.
   *
   * @param files The files to be deleted.
   * @returns The response of the endpoint.
   */
  removeFilesFunction(files: File[]): Observable<HttpEvent<any>> {
    const names: string = files.map((f: File) => f.name).join(',');
    const req: HttpRequest<any> = new HttpRequest('DELETE', `/remove-file/${names}`);
    return this.http.request(req);
  }

  /**
   * Whenever a file is selected, update the fileSelectionCount.
   *
   * @param _uploadInfo The emitted upload ifo.
   */
  fileSelection(_uploadInfo: UploadInfo[]): void {
    this.resetState();
    this.fileSelectionCount += 1;
  }

  /**
   * Whenever a file's upload status is updated, update uploadUpdatedCount.
   *
   * @param _uploadInfo The emitted upload ifo.
   */
  uploadUpdated(_uploadInfo: UploadInfo[]): void {
    this.uploadUpdatedCount += 1;
  }

  /**
   * Whenever a file is finished uploading, update uploadFinishedCount.
   *
   * @param _uploadInfo The emitted upload ifo.
   */
  uploadFinished(_uploadInfo: UploadInfo[]): void {
    this.uploadFinishedCount += 1;
  }

  /**
   * Whenever a file upload is cancelled, update uploadCancelledCount.
   *
   * @param _uploadInfo The emitted upload ifo.
   */
  uploadCancelled(_uploadInfo: UploadInfo[]): void {
    this.uploadCancelledCount += 1;
  }

  /**
   * Resets the state of the all the counters (to 0).
   */
  resetState(): void {
    this.fileSelectionCount = 0;
    this.uploadUpdatedCount = 0;
    this.uploadFinishedCount = 0;
    this.uploadCancelledCount = 0;
  }
}
