import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TemplateModule, WINDOW } from '@fusion-components';
import { NotificationPageObject } from '@fusion-components/unit-test-helpers';
import { NotificationComponent } from './notification.component';
import { DEFAULT_NOTIFICATION_TRANSLATIONS, NotificationTranslations, NotificationType } from './notification.interface';


import createSpy = jasmine.createSpy;

@Component({
    selector: 'f-test-component',
    template: `
    @if (show) {
      <f-notification
        [id]="id"
        [dismissible]="dismissible"
        [notificationType]="notificationType"
        [sticky]="sticky"
        [notificationIcon]="notificationIcon"
        [translations]="translations"
        (bannerDismissed)="dismissedFn()"
        [disappearDelay]="disappearDelay"
        >
        {{ text }}
        @if (hasDetails) {
          <ng-template [fusionUiTemplate]="'details'">Details Template</ng-template>
        }
      </f-notification>
    }
    `,
    standalone: false
})
class TestComponent {
  id: string;
  notificationType: NotificationType;
  dismissible: boolean;
  notificationIcon: string;
  text: string;
  sticky = false;
  translations: NotificationTranslations = DEFAULT_NOTIFICATION_TRANSLATIONS;
  disappearDelay: number = null as any;

  show: boolean = true;
  hasDetails: boolean = false;

  dismissedFn = createSpy('dismissedFn').and.callFake(() => null);
}

describe('NotificationComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let fusionUiNotification: NotificationPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotificationComponent,
        TestComponent,
      ],
      imports: [
        NoopAnimationsModule,
        TemplateModule,
      ],
      providers: [{ provide: WINDOW, useValue: window }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.notificationType = NotificationType.SUCCESS;
    fixture.detectChanges();
    fusionUiNotification = new NotificationPageObject(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(!!fusionUiNotification).toBeTruthy();
  });

  describe('HostBindings', () => {
    it('should set role correctly based on notificationType', () => {
      expect(fusionUiNotification.role).toBe('alert');

      component.notificationType = NotificationType.INFO;
      fixture.detectChanges();

      expect(fusionUiNotification.role).toBe('status');
    });

    it('should set the host id', () => {
      expect(fusionUiNotification.id).toEqual(jasmine.any(String));
      // randomly generated IDs are 36 characters long.
      expect(fusionUiNotification.id.length).toBe(36);

      component.id = 'blah';
      fixture.detectChanges();

      expect(fusionUiNotification.id).toBe('blah');
    });
  });

  describe('notificationType', () => {
    it('should set the correct notification banner class based on the provided message type', () => {
      component.notificationType = NotificationType.SUCCESS;
      fixture.detectChanges();
      expect(fusionUiNotification.classList).toContain('f-notification__success');

      component.notificationType = NotificationType.WARNING;
      fixture.detectChanges();
      expect(fusionUiNotification.classList).toContain('f-notification__warning');

      component.notificationType = NotificationType.ERROR;
      fixture.detectChanges();
      expect(fusionUiNotification.classList).toContain('f-notification__error');

      component.notificationType = NotificationType.INFO;
      fixture.detectChanges();
      expect(fusionUiNotification.classList).toContain('f-notification__info');
    });
  });

  describe('notificationIcon', () => {
    it('should set the correct icon', () => {
      let messageIcon: DebugElement;

      component.notificationType = NotificationType.INFO;
      fixture.detectChanges();
      messageIcon = fixture.debugElement.query(By.css('.f-notification__icon'));
      expect(messageIcon.nativeElement.classList).toContain('mdi-information');

      component.notificationIcon = 'power-plug';
      fixture.detectChanges();
      messageIcon = fixture.debugElement.query(By.css('.f-notification__icon'));
      expect(messageIcon.nativeElement.classList).toContain('mdi-power-plug');
    });
  });

  describe('dismissible', () => {
    it('should NOT display the dismiss/close button if the message type is error', () => {
      let closeButton: DebugElement;

      component.notificationType = NotificationType.SUCCESS;
      component.dismissible = true;
      fixture.detectChanges();
      closeButton = fixture.debugElement.query(By.css('.f-notification__close-button'));
      expect(!!closeButton).toBeTruthy();

      component.notificationType = NotificationType.ERROR;
      component.dismissible = undefined as any;
      fixture.detectChanges();
      closeButton = fixture.debugElement.query(By.css('.f-notification__close-button'));
      expect(component.dismissible).toBeFalsy();
      expect(!!closeButton).toBeFalsy();

      component.notificationType = NotificationType.SUCCESS;
      fixture.detectChanges();
      closeButton = fixture.debugElement.query(By.css('.f-notification__close-button'));
      expect(component.dismissible).toBeFalsy();
      expect(!!closeButton).toBeFalsy();
    });

    it('should display the dismiss/close button if the dismissible input param is set to true', () => {
      let closeButton: DebugElement;
      component.notificationType = NotificationType.ERROR;

      component.dismissible = false;
      fixture.detectChanges();
      closeButton = fixture.debugElement.query(By.css('.f-notification__close-button'));
      expect(!!closeButton).toBeFalsy();

      component.dismissible = true;
      fixture.detectChanges();
      closeButton = fixture.debugElement.query(By.css('.f-notification__close-button'));
      expect(!!closeButton).toBeTruthy();

      component.dismissible = undefined as any;
      fixture.detectChanges();
      closeButton = fixture.debugElement.query(By.css('.f-notification__close-button'));
      expect(!!closeButton).toBeFalsy();
    });
  });

  describe('bannerDismissed', () => {
    it('should emit and add the "dismissed" class on close button click', () => {
      component.notificationType = NotificationType.INFO;
      component.dismissible = true;
      fixture.detectChanges();
      const closeButton = fixture.debugElement.query(By.css('.f-notification__close-button'));

      closeButton.nativeElement.click();
      fixture.detectChanges();

      expect(component.dismissedFn).toHaveBeenCalledTimes(1);
      expect(fusionUiNotification.classList).toContain('dismissed');
    });
  });

  describe('sticky', () => {
    it('should add correct classes for sticky', () => {
      expect(fusionUiNotification.classList).not.toContain('sticky-msg-position');

      component.sticky = true;
      fixture.detectChanges();

      expect(fusionUiNotification.classList).toContain('sticky-msg-position');
    });
  });

  describe('Aria labels', () => {
    it('should use aria type label when provided', () => {
      const buttonIcon = fusionUiNotification.notificationIcon;
      expect(buttonIcon.attributes.getNamedItem('aria-label')?.value).toEqual(DEFAULT_NOTIFICATION_TRANSLATIONS.ariaTypeLabel.success);

      component.translations = {
        ...DEFAULT_NOTIFICATION_TRANSLATIONS,
        ariaTypeLabel: {
          ...DEFAULT_NOTIFICATION_TRANSLATIONS.ariaTypeLabel,
          success: 'fake-success'
        }
      };
      fixture.detectChanges();

      expect(buttonIcon.attributes.getNamedItem('aria-label')?.value).toEqual('fake-success');
    });

    it('should use aria close label when provided', () => {
      const buttonIcon = fusionUiNotification.closeButtonIcon;
      expect(buttonIcon.attributes.getNamedItem('aria-label')?.value).toEqual(DEFAULT_NOTIFICATION_TRANSLATIONS.ariaCloseLabel);

      component.translations = {
        ...DEFAULT_NOTIFICATION_TRANSLATIONS,
        ariaCloseLabel: 'translatedClose',
      };
      fixture.detectChanges();

      expect(buttonIcon.attributes.getNamedItem('aria-label')?.value).toEqual('translatedClose');
    });
  });

  describe('disappearDelay', () => {
    it('should dismiss the notification after the specified delay', fakeAsync(() => {
      component.disappearDelay = 5000;
      fixture.detectChanges();
      tick(1000);

      expect(component.dismissedFn).not.toHaveBeenCalled();
      expect(fusionUiNotification.classList).not.toContain('dismissed');

      tick(10000);

      expect(component.dismissedFn).toHaveBeenCalledTimes(1);
      fixture.detectChanges();
      expect(fusionUiNotification.classList).toContain('dismissed');
    }));
  });

  describe('details', () => {
    it('should not have a details section if no template is provided', () => {
      const detailsButtonElm = fusionUiNotification.detailsButton;

      expect(detailsButtonElm).toBeFalsy();
    });

    it('should have a details button if template is provided', () => {
      component.hasDetails = true;

      reloadComponent();
      fusionUiNotification = new NotificationPageObject(fixture);

      const detailsButtonElm = fusionUiNotification.detailsButton;

      expect(detailsButtonElm).toBeTruthy();
    });

    it('should expand the details when details button is clicked', () => {
      component.hasDetails = true;

      reloadComponent();
      fusionUiNotification = new NotificationPageObject(fixture);

      fusionUiNotification.openDetails();
      fixture.detectChanges();

      const detailsContentElm = fusionUiNotification.detailsContent;

      expect(detailsContentElm).toBeDefined();
      expect(detailsContentElm.innerText).toBe('Details Template');
    });
  });

  function reloadComponent(): void {
    component.show = false;
    fixture.detectChanges();
    component.show = true;
    fixture.detectChanges();
  }
});
