import { ChangeDetectorRef, QueryList } from '@angular/core';

import { TemplateDirective } from '@fusion-components/lib/directives/template';
import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';

import { TableCellContentAlignment, TableColumnConfig } from '../table.interface';
import { TableColumnComponent } from './table-column.component';

describe('TableColumnComponent', () => {
  let component: TableColumnComponent;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(() => {
    changeDetectorRef = ComponentStubFactory.getChangeDetectorRefStub() as ChangeDetectorRef;
    component = new TableColumnComponent(changeDetectorRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterContentInit()', () => {
    it('should loop through the template and set the contentTemplateRef if one is tableCell', () => {
      component.templates = new QueryList<TemplateDirective>();
      component.ngAfterContentInit();
      expect(component.contentTemplateRef).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.contentTemplateRef).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'tableCell', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.contentTemplateRef).toBeTruthy();
    });

    it('should loop through the template and set the headerTemplateRef if one is tableCell', () => {
      component.templates = new QueryList<TemplateDirective>();
      component.ngAfterContentInit();
      expect(component.headerTemplateRef).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.headerTemplateRef).toBeFalsy();

      // eslint-disable-next-line @typescript-eslint/dot-notation
      component.templates['_results'] = [
        { getName: () => 'tableColumnHeader', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.headerTemplateRef).toBeTruthy();
    });
  });

  describe('get config()', () => {
    it('should generate and return a column configuration based the component inputs', () => {
      component.header = 'header';
      component.field = 'field';
      component.cellContentAlignment = TableCellContentAlignment.LEFT;

      const resultingConfig: TableColumnConfig = component.config;
      expect(resultingConfig.header).toEqual('header');
      expect(resultingConfig.field).toEqual('field');
      expect(resultingConfig.cellContentAlignment).toEqual(TableCellContentAlignment.LEFT);
    });
  });
});
