import { QueryList } from '@angular/core';

import { TemplateDirective } from '@fusion-components/lib/directives/template';
import { MockTemplateDirective } from '@fusion-components/unit-test-helpers/mock-utils.spec';

import { TabviewTabComponent } from './tabview-tab.component';

describe('TabviewTabComponent', () => {
  let component: TabviewTabComponent;

  beforeEach(() => {
    component = new TabviewTabComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('ngAfterContentInit()', () => {
    it('should NOT set headerTemplate or contentTemplate if no templates were found', () => {
      setTemplates([]);
      component.ngAfterContentInit();
      expect(component.headerTemplate).toBeUndefined();
      expect(component.contentTemplate).toBeUndefined();
    });

    it('should NOT set headerTemplate or contentTemplate if the correct template types were NOT found', () => {
      setTemplates(['badTemplateName', 'anotherBadTemplateName']);
      component.ngAfterContentInit();
      expect(component.headerTemplate).toBeUndefined();
      expect(component.contentTemplate).toBeUndefined();
    });

    it('should set headerTemplate and contentTemplate if the correct template types were found', () => {
      setTemplates(['tabHeader', 'tabContent']);
      component.ngAfterContentInit();
      expect(component.headerTemplate).toBeDefined();
      expect(component.contentTemplate).toBeDefined();
    });
  });

  function setTemplates(templatesTypes?: string[]): void {
    const templates: MockTemplateDirective[] = [];

    if (templatesTypes && !!templatesTypes.length) {
      for (const templateName of templatesTypes) {
        const template: MockTemplateDirective = new MockTemplateDirective();
        template.name = templateName;
        templates.push(template);
      }
    }

    component.templates = new QueryList<TemplateDirective>();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    component.templates['_results'] = templates;
  }
});
