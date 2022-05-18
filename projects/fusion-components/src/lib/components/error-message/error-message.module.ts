import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorMessageComponent } from './error-message.component';
import { ErrorMessagePipesModule } from './pipes';

@NgModule({
  declarations: [
    ErrorMessageComponent,
  ],
  imports: [
    CommonModule,
    ErrorMessagePipesModule,
  ],
  exports: [
    ErrorMessageComponent,
  ],
})
export class ErrorMessageModule {}
