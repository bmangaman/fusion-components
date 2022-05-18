import { FusionUiState } from '../../shared';
import { StateComponent } from './state.component';
import { DEFAULT_STATE_HEADLINES, DEFAULT_STATE_MESSAGES, StateHeadlines, StateLocation } from './state.interface';

describe('StateComponent', () => {
  let component: StateComponent;

  beforeEach(() => {
    component = new StateComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input()', () => {
    /* eslint-disable @typescript-eslint/dot-notation */

    describe('state', () => {
      it('should set state and call generateCssClasses()', () => {
        spyOn(component, 'generateCssClasses').and.stub();
        component.state = FusionUiState.NOT_LOADED;
        expect(component['_state']).toEqual(FusionUiState.NOT_LOADED);
        expect(component.state).toEqual(FusionUiState.NOT_LOADED);
        expect(component.generateCssClasses).toHaveBeenCalled();
      });
    });

    describe('location', () => {
      it('should set location and call generateCssClasses()', () => {
        spyOn(component, 'generateCssClasses').and.stub();
        component.location = StateLocation.GENERIC;
        expect(component['_location']).toEqual(StateLocation.GENERIC);
        expect(component.location).toEqual(StateLocation.GENERIC);
        expect(component.generateCssClasses).toHaveBeenCalled();
      });
    });

    describe('headlines', () => {
      it('should set headlines', () => {
        expect(component['_headlines']).toEqual(DEFAULT_STATE_HEADLINES);
        expect(component.headlines).toEqual(DEFAULT_STATE_HEADLINES);

        component.headlines = {};
        expect(component['_headlines']).toEqual(DEFAULT_STATE_HEADLINES);
        expect(component.headlines).toEqual(DEFAULT_STATE_HEADLINES);

        let newHeadlines: StateHeadlines = {
          [FusionUiState.ERROR]: 'error'
        };
        component.headlines = newHeadlines;
        expect(component.headlines[FusionUiState.ERROR]).toEqual(newHeadlines[FusionUiState.ERROR]);
        expect(component.headlines[FusionUiState.NOT_LOADED]).toEqual(DEFAULT_STATE_HEADLINES[FusionUiState.NOT_LOADED]);
        expect(component.headlines[FusionUiState.NO_RESULTS]).toEqual(DEFAULT_STATE_HEADLINES[FusionUiState.NO_RESULTS]);

        newHeadlines = {
          [FusionUiState.ERROR]: 'error',
          [FusionUiState.NOT_LOADED]: 'not loaded',
          [FusionUiState.NO_RESULTS]: 'no results',
        };
        component.headlines = newHeadlines;
        expect(component.headlines[FusionUiState.ERROR]).toEqual(newHeadlines[FusionUiState.ERROR]);
        expect(component.headlines[FusionUiState.NOT_LOADED]).toEqual(newHeadlines[FusionUiState.NOT_LOADED]);
        expect(component.headlines[FusionUiState.NO_RESULTS]).toEqual(newHeadlines[FusionUiState.NO_RESULTS]);
      });
    });

    describe('messages', () => {
      it('should set messages', () => {
        expect(component['_messages']).toEqual(DEFAULT_STATE_MESSAGES);
        expect(component.messages).toEqual(DEFAULT_STATE_MESSAGES);

        component.messages = {};
        expect(component['_messages']).toEqual(DEFAULT_STATE_MESSAGES);
        expect(component.messages).toEqual(DEFAULT_STATE_MESSAGES);

        let newMessages: StateHeadlines = {
          [FusionUiState.ERROR]: 'error'
        };
        component.messages = newMessages;
        expect(component.messages[FusionUiState.ERROR]).toEqual(newMessages[FusionUiState.ERROR]);
        expect(component.messages[FusionUiState.NOT_LOADED]).toEqual(DEFAULT_STATE_MESSAGES[FusionUiState.NOT_LOADED]);
        expect(component.messages[FusionUiState.NO_RESULTS]).toEqual(DEFAULT_STATE_MESSAGES[FusionUiState.NO_RESULTS]);

        newMessages = {
          [FusionUiState.ERROR]: 'error',
          [FusionUiState.NOT_LOADED]: 'not loaded',
          [FusionUiState.NO_RESULTS]: 'no results',
        };
        component.messages = newMessages;
        expect(component.messages[FusionUiState.ERROR]).toEqual(newMessages[FusionUiState.ERROR]);
        expect(component.messages[FusionUiState.NOT_LOADED]).toEqual(newMessages[FusionUiState.NOT_LOADED]);
        expect(component.messages[FusionUiState.NO_RESULTS]).toEqual(newMessages[FusionUiState.NO_RESULTS]);
      });
    });

    /* eslint-disable @typescript-eslint/dot-notation */
  });

  describe('generateCssClasses()', () => {
    let expectedResult: string[];

    beforeEach(() => {
      expectedResult = [];
      component.state = null;
      component.location = null;
    });

    describe('wrapper', () => {
      it('should only append the base class if state and location inputs are undefined', () => {
        component.state = null;
        component.location = null;
        expectedResult = ['fusion-ui-state'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);
      });

      it('should append the correct state classes based on the provided input', () => {
        component.state = FusionUiState.LOADED;
        expectedResult = ['fusion-ui-state', 'fusion-ui-state--loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);

        component.state = FusionUiState.LOADING;
        expectedResult = ['fusion-ui-state', 'fusion-ui-state--loading'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);

        component.state = FusionUiState.NOT_LOADED;
        expectedResult = ['fusion-ui-state', 'fusion-ui-state--not-loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);

        component.state = FusionUiState.NO_RESULTS;
        expectedResult = ['fusion-ui-state', 'fusion-ui-state--no-results'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);

        component.state = FusionUiState.ERROR;
        expectedResult = ['fusion-ui-state', 'fusion-ui-state--error'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);
      });

      it('should append the correct location classes based on the provided input', () => {
        component.location = StateLocation.GENERIC;
        expectedResult = ['fusion-ui-state', 'fusion-ui-state--generic'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);

        component.location = StateLocation.TABLE;
        expectedResult = ['fusion-ui-state', 'fusion-ui-state--table'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);
      });
    });

    describe('inner', () => {
      it('should only append the base inner class if state and location inputs are undefined', () => {
        component.state = null;
        component.location = null;
        expectedResult = ['fusion-ui-state__inner'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);
      });

      it('should append the correct state classes based on the provided input', () => {
        component.state = FusionUiState.LOADED;
        expectedResult = ['fusion-ui-state__inner', 'fusion-ui-state__inner--loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);

        component.state = FusionUiState.LOADING;
        expectedResult = ['fusion-ui-state__inner', 'fusion-ui-state__inner--loading'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);

        component.state = FusionUiState.NOT_LOADED;
        expectedResult = ['fusion-ui-state__inner', 'fusion-ui-state__inner--not-loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);

        component.state = FusionUiState.NO_RESULTS;
        expectedResult = ['fusion-ui-state__inner', 'fusion-ui-state__inner--no-results'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);

        component.state = FusionUiState.ERROR;
        expectedResult = ['fusion-ui-state__inner', 'fusion-ui-state__inner--error'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);
      });

      it('should append the correct location classes based on the provided input', () => {
        component.location = StateLocation.GENERIC;
        expectedResult = ['fusion-ui-state__inner', 'fusion-ui-state__inner--generic'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);

        component.location = StateLocation.TABLE;
        expectedResult = ['fusion-ui-state__inner', 'fusion-ui-state__inner--table'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);
      });
    });

    describe('graphic', () => {
      it('should only append the base graphic class if state and location inputs are undefined', () => {
        component.state = null;
        component.location = null;
        expectedResult = ['fusion-ui-state__inner-graphic'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);
      });

      it('should append the correct state classes based on the provided input', () => {
        component.state = FusionUiState.LOADED;
        expectedResult = ['fusion-ui-state__inner-graphic', 'fusion-ui-state__inner-graphic--loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);

        component.state = FusionUiState.LOADING;
        expectedResult = ['fusion-ui-state__inner-graphic', 'fusion-ui-state__inner-graphic--loading'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);

        component.state = FusionUiState.NOT_LOADED;
        expectedResult = ['fusion-ui-state__inner-graphic', 'fusion-ui-state__inner-graphic--not-loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);

        component.state = FusionUiState.NO_RESULTS;
        expectedResult = ['fusion-ui-state__inner-graphic', 'fusion-ui-state__inner-graphic--no-results'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);

        component.state = FusionUiState.ERROR;
        expectedResult = ['fusion-ui-state__inner-graphic', 'fusion-ui-state__inner-graphic--error'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);
      });

      it('should append the correct location classes based on the provided input', () => {
        component.location = StateLocation.GENERIC;
        expectedResult = ['fusion-ui-state__inner-graphic', 'fusion-ui-state__inner-graphic--generic'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);

        component.location = StateLocation.TABLE;
        expectedResult = ['fusion-ui-state__inner-graphic', 'fusion-ui-state__inner-graphic--table'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);
      });
    });

    describe('content', () => {
      it('should only append the base content class if state and location inputs are undefined', () => {
        component.state = null;
        component.location = null;
        expectedResult = ['fusion-ui-state__inner-content'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);
      });

      it('should append the correct state classes based on the provided input', () => {
        component.state = FusionUiState.LOADED;
        expectedResult = ['fusion-ui-state__inner-content', 'fusion-ui-state__inner-content--loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);

        component.state = FusionUiState.LOADING;
        expectedResult = ['fusion-ui-state__inner-content', 'fusion-ui-state__inner-content--loading'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);

        component.state = FusionUiState.NOT_LOADED;
        expectedResult = ['fusion-ui-state__inner-content', 'fusion-ui-state__inner-content--not-loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);

        component.state = FusionUiState.NO_RESULTS;
        expectedResult = ['fusion-ui-state__inner-content', 'fusion-ui-state__inner-content--no-results'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);

        component.state = FusionUiState.ERROR;
        expectedResult = ['fusion-ui-state__inner-content', 'fusion-ui-state__inner-content--error'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);
      });

      it('should append the correct location classes based on the provided input', () => {
        component.location = StateLocation.GENERIC;
        expectedResult = ['fusion-ui-state__inner-content', 'fusion-ui-state__inner-content--generic'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);

        component.location = StateLocation.TABLE;
        expectedResult = ['fusion-ui-state__inner-content', 'fusion-ui-state__inner-content--table'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);
      });
    });
  });
});
