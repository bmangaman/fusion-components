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
 * Page object for the f-upload component.
 * Makes it easier to find and select certain f-upload attributes and elements.
 */
export class UploadPageObject {
  private fixture: ComponentFixture<any>;
  private uploadClass: string;

  get upload(): HTMLElement {
    // first try to get the f-upload element by a provided class
    const uploadClass: HTMLElement = this.uploadClass ? this.fixture.nativeElement.querySelector(this.uploadClass) : null;
    // if no provided class or element not found, try to find the f-upload element by the f-upload tag
    const fusionUpload: HTMLElement = (uploadClass || this.fixture.nativeElement).querySelector('f-upload');

    return fusionUpload;
  }

  /**
   * Gets the upload instructions text.
   *
   * @returns The upload instructions text.
   */
  get instructions(): string {
    const upload: HTMLElement = this.upload;
    const instructionsContainer: HTMLDivElement = upload ? upload.querySelector('.f-upload__instructions') : null;
    return instructionsContainer ? instructionsContainer.innerText : null;
  }

  /**
   * Gets the brand image of the upload.
   *
   * @returns The branch image of the upload.
   */
  get browseButton(): HTMLInputElement {
    const upload: HTMLElement = this.upload;
    const browseContainer: HTMLDivElement = upload ? upload.querySelector('.f-upload__browse') : null;
    return browseContainer ? browseContainer.querySelector('.f-upload__browse-input') : null;
  }

  /**
   * Gets the container that displays all the files.
   *
   * @returns The container for all the files.
   */
  get filesContainer(): HTMLDivElement {
    const upload: HTMLElement = this.upload;
    return upload ? upload.querySelector('.f-upload__files') : null;
  }

  /**
   * Gets inner content of the upload.
   *
   * @returns The inner content of the upload.
   */
  get files(): NodeListOf<HTMLDivElement> {
    const container: HTMLDivElement = this.filesContainer;
    return container ? container.querySelectorAll('.f-upload__file') : null;
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
      fileName: (file.querySelector('.f-upload__file-info-name') as HTMLDivElement).innerText,
      fileSize: (file.querySelector('.f-upload__file-info-size') as HTMLDivElement).innerText,
      uploadButton: new ButtonPageObject(this.fixture, '.f-upload__file-upload-button'),
      cancelButton: new ButtonPageObject(this.fixture, '.f-upload__file-cancel-button'),
      removeButton: new ButtonPageObject(this.fixture, '.f-upload__file-remove-button'),
      dismissButton: new ButtonPageObject(this.fixture, '.f-upload__file-dismiss-button'),
      progressBar: new ProgressBarPageObject(this.fixture, `.f-upload__file--${ index }`),
      status: (file.querySelector('.f-upload__file-status') as HTMLDivElement).innerText,
    };
  }

  /**
   * Creates a page object for a f-upload DOM element based on the provided fixture and optional uploadClass.
   *
   * @param fixture The parent DOM fixture/ element that houses the f-upload.
   * @param uploadClass Optional, providing a css class appended to a f-upload will help make sure the correct one is selected.
   */
  constructor(fixture: ComponentFixture<any>, uploadClass?: string) {
    this.fixture = fixture;
    this.uploadClass = uploadClass;
  }
}
