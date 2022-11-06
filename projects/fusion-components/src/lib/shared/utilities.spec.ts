import { ElementRef } from '@angular/core';

import { Subject, Subscription, timer } from 'rxjs';

import { Location, Position, PositionConfig } from './interfaces';
import * as utils from './utilities';

describe('Utilities', () => {
  describe('unsubscribe', () => {
    it('should unsubscribe from a subscription', () => {
      // a sub that stays open
      const obs = timer(10);
      const sub = obs.subscribe(() => true);
      expect(sub.closed).toBe(false);
      utils.unsubscribe(sub);
      expect(sub.closed).toBe(true);
    });

    it('should unsubscribe from a subscription', () => {
      // a sub that stays open
      const obs = timer(10);
      const sub = obs.subscribe(() => true);
      expect(sub.closed).toBe(false);

      // should unsubscribe if NOT closed
      utils.unsubscribe(sub);
      expect(sub.closed).toBe(true);

      // subscription state should not chage if already closed
      utils.unsubscribe(sub);
      expect(sub.closed).toBe(true);
    });

    it('should not error on null', () => {
      utils.unsubscribe(undefined as any);
      // if you got here you didn't error, hurray
      expect(true).toBe(true);
    });
  });

  describe('unsubscribeAll', () => {
    it('should loop through the provided array of subscriptions and unsubscribe from any unclosed subscriptions', () => {
      const sub1: Subscription = new Subscription();
      const sub2: Subscription = new Subscription();
      const sub3: Subscription = new Subscription();
      const subscriptions: Subscription[] = [sub1, sub2, sub3];
      sub3.unsubscribe();

      spyOn(sub1, 'unsubscribe').and.callThrough();
      spyOn(sub2, 'unsubscribe').and.callThrough();
      spyOn(sub3, 'unsubscribe').and.callThrough();

      utils.unsubscribeAll(subscriptions);

      expect(sub1.unsubscribe).toHaveBeenCalled();
      expect(sub2.unsubscribe).toHaveBeenCalled();
      expect(sub3.unsubscribe).not.toHaveBeenCalled();
    });
  });

  describe('unsubscribeSubject', () => {
    it('should complete the subject if the provided subject is defined', () => {
      const subject: Subject<void> = new Subject<void>();
      spyOn(subject, 'complete').and.callThrough();
      spyOn(subject, 'unsubscribe').and.callThrough();

      utils.unsubscribeSubject(subject);

      expect(subject.complete).toHaveBeenCalled();
      expect(subject.unsubscribe).toHaveBeenCalled();
      utils.unsubscribeSubject(undefined as any); // just call this to make sure no errors are thrown
    });
  });

  describe('getElementAbsolutePositioning', () => {
    let mockWindow: Window;
    let mockDocument: Document;

    let element: ElementRef;
    let triggerElement: ElementRef;

    let position: Position | Location;
    let spacing: number | undefined;

    beforeEach(() => {
      mockWindow = window;
      spyOnProperty(mockWindow, 'pageYOffset').and.returnValue(0);
      spyOnProperty(mockWindow, 'pageXOffset').and.returnValue(0);

      mockDocument = document;
      spyOnProperty(mockDocument.documentElement, 'clientTop').and.returnValue(0);
      spyOnProperty(mockDocument.documentElement, 'clientLeft').and.returnValue(0);

      element = new ElementRef<any>(mockDocument.createElement('div'));
      spyOnProperty(element.nativeElement, 'offsetWidth').and.returnValue(10);
      spyOnProperty(element.nativeElement, 'offsetHeight').and.returnValue(10);

      triggerElement = new ElementRef<any>(mockDocument.createElement('div'));
      spyOnProperty(triggerElement.nativeElement, 'offsetWidth').and.returnValue(50);
      spyOnProperty(triggerElement.nativeElement, 'offsetHeight').and.returnValue(50);
      spyOn(triggerElement.nativeElement, 'getBoundingClientRect').and.returnValue({
        left: 50,
        right: 50,
        top: 50,
        bottom: 50,
      });

      spacing = undefined;
      position = Position.TOP;
    });

    describe('with invalid/ undefined parameters', () => {
      it('should return an empty object if element is not valid', () => {
        element.nativeElement = undefined;
        expect(utils.getElementAbsolutePositioning(element, triggerElement, position, spacing, mockWindow, mockDocument)).toEqual({});
        element = null as any;
        expect(utils.getElementAbsolutePositioning(element, triggerElement, position, spacing, mockWindow, mockDocument)).toEqual({});
      });

      it('should return an empty object if trigger element is not valid', () => {
        triggerElement.nativeElement = undefined;
        expect(utils.getElementAbsolutePositioning(element, triggerElement, position, spacing, mockWindow, mockDocument)).toEqual({});
        triggerElement = null as any;
        expect(utils.getElementAbsolutePositioning(element, triggerElement, position, spacing, mockWindow, mockDocument)).toEqual({});
      });

      it('should return an empty object if window is not valid', () => {
        mockWindow = null as any;
        expect(utils.getElementAbsolutePositioning(element, triggerElement, position, spacing, mockWindow, mockDocument)).toEqual({});
      });

      it('should return an empty object if document is not valid', () => {
        mockDocument = null as any;
        expect(utils.getElementAbsolutePositioning(element, triggerElement, position, spacing, mockWindow, mockDocument)).toEqual({});
      });
    });

    describe('TOP', () => {
      it('should return a fusion position config', () => {
        testGetElementAbsolutePositioning(
          Position.TOP,
          '40px',
          '75px',
          'translateX(-50%)',
        );

        spacing = 10;
        testGetElementAbsolutePositioning(
          Position.TOP,
          '30px',
          '75px',
          'translateX(-50%)',
        );
      });
    });

    describe('TOP LEFT', () => {
      it('should return a fusion location config', () => {
        testGetElementAbsoluteLocation(
          Location.TOP_LEFT,
          '40px',
          '50px',
        );

        spacing = 10;
        testGetElementAbsoluteLocation(
          Location.TOP_LEFT,
          '30px',
          '50px',
        );
      });
    });

    describe('TOP RIGHT', () => {
      it('should return a fusion location config', () => {
        testGetElementAbsoluteLocation(
          Location.TOP_RIGHT,
          '40px',
          '90px',
        );

        spacing = 10;
        testGetElementAbsoluteLocation(
          Location.TOP_RIGHT,
          '30px',
          '90px',
        );
      });
    });

    describe('BOTTOM', () => {
      it('should return a fusion position config', () => {
        testGetElementAbsolutePositioning(
          Position.BOTTOM,
          '100px',
          '75px',
          'translateX(-50%)',
        );

        spacing = 10;
        testGetElementAbsolutePositioning(
          Position.BOTTOM,
          '110px',
          '75px',
          'translateX(-50%)',
        );
      });
    });

    describe('BOTTOM LEFT', () => {
      it('should return a fusion location config', () => {
        testGetElementAbsoluteLocation(
          Location.BOTTOM_LEFT,
          '100px',
          '50px',
        );

        spacing = 10;
        testGetElementAbsoluteLocation(
          Location.BOTTOM_LEFT,
          '110px',
          '50px',
        );
      });
    });

    describe('BOTTOM RIGHT', () => {
      it('should return a fusion location config', () => {
        testGetElementAbsoluteLocation(
          Location.BOTTOM_RIGHT,
          '100px',
          '90px',
        );

        spacing = 10;
        testGetElementAbsoluteLocation(
          Location.BOTTOM_RIGHT,
          '110px',
          '90px',
        );
      });
    });

    describe('LEFT', () => {
      it('should return a fusion position config', () => {
        testGetElementAbsolutePositioning(
          Position.LEFT,
          '75px',
          '40px',
          'translateY(-50%)',
        );

        spacing = 10;
        testGetElementAbsolutePositioning(
          Position.LEFT,
          '75px',
          '30px',
          'translateY(-50%)',
        );
      });
    });

    describe('RIGHT', () => {
      it('should return a fusion position config', () => {
        testGetElementAbsolutePositioning(
          Position.RIGHT,
          '75px',
          '100px',
          'translateY(-50%)',
        );

        spacing = 10;
        testGetElementAbsolutePositioning(
          Position.RIGHT,
          '75px',
          '110px',
          'translateY(-50%)',
        );
      });
    });

    describe('CENTER', () => {
      it('should return a fusion position config', () => {
        testGetElementAbsolutePositioning(
          Position.CENTER,
          '75px',
          '75px',
          'translate(-50%, -50%)',
        );

        spacing = 10;
        testGetElementAbsolutePositioning(
          Position.CENTER,
          '75px',
          '75px',
          'translate(-50%, -50%)',
        );
      });
    });

    describe('TOP', () => {
      it('should return a fusion location config', () => {
        testGetElementAbsolutePositioning(
          Location.TOP,
          '40px',
          '75px',
          'translateX(-50%)',
        );

        spacing = 10;
        testGetElementAbsolutePositioning(
          Location.TOP,
          '30px',
          '75px',
          'translateX(-50%)',
        );
      });
    });

    describe('BOTTOM', () => {
      it('should return a fusion location config', () => {
        testGetElementAbsolutePositioning(
          Location.BOTTOM,
          '100px',
          '75px',
          'translateX(-50%)',
        );

        spacing = 10;
        testGetElementAbsolutePositioning(
          Location.BOTTOM,
          '110px',
          '75px',
          'translateX(-50%)',
        );
      });
    });

    describe('LEFT', () => {
      it('should return a fusion location config', () => {
        testGetElementAbsolutePositioning(
          Location.LEFT,
          '75px',
          '40px',
          'translateY(-50%)',
        );

        spacing = 10;
        testGetElementAbsolutePositioning(
          Location.LEFT,
          '75px',
          '30px',
          'translateY(-50%)',
        );
      });
    });

    describe('RIGHT', () => {
      it('should return a fusion location config', () => {
        testGetElementAbsolutePositioning(
          Location.RIGHT,
          '75px',
          '100px',
          'translateY(-50%)',
        );

        spacing = 10;
        testGetElementAbsolutePositioning(
          Location.RIGHT,
          '75px',
          '110px',
          'translateY(-50%)',
        );
      });
    });

    describe('CENTER', () => {
      it('should return a fusion location config', () => {
        testGetElementAbsolutePositioning(
          Location.CENTER,
          '75px',
          '75px',
          'translate(-50%, -50%)',
        );

        spacing = 10;
        testGetElementAbsolutePositioning(
          Location.CENTER,
          '75px',
          '75px',
          'translate(-50%, -50%)',
        );
      });
    });

    describe('with preset params', () => {
      it('should return a fusion position config', () => {
        const response: PositionConfig = utils.getElementAbsolutePositioning(
          element,
          triggerElement,
          Position.TOP,
        );
        expect(response).toBeTruthy();
      });
    });

    function testGetElementAbsolutePositioning(
      position: Position | Location,
      expectedTop: string,
      expectedLeft: string,
      expectedTransform: string,
    ): void {
      const response: PositionConfig = utils.getElementAbsolutePositioning(
        element,
        triggerElement,
        position,
        spacing,
        mockWindow,
        mockDocument,
      );

      expect(response).toEqual({ top: expectedTop, left: expectedLeft, transform: expectedTransform });
    }
   
    // To test element position using f-locations value.
    function testGetElementAbsoluteLocation(
      position: Location,
      expectedTop: string,
      expectedLeft: string,
    ): void {
      const response: PositionConfig = utils.getElementAbsolutePositioning(
        element,
        triggerElement,
        position,
        spacing,
        mockWindow,
        mockDocument,
      );

      expect(response).toEqual({ top: expectedTop, left: expectedLeft });
    }
  });
});
