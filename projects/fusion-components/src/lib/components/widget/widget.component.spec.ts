import { QueryList } from '@angular/core';
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';

import { cloneDeep } from 'lodash-es';

import { TemplateDirective } from '../../directives/template';
import { WidgetComponent } from './widget.component';
import { WidgetTemplate } from './widget.interface';

describe('WidgetComponent', () => {
  let component: WidgetComponent;

  beforeEach(() => {
    component = new WidgetComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('ngAfterContentInit()', () => {
    beforeEach(() => {
      component.templates = new QueryList<TemplateDirective>();
    });

    it('should loop through the template and set the header templateRef if found', () => {
      component.ngAfterContentInit();
      expect(component.header).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.header).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => WidgetTemplate.HEADER, template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.header).toBeTruthy();
    });

    it('should loop through the template and set the infoDetails templateRef if found', () => {
      component.ngAfterContentInit();
      expect(component.infoDetails).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.infoDetails).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => WidgetTemplate.INFO_DETAILS, template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.infoDetails).toBeTruthy();
    });

    it('should loop through the template and set the infoDetails templateRef if found', () => {
      component.ngAfterContentInit();
      expect(component.infoBoxes).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.infoBoxes).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => WidgetTemplate.INFO_BOX, template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.infoBoxes).toBeTruthy();
      expect(component.infoBoxes.length).toEqual(1);

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => WidgetTemplate.INFO_BOX, template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.infoBoxes).toBeTruthy();
      expect(component.infoBoxes.length).toEqual(2);
    });
  });

  describe('refreshData()', () => {
    it('should update the timestamp and emit that the data should be refreshed', fakeAsync(() => {
      spyOn(component.refresh, 'emit').and.stub();
      const oldTime: Date = cloneDeep(component.timeStamp);
      tick(1000);
      component.refreshData();
      tick(1000);
      expect(component.refresh.emit).toHaveBeenCalled();
      expect(component.timeStamp).not.toEqual(oldTime);
      discardPeriodicTasks();
    }));
  });

  describe('toggleInfodetailsSection()', () => {
    it('should toggle the isInfoDetailsExpanded flag', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_isInfoDetailsExpanded'] = false;

      component.toggleInfoDetailsSection();
      expect(component.isInfoDetailsExpanded).toBeTrue();

      component.toggleInfoDetailsSection();
      expect(component.isInfoDetailsExpanded).toBeFalse();
    });
  });
});
