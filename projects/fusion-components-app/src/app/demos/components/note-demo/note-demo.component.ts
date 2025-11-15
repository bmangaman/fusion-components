import { Component } from '@angular/core';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { NoteModule } from '../../../../../../fusion-components/src/lib/components/note/note.module';

@Component({
    selector: 'fusion-demo-note',
    templateUrl: './note-demo.component.html',
    styleUrls: ['./note-demo.component.scss'],
    standalone: true,
    imports: [DemoComponent, NoteModule]
})
export class NoteDemoComponent {}
