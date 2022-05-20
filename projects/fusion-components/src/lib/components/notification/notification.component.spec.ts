import { QueryList } from '@angular/core';

import { FusionComponentsTranslationService, TemplateDirective } from '@fusion-components';

import { NotificationComponent } from './notification.component';
import { NotificationType } from './notification.interface';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let window: any;
  let translationService: FusionComponentsTranslationService;

  beforeEach(() => {
    translationService = new FusionComponentsTranslationService();
    window = jasmine.createSpyObj('window', [ 'setTimeout', 'clearTimeout' ]);
    component = new NotificationComponent(window as Window, translationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ariaTypeLabel', () => {
    it('should return the correct label', () => {
      component.notificationType = NotificationType.SUCCESS;
      component.translations = { ariaTypeLabel: {success: 'blah'}};

      expect(component.ariaTypeLabel).toBe('blah');

      component.translations = null;

      expect(component.ariaTypeLabel).toBeNull();
    });
  });

  describe('Host Bindings', () => {
    it('should have the correct role', () => {
      expect(component.role).toBe('alert');

      component.notificationType = NotificationType.INFO;
      expect(component.role).toBe('status');
    });

    it('should return the correct classes', () => {
      expect(component.hostClasses).toBe('f-notification');

      (component as any)._dismissed = true;

      expect(component.hostClasses).toBe('f-notification dismissed');

      component.sticky = true;

      expect(component.hostClasses).toBe('f-notification sticky-msg-position dismissed');

      component.setNotificationType();

      expect(component.hostClasses).toBe('f-notification sticky-msg-position f-notification__info dismissed');
    });

    it('should return the correct id', () => {
      component.id = 'blah';

      expect(component._id).toBe('blah');

      component.id = undefined;

      // randomly generated IDs are 36 characters long.
      expect(component._id.length).toBe(36);
      expect(component._id).toEqual(jasmine.any(String));
    });

    it('should disable animations', () => {
      component.disableAnimations = true;
      expect(component.animationsAreDisabled).toBeTruthy();
    });
  });

  describe('@Input(s)', () => {
    describe('notificationIcon', () => {
      it('should SET the notificationIcon and call setNotificationIconClass', () => {
        spyOn(component, 'setNotificationIconClass');
        component.notificationIcon = 'star-circle';
        expect(component.notificationIcon).toEqual('star-circle');
        expect(component.setNotificationIconClass).toHaveBeenCalled();
      });
    });

    describe('notificationType', () => {
      it('should call setNotificationType', () => {
        spyOn(component, 'setNotificationType');
        component.notificationType = NotificationType.SUCCESS;
        expect(component.setNotificationType).toHaveBeenCalledWith(NotificationType.SUCCESS);
      });
    });

    describe('disappearDelay', () => {
      it('should clear a previous timeout, if it exists', () => {
        const id = 5;
        (component as any)._timeoutId = id;
        component.disappearDelay = -1;
        expect(window.clearTimeout).toHaveBeenCalledWith(id);
        expect((component as any)._timeoutId).toBeUndefined();
      });

      it('should do nothing when the delay is 0', () => {
        component.disappearDelay = 0;
        expect(window.setTimeout).not.toHaveBeenCalled();
      });

      it('should do nothing when the delay is negative', () => {
        component.disappearDelay = -1;
        expect(window.setTimeout).not.toHaveBeenCalled();
      });

      it('should schedule a timeout when the delay is positive', () => {
        window.setTimeout.and.callFake(fn => fn());
        spyOn(component, 'dismissBanner');

        const delay = 500;
        component.disappearDelay = delay;
        expect(window.setTimeout).toHaveBeenCalledWith(jasmine.anything(), delay);
        expect(component.dismissBanner).toHaveBeenCalled();
      });
    });

    describe('detailsMaxHeight', () => {
      it('should set/get the value', () => {
        component.detailsMaxHeight = null;
        expect(component.detailsMaxHeight).toBe('240px');

        component.detailsMaxHeight = '120px';
        expect(component.detailsMaxHeight).toBe('120px');
      });
    });
  });

  describe('ngOnInit()', () => {
    it('should call setNotificationType()', () => {
      spyOn(component, 'setNotificationType');
      component.ngOnInit();
      expect(component.setNotificationType).toHaveBeenCalled();
    });
  });

  describe('ngAfterContentInit()', () => {
    beforeEach(() => {
      component.templates = new QueryList<TemplateDirective>();
    });

    it('should set details if template is found', () => {
      component.ngAfterContentInit();
      expect(component.details).toBeFalsy();

      (component.templates as any)._results = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.details).toBeFalsy();

      (component.templates as any)._results = [
        { getName: () => 'details', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.details).toBeTruthy();
    });
  });

  describe('dismissBanner()', () => {
    it('should set the dismissed flag and emit', () => {
      spyOn(component.bannerDismissed, 'emit').and.stub();
      expect((component as any)._dismissed).toBeUndefined();

      component.dismissBanner();

      expect((component as any)._dismissed).toBe(true);
      expect(component.bannerDismissed.emit).toHaveBeenCalled();
    });
  });

  describe('setNotificationType()', () => {
    it('should set the correct notificationType', () => {
      component.setNotificationType(NotificationType.ERROR);
      expect(component.notificationType).toEqual(NotificationType.ERROR);

      component.setNotificationType();
      expect(component.notificationType).toEqual(NotificationType.ERROR);

      (component as any)._notificationType = undefined;
      component.setNotificationType();
      expect(component.notificationType).toEqual(NotificationType.INFO);
    });

    it('should set dismissible to false by default if the type is ERROR', () => {
      component.dismissible = undefined;
      component.setNotificationType(NotificationType.INFO);
      expect(component.dismissible).toBeTruthy();

      component.dismissible = undefined;
      component.setNotificationType(NotificationType.SUCCESS);
      expect(component.dismissible).toBeTruthy();

      component.dismissible = undefined;
      component.setNotificationType(NotificationType.WARNING);
      expect(component.dismissible).toBeTruthy();

      component.dismissible = undefined;
      component.setNotificationType(NotificationType.ERROR);
      expect(component.dismissible).toBeFalsy();

      component.setNotificationType(NotificationType.INFO);
      expect(component.dismissible).toBeFalsy();
    });

    it('shopuld call setNotificationIconClass()', () => {
      spyOn(component, 'setNotificationIconClass');
      component.setNotificationType();
      expect(component.setNotificationIconClass).toHaveBeenCalled();
    });
  });

  describe('setNotificationIconClass()', () => {
    it('should set a custom notificationIconClass if a notificationIcon was provided', () => {
      (component as any)._notificationIcon = 'star-circle';
      component.setNotificationIconClass();
      expect(component.notificationIconClass).toEqual('mdi-star-circle');
    });

    it('should set the notificationIconClass based on the notificationType if no notificationIcon was provided', () => {
      (component as any)._notificationIcon = undefined;
      (component as any)._notificationType = NotificationType.ERROR;
      component.setNotificationIconClass();
      expect(component.notificationIconClass).toEqual('mdi-close-circle');

      (component as any)._notificationIcon = undefined;
      (component as any)._notificationType = NotificationType.INFO;
      component.setNotificationIconClass();
      expect(component.notificationIconClass).toEqual('mdi-information');

      (component as any)._notificationIcon = undefined;
      (component as any)._notificationType = NotificationType.WARNING;
      component.setNotificationIconClass();
      expect(component.notificationIconClass).toEqual('mdi-alert');

      (component as any)._notificationIcon = undefined;
      (component as any)._notificationType = NotificationType.SUCCESS;
      component.setNotificationIconClass();
      expect(component.notificationIconClass).toEqual('mdi-check-circle');

      (component as any)._notificationIcon = undefined;
      (component as any)._notificationType = undefined;
      component.setNotificationIconClass();
      expect(component.notificationIconClass).toEqual('mdi-information');
    });
  });

  describe('toggleDetailsSection()', () => {
    it('should toggle correctly', () => {
      expect(component.isDetailsExpanded).toBeFalse();

      component.toggleDetailsSection();
      expect(component.isDetailsExpanded).toBeTrue();

      component.toggleDetailsSection();
      expect(component.isDetailsExpanded).toBeFalse();
    });
  });
});
