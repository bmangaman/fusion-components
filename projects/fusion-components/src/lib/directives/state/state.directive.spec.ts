import { ComponentRef, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';
import { MockTemplateRef } from '@fusion-components/unit-test-helpers/mock-utils.spec';

import { StateComponent, StateLocation } from '../../components/state';
import { State } from '../../shared';
import { StateDirective } from './state.directive';

import Spy = jasmine.Spy;

describe('StateDirective', () => {
  let directive: StateDirective;
  let viewContainerRef: ViewContainerRef;
  let templateRef: TemplateRef<any>;
  let renderer2: Renderer2;

  beforeEach(() => {
    viewContainerRef = ComponentStubFactory.getViewContainerRefStub() as ViewContainerRef;
    templateRef = ComponentStubFactory.getTemplateRefStub() as TemplateRef<any>;
    renderer2 = ComponentStubFactory.getRenderer2Stub() as Renderer2;

    directive = new StateDirective(
      viewContainerRef,
      templateRef,
      renderer2,
    );
  });

  it('should be defined', () => {
    expect(directive).toBeTruthy();
  });

  describe('@Input()', () => {
    /* eslint-disable @typescript-eslint/dot-notation */

    beforeEach(() => {
      spyOn(directive, 'generateView').and.stub();
    });

    describe('state', () => {
      it('should set the state and call generateView()', () => {
        directive.state = State.LOADED;
        expect(directive['_state']).toEqual(State.LOADED);
        expect(directive.generateView).toHaveBeenCalled();
      });
    });

    describe('location', () => {
      it('should set the location and call generateView()', () => {
        directive.location = StateLocation.GENERIC;
        expect(directive['_location']).toEqual(StateLocation.GENERIC);
        expect(directive.generateView).toHaveBeenCalled();
      });
    });

    describe('headlines', () => {
      it('should set the headlines and call generateView()', () => {
        directive.headlines = {};
        expect(directive['_headlines']).toEqual({});
        expect(directive.generateView).toHaveBeenCalled();
      });
    });

    describe('messages', () => {
      it('should set the messages and call generateView()', () => {
        directive.messages = {};
        expect(directive['_messages']).toEqual({});
        expect(directive.generateView).toHaveBeenCalled();
      });
    });

    describe('messageTemplates', () => {
      it('should set the messageTemplates and call generateView()', () => {
        directive.messageTemplates = {};
        expect(directive['_messageTemplates']).toEqual({});
        expect(directive.generateView).toHaveBeenCalled();
      });
    });

    describe('loadingAriaLabel', () => {
      it('should set the loadingAriaLabel and call generateView()', () => {
        directive.loadingAriaLabel = 'label';
        expect(directive['_loadingAriaLabel']).toEqual('label');
        expect(directive.generateView).toHaveBeenCalled();
      });
    });

    describe('fusionUiStateLoading', () => {
      it('should set the loadingState template and call generateView()', () => {
        const mockTemplateRef: TemplateRef<any> = new MockTemplateRef();
        directive.fusionUiStateLoading = mockTemplateRef;
        expect(directive['_loadingState']).toEqual(mockTemplateRef);
        expect(directive.generateView).toHaveBeenCalled();
      });
    });

    describe('fusionUiStateNoResults', () => {
      it('should set the noResultsState template and call generateView()', () => {
        const mockTemplateRef: TemplateRef<any> = new MockTemplateRef();
        directive.fusionUiStateNoResults = mockTemplateRef;
        expect(directive['_noResultsState']).toEqual(mockTemplateRef);
        expect(directive.generateView).toHaveBeenCalled();
      });
    });

    describe('fusionUiStateError', () => {
      it('should set the errorState template and call generateView()', () => {
        const mockTemplateRef: TemplateRef<any> = new MockTemplateRef();
        directive.fusionUiStateError = mockTemplateRef;
        expect(directive['_errorState']).toEqual(mockTemplateRef);
        expect(directive.generateView).toHaveBeenCalled();
      });
    });

    describe('fusionUiStateNotLoaded', () => {
      it('should set the notLoadedState template and call generateView()', () => {
        const mockTemplateRef: TemplateRef<any> = new MockTemplateRef();
        directive.fusionUiStateNotLoaded = mockTemplateRef;
        expect(directive['_notLoadedState']).toEqual(mockTemplateRef);
        expect(directive.generateView).toHaveBeenCalled();
      });
    });

    /* eslint-enable @typescript-eslint/dot-notation */
  });

  describe('generateView()', () => {
    let mockTemplateRef: TemplateRef<any>;

    beforeEach(() => {
      spyOn(directive, 'generateViewHelper').and.stub();
      mockTemplateRef = new MockTemplateRef();
    });

    it('should clear the view container and add classes if found', () => {
      spyOn(directive, 'getClasses').and.returnValue(['class1', 'class2']);

      directive.generateView();
      expect(viewContainerRef.clear).toHaveBeenCalled();
      expect(renderer2.addClass).toHaveBeenCalledTimes(2);
    });

    it('should not add any classes if the next element sibling was not found', () => {
      viewContainerRef.element.nativeElement.nextElementSibling = null;

      directive.generateView();
      expect(renderer2.addClass).not.toHaveBeenCalledTimes(2);
    });

    describe('loading state', () => {
      it('should call generateViewHelper with the correct state template', () => {
        directive.state = State.LOADING;

        directive.fusionUiStateLoading = null;
        directive.generateView();
        expect(directive.generateViewHelper).toHaveBeenCalledWith(null);

        directive.fusionUiStateLoading = mockTemplateRef;
        directive.generateView();
        expect(directive.generateViewHelper).toHaveBeenCalledWith(mockTemplateRef);
      });
    });

    describe('no results state', () => {
      it('should call generateViewHelper with the correct state template', () => {
        directive.state = State.NO_RESULTS;

        directive.fusionUiStateNoResults = null;
        directive.generateView();
        expect(directive.generateViewHelper).toHaveBeenCalledWith(null);

        directive.fusionUiStateNoResults = mockTemplateRef;
        directive.generateView();
        expect(directive.generateViewHelper).toHaveBeenCalledWith(mockTemplateRef);
      });
    });

    describe('error state', () => {
      it('should call generateViewHelper with the correct state template', () => {
        directive.state = State.ERROR;

        directive.fusionUiStateError = null;
        directive.generateView();
        expect(directive.generateViewHelper).toHaveBeenCalledWith(null);

        directive.fusionUiStateError = mockTemplateRef;
        directive.generateView();
        expect(directive.generateViewHelper).toHaveBeenCalledWith(mockTemplateRef);
      });
    });

    describe('not loaded state', () => {
      it('should call generateViewHelper with the correct state template', () => {
        directive.state = State.NOT_LOADED;

        directive.fusionUiStateNotLoaded = null;
        directive.generateView();
        expect(directive.generateViewHelper).toHaveBeenCalledWith(null);

        directive.fusionUiStateNotLoaded = mockTemplateRef;
        directive.generateView();
        expect(directive.generateViewHelper).toHaveBeenCalledWith(mockTemplateRef);
      });
    });

    describe('loaded and default states', () => {
      it('should create an embedded view of the templateRef', () => {
        directive.state = State.LOADED;
        directive.generateView();
        expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(templateRef);

        directive.state = undefined as any;
        directive.generateView();
        expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(templateRef);
      });
    });
  });

  describe('generateViewHelper()', () => {
    it('should use the provided templateRef if it is defined', () => {
      const mockTemplateRef: TemplateRef<any> = new MockTemplateRef();
      directive.generateViewHelper(mockTemplateRef);
      expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(mockTemplateRef);
      expect(viewContainerRef.createComponent).not.toHaveBeenCalled();
    });

    it('should use the provided inputs to generate a component if the provided templateRef is undefined', () => {
      const stateComponentRef: ComponentRef<StateComponent> = generateMockStateComponentComponentRef();
      (viewContainerRef.createComponent as Spy).and.returnValue(stateComponentRef);

      directive.state = undefined as any;
      directive.location = undefined as any;
      directive.headlines = undefined as any;
      directive.messages = undefined as any;
      directive.messageTemplates = undefined as any;
      directive.loadingAriaLabel = undefined as any;

      directive.generateViewHelper(null);
      expect(viewContainerRef.createComponent).toHaveBeenCalled();
      expect(stateComponentRef.instance.state).toEqual(null as any);
      expect(stateComponentRef.instance.location).toEqual(null as any);
      expect(stateComponentRef.instance.headlines).toEqual(null as any);
      expect(stateComponentRef.instance.messages).toEqual(null as any);
      expect(stateComponentRef.instance.messageTemplates).toEqual(null as any);
      expect(stateComponentRef.instance.loadingAriaLabel).toEqual(null as any);

      directive.state = State.LOADING;
      directive.location = StateLocation.GENERIC;
      directive.headlines = {};
      directive.messages = {};
      directive.messageTemplates = {};
      directive.loadingAriaLabel = 'label';

      directive.generateViewHelper(null);
      expect(viewContainerRef.createComponent).toHaveBeenCalled();
      expect(stateComponentRef.instance.state).toEqual(State.LOADING);
      expect(stateComponentRef.instance.location).toEqual(StateLocation.GENERIC);
      expect(stateComponentRef.instance.headlines).toEqual({});
      expect(stateComponentRef.instance.messages).toEqual({});
      expect(stateComponentRef.instance.messageTemplates).toEqual({});
      expect(stateComponentRef.instance.loadingAriaLabel).toEqual('label');
    });
  });

  describe('getClasses()', () => {
    it('should return the array of classes found on the provided view container', () => {
      viewContainerRef.element.nativeElement.nextElementSibling.classList = ['class1', 'class2'];
      expect(directive.getClasses()).toEqual(['class1', 'class2']);
    });
  });

  function generateMockStateComponentComponentRef(): ComponentRef<StateComponent> {
    return {
      instance: {
        state: null,
        location: null,
        headlines: null,
        messages: null,
        messageTemplates: null,
        loadingAriaLabel: null,
      },
    } as any as ComponentRef<StateComponent>;
  }
});
