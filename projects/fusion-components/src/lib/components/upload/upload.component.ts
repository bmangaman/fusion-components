import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

import { TranslatedComponent } from '@fusion-ui/fusion-components/lib/shared';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { BytesPipeBase } from '../../pipes/bytes';
import { FusionComponentsTranslationService } from '../../services';
import { FusionUiSize } from '../../shared/interfaces';
import { ButtonType } from '../button';
import { HTMLInputEvent, UploadInfo, UploadTranslations } from './upload.interface';

/**
 * UPLOAD COMPONENT
 *
 * The Upload Component provides a user interface for selecting and uploading files to a server using the provided uploadFunction.
 * Note that the upload function should enable progress events in the HTTP request with { reportProgress: true } in order to allow
 * the progress bar to function properly.
 *
 * @example
 * <fusion-ui-upload
 *   // Required
 *   [uploadFilesFunction]="uploadFilesFunction.bind(this)"
 *
 *   // Optional
 *   [removeFilesFunction]="removeFilesFunction.bind(this)"
 *   [uploadId]="uploadId"
 *   [isBrowseHidden]="isBrowseHidden"
 *   [isBrowseDisabled]="isBrowseDisabled"
 *   [areMultipleFilesAllowed]="areMultipleFilesAllowed"
 *   [areFilesUploadedTogether]="areFilesUploadedTogether"
 *   [isUploadManual]="isUploadManual"
 *   [isSizeHidden]="isSizeHidden"
 *   [isDismissButtonHidden]="isDismissButtonHidden"
 *   [isCancelButtonHidden]="isCancelButtonHidden"
 *   [isProgressSectionHidden]="isProgressSectionHidden"
 *   [isProgressInBytes]="isProgressInBytes"
 *
 *   // Events
 *   (fileSelection)="fileSelection($event)"
 *   (uploadUpdated)="uploadUpdated($event)"
 *   (uploadFinished)="uploadFinished($event)"
 *   (uploadCancelled)="uploadCancelled($event)">
 * </fusion-ui-upload>
 */
@Component({
  selector: 'fusion-ui-upload',
  templateUrl: 'upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent extends TranslatedComponent implements OnDestroy {
  readonly ButtonType = ButtonType;
  readonly BytesPipeBase = BytesPipeBase;
  readonly FusionUiSize = FusionUiSize;

  private _unsubscribe$ = new Subject<void>();

  isUploadInProgress: boolean = false;
  fileList: UploadInfo[] = [];

  /**
   *  Required.
   *
   *  The upload function to use. It should enable progress events in the HTTP request with { reportProgress: true }.
   *  It should return the http observable which this component will subscribe to in order to do the transfer.
   *  Note that it should explicitly scoped to work properly, like [uploadFilesFunction]="myUploadFunction.bind(this)".
   */
  @Input() uploadFilesFunction: (files: File[]) => Observable<HttpEvent<any>>;

  /**
   * Optional function to call to remove a previously uploaded file from the server. If specified a remove button will be displayed
   * after successful file upload. It should return the http observable which this component will subscribe to in order to do the delete.
   *  Note that it should explicitly scoped to work properly, like [removeFilesFunction]="myUploadFunction.bind(this)".
   */
  @Input() removeFilesFunction: (files: File[]) => Observable<HttpEvent<any>>;

  /**
   * Determines the id of the upload input and label.
   */
  @Input() uploadId: string = `fusion-ui-upload__browse-input--${uuidv4()}`;

  /**
   * Determines whether or not the browse button is hidden.
   * If true, the upload progress will replace the browse button and label rather than being displayed below them.
   */
  @Input() isBrowseHidden: boolean = false;

  /**
   * Determines whether or not the browse button is disabled.
   */
  @Input() isBrowseDisabled: boolean = false;

  /**
   * Determines the type of files allowed to be uploaded.
   */
  @Input() validFileTypes: string[] = [];

  /**
   * Determines whether or not multiple files are allowed to be uploaded at once.
   * False by default.
   */
  @Input() areMultipleFilesAllowed: boolean = false;

  /**
   * Determines whether or not all uploaded files will be uploaded together.
   * If true, the file(s) will be passed as array to uploadFunction and a single progress bar will be displayed.
   * False by default.
   */
  @Input() areFilesUploadedTogether: boolean = false;

  /**
   * Determines whether or not the actual upload of the file needs to be kicked off after selecting it.
   * If true, an 'upload' button will be displayed for each file rather than automatically beginning the upload upon selection.
   * False by default.
   */
  @Input() isUploadManual: boolean = false;

  /**
   * Determines whether or not the size of the file is displayed beside the file name.
   * False by default.
   */
  @Input() isSizeHidden: boolean = false;

  /**
   * Determines whether or not the dismiss (x) button for each file is displayed.
   * False by default.
   */
  @Input() isDismissButtonHidden: boolean = false;

  /**
   * Determines whether or not the cancel button for each file is displayed.
   * False by default.
   */
  @Input() isCancelButtonHidden: boolean = false;

  /**
   * Determines whether or not the section that displays the progress bar(s) is displayed.
   * False by default.
   */
  @Input() isProgressSectionHidden: boolean = false;

  /**
   * Determines whether or not the progress bar percetage is instead displayed in (scaled) bytes.
   * False by default.
   */
  @Input() isProgressInBytes: boolean = false;

  /**
   * Determiens whether or not all active subscriptions are terminated on component teardown.
   * True by default.
   */
  @Input() areSubscriptionsCancelledOnDestroy: boolean = true;

  /**
   * Determines the static text diplayed (such as the instructions and browse button).
   */
  @Input() translations: UploadTranslations;

  /**
   * Optional output that upon user file selection, emits a list of UploadInfo (see interface) objects, one for each file the user selected.
   */
  @Output() fileSelection: EventEmitter<UploadInfo[]> = new EventEmitter<UploadInfo[]>();

  /**
   * Optional output that emits the list of UploadInfo (see Interface) objects after each http progress event received in case the client
   * needs to keep track of upload progress. Note that this is an expensive operation.
   */
  @Output() uploadUpdated: EventEmitter<UploadInfo[]> = new EventEmitter<UploadInfo[]>();

  /**
   * Emits the list of UploadInfo (see Interface) objects (one for each selected file) after every file has either been
   * successfully uploaded or has failed.
   */
  @Output() uploadFinished: EventEmitter<UploadInfo[]> = new EventEmitter<UploadInfo[]>();

  /**
   * Emits the list of UploadInfo (see Interface) objects (one for each selected file) after a file has been cancelled
   */
  @Output() uploadCancelled: EventEmitter<UploadInfo[]> = new EventEmitter<UploadInfo[]>();

  /**
   * The upload input element. Used to clear the value whenever the selected files are successfully saved (see updateFileList() function).
   */
  @ViewChild('uploadInput', { static: false }) fileInputElement: ElementRef;

  /**
   * The CSS classes to be appened to the host element.
   */
  @HostBinding('class') hostClasses: string = 'fusion-ui-upload';

  constructor(
    private changeDetector: ChangeDetectorRef,
    protected translationService: FusionComponentsTranslationService,
  ) {
    super(translationService);
  }

  /**
   * If areSubscriptionsCancelledOnDestroy input is true, complete any active subscriptions.
   */
  ngOnDestroy(): void {
    if (this.areSubscriptionsCancelledOnDestroy) {
      this._unsubscribe$.next();
      this._unsubscribe$.complete();
    }
  }

  /**
   * Callback for file input element change event. Takes the list of selected files and populates the component fileList.
   * It then emits the fileSelection output with the fileList and, if manualUpload is false (the default), it will call
   * uploadFiles to start the transfer.
   *
   * @param uploadEvent The event from file input with list of files
   */
  updateFileList(uploadEvent: HTMLInputEvent): void {
    this.fileList = [];

    const newFiles: File[] = [];
    let totalSize = 0;

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < uploadEvent.target.files.length; i++) {
      const file: File = uploadEvent.target.files[i];

      if (this.areFilesUploadedTogether) {
        newFiles.push(file);
        totalSize += file.size;
      } else {
        this.fileList.push({
          files: [file],
          progressBytes: 0,
          totalBytes: file.size,
          error: null,
          isComplete: false,
        });
      }
    }

    if (this.areFilesUploadedTogether) {
      this.fileList.push({
        files: newFiles,
        progressBytes: 0,
        totalBytes: totalSize,
        error: null,
        isComplete: false,
      });
    }

    // Emit the list of selected files
    this.fileSelection.emit(this.fileList);

    // If upload is not manual, automatically upload the files
    if (!this.isUploadManual) {
      this.uploadFiles();
    }

    // If the file input element is present, clear its value
    if (this.fileInputElement) {
      this.fileInputElement.nativeElement.value = null;
    }
  }

  /**
   * Calls uploadFile for each UploadInfo object in fileList.
   */
  uploadFiles(): void {
    this.fileList.forEach((fileInfo: UploadInfo) => this.uploadFile(fileInfo));
  }

  /**
   * Calls the provided uploadFunction for the file or files in the UploadInfo object and subscribes to the event stream to
   * monitor the progress, updating the UploadInfo object for each event received.
   *
   * @param fileInfo The UploadInfo object to get file(s) from.
   */
  uploadFile(fileInfo: UploadInfo): void {
    this.isUploadInProgress = true;

    if (fileInfo && this.uploadFilesFunction) {
      fileInfo.subscription = this.uploadFilesFunction(fileInfo.files)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe(
          (event: HttpEvent<any>) => {
            switch (event.type) {

              // If the upload is still in progress
              case HttpEventType.UploadProgress:
                fileInfo.totalBytes = event.total || fileInfo.totalBytes;
                fileInfo.progressBytes = event.loaded;
                this.changeDetector.detectChanges();
                break;

              // If the upload has finished
              case HttpEventType.Response:
                fileInfo.progressBytes = fileInfo.totalBytes;
                fileInfo.isComplete = true;
                this.changeDetector.detectChanges();
                this.checkCompletion();
                break;
            }

            this.uploadUpdated.emit(this.fileList);
            this.updateUploadProgress();
          },
          (error: HttpErrorResponse) => {
            fileInfo.error = error;
            fileInfo.isComplete = true;
            this.changeDetector.detectChanges();
            this.uploadUpdated.emit(this.fileList);
            this.checkCompletion();
            this.updateUploadProgress();
          },
        );
    } else if (!this.uploadFilesFunction) {
      throw new TypeError("The input 'uploadFilesFunction' is required.");
    }
  }

  /**
   * Updates the isUploadInProgress variable based on the fileList UploadInfo.
   * Sets isUploadInProgress to false
   *  - if fileList is undefined or empty
   *  - if all uploads in the fileList are done
   */
  updateUploadProgress(): void {
    if (!this.fileList || !this.fileList.length) {
      this.isUploadInProgress = false;
      return;
    }

    const completedOrErrored: UploadInfo[] = this.fileList.filter((file: UploadInfo) => file.isComplete || file.error);
    const areAllUploadsDone: boolean = completedOrErrored.length === this.fileList.length;

    if (areAllUploadsDone) {
      this.isUploadInProgress = false;
    }
  }

  /**
   * Emits uploadFinished with the fileList if every upload fileList is complete (successfully uploaded or errored out).
   */
  checkCompletion(): void {
    const isFinished = !this.fileList.some((fileInfo: UploadInfo) => !fileInfo.isComplete);

    if (isFinished) {
      this.uploadFinished.emit(this.fileList);
    }
  }

  /**
   * Unsubscribes to the http subscription to abort file upload and removes the entry from fileList.
   *
   * @param fileInfo The UploadInfo object to get file info from.
   */
  cancelFile(fileInfo: UploadInfo): void {
    const index: number = this.fileList.findIndex((fileEntry: UploadInfo) => fileEntry === fileInfo);

    if (index !== -1) {
      if (this.fileList[index].subscription) {
        this.fileList[index].subscription.unsubscribe();
      }

      this.fileList.splice(index, 1);
    }

    this.updateUploadProgress();
    this.uploadCancelled.emit(this.fileList);
  }

  /**
   * Calls the provided removeFunction and subscribes to the events to update the fileList on success or failure.
   *
   * @param fileInfo The UploadInfo object to get file from.
   */
  removeFile(fileInfo: UploadInfo): void  {
    if (fileInfo && this.removeFilesFunction) {
      this.removeFilesFunction(fileInfo.files)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event && event.type === HttpEventType.Response) {
            this.cancelFile(fileInfo);
            this.changeDetector.detectChanges();
            this.uploadUpdated.emit(this.fileList);
            this.checkCompletion();
          }
        },
        (error: HttpErrorResponse) => {
          fileInfo.error = error;
          this.changeDetector.detectChanges();
          this.uploadUpdated.emit(this.fileList);
          this.checkCompletion();
        }
      );
    }
  }
}
