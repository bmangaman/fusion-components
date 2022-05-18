import { QueryList } from '@angular/core';

import { cloneDeep } from 'lodash';

import { TemplateDirective } from '../../directives/template';
import { KeyValueTableComponent } from './key-value-table.component';
import { KeyValueTableData } from './key-value-table.interface';

describe('KeyValueTableComponent', () => {
  let component: KeyValueTableComponent;

  beforeEach(() => {
    component = new KeyValueTableComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('ngAfterContentInit()', () => {
    /* eslint-disable @typescript-eslint/dot-notation */

    it('should loop through the template and set the the keyTemplate or valueTemplate of the cooresponding data', () => {
      const data: KeyValueTableData[] = [
        {
          key: 'key1',
          keyText: 'keyText1',
          value: 'value1',
        },
        {
          key: 'key2',
          keyText: 'keyText2',
          value: 'value2',
        },
        {
          key: 'key3',
          keyText: 'keyText3',
          value: 'value3',
        },
      ];

      component.data = cloneDeep(data);

      // No templates found
      component.templates = new QueryList<TemplateDirective>();
      component.ngAfterContentInit();
      expect(component.data).toEqual(data);

      // Found template does not match any data keys
      component.templates['_results'] = [
        { getName: () => 'randomName', getType: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.data).toEqual(data);

      // Found type is not 'key' or 'value'
      component.templates['_results'] = [
        { getName: () => 'key1', getType: () => 'randomType', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.data).toEqual(data);

      // Found template matches key1 for the keyTemplate
      component.templates['_results'] = [
        { getName: () => 'key1', getType: () => 'key', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.data[0].keyTemplate).toBeTruthy();
      expect(component.data[0].valueTemplate).toBeFalsy();

      // Found template matches key2 for the valueTemplate
      component.templates['_results'] = [
        { getName: () => 'key2', getType: () => 'value', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.data[1].keyTemplate).toBeFalsy();
      expect(component.data[1].valueTemplate).toBeTruthy();

      // Found two (2) templates, one (1) for key2 valueTemplate, one (1) for key3 keyTemplate
      component.templates['_results'] = [
        { getName: () => 'key2', getType: () => 'value', template: {} } as TemplateDirective,
        { getName: () => 'key3', getType: () => 'key', template: {} } as TemplateDirective,
      ];
      component.ngAfterContentInit();
      expect(component.data[1].valueTemplate).toBeTruthy();
      expect(component.data[2].keyTemplate).toBeTruthy();
    });

    /* eslint-enable @typescript-eslint/dot-notation */
  });
});
