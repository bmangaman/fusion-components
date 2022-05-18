import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * NOTE COMPONENT
 *
 * The Note Component provides a consistent way to create a text area with the "note" styling.
 *
 * @example
 * <fusion-ui-note>
 *   <div class="projected-content">Projected Text</div>
 * </fusion-ui-note>
 */
@Component({
  selector: 'fusion-ui-note',
  template: '<div class="fusion-ui-note"><ng-content></ng-content></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {}
