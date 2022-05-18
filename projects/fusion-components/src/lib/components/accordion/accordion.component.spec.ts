import { QueryList } from '@angular/core';

import { AccordionComponent } from './accordion.component';
import { HccAccordionIcontype, PanelContentVisibilityChangedEmit } from './accordion.interface';
import { AccordionPanelComponent } from './panel';

describe('TabviewComponent', () => {
  let component: AccordionComponent;

  beforeEach(() => {
    component = new AccordionComponent();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  describe('Input()s', () => {
    describe('maxContentHeight', () => {
      it('should set the _maxContentHeight and call updatePanelsMaxContentHeight()', () => {
        spyOn(component, 'updatePanelsMaxContentHeight').and.stub();
        component.maxContentHeight = '100px';
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['_maxContentHeight']).toEqual('100px');
        expect(component.maxContentHeight).toEqual('100px');
        expect(component.updatePanelsMaxContentHeight).toHaveBeenCalled();
      });
    });

    describe('expandIconClasses', () => {
      it('should set the _expandIconClasses and call setPanelsIcon()', () => {
        spyOn(component, 'setPanelsIcon').and.stub();
        component.expandIconClasses = 'mdi mdi-chevron-down';
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['expandIconClasses']).toEqual('mdi mdi-chevron-down');
        expect(component.expandIconClasses).toEqual('mdi mdi-chevron-down');
        expect(component.setPanelsIcon).toHaveBeenCalledWith(HccAccordionIcontype.EXPAND);

        component.expandIconClasses = undefined;
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['expandIconClasses']).toEqual(undefined);
        expect(component.expandIconClasses).toEqual(undefined);
        expect(component.setPanelsIcon).toHaveBeenCalledWith(HccAccordionIcontype.EXPAND);
      });
    });

    describe('collapseIconClasses', () => {
      it('should set the _collapseIconClasses and call setPanelsIcon()', () => {
        spyOn(component, 'setPanelsIcon').and.stub();
        component.collapseIconClasses = 'mdi mdi-chevron-down';
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['collapseIconClasses']).toEqual('mdi mdi-chevron-down');
        expect(component.collapseIconClasses).toEqual('mdi mdi-chevron-down');
        expect(component.setPanelsIcon).toHaveBeenCalledWith(HccAccordionIcontype.COLLAPSE);

        component.collapseIconClasses = undefined;
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['collapseIconClasses']).toEqual(undefined);
        expect(component.collapseIconClasses).toEqual(undefined);
        expect(component.setPanelsIcon).toHaveBeenCalledWith(HccAccordionIcontype.COLLAPSE);
      });
    });

    describe('toggleAllPanels()', () => {
      it('should do nothing if either panels is undefined or is of length zero', () => {
        component.areAllPanelsExpanded = undefined;
        component.panels = undefined;
        component.toggleAllPanels = {};
        expect(component.areAllPanelsExpanded).toBeFalsy();

        setPanels(0);
        component.toggleAllPanels = {};
        expect(component.areAllPanelsExpanded).toBeFalsy();
      });

      it('should update areAllPanelsExpanded and loop through each panel and update the isExpanded value', () => {
        setPanels(2);
        component.panels.toArray()[0].isExpanded = false;
        component.panels.toArray()[1].isExpanded = false;
        component.areAllPanelsExpanded = false;

        component.toggleAllPanels = {};
        expect(component.panels.toArray()[0].isExpanded).toBeTrue();
        expect(component.panels.toArray()[1].isExpanded).toBeTrue();

        component.areAllPanelsExpanded = true;
        component.toggleAllPanels = {};
        expect(component.panels.toArray()[0].isExpanded).toBeFalse();
        expect(component.panels.toArray()[1].isExpanded).toBeFalse();
      });
    });
  });

  describe('@ContentChildren', () => {
    describe('panels', () => {
      it('should set _panels and call updatePanelsMaxContentHeight() and subscribeToPanelChanges()', () => {
        spyOn(component, 'updatePanelsMaxContentHeight').and.stub();
        spyOn(component, 'subscribeToPanelChanges').and.stub();
        setPanels(2);
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(component['_panels']).toBeTruthy();
        expect(component.panels).toBeTruthy();
        expect(component.panels.toArray().length).toEqual(2);
        expect(component.updatePanelsMaxContentHeight).toHaveBeenCalled();
        expect(component.subscribeToPanelChanges).toHaveBeenCalled();
      });
    });
  });

  describe('ngAfterContentInit()', () => {
    it('should call updatePanelsMaxContentHeight() and createAndEmitPanelContentVisibilityChangedEmitObject()', () => {
      spyOn(component, 'updatePanelsMaxContentHeight').and.stub();
      spyOn(component, 'createAndEmitPanelContentVisibilityChangedEmitObject').and.stub();
      component.ngAfterContentInit();
      expect(component.updatePanelsMaxContentHeight).toHaveBeenCalled();
      expect(component.createAndEmitPanelContentVisibilityChangedEmitObject).toHaveBeenCalled();
    });
  });

  describe('setPanelsIcon()', () => {
    it('should loop through the panels and set the appropriate icon', () => {
      component.panels = undefined;
      component.setPanelsIcon(HccAccordionIcontype.EXPAND);
      expect(component.panels).toBeFalsy();

      setPanels(0);
      component.setPanelsIcon(HccAccordionIcontype.EXPAND);
      expect(component.panels.toArray().length).toEqual(0);

      setPanels(2);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['_expandIconClasses'] = 'mdi mdi-chevron-down';
      component.setPanelsIcon(HccAccordionIcontype.EXPAND);
      component.panels.forEach((panel: AccordionPanelComponent) => {
        expect(panel.expandIconClasses).toEqual('mdi mdi-chevron-down');
      });

      setPanels(2);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      component['collapseIconClasses'] = 'mdi mdi-chevron-down';
      component.setPanelsIcon(HccAccordionIcontype.EXPAND);
      component.panels.forEach((panel: AccordionPanelComponent) => {
        expect(panel.collapseIconClasses).toEqual('mdi mdi-chevron-down');
      });
    });
  });

  describe('subscribeToPanelChanges()', () => {
    it('should loop through the panels and subscribe to the panelHeaderClicked and panelContentVisibilityChanged events', () => {
      component.subscriptions = [];
      setPanels(2);
      component.subscribeToPanelChanges();
      expect(component.subscriptions.length).toEqual(4);
    });

    it('should update the areAllPanelsExpanded based on what the states of the enabled panels', () => {
      spyOn(component, 'createAndEmitPanelContentVisibilityChangedEmitObject').and.stub();
      spyOn(component, 'togglePanelContentVisibility').and.callThrough();

      component.areAllPanelsExpanded = undefined;
      component.subscriptions = [];
      setPanels(2);
      component.subscribeToPanelChanges();

      component.panels.toArray()[0].isExpanded = false;
      component.panels.toArray()[1].isExpanded = false;
      expect(component.areAllPanelsExpanded).toBeFalse();
      expect(component.createAndEmitPanelContentVisibilityChangedEmitObject).toHaveBeenCalled();
      expect(component.togglePanelContentVisibility).not.toHaveBeenCalled();

      component.panels.toArray()[0].panelHeaderClicked.emit(component.panels.toArray()[0]);
      component.panels.toArray()[1].panelHeaderClicked.emit(component.panels.toArray()[1]);
      expect(component.areAllPanelsExpanded).toBeTrue();
      expect(component.createAndEmitPanelContentVisibilityChangedEmitObject).toHaveBeenCalled();
      expect(component.togglePanelContentVisibility).toHaveBeenCalled();
    });
  });

  describe('createAndEmitPanelContentVisibilityChangedEmitObject()', () => {
    it('should create and emit the current state of the accordion', () => {
      spyOn(component.panelContentVisibilityChanged, 'emit').and.stub();

      setPanels(1);
      component.areAllPanelsExpanded = false;

      component.createAndEmitPanelContentVisibilityChangedEmitObject();
      const expectedResult: PanelContentVisibilityChangedEmit = { panels: component.panels.toArray(), areAllPanelsExpanded: false };
      expect(component.panelContentVisibilityChanged.emit).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('togglePanelContentVisibility()', () => {
    it ('should not do anything if the provided panel is undefined', () => {
      const panel: AccordionPanelComponent = undefined;
      component.togglePanelContentVisibility(panel);
      expect(panel).toBeFalsy();
    });

    it('should set the isExpanded value of the provided panel', () => {
      const panel: AccordionPanelComponent = new AccordionPanelComponent();
      component.togglePanelContentVisibility(panel);
      expect(panel.isExpanded).toBeTrue();
      component.togglePanelContentVisibility(panel);
      expect(panel.isExpanded).toBeFalse();
    });

    it('should not loop through all the panels if onePanelList is false, the provided panel was collapsed, or there are no panels', () => {
      component.onePanelLimit = false;
      setPanels(2);
      component.panels.toArray()[0].isExpanded = false;
      component.panels.toArray()[1].isExpanded = true;
      component.togglePanelContentVisibility(component.panels.toArray()[0]);
      expect(component.panels.toArray()[1].isExpanded).toBeTruthy();

      component.onePanelLimit = true;
      setPanels(2);
      component.panels.toArray()[0].isExpanded = true;
      component.panels.toArray()[1].isExpanded = true;
      component.togglePanelContentVisibility(component.panels.toArray()[0]);
      expect(component.panels.toArray()[1].isExpanded).toBeTruthy();

      component.onePanelLimit = true;
      component.panels = undefined;
      const panel: AccordionPanelComponent = new AccordionPanelComponent();
      panel.isExpanded = false;
      component.togglePanelContentVisibility(panel);
      expect(component.panels).toBeFalsy();

      component.onePanelLimit = true;
      setPanels(0);
      panel.isExpanded = false;
      component.togglePanelContentVisibility(panel);
      expect(component.panels.toArray()).toEqual([]);
    });

    it('should collapsed all other panels if onePanelList is set', () => {
      component.onePanelLimit = true;
      setPanels(2);
      component.panels.toArray()[0].isExpanded = false;
      component.panels.toArray()[1].isExpanded = true;
      component.togglePanelContentVisibility(component.panels.toArray()[0]);
      expect(component.panels.toArray()[0].isExpanded).toBeTrue();
      expect(component.panels.toArray()[1].isExpanded).toBeFalse();
    });
  });

  describe('updatePanelsMaxContentHeight()', () => {
    it('should update the max heights of the all the child panels', () => {
      component.panels = undefined;
      component.updatePanelsMaxContentHeight();
      expect(component.panels).toBeFalsy();

      setPanels(2);

      component.maxContentHeight = undefined;
      component.updatePanelsMaxContentHeight();
      expect(component.panels.toArray()[0].maxContentHeight).toBeFalsy();
      expect(component.panels.toArray()[1].maxContentHeight).toBeFalsy();

      component.maxContentHeight = '100px';
      component.updatePanelsMaxContentHeight();
      expect(component.panels.toArray()[0].maxContentHeight).toEqual('100px');
      expect(component.panels.toArray()[1].maxContentHeight).toEqual('100px');
    });
  });

  /**
   * Helper function that generates panels for component.panels.
   *
   * @param numPanelComponents the number of panels wanted to generated and added to component.panels
   */
  function setPanels(numTabComponents: number = 1): void {
    const panels: AccordionPanelComponent[] = [];

    for (let i = 0; i < numTabComponents; i++) {
      const tab: AccordionPanelComponent = new AccordionPanelComponent();
      panels.push(tab);
    }

    component.panels = new QueryList<AccordionPanelComponent>();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    component.panels['_results'] = panels;
  }
});
