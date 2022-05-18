import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UploadFileNamePipe } from './upload-file-name';
import { UploadFileStatusPipe } from './upload-file-status';
import { UploadStatusPipe } from './upload-status';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    UploadFileNamePipe,
    UploadFileStatusPipe,
    UploadStatusPipe,
  ],
  exports: [
    CommonModule,
    UploadFileNamePipe,
    UploadFileStatusPipe,
    UploadStatusPipe,
  ],
})
export class UploadPipesModule {}
