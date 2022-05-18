import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { BytesModule } from '../../pipes/bytes';
import { ButtonModule } from '../button';
import { ProgressBarModule } from '../progress-bar';
import { UploadPipesModule } from './upload-pipes';
import { UploadComponent } from './upload.component';

@NgModule({
  imports: [
    ButtonModule,
    BytesModule,
    CommonModule,
    ProgressBarModule,
    TranslateModule,
    UploadPipesModule,
  ],
  declarations: [
    UploadComponent,
  ],
  exports: [
    ButtonModule,
    BytesModule,
    CommonModule,
    ProgressBarModule,

    UploadPipesModule,
    UploadComponent,
  ],
})
export class UploadModule {}
