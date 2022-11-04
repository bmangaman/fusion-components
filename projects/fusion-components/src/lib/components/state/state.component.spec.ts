import { State } from '../../shared';
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
        component.state = State.NOT_LOADED;
        expect(component['_state']).toEqual(State.NOT_LOADED);
        expect(component.state).toEqual(State.NOT_LOADED);
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
          [State.ERROR]: 'error'
        };
        component.headlines = newHeadlines;
        expect(component.headlines[State.ERROR]).toEqual(newHeadlines[State.ERROR]);
        expect(component.headlines[State.NOT_LOADED]).toEqual(DEFAULT_STATE_HEADLINES[State.NOT_LOADED]);
        expect(component.headlines[State.NO_RESULTS]).toEqual(DEFAULT_STATE_HEADLINES[State.NO_RESULTS]);

        newHeadlines = {
          [State.ERROR]: 'error',
          [State.NOT_LOADED]: 'not loaded',
          [State.NO_RESULTS]: 'no results',
        };
        component.headlines = newHeadlines;
        expect(component.headlines[State.ERROR]).toEqual(newHeadlines[State.ERROR]);
        expect(component.headlines[State.NOT_LOADED]).toEqual(newHeadlines[State.NOT_LOADED]);
        expect(component.headlines[State.NO_RESULTS]).toEqual(newHeadlines[State.NO_RESULTS]);
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
          [State.ERROR]: 'error'
        };
        component.messages = newMessages;
        expect(component.messages[State.ERROR]).toEqual(newMessages[State.ERROR]);
        expect(component.messages[State.NOT_LOADED]).toEqual(DEFAULT_STATE_MESSAGES[State.NOT_LOADED]);
        expect(component.messages[State.NO_RESULTS]).toEqual(DEFAULT_STATE_MESSAGES[State.NO_RESULTS]);

        newMessages = {
          [State.ERROR]: 'error',
          [State.NOT_LOADED]: 'not loaded',
          [State.NO_RESULTS]: 'no results',
        };
        component.messages = newMessages;
        expect(component.messages[State.ERROR]).toEqual(newMessages[State.ERROR]);
        expect(component.messages[State.NOT_LOADED]).toEqual(newMessages[State.NOT_LOADED]);
        expect(component.messages[State.NO_RESULTS]).toEqual(newMessages[State.NO_RESULTS]);
      });
    });

    /* eslint-disable @typescript-eslint/dot-notation */
  });

  describe('generateCssClasses()', () => {
    let expectedResult: string[];

    beforeEach(() => {
      expectedResult = [];
      component.state = null as any;
      component.location = null as any;
    });

    describe('wrapper', () => {
      it('should only append the base class if state and location inputs are undefined', () => {
        component.state = null as any;
        component.location = null as any;
        expectedResult = ['f-state'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);
      });

      it('should append the correct state classes based on the provided input', () => {
        component.state = State.LOADED;
        expectedResult = ['f-state', 'f-state--loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);

        component.state = State.LOADING;
        expectedResult = ['f-state', 'f-state--loading'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);

        component.state = State.NOT_LOADED;
        expectedResult = ['f-state', 'f-state--not-loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);

        component.state = State.NO_RESULTS;
        expectedResult = ['f-state', 'f-state--no-results'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);

        component.state = State.ERROR;
        expectedResult = ['f-state', 'f-state--error'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);
      });

      it('should append the correct location classes based on the provided input', () => {
        component.location = StateLocation.GENERIC;
        expectedResult = ['f-state', 'f-state--generic'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);

        component.location = StateLocation.TABLE;
        expectedResult = ['f-state', 'f-state--table'];
        component.generateCssClasses();
        expect(component.cssClasses.wrapper).toEqual(expectedResult);
      });
    });

    describe('inner', () => {
      it('should only append the base inner class if state and location inputs are undefined', () => {
        component.state = null as any;
        component.location = null as any;
        expectedResult = ['f-state__inner'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);
      });

      it('should append the correct state classes based on the provided input', () => {
        component.state = State.LOADED;
        expectedResult = ['f-state__inner', 'f-state__inner--loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);

        component.state = State.LOADING;
        expectedResult = ['f-state__inner', 'f-state__inner--loading'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);

        component.state = State.NOT_LOADED;
        expectedResult = ['f-state__inner', 'f-state__inner--not-loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);

        component.state = State.NO_RESULTS;
        expectedResult = ['f-state__inner', 'f-state__inner--no-results'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);

        component.state = State.ERROR;
        expectedResult = ['f-state__inner', 'f-state__inner--error'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);
      });

      it('should append the correct location classes based on the provided input', () => {
        component.location = StateLocation.GENERIC;
        expectedResult = ['f-state__inner', 'f-state__inner--generic'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);

        component.location = StateLocation.TABLE;
        expectedResult = ['f-state__inner', 'f-state__inner--table'];
        component.generateCssClasses();
        expect(component.cssClasses.inner).toEqual(expectedResult);
      });
    });

    describe('graphic', () => {
      it('should only append the base graphic class if state and location inputs are undefined', () => {
        component.state = null as any;
        component.location = null as any;
        expectedResult = ['f-state__inner-graphic'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);
      });

      it('should append the correct state classes based on the provided input', () => {
        component.state = State.LOADED;
        expectedResult = ['f-state__inner-graphic', 'f-state__inner-graphic--loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);

        component.state = State.LOADING;
        expectedResult = ['f-state__inner-graphic', 'f-state__inner-graphic--loading'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);

        component.state = State.NOT_LOADED;
        expectedResult = ['f-state__inner-graphic', 'f-state__inner-graphic--not-loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);

        component.state = State.NO_RESULTS;
        expectedResult = ['f-state__inner-graphic', 'f-state__inner-graphic--no-results'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);

        component.state = State.ERROR;
        expectedResult = ['f-state__inner-graphic', 'f-state__inner-graphic--error'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);
      });

      it('should append the correct location classes based on the provided input', () => {
        component.location = StateLocation.GENERIC;
        expectedResult = ['f-state__inner-graphic', 'f-state__inner-graphic--generic'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);

        component.location = StateLocation.TABLE;
        expectedResult = ['f-state__inner-graphic', 'f-state__inner-graphic--table'];
        component.generateCssClasses();
        expect(component.cssClasses.graphic).toEqual(expectedResult);
      });
    });

    describe('content', () => {
      it('should only append the base content class if state and location inputs are undefined', () => {
        component.state = null as any;
        component.location = null as any;
        expectedResult = ['f-state__inner-content'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);
      });

      it('should append the correct state classes based on the provided input', () => {
        component.state = State.LOADED;
        expectedResult = ['f-state__inner-content', 'f-state__inner-content--loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);

        component.state = State.LOADING;
        expectedResult = ['f-state__inner-content', 'f-state__inner-content--loading'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);

        component.state = State.NOT_LOADED;
        expectedResult = ['f-state__inner-content', 'f-state__inner-content--not-loaded'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);

        component.state = State.NO_RESULTS;
        expectedResult = ['f-state__inner-content', 'f-state__inner-content--no-results'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);

        component.state = State.ERROR;
        expectedResult = ['f-state__inner-content', 'f-state__inner-content--error'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);
      });

      it('should append the correct location classes based on the provided input', () => {
        component.location = StateLocation.GENERIC;
        expectedResult = ['f-state__inner-content', 'f-state__inner-content--generic'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);

        component.location = StateLocation.TABLE;
        expectedResult = ['f-state__inner-content', 'f-state__inner-content--table'];
        component.generateCssClasses();
        expect(component.cssClasses.content).toEqual(expectedResult);
      });
    });
  });
});
