import { Component, OnInit } from '@angular/core';
import { NotificationTemplate, NotificationType } from '@fusion-components/lib/components/notification';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fusion-demo-notification-demo',
  templateUrl: './notification-demo.component.html',
  styleUrls: ['./notification-demo.component.scss']
})
export class NotificationDemoComponent implements OnInit {

  readonly delays = [5, 10, 15];
  readonly NotificationTemplate = NotificationTemplate;

  notificationForm: UntypedFormGroup;

  get NotificationBannerType() {
    return NotificationType;
  }

  constructor(private formBuilder: UntypedFormBuilder) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.notificationForm = this.formBuilder.group({
      displayed: [true, [Validators.required]],
      dismissible: [true, [Validators.required]],
      notificationType: [NotificationType.SUCCESS, [Validators.required]],
      message: ['Notification message', [Validators.required]],
      id: [null],
      sticky: [null],
      notificationIcon: [null],
      animationsDisabled: [null],
      disappearDelay: [null, [ Validators.min(0) ]],
      details: false,
      detailsMaxHeight: [null]
    });

    this.notificationForm.get('details')?.valueChanges.subscribe(() => {
      const displayedControl = this.notificationForm.get('displayed')
      displayedControl?.setValue(false);
      setTimeout(() => displayedControl?.setValue(true))
    });
  }
}
