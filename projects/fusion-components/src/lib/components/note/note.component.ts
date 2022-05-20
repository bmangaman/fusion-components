import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * NOTE COMPONENT
 *
 * The Note Component provides a consistent way to create a text area with the "note" styling.
 *
 * @example
 * <f-note>
 *   <div class="projected-content">Projected Text</div>
 * </f-note>
 */
@Component({
  selector: 'f-note',
  template: '<div class="f-note"><ng-content></ng-content></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {}
