import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NoteComponent } from './note.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NoteComponent,
  ],
  exports: [
    CommonModule,

    NoteComponent,
  ],
})
export class NoteModule { }
