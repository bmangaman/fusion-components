import { HttpErrorResponse, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { concat, Observable, of, Subscription, throwError } from 'rxjs';

import { cloneDeep } from 'lodash-es';

import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { UploadComponent } from './upload.component';
import { HTMLInputEvent, UploadInfo } from './upload.interface';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let changeDetectorRef: ChangeDetectorRef;
  let uploadInfo: UploadInfo[] = [];

  let mockUploadFileFunction: (files: File[]) => Observable<HttpEvent<any>>;

  beforeEach(() => {
    changeDetectorRef = ComponentStubFactory.getChangeDetectorRefStub() as ChangeDetectorRef;
    component = new UploadComponent(changeDetectorRef);
  });

  beforeEach(() => {
    mockUploadFileFunction = (files: File[]): Observable<HttpEvent<any>> => {
      const numberOfFiles: number = files && files.length;
      const maxValue: number = numberOfFiles * 1000;

      const events: Observable<HttpEvent<any>>[] = [0, maxValue / 2, maxValue * (2 / 3)].map(x => of({
        type: HttpEventType.UploadProgress,
        loaded: x,
        total: maxValue,
      } as HttpProgressEvent));

      events.push(of(new HttpResponse({status: 200})));
      return concat(...events);
    };

    component.uploadFilesFunction = mockUploadFileFunction;
    component.removeFilesFunction = mockUploadFileFunction;

    uploadInfo = generateUploadInfo(2);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnDestroy()', () => {
    it('should complete the unsubscribe$ subject if areSubscriptionsCancelledOnDestroy is true', () => {
      /* eslint-disable @typescript-eslint/dot-notation */
      spyOn(component['_unsubscribe$'], 'next').and.stub();
      spyOn(component['_unsubscribe$'], 'complete').and.stub();

      component.areSubscriptionsCancelledOnDestroy = false;
      component.ngOnDestroy();
      expect(component['_unsubscribe$'].next).not.toHaveBeenCalled();
      expect(component['_unsubscribe$'].complete).not.toHaveBeenCalled();

      component.areSubscriptionsCancelledOnDestroy = true;
      component.ngOnDestroy();
      expect(component['_unsubscribe$'].next).toHaveBeenCalled();
      expect(component['_unsubscribe$'].complete).toHaveBeenCalled();
      /* eslint-enable @typescript-eslint/dot-notation */
    });
  });

  describe('updateFileList()', () => {
    beforeEach(() => {
      spyOn(component.fileSelection, 'emit').and.stub();
      spyOn(component, 'uploadFiles').and.stub();
    });

    it('should set fileList with individual files and emit an event with fileList if uploadTogether is false', () => {
      component.updateFileList({ target: { files: uploadInfo[0].files } } as any as HTMLInputEvent );

      component.areFilesUploadedTogether = false;
      expect(component.fileList).toEqual([uploadInfo[0]]);
      expect(component.fileSelection.emit).toHaveBeenCalledWith([uploadInfo[0]]);
    });

    it('should set fileList with consolidated files and emit an event with fileList if uploadTogether is true', () => {
      uploadInfo = generateUploadInfo(2, false);

      component.areFilesUploadedTogether = true;
      component.updateFileList({ target: { files: uploadInfo[0].files } } as any as HTMLInputEvent);

      expect(component.fileList).toEqual([uploadInfo[0]]);
      expect(component.fileSelection.emit).toHaveBeenCalledWith([uploadInfo[0]]);
    });

    it('should call uploadFiles if manualUpload is false', () => {
      component.updateFileList({ target: { files: uploadInfo[0].files } } as any as HTMLInputEvent);

      expect(component.fileSelection.emit).toHaveBeenCalled();
      expect(component.uploadFiles).toHaveBeenCalled();
    });

    it('should not call uploadFiles if manualUpload is true', () => {
      component.isUploadManual = true;
      component.updateFileList({ target: { files: uploadInfo[0].files } } as any as HTMLInputEvent);

      expect(component.fileSelection.emit).toHaveBeenCalled();
      expect(component.uploadFiles).not.toHaveBeenCalled();
    });

    it('should set the value of the input to null if found', () => {
      const input: HTMLInputElement = document.createElement('input');
      input.value = 'value';
      component.fileInputElement = { nativeElement: input } as ElementRef<any>;

      expect(component.fileInputElement.nativeElement.value).toBeTruthy();
      component.updateFileList({ target: { files: uploadInfo[0].files } } as any as HTMLInputEvent);
      expect(component.fileInputElement.nativeElement.value).toBeFalsy();
    });
  });

  describe('uploadFiles()', () => {
    it('should call uploadFile for each entry in fileList', () => {
      spyOn(component, 'uploadFile').and.stub();

      component.fileList = uploadInfo;
      component.uploadFiles();
      expect(component.uploadFile).toHaveBeenCalledWith(component.fileList[0]);
      expect(component.uploadFile).toHaveBeenCalledWith(component.fileList[1]);
    });
  });

  describe('uploadFile()', () => {
    beforeEach(() => {
      spyOn(component, 'checkCompletion').and.stub();
      spyOn(component, 'updateUploadProgress').and.stub();
      spyOn(component.uploadUpdated, 'emit').and.stub();
    });

    it('should set isUploadInProgress to true', () => {
      component.isUploadInProgress = false;
      component.uploadFile(null as any);
      expect(component.isUploadInProgress).toBeTrue();
    });

    it('should not do anything if fileInfo or uploadFilesFunction is undefined', fakeAsync(() => {
      component.uploadFilesFunction = null as any;
      expect(() => component.uploadFile(null as any)).toThrow();
      tick(1000);
      expect(component.updateUploadProgress).not.toHaveBeenCalled();
      discardPeriodicTasks();

      component.uploadFilesFunction = () => of({ type: HttpEventType.Response } as HttpEvent<any>);
      component.uploadFile(null as any);
      tick(1000);
      expect(component.updateUploadProgress).not.toHaveBeenCalled();
      discardPeriodicTasks();

      component.uploadFilesFunction = null as any;
      expect(() => component.uploadFile(cloneDeep(uploadInfo[0]))).toThrow();
      tick(1000);
      expect(component.updateUploadProgress).not.toHaveBeenCalled();
      discardPeriodicTasks();

      component.uploadFilesFunction = () => of({ type: HttpEventType.Response } as HttpEvent<any>);
      component.uploadFile(cloneDeep(uploadInfo[0]));
      tick(1000);
      expect(component.updateUploadProgress).toHaveBeenCalled();
      discardPeriodicTasks();
    }));

    it('should update the total and progress bytes while the upload is in progress', fakeAsync(() => {
      let event: HttpEvent<any> = {
        type: HttpEventType.UploadProgress,
        loaded: 1000,
      };

      component.fileList = cloneDeep(uploadInfo);
      component.uploadFilesFunction = () => of(event);

      component.uploadFile(component.fileList[0]);
      tick(1000);

      expect(component.fileList[0].progressBytes).toEqual(1000);
      expect(component.fileList[0].totalBytes).toEqual(1000);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      expect(component['changeDetector'].detectChanges).toHaveBeenCalled();
      expect(component.uploadUpdated.emit).toHaveBeenCalled();
      expect(component.updateUploadProgress).toHaveBeenCalled();

      discardPeriodicTasks();

      event = {
        type: HttpEventType.UploadProgress,
        loaded: 2000,
        total: 5000,
      };

      component.fileList = cloneDeep(uploadInfo);
      component.uploadFilesFunction = () => of(event);

      component.uploadFile(component.fileList[0]);
      tick(1000);

      expect(component.fileList[0].progressBytes).toEqual(2000);
      expect(component.fileList[0].totalBytes).toEqual(5000);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      expect(component['changeDetector'].detectChanges).toHaveBeenCalled();
      expect(component.uploadUpdated.emit).toHaveBeenCalled();
      expect(component.updateUploadProgress).toHaveBeenCalled();

      discardPeriodicTasks();
    }));

    it('should update the progress bytes and isComplete flag if the upload is finished', fakeAsync(() => {
      const event: HttpEvent<any> = {
        type: HttpEventType.Response,
      } as HttpEvent<any>;

      component.fileList = cloneDeep(uploadInfo);
      component.uploadFilesFunction = () => of(event);

      component.uploadFile(component.fileList[0]);
      tick(1000);

      expect(component.fileList[0].progressBytes).toEqual(1000);
      expect(component.fileList[0].isComplete).toBeTrue();
      // eslint-disable-next-line @typescript-eslint/dot-notation
      expect(component['changeDetector'].detectChanges).toHaveBeenCalled();
      expect(component.checkCompletion).toHaveBeenCalled();
      expect(component.uploadUpdated.emit).toHaveBeenCalled();
      expect(component.updateUploadProgress).toHaveBeenCalled();

      discardPeriodicTasks();
    }));

    it('should update the error and isComplete flag if the upload fails', fakeAsync(() => {
      const errorResponse: HttpErrorResponse = {
        error: 'error',
      } as HttpErrorResponse;

      component.fileList = cloneDeep(uploadInfo);
      component.uploadFilesFunction = () => throwError(errorResponse);

      component.uploadFile(component.fileList[0]);
      tick(1000);

      expect(component.fileList[0].error).toEqual(errorResponse);
      expect(component.fileList[0].isComplete).toBeTrue();
      // eslint-disable-next-line @typescript-eslint/dot-notation
      expect(component['changeDetector'].detectChanges).toHaveBeenCalled();
      expect(component.checkCompletion).toHaveBeenCalled();
      expect(component.uploadUpdated.emit).toHaveBeenCalled();
      expect(component.updateUploadProgress).toHaveBeenCalled();

      discardPeriodicTasks();
    }));
  });

  describe('updateUploadProgress()', () => {
    it('should set isUploadInProgress to false if there are no files or if all the uploads are done', () => {
      component.isUploadInProgress = true;
      component.fileList = null as any;
      component.updateUploadProgress();
      expect(component.isUploadInProgress).toBeFalse();

      component.isUploadInProgress = true;
      component.fileList = [];
      component.updateUploadProgress();
      expect(component.isUploadInProgress).toBeFalse();

      component.isUploadInProgress = true;
      component.fileList = cloneDeep(uploadInfo);
      component.updateUploadProgress();
      expect(component.isUploadInProgress).toBeTrue();

      component.isUploadInProgress = true;
      component.fileList = cloneDeep(uploadInfo);
      component.fileList[0].isComplete = true;
      component.updateUploadProgress();
      expect(component.isUploadInProgress).toBeTrue();

      component.isUploadInProgress = true;
      component.fileList = cloneDeep(uploadInfo);
      component.fileList[0].isComplete = true;
      component.fileList[1].isComplete = true;
      component.updateUploadProgress();
      expect(component.isUploadInProgress).toBeFalse();

      component.isUploadInProgress = true;
      component.fileList = cloneDeep(uploadInfo);
      component.fileList[0].isComplete = true;
      component.fileList[1].error = {} as HttpErrorResponse;
      component.updateUploadProgress();
      expect(component.isUploadInProgress).toBeFalse();
    });
  });

  describe('checkCompletion()', () => {
    it('should not emit onFinished if all fileInfo objects are not complete', () => {
      spyOn(component.uploadFinished, 'emit').and.stub();

      uploadInfo = generateUploadInfo(2);

      uploadInfo[0].isComplete = true;
      uploadInfo[1].isComplete = false;
      component.fileList = uploadInfo;
      component.checkCompletion();
      expect(component.uploadFinished.emit).not.toHaveBeenCalled();

      uploadInfo[0].isComplete = true;
      uploadInfo[1].isComplete = true;
      component.fileList = uploadInfo;
      component.checkCompletion();
      expect(component.uploadFinished.emit).toHaveBeenCalled();
    });
  });

  describe('cancelFile()', () => {
    it('should find the file to be cancelled, usubscribe from it, and remove it from the list', () => {
      spyOn(component.uploadCancelled, 'emit').and.stub();
      spyOn(component, 'updateUploadProgress').and.stub();

      // Does nothing because file is not found
      component.fileList = [];
      component.cancelFile(null as any);
      expect(component.updateUploadProgress).toHaveBeenCalled();
      expect(component.uploadCancelled.emit).toHaveBeenCalledWith([]);

      // Just removes file since subscription is not active
      component.fileList = cloneDeep(uploadInfo);
      component.cancelFile(component.fileList[0]);
      expect(component.updateUploadProgress).toHaveBeenCalled();
      expect(component.uploadCancelled.emit).toHaveBeenCalledWith([uploadInfo[1]]);

      // Unsubscribes and removes file
      component.fileList = cloneDeep(uploadInfo);
      component.fileList[0].subscription = new Subscription();
      component.cancelFile(component.fileList[0]);
      expect(component.updateUploadProgress).toHaveBeenCalled();
      expect(component.uploadCancelled.emit).toHaveBeenCalledWith([uploadInfo[1]]);
    });
  });

  describe('removeFile()', () => {
    /* eslint-disable @typescript-eslint/dot-notation */

    beforeEach(() => {
      spyOn(component, 'checkCompletion').and.stub();
      spyOn(component, 'cancelFile').and.stub();
      spyOn(component.uploadUpdated, 'emit').and.stub();

      component.fileList = cloneDeep(uploadInfo);
    });

    it('should do nothing if removeFilesFunction is not defined', () => {
      component.removeFilesFunction = null as any;
      component.removeFile({} as UploadInfo);
      expect(component.checkCompletion).not.toHaveBeenCalled();

      component.removeFilesFunction = () => of(null as any);
      component.removeFile(null as any);
      expect(component.checkCompletion).not.toHaveBeenCalled();
    });

    it('should handle when removeFilesFunction returns successfully', fakeAsync(() => {
      component.removeFilesFunction = () => of(null as any);
      component.removeFile(component.fileList[0]);
      tick(2000);
      expect(component.checkCompletion).not.toHaveBeenCalled();
      discardPeriodicTasks();

      component.removeFilesFunction = () => of({ type: HttpEventType.Sent } as HttpEvent<any>);
      component.removeFile(component.fileList[0]);
      tick(2000);
      expect(component.checkCompletion).not.toHaveBeenCalled();
      discardPeriodicTasks();

      component.removeFilesFunction = () => of({ type: HttpEventType.Response } as HttpEvent<any>);
      component.removeFile(component.fileList[0]);
      tick(2000);
      expect(component.cancelFile).toHaveBeenCalled();
      expect(component['changeDetector'].detectChanges).toHaveBeenCalled();
      expect(component.uploadUpdated.emit).toHaveBeenCalled();
      expect(component.checkCompletion).toHaveBeenCalled();
      discardPeriodicTasks();
    }));

    it('should handle when removeFilesFunction returns an error', fakeAsync(() => {
      component.removeFilesFunction = () => throwError('upload component removeFilesFunction error');
      component.removeFile(component.fileList[0]);
      tick(2000);
      expect(component['changeDetector'].detectChanges).toHaveBeenCalled();
      expect(component.uploadUpdated.emit).toHaveBeenCalled();
      expect(component.checkCompletion).toHaveBeenCalled();
      discardPeriodicTasks();
    }));

    /* eslint-enable @typescript-eslint/dot-notation */
  });

  /**
   * Helper function to generate a mock File.
   *
   * @param index The index of the file used to generate the file name.
   * @returns The generated File.
   */
  function generateFile(index: number): File {
    return { name: `file${index}`, size: 1000 } as File;
  }

  /**
   * Helper function to generate multiple mock Files.
   *
   * @param numOfFiles The number of mock Files to be generated.
   * @returns The generated mock Files.
   */
  function generateFiles(numOfFiles: number): File[] {
    const generatedFiles: File[] = [];

    for (let i = 0; i < numOfFiles; i++) {
      generatedFiles.push(generateFile(i));
    }

    return generatedFiles;
  }

  /**
   * Helper function to generate upload info.
   *
   * @param numOfFiles The number of Files to be generated.
   * @param isSeparate Determines whether or not the files are combined in one upload info object.
   * @returns The generated upload info.
   */
  function generateUploadInfo(numOfFiles: number, isSeparate: boolean = true): UploadInfo[] {
    const geneatedFiles: File[] = generateFiles(numOfFiles);
    const generatedUploadInfo: UploadInfo[] = [];

    let totalBytes = 0;

    for (let i = 0; i < numOfFiles; i++) {
      if (isSeparate) {
        generatedUploadInfo.push({
          files: [geneatedFiles[i]],
          progressBytes: 0,
          totalBytes: 1000,
          error: null,
          isComplete: false,
        });
      } else {
        totalBytes += 1000;
      }
    }

    if (!isSeparate) {
      generatedUploadInfo.push({
        files: geneatedFiles,
        progressBytes: 0,
        totalBytes,
        error: null,
        isComplete: false,
      });
    }

    return generatedUploadInfo;
  }
});
