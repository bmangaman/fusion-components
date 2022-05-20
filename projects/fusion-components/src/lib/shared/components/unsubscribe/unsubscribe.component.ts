import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { unsubscribeSubject } from '../../utilities';

/**
 * UNSUBSCRIBE COMPONENT
 *
 * The Unsubscribe Component provides a consistent way unsubscribe from any active subscriptions.
 */
@Component({
  selector: 'f-unsubscribe',
  template: '',
})
export class UnsubscribeComponent implements OnDestroy {
  protected unsubscribe$: Subject<void> = new Subject<void>();

  /**
   * On component teardown, unsubscribe from all active subscrptions.
   */
  ngOnDestroy(): void {
    unsubscribeSubject(this.unsubscribe$);
  }
}
