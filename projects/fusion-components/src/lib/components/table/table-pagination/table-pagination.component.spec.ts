
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { Subscription } from 'rxjs';

import { FusionComponentsTranslationService } from '@fusion-components/lib/services';
import { TableRowData } from '../table.interface';
import { TablePaginationComponent } from './table-pagination.component';
import { TablePaginationConfig } from './table-pagination.interface';

describe('TablePaginationComponent', () => {
  let component: TablePaginationComponent;
  let translationService: FusionComponentsTranslationService;

  beforeEach(() => {
    translationService = new FusionComponentsTranslationService();
    component = new TablePaginationComponent(translationService);
  });

  describe('@Input()', () => {
    describe('config', () => {
      it('should set the config if the provided config is defined', () => {
        const defaultConfig: TablePaginationConfig = {
          resultsPerPageOptions: [{ value: 5 }, { value: 10 }, { value: 30, isDefault: true }, { value: 100 }],
          allowViewAllOption: false,
          displayNumSelected: true,
        };

        expect(component.config).toEqual(defaultConfig);
        component.config = null as any;
        expect(component.config).toEqual(defaultConfig);
      });

      it('should call setDefalutResultsPerPage if provided config is defined', () => {
        const config: TablePaginationConfig = {
          resultsPerPageOptions: [],
          allowViewAllOption: false,
        };

        spyOn(component, 'setDefaultResultsPerPage').and.stub();
        component.config = config;
        expect(component.setDefaultResultsPerPage).toHaveBeenCalled();
      });
    });

    describe('data', () => {
      it('should set the data to either the provided data or an empty array', () => {
        component.data = null;
        expect(component.data).toEqual([]);

        component.data = [{ data: 'data' }];
        expect(component.data).toEqual([{ data: 'data' }]);
      });

      it('should call updateTableData() if the new data is not the same as the previous data', () => {
        spyOn(component, 'updateTableData').and.stub();

        component.data = [{ data: 'data' }];
        expect(component.updateTableData).toHaveBeenCalled();
      });
    });
  });

  describe('ngOnInit()', () => {
    it('should call setDefaultResultsPerPage()', () => {
      spyOn(component, 'setDefaultResultsPerPage').and.stub();
      component.ngOnInit();
      expect(component.setDefaultResultsPerPage).toHaveBeenCalled();
    });

    it('should subscribe to changes to currentPageIndex and numResultsPerPage', () => {
      spyOn(component.currentPageIndex, 'subscribe').and.callThrough();
      spyOn(component.numResultsPerPage.valueChanges, 'subscribe').and.callThrough();

      component.ngOnInit();
      // eslint-disable-next-line import/no-deprecated
      expect(component.currentPageIndex.subscribe).toHaveBeenCalled();
      // eslint-disable-next-line import/no-deprecated
      expect(component.numResultsPerPage.valueChanges.subscribe).toHaveBeenCalled();
    });

    it('should update the numResultsPerPage and currentPageIndex if numResultsPerPage was changed', () => {
      const currentPageIndexSpy: jasmine.Spy = spyOn(component.currentPageIndex, 'next').and.callThrough();

      component.ngOnInit();

      component.numResultsPerPage.setValue(5);
      expect(component.oldNumResultsPerPage).toEqual(5);
      expect(component.currentPageIndex.next).toHaveBeenCalledWith(0);
      expect(component.currentPageIndex.value).toEqual(0);

      currentPageIndexSpy.calls.reset();

      component.numResultsPerPage.setValue(5);
      expect(component.oldNumResultsPerPage).toEqual(5);
      expect(component.currentPageIndex.next).not.toHaveBeenCalled();
      expect(component.currentPageIndex.value).toEqual(0);
    });
  });

  describe('ngOnDestroy()', () => {
    it('should unsubscribe from all active subscriptions', () => {
      const sub1: Subscription = new Subscription();
      const sub2: Subscription = new Subscription();
      spyOn(sub1, 'unsubscribe').and.callThrough();
      spyOn(sub2, 'unsubscribe').and.callThrough();

      component.subscriptions = [sub1, sub2];
      component.ngOnDestroy();

      expect(sub1.unsubscribe).toHaveBeenCalled();
      expect(sub2.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('setDefaultresultsPerPage()', () => {
    it('should set the default num of results per page based on the config', () => {
      const config: TablePaginationConfig = {
        resultsPerPageOptions: [{ value: 5 }, { value: 10 }, { value: 30, isDefault: true }, { value: 100 }],
        allowViewAllOption: false,
      };
      component.config = config;

      component.setDefaultResultsPerPage();
      expect(component.numResultsPerPage.value).toEqual(30);
    });

    it('should set the default num of results per page to be the first option if no default is set', () => {
      const config: TablePaginationConfig = {
        resultsPerPageOptions: [{ value: 5 }, { value: 10 }, { value: 30 }, { value: 100 }],
        allowViewAllOption: false,
      };
      component.config = config;

      component.setDefaultResultsPerPage();
      expect(component.numResultsPerPage.value).toEqual(5);
    });
  });

  describe('updateCurrentPageIndex()', () => {
    it('should update the currentPageIndex behavior subject', () => {
      spyOn(component.currentPageIndex, 'next').and.callThrough();
      component.updateCurrentPageIndex(5);
      expect(component.currentPageIndex.next).toHaveBeenCalledWith(5);
      expect(component.currentPageIndex.value).toEqual(5);
    });
  });

  describe('updateTableData()', () => {
    let paginatedTableDataSpy: jasmine.Spy;

    beforeEach(() => {
      paginatedTableDataSpy = spyOn(component.paginatedTableData, 'emit').and.callThrough();
      spyOn(component.paginationChange, 'emit').and.callThrough();
    });

    it('should update the data based on the number of results and current page index', fakeAsync(() => {
      let expectedResult: TableRowData[];

      component.data = [{ data: 'data1' }, { data: 'data2' }, { data: 'data3' }];

      component.config = {
        resultsPerPageOptions: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 5 }],
        allowViewAllOption: true,
      };

      component.numResultsPerPage.setValue(1);
      component.updateTableData();
      tick(1000);
      expectedResult = [
        { data: 'data1', isVisible: true },
        { data: 'data2', isVisible: false },
        { data: 'data3', isVisible: false },
      ];
      expect(paginatedTableDataSpy.calls.mostRecent().args[0]).toEqual(expectedResult);

      component.numResultsPerPage.setValue(2);
      component.updateTableData();
      tick(1000);
      expectedResult = [
        { data: 'data1', isVisible: true },
        { data: 'data2', isVisible: true },
        { data: 'data3', isVisible: false },
      ];
      expect(paginatedTableDataSpy.calls.mostRecent().args[0]).toEqual(expectedResult);

      component.numResultsPerPage.setValue(3);
      component.updateTableData();
      tick(1000);
      expectedResult = [
        { data: 'data1', isVisible: true },
        { data: 'data2', isVisible: true },
        { data: 'data3', isVisible: true },
      ];
      expect(paginatedTableDataSpy.calls.mostRecent().args[0]).toEqual(expectedResult);

      component.numResultsPerPage.setValue(5);
      component.updateTableData();
      tick(1000);
      expectedResult = [
        { data: 'data1', isVisible: true },
        { data: 'data2', isVisible: true },
        { data: 'data3', isVisible: true },
      ];
      expect(paginatedTableDataSpy.calls.mostRecent().args[0]).toEqual(expectedResult);

      component.numResultsPerPage.setValue(-1);
      component.updateTableData();
      tick(1000);
      expectedResult = [
        { data: 'data1', isVisible: true },
        { data: 'data2', isVisible: true },
        { data: 'data3', isVisible: true },
      ];
      expect(paginatedTableDataSpy.calls.mostRecent().args[0]).toEqual(expectedResult);

      discardPeriodicTasks();
    }));

    it('should update correctly with filtered data', fakeAsync(() => {
      let expectedResult: TableRowData[];

      component.data = [{ data: 'data1', isFiltered: true }, { data: 'data2' }, { data: 'data3' }];

      component.config = {
        resultsPerPageOptions: [{ value: 1 }, { value: 3 }],
        allowViewAllOption: true,
      };

      component.numResultsPerPage.setValue(1);
      component.updateTableData();
      tick(1000);
      expectedResult = [
        { data: 'data1', isFiltered: true },
        { data: 'data2', isVisible: true }, // 1 value per page and it's the first non filtered value so it's visible.
        { data: 'data3', isVisible: false }, // 1 value per page and it's the 2nd value so it's not visible.
      ];
      expect(paginatedTableDataSpy.calls.mostRecent().args[0]).toEqual(expectedResult);

      component.numResultsPerPage.setValue(3);
      component.updateTableData();
      tick(1000);
      expectedResult = [
        { data: 'data1', isFiltered: true }, // filtered out so it's isVisible property is not set.
        { data: 'data2', isVisible: true }, // 3 values per page so it's visible.
        { data: 'data3', isVisible: true }, // 3 values per page so it's visible.
      ];
      expect(paginatedTableDataSpy.calls.mostRecent().args[0]).toEqual(expectedResult);
    }));

    it('should update currentPageIndex when it gets out of bounds', fakeAsync(() => {
      component.data = [{ data: 'data1', isFiltered: true }, { data: 'data2' }, { data: 'data3' }];
      component.currentPageIndex.next(2);

      component.config = {
        resultsPerPageOptions: [{ value: 1 }],
        allowViewAllOption: true,
      };

      component.numResultsPerPage.setValue(1);
      component.updateTableData();
      tick(1000);
      expect(component.currentPageIndex.value).toBe(1);
    }));

    it('should emit events for the paginated table data and pagination change', fakeAsync(() => {
      component.updateTableData();

      tick(1000);

      expect(component.paginatedTableData.emit).toHaveBeenCalled();
      expect(component.paginationChange.emit).toHaveBeenCalled();

      discardPeriodicTasks();
    }));

    it('should set the numDeselectableSelectedRows correctly', fakeAsync(() => {
      component.data = [{ data: 'data1', isSelected: true, isSelectable: true }, { data: 'data2', isSelected: true }, { data: 'data3' }];
      component.updateTableData();

      tick(1000);

      expect(component.numDeselectableSelectedRows).toBe(1);

      discardPeriodicTasks();
    }));
  });
});
