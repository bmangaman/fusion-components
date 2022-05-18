import { ComponentFixture } from '@angular/core/testing';

import { ButtonPageObject } from './button.spec.po';
import { ProgressBarPageObject } from './progress-bar.spec.po';

export interface UploadFilePageObject {
  fileName: string;
  fileSize: string;
  uploadButton: ButtonPageObject;
  cancelButton: ButtonPageObject;
  removeButton: ButtonPageObject;
  dismissButton: ButtonPageObject;
  progressBar: ProgressBarPageObject;
  status: string;
}

/**
 * UPLOAD PAGE OBJECT
 *
 * Page object for the fusion-ui-upload component.
 * Makes it easier to find and select certain fusion-ui-upload attributes and elements.
 */
export class UploadPageObject {
  private fixture: ComponentFixture<any>;
  private uploadClass: string;

  get upload(): HTMLElement {
    // first try to get the fusion-ui-upload element by a provided class
    const uploadClass: HTMLElement = this.uploadClass ? this.fixture.nativeElement.querySelector(this.uploadClass) : null;
    // if no provided class or element not found, try to find the fusion-ui-upload element by the fusion-ui-upload tag
    const fusionUpload: HTMLElement = (uploadClass || this.fixture.nativeElement).querySelector('fusion-ui-upload');

    return fusionUpload;
  }

  /**
   * Gets the upload instructions text.
   *
   * @returns The upload instructions text.
   */
  get instructions(): string {
    const upload: HTMLElement = this.upload;
    const instructionsContainer: HTMLDivElement = upload ? upload.querySelector('.fusion-ui-upload__instructions') : null;
    return instructionsContainer ? instructionsContainer.innerText : null;
  }

  /**
   * Gets the brand image of the upload.
   *
   * @returns The branch image of the upload.
   */
  get browseButton(): HTMLInputElement {
    const upload: HTMLElement = this.upload;
    const browseContainer: HTMLDivElement = upload ? upload.querySelector('.fusion-ui-upload__browse') : null;
    return browseContainer ? browseContainer.querySelector('.fusion-ui-upload__browse-input') : null;
  }

  /**
   * Gets the container that displays all the files.
   *
   * @returns The container for all the files.
   */
  get filesContainer(): HTMLDivElement {
    const upload: HTMLElement = this.upload;
    return upload ? upload.querySelector('.fusion-ui-upload__files') : null;
  }

  /**
   * Gets inner content of the upload.
   *
   * @returns The inner content of the upload.
   */
  get files(): NodeListOf<HTMLDivElement> {
    const container: HTMLDivElement = this.filesContainer;
    return container ? container.querySelectorAll('.fusion-ui-upload__file') : null;
  }

  /**
   * Gets inner content of the upload.
   *
   * @param index The index of the file.
   * @returns The .
   */
  getFileAtIndex(index: number): UploadFilePageObject {
    const files: NodeListOf<HTMLDivElement> = this.files;
    const file: HTMLDivElement = files ? files.item(index) : null;
    return {
      fileName: (file.querySelector('.fusion-ui-upload__file-info-name') as HTMLDivElement).innerText,
      fileSize: (file.querySelector('.fusion-ui-upload__file-info-size') as HTMLDivElement).innerText,
      uploadButton: new ButtonPageObject(this.fixture, '.fusion-ui-upload__file-upload-button'),
      cancelButton: new ButtonPageObject(this.fixture, '.fusion-ui-upload__file-cancel-button'),
      removeButton: new ButtonPageObject(this.fixture, '.fusion-ui-upload__file-remove-button'),
      dismissButton: new ButtonPageObject(this.fixture, '.fusion-ui-upload__file-dismiss-button'),
      progressBar: new ProgressBarPageObject(this.fixture, `.fusion-ui-upload__file--${ index }`),
      status: (file.querySelector('.fusion-ui-upload__file-status') as HTMLDivElement).innerText,
    };
  }

  /**
   * Creates a page object for a fusion-ui-upload DOM element based on the provided fixture and optional uploadClass.
   *
   * @param fixture The parent DOM fixture/ element that houses the fusion-ui-upload.
   * @param uploadClass Optional, providing a css class appended to a fusion-ui-upload will help make sure the correct one is selected.
   */
  constructor(fixture: ComponentFixture<any>, uploadClass?: string) {
    this.fixture = fixture;
    this.uploadClass = uploadClass;
  }
}
