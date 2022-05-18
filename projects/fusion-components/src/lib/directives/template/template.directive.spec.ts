import { TemplateRef } from '@angular/core';

import { ComponentStubFactory } from '@fusion-ui/fusion-components/unit-test-helpers/component-stub-factory.spec';

import { TemplateDirective } from './template.directive';

describe('TemplateDirective', () => {
  let directive: TemplateDirective;
  let template: TemplateRef<any>;

  beforeEach(() => {
    template = ComponentStubFactory.getTemplateRefStub() as TemplateRef<any>;
    directive = new TemplateDirective(template);
  });

  describe('getName()', () => {
    it('should return the template name', () => {
      directive.name = 'directive-name';
      expect(directive.getName()).toEqual('directive-name');
    });
  });

  describe('getType()', () => {
    it('should return the template name', () => {
      directive.type = 'directive-type';
      expect(directive.getType()).toEqual('directive-type');
    });
  });

  describe('getAttributes()', () => {
    it('should return the template attributes', () => {
      directive.attributes = { key: 'value' };
      expect(directive.getAttributes()).toEqual({ key: 'value' });
    });
  });
});
