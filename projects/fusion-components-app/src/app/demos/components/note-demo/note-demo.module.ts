import { NgModule } from '@angular/core';

import { NoteModule } from '@fusion-components';

import { DemoModule } from '../../../shared/components/demo/demo.module';
import { NoteDemoComponent } from './note-demo.component';
import { NoteDemoRoutingModule } from './note-demo-routing.module';

@NgModule({
    imports: [
        DemoModule,
        NoteModule,
        NoteDemoRoutingModule,
        NoteDemoComponent,
    ],
})
export class NoteDemoModule {}
