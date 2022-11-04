import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationComponent } from './notification.component';

@NgModule({
  declarations: [
    NotificationComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NotificationComponent,
    CommonModule,
  ],
})
export class NotificationModule {}
