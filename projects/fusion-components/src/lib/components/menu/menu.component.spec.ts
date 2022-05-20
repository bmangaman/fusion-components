import { ElementRef, QueryList, SimpleChange } from '@angular/core';

import { Subscription } from 'rxjs';

import { TemplateDirective } from '@fusion-components/lib/directives/template';
import { DocumentClickService } from '@fusion-components/lib/services/document-click';
import { Location } from '@fusion-components/lib/shared';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let documentClickService: DocumentClickService;

  beforeEach(() => {
    documentClickService = new DocumentClickService(document);
    component = new MenuComponent(documentClickService);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('@Input', () => {
    describe('isMenuDialogOpen', () => {

      /* eslint-disable @typescript-eslint/dot-notation */
      it('should set _isMenuDiaplogOpen', () => {
        component['_isMenuDialogOpen'] = undefined;
        component.isMenuDialogOpen = true;
        expect(component['_isMenuDialogOpen']).toEqual(true);
        expect(component.isMenuDialogOpen).toEqual(true);
      });
      /* eslint-enable @typescript-eslint/dot-notation */

      it('should emit menuOpened if isOpen is true', () => {
        spyOn(component.menuOpened, 'emit').and.stub();
        component.isMenuDialogOpen = true;
        expect(component.menuOpened.emit).toHaveBeenCalled();
      });

      it('should emit menuClosed if isOpen is false', () => {
        spyOn(component.menuClosed, 'emit').and.stub();
        component.isMenuDialogOpen = false;
        expect(component.menuClosed.emit).toHaveBeenCalled();
      });
    });
  });

  describe('@ViewChild', () => {
    describe('set menuButtonSizing()', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      it('should update _buttonSizes if the element is defined', () => {
        component['_buttonSizes'] = undefined;

        component.menuButtonSizing = null;
        expect(component['_buttonSizes']).toBeUndefined();
        expect(component.buttonSizes).toBeUndefined();

        const elementRef: ElementRef = new ElementRef(document.createElement('div'));
        spyOnProperty(elementRef.nativeElement, 'offsetWidth').and.returnValue(100);
        spyOnProperty(elementRef.nativeElement, 'offsetHeight').and.returnValue(100);

        component.menuButtonSizing = elementRef;
        expect(component['_buttonSizes']).toEqual({ width: 100, height: 100 });
        expect(component.buttonSizes).toEqual({ width: 100, height: 100 });
      });

      /* eslint-enable @typescript-eslint/dot-notation */
    });

    describe('set fusionUiMenuDialog()', () => {
      /* eslint-disable @typescript-eslint/dot-notation */

      it('should update _menuDialogSizes, set _fusionUiMeniDialog, and call setDialogPositioning() if the element is defined', () => {
        spyOn(component, 'setDialogPositioning').and.stub();
        component['_dialogSizes'] = undefined;
        component['_fusionUiMenuDialog'] = undefined;

        component.fusionUiMenuDialog = null;
        expect(component['_dialogSizes']).toBeUndefined();
        expect(component.dialogSizes).toBeUndefined();
        expect(component['_fusionUiMenuDialog']).toBeUndefined();
        expect(component.fusionUiMenuDialog).toBeUndefined();
        expect(component.setDialogPositioning).not.toHaveBeenCalled();

        const elementRef: ElementRef = new ElementRef(document.createElement('div'));
        spyOnProperty(elementRef.nativeElement, 'offsetWidth').and.returnValue(100);
        spyOnProperty(elementRef.nativeElement, 'offsetHeight').and.returnValue(100);

        component.fusionUiMenuDialog = elementRef;
        expect(component['_fusionUiMenuDialog']).toEqual(elementRef);
        expect(component.fusionUiMenuDialog).toEqual(elementRef);
        expect(component['_dialogSizes']).toEqual({ width: 100, height: 100 });
        expect(component.dialogSizes).toEqual({ width: 100, height: 100 });
        expect(component.setDialogPositioning).toHaveBeenCalled();
      });

      /* eslint-enable @typescript-eslint/dot-notation */
    });
  });

  describe('ngOnInit()', () => {
    it('should call createMenuDialogSubscription()', () => {
      spyOn(component, 'createMenuDialogSubscription').and.stub();
      component.ngOnInit();
      expect(component.createMenuDialogSubscription).toHaveBeenCalled();
    });
  });

  describe('ngAfterContentInit()', () => {
     /* eslint-disable @typescript-eslint/dot-notation */

    it('should set the templates of elements it finds', () => {
      component['_menuButton'] = undefined;
      component['_menuDialogHeader'] = undefined;
      component['_menuDialogContent'] = undefined;

      component.templates = new QueryList<TemplateDirective>();
      component.templates['_results'] = [
        { getName: () => 'menuButton', template: {} } as TemplateDirective,
        { getName: () => 'menuDialogHeader', template: {}  } as TemplateDirective,
        { getName: () => 'menuDialogContent', template: {}  } as TemplateDirective,
      ];

      component.ngAfterContentInit();

      expect(component.menuButton).toBeDefined();
      expect(component.menuDialogHeader).toBeDefined();
      expect(component.menuDialogContent).toBeDefined();
    });

    /* eslint-enable @typescript-eslint/dot-notation */
  });

  describe('ngOnChanges()', () => {
    it('should update menuDialogClasses if the dialogClasses @Input changed', () => {
      spyOn(component, 'generateDialogClasses').and.callThrough();
      component.menuDialogClasses = [];

      component.ngOnChanges({});
      expect(component.menuDialogClasses).toEqual([]);
      expect(component.generateDialogClasses).not.toHaveBeenCalled();

      component.dialogClasses = ['custom-class-1'];
      component.ngOnChanges({
        dialogClasses: new SimpleChange(null, component.dialogClasses, false),
      });
      expect(component.generateDialogClasses).toHaveBeenCalled();
      expect(component.menuDialogClasses).toContain('custom-class-1');
    });

    it('should update the dialog positioning if dialodLocation @Input changes and _fusionUiMenuDialog is defined', () => {
      spyOn(component, 'setDialogPositioning').and.stub();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_fusionUiMenuDialog'] = undefined;
      component.dialogLocation = Location.LEFT;
      component.ngOnChanges({
        dialogLocation: new SimpleChange(null, component.dialogLocation, false),
      });
      expect(component.setDialogPositioning).not.toHaveBeenCalled();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_fusionUiMenuDialog'] = new ElementRef(document.createElement('div'));
      component.dialogLocation = Location.RIGHT_BOTTOM;
      component.ngOnChanges({
        dialogLocation: new SimpleChange(null, component.dialogLocation, false),
      });
      expect(component.setDialogPositioning).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy()', () => {
    it('should unsubscribe for all active subscriptions', () => {
      component.subscriptions = [new Subscription(), new Subscription()];
      spyOn(component.subscriptions[0], 'unsubscribe').and.callThrough();
      spyOn(component.subscriptions[1], 'unsubscribe').and.callThrough();
      component.ngOnDestroy();

      expect(component.subscriptions[0].unsubscribe).toHaveBeenCalled();
      expect(component.subscriptions[1].unsubscribe).toHaveBeenCalled();
    });
  });

  describe('createMenuDialogSubscription()', () => {
    it('should subscribe to the documentClickService.documentClickedTarget$', () => {
      spyOn(documentClickService.documentClickedTarget$, 'subscribe').and.stub();
      component.createMenuDialogSubscription();
      // eslint-disable-next-line import/no-deprecated
      expect(documentClickService.documentClickedTarget$.subscribe).toHaveBeenCalled();
    });

    it('should call closeMenuDialog() if the clicked element is outside of the menu component', () => {
      const clickTargetFunction = (element: HTMLElement) => element.tagName === 'span';

      spyOn(component, 'closeMenuDialog').and.stub();
      const grandparent: HTMLDivElement = document.createElement('div');
      const parent: HTMLDivElement = document.createElement('div');
      const clickedElement: HTMLDivElement = document.createElement('div');
      parent.appendChild(clickedElement);
      grandparent.appendChild(parent);

      // not called because menu dialog is not open
      component.isMenuDialogOpen = false;
      component.createMenuDialogSubscription();
      documentClickService.documentClickedTarget$.next(clickedElement);
      expect(component.closeMenuDialog).not.toHaveBeenCalled();

      // not called because the menu contains the element that was clicked
      component.isMenuDialogOpen = true;
      component.fusionUiMenu = new ElementRef(document.createElement('div'));
      spyOn(component.fusionUiMenu.nativeElement, 'contains').and.returnValue(true);
      component.createMenuDialogSubscription();
      documentClickService.documentClickedTarget$.next(clickedElement);
      expect(component.closeMenuDialog).not.toHaveBeenCalled();

      // called because the menu dialog is opened AND it does NOT contain the element that was clicked
      component.clickTargetFunction = clickTargetFunction;
      component.isMenuDialogOpen = true;
      component.fusionUiMenu = new ElementRef(document.createElement('div'));
      spyOn(component.fusionUiMenu.nativeElement, 'contains').and.returnValue(true);
      component.createMenuDialogSubscription();
      documentClickService.documentClickedTarget$.next(clickedElement);
      expect(component.closeMenuDialog).not.toHaveBeenCalled();

      // called because the menu dialog is opened AND it does NOT contain the element that was clicked
      component.clickTargetFunction = null;
      component.isMenuDialogOpen = true;
      component.fusionUiMenu = new ElementRef(document.createElement('div'));
      spyOn(component.fusionUiMenu.nativeElement, 'contains').and.returnValue(false);
      component.createMenuDialogSubscription();
      documentClickService.documentClickedTarget$.next(clickedElement);
      expect(component.closeMenuDialog).toHaveBeenCalled();
    });
  });

  describe('setDialogPositioning()', () => {
    beforeEach(() => {
      /* eslint-disable @typescript-eslint/dot-notation */
      component['_buttonSizes'] = {
        height: 100,
        width: 100,
      };
      component['_dialogSizes'] = {
        height: 100,
        width: 100,
      };

      const menuDialog: ElementRef = new ElementRef(document.createElement('div'));
      component['_fusionUiMenuDialog'] = menuDialog;
      /* eslint-enable @typescript-eslint/dot-notation */
    });

    testDialogLocation(Location.TOP, { bottom: '104px', left: '50px', transform: 'translateX(-50%)'});
    testDialogLocation(Location.TOP_LEFT, { bottom: '104px', left: '0px' });
    testDialogLocation(Location.TOP_RIGHT, { bottom: '104px', right: '0px' });
    testDialogLocation(Location.BOTTOM, { top: '104px', left: '50px', transform: 'translateX(-50%)' });
    testDialogLocation(Location.BOTTOM_LEFT, { top: '104px', left: '0px' });
    testDialogLocation(Location.BOTTOM_RIGHT, { top: '104px', right: '0px' });
    testDialogLocation(Location.LEFT, { top: '50px', right: '104px', transform: 'translateY(-50%)' });
    testDialogLocation(Location.LEFT_TOP, { top: '0px', right: '104px' });
    testDialogLocation(Location.LEFT_BOTTOM, { bottom: '0px', right: '104px' });
    testDialogLocation(Location.RIGHT, { top: '50px', left: '104px', transform: 'translateY(-50%)' });
    testDialogLocation(Location.RIGHT_TOP, { top: '0px', left: '104px' });
    testDialogLocation(Location.RIGHT_BOTTOM, { bottom: '0px', left: '104px' });
    testDialogLocation(Location.CENTER, { top: '50px', left: '50px', transform: 'translate(-50%, -50%)' });
  });

  describe('closeMenuDialog()', () => {
    it('should set isMenuDialogOpen to false and emit menuClosed', () => {
      spyOn(component.menuClosed, 'emit').and.stub();
      component.isMenuDialogOpen = true;
      component.closeMenuDialog();
      expect(component.isMenuDialogOpen).toEqual(false);
      expect(component.menuClosed.emit).toHaveBeenCalled();
    });
  });

  describe('generateDialogClasses', () => {
    it('should generate and return the array of classes to be set on the menu dialog', () => {
      let expectedResult: string[];

      component.dialogLocation = null;
      component.dialogClasses = [];
      expectedResult = [];
      expect(component.generateDialogClasses()).toEqual(expectedResult);

      component.dialogLocation = Location.BOTTOM;
      component.dialogClasses = [];
      expectedResult = ['f-menu__dialog--location-bottom'];
      expect(component.generateDialogClasses()).toEqual(expectedResult);

      component.dialogLocation = null;
      component.dialogClasses = ['custom-class-1'];
      expectedResult = ['custom-class-1'];
      expect(component.generateDialogClasses()).toEqual(expectedResult);

      component.dialogLocation = null;
      component.dialogClasses = ['custom-class-1', 'custom-class-2'];
      expectedResult = ['custom-class-1', 'custom-class-2'];
      expect(component.generateDialogClasses()).toEqual(expectedResult);

      component.dialogLocation = Location.BOTTOM;
      component.dialogClasses = ['custom-class-1', 'custom-class-2'];
      expectedResult = ['f-menu__dialog--location-bottom', 'custom-class-1', 'custom-class-2'];
      expect(component.generateDialogClasses()).toEqual(expectedResult);
    });
  });

  /**
   * Helper function to test dialog location (setDialogPositioning)
   *
   * @param menuDialog the menu dialog element
   * @param styles the styles to test
   */
  function testDialogLocation(
    location: Location,
    styles: {
      top?: string,
      bottom?: string,
      left?: string,
      right?: string,
      transform?: string,
    }
  ): void {
    // eslint-disable-next-line complexity
    it(`should position the dialog menu ${location}`, () => {
      component.dialogLocation = location;
      component.setDialogPositioning();

      const menuDialog: ElementRef = component.fusionUiMenuDialog;
      const menuDialogStyle: any = menuDialog.nativeElement.style;

      expect(menuDialogStyle.top).toBe(styles.top || '', `expect top to equal ${styles.top || ''}`);
      expect(menuDialogStyle.bottom).toBe(styles.bottom || '', `expect bottom to equal ${styles.bottom || ''}`);
      expect(menuDialogStyle.left).toBe(styles.left || '', `expect left to equal ${styles.left || ''}`);
      expect(menuDialogStyle.right).toBe(styles.right || '', `expect right to equal ${styles.right || ''}`);
      expect(menuDialogStyle.transform).toBe(styles.transform || '', `expect transform to equal ${styles.transform || ''}`);
    });
  }
});
