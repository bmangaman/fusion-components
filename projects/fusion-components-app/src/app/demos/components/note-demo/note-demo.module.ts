import { NgModule } from '@angular/core';

import { NoteModule } from '@fusion-ui/fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { NoteDemoComponent } from './note-demo.component';
import { NoteDemoRoutingModule } from './note-demo-routing.module';

@NgModule({
  declarations: [
    NoteDemoComponent,
  ],
  imports: [
    DemoModule,
    NoteModule,

    NoteDemoRoutingModule,
  ],
})
export class NoteDemoModule {}
