import { of, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeComponent } from './unsubscribe.component';

describe('UnsubscribeComponent', () => {
  let component: UnsubscribeComponent;

  beforeEach(() => {
    component = new UnsubscribeComponent();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnDestroy()', () => {
    it('should complete the subject (to unsubscribe from any active subscriptions)', () => {
      const subject: Subject<void> = new Subject<void>();
      spyOn(subject, 'complete').and.stub();
      spyOn(subject, 'unsubscribe').and.stub();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['unsubscribe$'] = subject;
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const subscription: Subscription = of(null).pipe(takeUntil(component['unsubscribe$'])).subscribe();

      component.ngOnDestroy();

      expect(subject.complete).toHaveBeenCalled();
      expect(subject.unsubscribe).toHaveBeenCalled();
      expect(subscription.closed).toBeTrue();
    });
  });
});
