import { QueryList } from '@angular/core';

import { TemplateDirective } from '../../directives/template';
import { Size, StatusLevel } from '../../shared';
import { CardComponent } from './card.component';
import { CardStatus } from './card.interface';

describe('ButtonComponent', () => {
  let component: CardComponent;

  beforeEach(() => {
    component = new CardComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('@Inout()', () => {
    describe('statuses', () => {
      it('should filter down and sort the provided statuses', () => {
        component.statuses = undefined!
        expect(component.statuses).toEqual([]);

        component.statuses = [];
        expect(component.statuses).toEqual([]);

        const statuses: CardStatus[] = [
          { status: StatusLevel.WARNING },
          { status: StatusLevel.ERROR },
          { status: StatusLevel.CRITICAL },
          { status: StatusLevel.BASE, isHidden: true },
          { status: StatusLevel.UNKNOWN },
          { status: StatusLevel.SUCCESS },
          { status: StatusLevel.NORMAL },
        ];

        const expectedResult: CardStatus[] = [
          { status: StatusLevel.UNKNOWN },
          { status: StatusLevel.NORMAL },
          { status: StatusLevel.SUCCESS },
          { status: StatusLevel.WARNING },
          { status: StatusLevel.ERROR },
          { status: StatusLevel.CRITICAL },
        ];

        component.statuses = statuses;
        expect(component.statuses).toEqual(expectedResult);
      });
    });
  });

  describe('ngOnInit()', () => {
    it('should call generateContainerCssClasses()', () => {
      spyOn(component, 'generateContainerCssClasses').and.stub();
      component.ngOnInit();
      expect(component.generateContainerCssClasses).toHaveBeenCalled();
    });
  });

  describe('ngAfterContentInit()', () => {
    beforeEach(() => {
      component.templates = new QueryList<TemplateDirective>();
    });

    it('should loop through the template and set the cardTitle templateRef if found', () => {
      component.ngAfterContentInit();
      expect(component.cardTitle).toBeFalsy();

      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.cardTitle).toBeFalsy();

      component.templates['_results'] = [
        { getName: () => 'cardTitle', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.cardTitle).toBeTruthy();
    });

    it('should loop through the template and set the cardContent templateRef if found', () => {
      component.ngAfterContentInit();
      expect(component.cardTitle).toBeFalsy();

      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.cardContent).toBeFalsy();

      component.templates['_results'] = [
        { getName: () => 'cardContent', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.cardContent).toBeTruthy();
    });

    it('should loop through the template and set the cardDetails templateRef if found', () => {
      component.ngAfterContentInit();
      expect(component.cardTitle).toBeFalsy();

      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.cardDetails).toBeFalsy();

      component.templates['_results'] = [
        { getName: () => 'cardDetails', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.cardDetails).toBeTruthy();
    });

    it('should loop through the template and set the cardFooter templateRef if found', () => {
      component.ngAfterContentInit();
      expect(component.cardFooter).toBeFalsy();

      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.cardFooter).toBeFalsy();

      component.templates['_results'] = [
        { getName: () => 'cardFooter', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.cardFooter).toBeTruthy();
    });
  });

  describe('ngOnChanges()', () => {
    it('should call generateContainerCssClasses()', () => {
      spyOn(component, 'generateContainerCssClasses').and.stub();
      component.ngOnChanges();
      expect(component.generateContainerCssClasses).toHaveBeenCalled();
    });
  });

  describe('toggleDetailsSectionExpansion()', () => {
    it('should toggle the _isDetailsSectionExpanded flag', () => {
      expect(component.isDetailsSectionExpanded).toBeFalsy();
      component.toggleDetailsSectionExpansion();
      expect(component.isDetailsSectionExpanded).toBeTrue();
      component.toggleDetailsSectionExpansion();
      expect(component.isDetailsSectionExpanded).toBeFalse();
    });
  });

  describe('generateContainerCssClasses()', () => {
    it('should generate the CSS classes based on the proviced inputs', () => {
      let expectedResult: string[] = [];

      // DEFAULT
      component.size = undefined!
      component.hideStatusBarStyling = undefined!
      component.statuses = undefined!
      component.cssClasses = undefined!
      expectedResult = ['f-card'];
      component.generateContainerCssClasses();
      expect(component.containerCssClasses).toEqual(expectedResult);

      // SIZE
      component.size = Size.MEDIUM;
      component.hideStatusBarStyling = undefined!
      component.statuses = [];
      component.cssClasses = [];
      expectedResult = ['f-card', 'f-card--medium'];
      component.generateContainerCssClasses();
      expect(component.containerCssClasses).toEqual(expectedResult);

      component.size = Size.SMALL;
      component.hideStatusBarStyling = undefined!
      component.statuses = [];
      component.cssClasses = [];
      expectedResult = ['f-card', 'f-card--small'];
      component.generateContainerCssClasses();
      expect(component.containerCssClasses).toEqual(expectedResult);

      // STATUSES
      component.size = undefined!
      component.hideStatusBarStyling = true;
      component.statuses = undefined!
      component.cssClasses = undefined!
      expectedResult = ['f-card'];
      component.generateContainerCssClasses();
      expect(component.containerCssClasses).toEqual(expectedResult);

      component.size = undefined!
      component.hideStatusBarStyling = true;
      component.statuses = [];
      component.cssClasses = undefined!
      expectedResult = ['f-card'];
      component.generateContainerCssClasses();
      expect(component.containerCssClasses).toEqual(expectedResult);

      component.size = undefined!
      component.hideStatusBarStyling = true;
      component.statuses = [{ status: StatusLevel.SUCCESS }, { status: StatusLevel.CRITICAL }];
      component.cssClasses = undefined!
      expectedResult = ['f-card'];
      component.generateContainerCssClasses();
      expect(component.containerCssClasses).toEqual(expectedResult);

      component.size = undefined!
      component.hideStatusBarStyling = false;
      component.statuses = [{ status: StatusLevel.SUCCESS }, { status: StatusLevel.CRITICAL }];
      component.cssClasses = undefined!
      expectedResult = ['f-card', 'f-card--critical'];
      component.generateContainerCssClasses();
      expect(component.containerCssClasses).toEqual(expectedResult);

      // CUSTOM CLASSES
      component.size = undefined!
      component.hideStatusBarStyling = undefined!
      component.statuses = undefined!
      component.cssClasses = [];
      expectedResult = ['f-card'];
      component.generateContainerCssClasses();
      expect(component.containerCssClasses).toEqual(expectedResult);

      component.size = undefined!
      component.hideStatusBarStyling = undefined!
      component.statuses = undefined!
      component.cssClasses = ['custom-class'];
      expectedResult = ['f-card', 'custom-class'];
      component.generateContainerCssClasses();
      expect(component.containerCssClasses).toEqual(expectedResult);

      component.size = undefined!
      component.hideStatusBarStyling = undefined!
      component.statuses = undefined!
      component.cssClasses = ['custom-class', 'custom-class-2'];
      expectedResult = ['f-card', 'custom-class', 'custom-class-2'];
      component.generateContainerCssClasses();
      expect(component.containerCssClasses).toEqual(expectedResult);
    });
  });
});
