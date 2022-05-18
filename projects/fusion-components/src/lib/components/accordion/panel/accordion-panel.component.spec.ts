import { AnimationEvent } from '@angular/animations';
import { ElementRef, QueryList } from '@angular/core';

import { TemplateDirective } from '@fusion-ui/fusion-components/lib/directives/template';
import { MockTemplateDirective } from '@fusion-ui/fusion-components/unit-test-helpers/mock-utils.spec';

import { AccordionPanelComponent } from './accordion-panel.component';

describe('AccordianPanelComponent', () => {
  let component: AccordionPanelComponent;

  beforeEach(() => {
    component = new AccordionPanelComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('@Input()', () => {
    /* eslint-disable @typescript-eslint/dot-notation */

    describe('maxContentHeight', () => {
      it('should set the _maxContentHeight', () => {
        component.maxContentHeight = '100px';
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['_maxContentHeight']).toEqual('100px');
        expect(component.maxContentHeight).toEqual('100px');
      });

      it('should set the panelContentContainer overflow styling', () => {
        // everything is undefined
        component.panelContentContainer = undefined;
        component['_maxContentHeight'] = undefined;
        component.isExpanded = false;

        component.maxContentHeight = undefined;
        expect(component.panelContentContainer).toBeFalsy();

        // container is undefined and isExpanded is false
        component.panelContentContainer = undefined;
        component['_maxContentHeight'] = undefined;
        component.isExpanded = false;

        component.maxContentHeight = '100px';
        expect(component.panelContentContainer).toBeFalsy();

        // container is undefined
        component.panelContentContainer = undefined;
        component['_maxContentHeight'] = undefined;
        component.isExpanded = true;

        component.maxContentHeight = '100px';
        expect(component.panelContentContainer).toBeFalsy();

        // all needed parts are true
        component.panelContentContainer = new ElementRef(document.createElement('div'));
        component['_maxContentHeight'] = undefined;
        component.isExpanded = true;

        component.maxContentHeight = '100px';
        expect(component.panelContentContainer).toBeTruthy();
        expect(component.panelContentContainer.nativeElement.style.overflow).toEqual('auto');
      });
    });

    describe('isExpanded', () => {
      it('should update _isExpanded if the panel is not disabled', () => {
        component['_isExpanded'] = false;
        component['_isDisabled'] = false;
        component.isExpanded = true;
        expect(component['_isExpanded']).toBeTrue();
        expect(component.isExpanded).toBeTrue();

        component['_isExpanded'] = false;
        component['_isDisabled'] = true;
        component.isExpanded = true;
        expect(component['_isExpanded']).toBeFalse();
        expect(component.isExpanded).toBeFalse();
      });

      it('should update emit that the content visibility changed if ixExpanded changed', () => {
        spyOn(component.panelContentVisibilityChanged, 'emit').and.stub();

        component['_isExpanded'] = false;
        component.isExpanded = false;
        expect(component.panelContentVisibilityChanged.emit).not.toHaveBeenCalled();

        component['_isExpanded'] = true;
        component.isExpanded = true;
        expect(component.panelContentVisibilityChanged.emit).not.toHaveBeenCalled();

        component['_isExpanded'] = true;
        component.isExpanded = false;
        expect(component.panelContentVisibilityChanged.emit).toHaveBeenCalledWith(component);

        component['_isExpanded'] = false;
        component.isExpanded = true;
        expect(component.panelContentVisibilityChanged.emit).toHaveBeenCalledWith(component);
      });
    });

    describe('isDisabled', () => {
      it('should set _isDisabled and isExpanded', () => {
        component['_isExpanded'] = true;
        component.isDisabled = true;
        expect(component['_isDisabled']).toBeTrue();
        expect(component.isDisabled).toBeTrue();
        expect(component.isExpanded).toBeFalse();

        component['_isExpanded'] = true;
        component.isDisabled = false;
        expect(component['_isDisabled']).toBeFalse();
        expect(component.isDisabled).toBeFalse();
        expect(component.isExpanded).toBeTrue();
      });
    });

    describe('id', () => {
      it('should set _id if the provided id is defined', () => {
        component['_id'] = 'mock-id';
        component.id = undefined;
        expect(component['_id']).toEqual('mock-id');
        expect(component.id).toEqual('mock-id');

        component['_id'] = 'mock-id';
        component.id = 'new-mock-id';
        expect(component['_id']).toEqual('new-mock-id');
        expect(component.id).toEqual('new-mock-id');
      });
    });

    /* eslint-enable @typescript-eslint/dot-notation */
  });

  describe('ngAftercontentInit', () => {
    it('should NOT set headerTemplate or contentTemplate if no templates were found', () => {
      setTemplates([]);
      component.ngAfterContentInit();
      expect(component.titleTemplate).toBeUndefined();
      expect(component.contentTemplate).toBeUndefined();
    });

    it('should NOT set headerTemplate or contentTemplate if the correct template types were NOT found', () => {
      setTemplates(['badTemplateName', 'anotherBadTemplateName']);
      component.ngAfterContentInit();
      expect(component.titleTemplate).toBeUndefined();
      expect(component.contentTemplate).toBeUndefined();
    });

    it('should set headerTemplate and contentTemplate if the correct template types were found', () => {
      setTemplates(['panelTitle', 'panelContent']);
      component.ngAfterContentInit();
      expect(component.titleTemplate).toBeDefined();
      expect(component.contentTemplate).toBeDefined();
    });
  });

  describe('toggleOverflow()', () => {
    it('should set the overflow to auto if the fromState is void and maxContentHeight is defined', () => {
      // panelContentContainer and event is undefined
      component.panelContentContainer = undefined;
      component.toggleOverflow(undefined);
      expect(component.panelContentContainer).toBeFalsy();

      // panelContentContainer is undefined
      component.panelContentContainer = undefined;
      component.toggleOverflow({ fromState: undefined } as AnimationEvent);
      expect(component.panelContentContainer).toBeFalsy();

      // event is undefined
      component.panelContentContainer = new ElementRef(document.createElement('div'));
      component.toggleOverflow(undefined);
      expect(component.panelContentContainer.nativeElement.style.overflow).toEqual('');

      // event fromState is wrong
      component.maxContentHeight = '100px';
      component.panelContentContainer = new ElementRef(document.createElement('div'));
      component.toggleOverflow({ fromState: undefined } as AnimationEvent);
      expect(component.panelContentContainer.nativeElement.style.overflow).toEqual('hidden');

      // max content height is not set
      component.maxContentHeight = undefined;
      component.panelContentContainer = new ElementRef(document.createElement('div'));
      component.toggleOverflow({ fromState: 'void' } as AnimationEvent);
      expect(component.panelContentContainer.nativeElement.style.overflow).toEqual('hidden');

      // all needed parts are true
      component.maxContentHeight = '100px';
      component.panelContentContainer = new ElementRef(document.createElement('div'));
      component.toggleOverflow({ fromState: 'void' } as AnimationEvent);
      expect(component.panelContentContainer.nativeElement.style.overflow).toEqual('auto');
    });
  });

  describe('toggleContentVisibility', () => {
    it('should emit that the header was clicked', () => {
      spyOn(component.panelHeaderClicked, 'emit').and.stub();
      component.toggleContentVisibility();
      expect(component.panelHeaderClicked.emit).toHaveBeenCalledWith(component);
    });
  });

  /**
   * Helper function to generate templates that are used to display provided templateRef in ng-content.
   *
   * @param templatesTypes the type of templates
   */
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
