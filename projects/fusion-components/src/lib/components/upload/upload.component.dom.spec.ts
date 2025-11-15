import { HttpClient, HttpEvent, HttpRequest, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { cloneDeep } from 'lodash-es';
import { Observable } from 'rxjs';

import { UploadFilePageObject } from '@fusion-components/unit-test-helpers/page-objects/upload.spec.po';

import { UploadComponentPageObject } from './upload.component.spec.po';
import { HTMLInputEvent, UploadInfo } from './upload.interface';
import { UploadModule } from './upload.module';

// TODO: HCI-16901 - Flush out and add more DOM unit tests to test all the different permuations

@Component({
    selector: 'f-test-component',
    template: `
  <f-upload
    [uploadFilesFunction]="uploadFilesFunction.bind(this)"
    [removeFilesFunction]="removeFilesFunction.bind(this)"

    [isBrowseHidden]="isBrowseHidden"
    [isBrowseDisabled]="isBrowseDisabled"
    [areMultipleFilesAllowed]="areMultipleFilesAllowed"
    [areFilesUploadedTogether]="areFilesUploadedTogether"
    [isUploadManual]="isUploadManual"
    [isSizeHidden]="isSizeHidden"
    [isDismissButtonHidden]="isDismissButtonHidden"
    [isCancelButtonHidden]="isCancelButtonHidden"
    [isProgressSectionHidden]="isProgressSectionHidden"
    [isProgressInBytes]="isProgressInBytes"

    (fileSelection)="fileSelection($event)"
    (uploadUpdated)="uploadUpdated($event)"
    (uploadFinished)="uploadFinished($event)"
    (uploadCancelled)="uploadCancelled($event)">
  </f-upload>`,
    standalone: false
})
export class UploadTestComponent {
  isBrowseHidden: boolean;
  isBrowseDisabled: boolean;

  areMultipleFilesAllowed: boolean;
  areFilesUploadedTogether: boolean;
  isUploadManual: boolean;

  isSizeHidden: boolean;

  isDismissButtonHidden: boolean;
  isCancelButtonHidden: boolean;
  isProgressSectionHidden: boolean;
  isProgressInBytes: boolean;

  constructor(
    private http: HttpClient,
  ) {}

  uploadFilesFunction(_files: File[]): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const request: HttpRequest<any> = new HttpRequest('POST', '/upload-file', formData, { reportProgress: true});
    return this.http.request(request);
  }

  removeFilesFunction(_files: File[]): Observable<HttpEvent<any>> {
    const req: HttpRequest<any> = new HttpRequest('DELETE', '/remove-file');
    return this.http.request(req);
  }

  fileSelection(_uploadInfo: UploadInfo[]): void {}
  uploadUpdated(_uploadInfo: UploadInfo[]): void {}
  uploadFinished(_uploadInfo: UploadInfo[]): void {}
  uploadCancelled(_uploadInfo: UploadInfo[]): void {}
}

describe('UploadComponent', () => {
  let component: UploadTestComponent;
  let fixture: ComponentFixture<UploadTestComponent>;
  let page: UploadComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        UploadTestComponent,
    ],
    imports: [UploadModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTestComponent);
    component = fixture.componentInstance;
    page = new UploadComponentPageObject(fixture);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('the static content', () => {
    it('shluld display the instructions and browse button', () => {
      expect(page.upload.instructions).toBeTruthy();
      expect(page.upload.browseButton).toBeTruthy();
    });

    it('should either disable or hide the browse button', () => {
      component.isBrowseDisabled = false;
      component.isBrowseHidden = true;
      fixture.detectChanges();
      expect(page.upload.browseButton).toBeFalsy();

      component.isBrowseDisabled = true;
      component.isBrowseHidden = false;
      fixture.detectChanges();
      expect(page.upload.browseButton).toBeTruthy();
      expect(page.upload.browseButton?.disabled).toBeTruthy();
    });
  });

  describe('uploading', () => {
    let files: File[];

    beforeEach(() => {
      files = [
        { name: 'file0', size: 1000 } as File,
        { name: 'file2', size: 1000 } as File,
        { name: 'file3', size: 1000 } as File,
      ];
    });

    describe('a single file', () => {
      it('should not automatically upload the file if isUploadManual is true', fakeAsync(() => {
        component.isUploadManual = true;
        fixture.detectChanges();

        const browseButton: HTMLInputElement | null = page.upload.browseButton;

        const event: Event = generateUploadChangeEvent([cloneDeep(files[0])]);
        browseButton?.dispatchEvent(event);
        tick();
        discardPeriodicTasks();
        fixture.detectChanges();

        expect(page.upload.filesContainer).toBeTruthy();
        expect(browseButton?.disabled).toBeFalsy();

        const file: UploadFilePageObject = page.upload.getFileAtIndex(0);
        expect(file).toBeTruthy();
        expect(file.fileName).toBeTruthy();
        expect(file.fileSize).toBeTruthy();
        expect(file.uploadButton).toBeTruthy();
        expect(file.progressBar.container).toBeTruthy();

        flush();
        discardPeriodicTasks();
      }));

      xit('should automatically upload the file if isUploadManual is false', () => {
        // TODO: HCI-16901
      });
    });

    describe('multiple files', () => {
      it('should not automatically upload the file if isUploadManual is true', fakeAsync(() => {
        component.isUploadManual = true;
        fixture.detectChanges();

        const browseButton: HTMLInputElement | null = page.upload.browseButton;

        const event: Event = generateUploadChangeEvent(cloneDeep(files));
        browseButton?.dispatchEvent(event);
        tick();
        discardPeriodicTasks();
        fixture.detectChanges();

        expect(page.upload.filesContainer).toBeTruthy();
        expect(browseButton?.disabled).toBeFalsy();

        for (let i = 0; i < 3; i++) {
          const file: UploadFilePageObject = page.upload.getFileAtIndex(i);
          expect(file).toBeTruthy();
          expect(file.fileName).toBeTruthy();
          expect(file.fileSize).toBeTruthy();
          expect(file.uploadButton).toBeTruthy();
          expect(file.progressBar.container).toBeTruthy();
        }

        flush();
        discardPeriodicTasks();
      }));

      xit('should automatically upload the file if isUploadManual is false', () => {
        // TODO: HCI-16901
      });
    });
  });

  /**
   * Helper function to generate an event for when the browse button is clicked.
   *
   * @param files The files to be uploaded.
   * @returns The change/ upload event.
   */
  function generateUploadChangeEvent(files: File[]): Event {
    const fileList: FileList = { length: 0 } as FileList;
    fileList.item = (index: number): File => fileList[index];

    files.forEach((file: File, index: number) => {
      (fileList as any).length += 1;
      fileList[index] = file;
    });

    const uploadFileEvent: HTMLInputEvent = { target: { files: fileList } } as HTMLInputEvent;
    const event: Event = new Event('change', uploadFileEvent);
    spyOnProperty(event, 'target').and.returnValue({ ...event.target, files: uploadFileEvent.target.files } as any as EventTarget);

    return event;
  }

});
