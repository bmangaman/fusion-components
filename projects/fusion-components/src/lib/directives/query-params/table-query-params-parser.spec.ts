import { ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Params } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import {
  TableColumnComponent,
  TableColumnSorted,
  TableFilterBytesComponent,
  TableFilterComponent,
  TableFilterConfig,
  TableFilterIpComponent,
  TableFilterNumberComponent,
  TableFilterStringComponent,
  TableView,
} from '@fusion-components/lib/components/table';
import { ComponentStubFactory } from '@fusion-components/unit-test-helpers/component-stub-factory.spec';

import { FusionComponentsTranslationService } from '../../services';
import { TableQueryParamsParser } from './table-query-params-parser';

function generateFilterComponents(): TableFilterComponent[] {
  const translationService: FusionComponentsTranslationService = new FusionComponentsTranslationService();
  const translateService: TranslateService = ComponentStubFactory.getTranslateServiceStub();

  const filterComponents: TableFilterComponent[] = [];
  const stringFilterComponent = new TableFilterStringComponent(new UntypedFormBuilder(), translationService, translateService);
  stringFilterComponent.field = 'stringField';
  filterComponents.push(stringFilterComponent);

  const numberFilterComponent = new TableFilterNumberComponent(new UntypedFormBuilder(), translationService, translateService);
  numberFilterComponent.field = 'numberField';
  filterComponents.push(numberFilterComponent);

  const ipAddressFilterDirective = new TableFilterIpComponent(new UntypedFormBuilder(), translationService, translateService);
  ipAddressFilterDirective.field = 'ipField';
  filterComponents.push(ipAddressFilterDirective);

  const filterComponent = new TableFilterComponent(new UntypedFormBuilder(), translationService, translateService);
  filterComponent.field = 'field';
  filterComponents.push(filterComponent);

  const bytesFilterComponent = new TableFilterBytesComponent(new UntypedFormBuilder(), translationService, translateService);
  bytesFilterComponent.field = 'bytesField';
  filterComponents.push(bytesFilterComponent);

  return filterComponents;
}

function generateColumnComponents(cdr: ChangeDetectorRef): TableColumnComponent[] {
  const columnComponents: TableColumnComponent[] = [];
  for (let i = 0; i < 5; i++) {
    const directive = new TableColumnComponent(cdr);
    directive.field = `field${i}`;
    columnComponents.push(directive);
  }
  return columnComponents;
}

function generateViews(): TableView[] {
  return [
    {
      name: 'active',
      label: 'Active'
    },
    {
      name: 'deleted',
      label: 'Deleted'
    },
  ];
}

describe('TableQueryParamsParser', () => {
  let changeDetectorRef: ChangeDetectorRef;

  let allFilters: TableFilterComponent[];
  let allColumns: TableColumnComponent[];
  let allViews: TableView[];

  beforeEach(() => {
    changeDetectorRef = ComponentStubFactory.getChangeDetectorRefStub() as ChangeDetectorRef;

    allFilters = generateFilterComponents();
    allColumns = generateColumnComponents(changeDetectorRef);
    allViews = generateViews();
  });

  describe('Filters', () => {

    it('Proper escaping', () => {
      const inputStringsToTest = [
        '!@#$%^&*_+?<>/\\\\',
        '(){}[];:',
        '."\'|`~,',
        'actualValueWithBackslash\\',
        'value,with,commas',
        'value:with:colons',
        'value\\:with:backslash\\:and-colons',
      ];
      const parsedData = {
        filters: inputStringsToTest.map(string => ({
          filter: TableFilterStringComponent,
          filterName: '',
          field: 'stringField',
          comparatorName: 'contains',
          formValues: { string },
        })),
        columns: [],
        sort: null,
        view: null
      };
      const queryParams: Params = TableQueryParamsParser.createQueryParams(parsedData, allFilters);
      const parsedFilters = TableQueryParamsParser.getFiltersFromQueryParams(queryParams.filters, allFilters);
      expect(parsedFilters).toEqual(parsedData.filters.map(filter => ({ ...filter, label: jasmine.any(Observable)})));
    });

    describe('Query Params -> table objects', () => {
      describe('String Filters', () => {
        it('should generate filters', () => {
          // String filters with 3 parts.
          let stringFilterStrings = [
            'stringField:is:blah',
            'stringField:isNot:blah',
            'stringField:contains:blah',
            'stringField:doesNotContain:blah',
          ];

          stringFilterStrings.forEach(sfs => {
            expect(TableQueryParamsParser.getFiltersFromQueryParams(sfs, allFilters)).toEqual(
              [
                jasmine.objectContaining(
                  {
                    field: 'stringField',
                    formValues: { string: 'blah' }
                  }
                ),
              ] as any,
              `Failed on string ${sfs}`);
          });

          stringFilterStrings = [
            'stringField:isEmpty',
            'stringField:isNotEmpty',
          ];
          stringFilterStrings.forEach(sfs => {
            expect(TableQueryParamsParser.getFiltersFromQueryParams(sfs, allFilters)).toEqual(
              [
                jasmine.objectContaining(
                  {
                    field: 'stringField',
                    formValues: null
                  }
                ),
                // eslint-disable-next-line @typescript-eslint/indent
              ] as any,
              `Failed on string ${sfs}`);
          });
        });

        it('should not generate invalid filters', () => {
          const stringFilterStrings = [
            // Field does not match any filter.
            'badField:is:blah',
            // Comparator does not match any comparators.
            'stringField:isCool:blah',
            // Missing value.
            'stringField:contains',
            // Too many parts.
            'stringField:contains:blah:blah:blah',
            // Missing 2 parts.
            'stringField',
            // Has value when it shouldn't.
            'stringField:isEmpty:blah',
            // bad format.
            ',blah,blah',
            ':::',
          ];

          stringFilterStrings.forEach(sfs => {
            expect(TableQueryParamsParser.getFiltersFromQueryParams(sfs, allFilters)).toEqual([]);
          });
        });

        it('should generate multiple filters', () => {
          const stringFilterString = 'stringField:contains:name,stringField:isNotEmpty,stringField:isNot:otherName';

          expect(TableQueryParamsParser.getFiltersFromQueryParams(stringFilterString, allFilters)).toEqual(
            [
              jasmine.objectContaining({ field: 'stringField', comparatorName: 'contains', formValues: { string: 'name' } }),
              jasmine.objectContaining({ field: 'stringField', comparatorName: 'isNotEmpty', formValues: null }),
              jasmine.objectContaining({ field: 'stringField', comparatorName: 'isNot', formValues: { string: 'otherName' } }),
            ] as any);
        });
      });

      describe('Number Filters', () => {
        it('should generate filters', () => {
          // Number filters with 3 parts.
          const numberFilterStrings = [
            'numberField:equalTo:1',
            'numberField:notEqualTo:2',
            'numberField:greaterThan:3',
            'numberField:lessThan:7',
          ];

          numberFilterStrings.forEach(nfs => {
            expect(TableQueryParamsParser.getFiltersFromQueryParams(nfs, allFilters)).toEqual(
              [
                jasmine.objectContaining(
                  {
                    field: 'numberField',
                    formValues: { number: jasmine.any(Number) }
                  }
                ),
              ] as any,
              `Failed on string ${nfs}`);
          });
        });

        it('should not generate invalid filters', () => {
          const numberFilterStrings = [
            // Field does not match any filter.
            'badField:equalTo:1',
            // Comparator does not match any comparators.
            'numberField:isCool:1',
            // Missing value.
            'numberField:notEqualTo',
            // Too many parts.
            'numberField:greaterThan:3:3:5',
            // Missing 2 parts.
            'numberField',
          ];

          numberFilterStrings.forEach(nfs => {
            expect(TableQueryParamsParser.getFiltersFromQueryParams(nfs, allFilters)).toEqual([]);
          });
        });

        it('should generate multiple filters', () => {
          const filterString = 'numberField:greaterThan:3,stringField:is:name';

          expect(TableQueryParamsParser.getFiltersFromQueryParams(filterString, allFilters)).toEqual(
            [
              jasmine.objectContaining({ field: 'numberField', comparatorName: 'greaterThan', formValues: { number: 3 } }),
              jasmine.objectContaining({ field: 'stringField', comparatorName: 'is', formValues: { string: 'name' } }),
            ] as any);
        });
      });

      describe('IP Filters', () => {
        it('should generate filters', () => {
          // IP address filters with 3 parts.
          let ipFilterStrings = [
            'ipField:is:1.1.1.1',
            'ipField:isNot:2.2.2.2',
          ];

          ipFilterStrings.forEach(ifs => {
            expect(TableQueryParamsParser.getFiltersFromQueryParams(ifs, allFilters)).toEqual(
              [
                jasmine.objectContaining(
                  {
                    field: 'ipField',
                    formValues: { ip: jasmine.any(String) }
                  }
                ),
              ] as any,
              `Failed on string ${ifs}`);
          });

          ipFilterStrings = [
            'ipField:contains:1.x.x.x',
            'ipField:contains:1.1.x.x',
            'ipField:contains:1.1.1.x',
          ];

          ipFilterStrings.forEach(ifs => {
            expect(TableQueryParamsParser.getFiltersFromQueryParams(ifs, allFilters)).toEqual(
              [
                jasmine.objectContaining(
                  {
                    field: 'ipField',
                    formValues: jasmine.objectContaining({
                      octet1: jasmine.any(Number),
                      octet4: null,
                    })
                  }
                ),
              ] as any,
              `Failed on string ${ifs}`);
          });
        });

        it('should not generate invalid filters', () => {
          const ipFilterStrings = [
            // Field does not match any filter.
            'badField:equalTo:1',
            // Comparator does not match any comparators.
            'ipField:isCool:1',
            // Missing value.
            'ipField:is',
            // Too many parts.
            'ipField:isNot:3:3:5',
            // Missing 2 parts.
            'ipField',
            // Has value when it shouldn't.
            'ipField:isEmpty:blah',
            // Has no value for contains.
            'ipField:contains:x.x.x.x',
            // Has bad format.
            'ipField:contains:x.x.x.x.x.x.x.x',
            'ipField:contains:x.x',
          ];

          ipFilterStrings.forEach(nfs => {
            expect(TableQueryParamsParser.getFiltersFromQueryParams(nfs, allFilters)).toEqual([]);
          });
        });

        it('should generate multiple filters', () => {
          const filterString = 'ipField:is:10.183.3.10,ipField:contains:10.192.x.x,stringField:is:name,numberField:greaterThan:2';

          expect(TableQueryParamsParser.getFiltersFromQueryParams(filterString, allFilters)).toEqual(
            [
              jasmine.objectContaining({ field: 'ipField', comparatorName: 'is', formValues: { ip: '10.183.3.10' } }),
              jasmine.objectContaining({
                field: 'ipField', comparatorName: 'contains', formValues: {
                  ip: null,
                  octet1: 10,
                  octet2: 192,
                  octet3: null,
                  octet4: null,
                }
              }),
              jasmine.objectContaining({ field: 'stringField', comparatorName: 'is', formValues: { string: 'name' } }),
              jasmine.objectContaining({ field: 'numberField', comparatorName: 'greaterThan', formValues: { number: 2 } }),
            ] as any);
        });
      });
    });

    describe('table objects -> Query Params', () => {
      it('should map filters to a string', () => {
        const expectedFilterString =
          'stringField:is:myName\\, version\\:2,ipField:contains:1.2.x.x,numberField:greaterThan:4,stringField:isEmpty';
        const appliedFilters: TableFilterConfig[] = [
          {
            filter: TableFilterStringComponent,
            filterName: 'stringField',
            field: 'stringField',
            comparatorName: 'is',
            formValues: { string: 'myName, version:2' },
          },
          {
            filter: TableFilterIpComponent,
            field: 'ipField',
            filterName: 'ipField',
            comparatorName: 'contains',
            formValues: { ip: null, octet1: '1', octet2: '2', octet3: null, octet4: null },
          },
          {
            filter: TableFilterNumberComponent,
            field: 'numberField',
            filterName: 'numberField',
            comparatorName: 'greaterThan',
            formValues: { number: 4 },
          },
          {
            filter: TableFilterStringComponent,
            filterName: 'stringField',
            field: 'stringField',
            comparatorName: 'isEmpty',
            formValues: null,
          },
        ];

        expect(TableQueryParamsParser
          .createQueryParams({ filters: appliedFilters, sort: null, columns: [], view: null }, allFilters).filters)
          .toBe(expectedFilterString);
      });
    });
  });

  describe('Sort', () => {
    describe('Query Params -> table objects', () => {
      it('should generate sort', () => {
        // Sorts
        [
          'field1:1',
          'field2:-1',
        ].forEach(sort => {
          expect(TableQueryParamsParser.getSortFromQueryParams(sort, allColumns)).toEqual(
            jasmine.objectContaining(
              {
                field: jasmine.stringMatching(/field\d/),
                order: jasmine.any(Number)
              }
            ),
            `Failed on string ${sort}`);
        });
      });

      it('should not generate invalid sorts', () => {
        [
          // Field does not match any field.
          'badField:1',
          // Missing order.
          'field1',
          // Too many parts.
          'field1:1:1:1:1',
          // Has that is not a number.
          'field1:blah',
        ].forEach(sort => {
          expect(TableQueryParamsParser.getSortFromQueryParams(sort, allColumns)).toBeUndefined();
        });
      });

      it('should not generate multiple sorts', () => {
        const sortsString = 'field1:1,field2:-1';

        expect(TableQueryParamsParser.getSortFromQueryParams(sortsString, allColumns)).toBeUndefined();
      });
    });

    describe('table objects -> Query Params', () => {
      it('should map sort to a string', () => {
        const expectedSortsString = 'field1:1';
        const sort = {
          field: 'field1',
          order: 1
        };

        expect(TableQueryParamsParser.createQueryParams({ filters: [], sort, columns: [], view: null }, allFilters).sort)
          .toBe(expectedSortsString);
      });
    });
  });

  describe('Columns', () => {
    describe('Query Params -> table objects', () => {
      it('should generate columns array', () => {
        // Columns
        const columnString = 'field1,field2,field3';
        const parsedColumns = TableQueryParamsParser.getColumnsFromQueryParams(columnString, allColumns, { field: 'field1', order: 1 });
        expect(parsedColumns)
          .toEqual(
            [
              jasmine.objectContaining({ field: 'field0', isVisible: false }),
              jasmine.objectContaining({ field: 'field1', isVisible: true, sorted: TableColumnSorted.DESCENDING }),
              jasmine.objectContaining({ field: 'field2', isVisible: true }),
              jasmine.objectContaining({ field: 'field3', isVisible: true }),
              jasmine.objectContaining({ field: 'field4', isVisible: false }),
            ]
          );
      });

      it('should not generate invalid columns', () => {
        const columns = 'badField,blahdo,doodoo,is-anyone-reading-these-tests';

        expect(TableQueryParamsParser.getColumnsFromQueryParams(columns, allColumns, { field: 'field1', order: 1 }))
          .toEqual([
            jasmine.objectContaining({ isVisible: true }),
            jasmine.objectContaining({ isVisible: true }),
            jasmine.objectContaining({ isVisible: true }),
            jasmine.objectContaining({ isVisible: true }),
            jasmine.objectContaining({ isVisible: true }),
          ]);
      });

      it('should not generate columns that exclude non-hidable columns', () => {
        allColumns[0].isHidable = false;
        allColumns[3].isHidable = false;
        const columns = 'field1,field4';
        expect(TableQueryParamsParser.getColumnsFromQueryParams(columns, allColumns, { field: 'field1', order: 1 }))
          .toEqual([
            jasmine.objectContaining({ isVisible: true }),
            jasmine.objectContaining({ isVisible: true }),
            jasmine.objectContaining({ isVisible: false }),
            jasmine.objectContaining({ isVisible: true }),
            jasmine.objectContaining({ isVisible: true }),
          ]);
      });
    });

    describe('table objects -> Query Params', () => {
      it('should map columns to a string', () => {
        const expectedColumnsString = 'field1,field4';
        const columns = [
          { field: 'field0', isVisible: false },
          { field: 'field1', isVisible: true },
          { field: 'field2', isVisible: false },
          { field: 'field3', isVisible: false },
          { field: 'field4', isVisible: true },
        ];

        expect(TableQueryParamsParser.createQueryParams({ filters: [], sort: null, columns, view: null }, allFilters).columns)
          .toBe(expectedColumnsString);
      });
    });
  });

  describe('View', () => {
    describe('Query Params -> table objects', () => {
      it('should generate view', () => {
        const view = 'active';
        expect(TableQueryParamsParser.getViewFromQueryParams(view, allViews)).toEqual(
          jasmine.objectContaining(
            {
              name: view,
            }
          ),
          `Failed on string ${view}`);
      });
    });

    describe('table objects -> Query Params', () => {
      it('should map view to a string', () => {
        const expectedViewString = 'deleted';

        expect(TableQueryParamsParser.createQueryParams({ filters: [], sort: null, columns: [], view: allViews[1] }, allFilters).view)
          .toBe(expectedViewString);
      });
    });
  });

  it('should properly build all Params when provided', () => {
    const expectedParams = {
      filters: 'stringField:is:myName\\, version\\:2,ipField:contains:1.2.x.x',
      sort: 'field1:1',
      columns: 'field1,field4',
      view: 'active'
    };

    const paramData = {
      filters: [
        {
          filter: TableFilterStringComponent,
          field: 'stringField',
          filterName: 'stringField',
          comparatorName: 'is',
          formValues: { string: 'myName, version:2' },
        },
        {
          filter: TableFilterIpComponent,
          field: 'ipField',
          filterName: 'ipField',
          comparatorName: 'contains',
          formValues: { ip: null, octet1: '1', octet2: '2', octet3: null, octet4: null },
        },
      ],
      sort: {
        field: 'field1',
        order: 1
      },
      columns: [
        { field: 'field0', isVisible: false },
        { field: 'field1', isVisible: true },
        { field: 'field2', isVisible: false },
        { field: 'field3', isVisible: false },
        { field: 'field4', isVisible: true },
      ],
      view: { name: 'active' } as any
    };

    expect(TableQueryParamsParser.createQueryParams(paramData, allFilters)).toEqual(expectedParams);
  });

  it('should properly build params with nothing provided', () => {
    const expectedParams = {};

    const paramData = {
      filters: [],
      sort: null,
      columns: [],
      view: null,
    };

    expect(TableQueryParamsParser.createQueryParams(paramData, allFilters)).toEqual(expectedParams);
  });
});
