import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';

import { cloneDeep, get, isEqual } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { FusionComponentsTranslationService } from '@fusion-components/lib/services/translation';
import { Location, Size, TranslatedComponent } from '@fusion-components/lib/shared';

import { ButtonType } from '../../button';
import { FilterComparator, TableFilterComponent } from '../table-filters';
import { TableRowData, TableView } from '../table.interface';
import { TableFilterHostDirective } from './table-filter-host/table-filter-host.directive';
import { TableFilterConfig, TableFilterSelectorTranslations } from './table-filter-selector.interface';

/**
 * TABLE FILTER SELECTOR COMPONENT
 *
 * The table filter selector component keeps track of and applies filters.
 * There are three main categories of filters:
 *  - quick filters (that manifest as small buttons above the table, can easily be toggled on and off)
 *  - view filters (that are applied and removed when the table view is changed)
 *  - regular filters (that are applied and removed via the table filter selector menu dialog)
 */
@Component({
  selector: 'f-table-filter-selector',
  templateUrl: './table-filter-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterSelectorComponent extends TranslatedComponent implements OnInit, OnDestroy {
  readonly ButtonType = ButtonType;
  readonly Size = Size;
  readonly Location = Location;
  readonly Observable = Observable;

  readonly titleCasePipe: TitleCasePipe = new TitleCasePipe();

  subscriptions: Subscription[] = [];
  isMenuDialogOpen = false;
  filterField: UntypedFormControl = new UntypedFormControl(null, Validators.required);
  tableFilter: TableFilterComponent;
  appliedFilters: TableFilterComponent[] = [];

  /**
   * Determines the translations used for any static text.
   */
  @Input() translations: TableFilterSelectorTranslations | undefined;

  /**
   * Determines the quick filters to be displayed to the left of the filter selector menu button.
   * Automatically applies any filter configs with isApplied === true.
   */
  private _quickFilters: TableFilterConfig[] = [];
  @Input()
  set quickFilters(filters: TableFilterConfig[]) {
    this._quickFilters = filters || [];
    this._quickFilters.forEach((qf: TableFilterConfig) => {
      if (qf.isApplied) {
        qf.uuid = uuidv4();
        this.addGeneratedFilter(qf);
      }
    });
  }
  get quickFilters(): TableFilterConfig[] {
    return this._quickFilters;
  }

  /**
   * Determines all of the available filters.
   */
  private _filters: QueryList<TableFilterComponent>;
  @Input()
  set filters(filters: QueryList<TableFilterComponent>) {
    this._filters = filters;
  }
  get filters(): QueryList<TableFilterComponent> {
    return this._filters;
  }

  /**
   * Determines what filters should be applied base on a provided table view.
   * When the view is changed, remove all filters that was associated with the previous view.
   * Then, if the new view has filters, generate and apply them.
   */
  private _tableView: TableView;
  @Input()
  set tableView(view: TableView) {
    this._tableView = view;

    this.appliedFilters.forEach((filter: TableFilterComponent) => {
      if (filter?.isViewFilter) {
        this.removeFilter(filter, false);
      }
    });

    if (!!view?.filters?.length) {
      view.filters.forEach((filterConfig: TableFilterConfig) => {
        this.addGeneratedFilter(filterConfig, true);
      });
    }

    this.filterData();
  }
  get tableView(): TableView {
    return this._tableView;
  }

  /**
   * Determines the external filters to be applied to the table data.
   */
  private _externalAppliedFilters: TableFilterConfig[];
  @Input()
  set externalAppliedFilters(filters: TableFilterConfig[]) {
    this._externalAppliedFilters = filters;
    this.removeAllFilters();
    filters?.forEach((filter: TableFilterConfig) => this.addGeneratedFilter(filter));
  }
  get externalAppliedFilters(): TableFilterConfig[] {
    return this._externalAppliedFilters;
  }

  /**
   * Determines the data to be filtered.
   */
  private _data: TableRowData[] = [];
  @Input()
  set data(data: TableRowData[] | null) {
    this._data = data ? cloneDeep(data) : [];
    this.filterData();
  }
  get data(): TableRowData[] {
    return this._data;
  }

  /**
   * Whenever the data is filtered, emit the newly filtered data.
   */
  @Output() filteredData: EventEmitter<TableRowData[]> = new EventEmitter<TableRowData[]>();

  /**
   * Whenever the appliedFilters list changes, emit the new list of applied filters.
   */
  @Output() appliedFiltersChange: EventEmitter<TableFilterComponent[]> = new EventEmitter<TableFilterComponent[]>();

  @ViewChild(TableFilterHostDirective, { static: false }) tableFilterTemplate: TableFilterHostDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
    protected _translationService: FusionComponentsTranslationService,
    private translateService: TranslateService,
  ) {
    super(_translationService);
  }

  /**
   * On component initialization, subscribe to the filter field form to listen to changes.
   * When the selected field changes, update the filter inputs according to the type of filter for that selected field.
   */
  ngOnInit(): void {
    const filterFieldSub: Subscription = this.filterField.valueChanges.subscribe((filter: TableFilterComponent) => {
      if (filter && this.tableFilterTemplate) {
        this.loadComponent(filter);
      }
    });

    this.subscriptions.push(filterFieldSub);
  }

  /**
   * On component teardown, unsubscribe from all active subscriptions.
   */
  override ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  /**
   * After the menu is opened, automatically select the first visible filter field.
   * If there are no visible columns (isVisibleInSelector === false), disable the select input.
   */
  menuOpened(): void {
    const filters: TableFilterComponent[] = this.filters?.toArray();

    if (!!filters?.length) {
      // setTimeout used to make sure the menu content (filterfield, fusionUiFilterHost, etc.) is rendered before setting the value.
      setTimeout(() => {
        const visibleFilters: TableFilterComponent[] = filters.filter((f: TableFilterComponent) => f.isVisibleInSelector);
        this.filterField.setValue(visibleFilters[0]);
        !visibleFilters.length ? this.filterField.disable() : this.filterField.enable();
      });
    }
  }

  /**
   * Generates and loads the comparator and input fields for the provided filter.
   *
   * @param filter The table filter.
   */
  loadComponent(filter: TableFilterComponent): void {
    const newFilter: TableFilterComponent = this.generateFilter(filter.config);

    const componentFactory: ComponentFactory<TableFilterComponent> =
      this.componentFactoryResolver.resolveComponentFactory(newFilter.TableFilter);

    const viewContainerRef: ViewContainerRef = this.tableFilterTemplate.viewContainerRef;
    viewContainerRef.clear();

    const componentRef: ComponentRef<TableFilterComponent> = viewContainerRef.createComponent(componentFactory);
    Object.keys(newFilter).forEach((key: string) => (componentRef as any).instance[key] = (newFilter as any)[key]);
    componentRef.instance.filterForm.reset();
    componentRef.instance.isLoaded = true;
    this.tableFilter = componentRef.instance;
    this.cdr.markForCheck();
  }

  /**
   * Determines whether or not the form is valid by making sure it is defined and by using the filter isFormInvalid function.
   *
   * @returns True if the form is invalid; false otherwise.
   */
  isFormInvalid(): boolean {
    return !this.tableFilter || this.tableFilter.isFormInvalid() || (!!this.filterField && this.filterField.invalid);
  }

  /**
   * Toggles a quick filter when a user clicks on the button.
   *
   * @param quickFilter The quick filter to either be applied or removed from the appliedFilters list.
   */
  toggleQuickFilter(quickFilter: TableFilterConfig): void {
    if (!quickFilter.isApplied) {
      quickFilter.uuid = uuidv4();
      quickFilter.isApplied = !quickFilter.isApplied;
      this.addGeneratedFilter(quickFilter);
    } else {
      quickFilter.isApplied = !quickFilter.isApplied;
      const matchingFilter: TableFilterComponent =
        this.appliedFilters.find((filter: TableFilterComponent) => filter.uuid === quickFilter.uuid)!;
      this.removeFilter(matchingFilter);
    }
  }

  /**
   * Applies a filter by generating it based on the provided configuration and then adding it to the list of appliedFilters.
   *
   * @param filterConfig The filter config.
   * @param isTableViewFilter flag to indicate whether or not a filter was added by a tableview
   */
  addGeneratedFilter(filterConfig: TableFilterConfig, isTableViewFilter?: boolean): void {
    if (!!filterConfig) {
      const filter: TableFilterComponent = this.generateFilter(filterConfig, isTableViewFilter);
      this.updateAppliedFilters(filter);

      if (!filterConfig.isViewFilter && !isTableViewFilter) {
        this.filterData();
      }
    }
  }

  /**
   * Updates the array of applied filters by adding the provided filter.
   * Adds table views filters to the beginning of the array to make sure
   * they are correctly set with the 'isNotInView` flag.
   *
   * @param filter The filter to be added to the list of applied filters.
   */
  updateAppliedFilters(filter: TableFilterComponent): void {
    this.appliedFilters = filter.isViewFilter ? [filter, ...this.appliedFilters] : [...this.appliedFilters, filter];
  }

  /**
   * Applies a filter (on button click).
   * If the filter trying to be applied matches a quick filter that is not already applied, instead toggle that quick filter.
   * After adding the filter to the list of applied filters, resets the inputs of the table filter selector form and applies the filters.
   */
  applyFilter(): void {
    if (!!this.tableFilter && !this.isFormInvalid()) {
      this.tableFilter.uuid = uuidv4();
      const matchingQuickFilter: TableFilterConfig = this.matchingQuickFilter(this.tableFilter);

      if (matchingQuickFilter) {
        if (!matchingQuickFilter.isApplied) {
          this.toggleQuickFilter(matchingQuickFilter);
        }
      } else {
        this.tableFilter.isLoaded = false;
        this.updateAppliedFilters(this.tableFilter);
      }

      this.tableFilter = undefined!;
      this.filterField.setValue(this.filters.toArray()[0]);
    }

    this.filterData();
  }

  /**
   * Filters the data by looping through each applied filter and running its test function.
   */
  filterData(): void {
    const data: TableRowData[] = cloneDeep(this.data);
    data?.forEach((d: TableRowData) => delete d.isFiltered);

    if (!!data?.length && !!this.appliedFilters.length) {
      data.forEach((d: TableRowData) => {
        let result = true;

        for (const appliedFilter of this.appliedFilters) {
          const matchingQuickFilter: TableFilterConfig = this.matchingQuickFilter(appliedFilter);
          if (matchingQuickFilter) {
            matchingQuickFilter.isApplied = true;
            matchingQuickFilter.uuid = appliedFilter.uuid;
          }

          const fieldData = get(d, appliedFilter.field, '');
          result = appliedFilter.selectedFilterComparator.value.test(fieldData);

          if (!result) {
            d.isFiltered = true;
            d.isNotInView = !!appliedFilter.isViewFilter;
            break;
          }

          d.isFiltered = false;
          d.isNotInView = false;
        }
      });
    }

    this.filteredData.emit(data);
    this.appliedFiltersChange.emit(this.appliedFilters);
    this.cdr.markForCheck();
  }

  /**
   * Removes a filter from the appliedFilters list by comparing the filter uuids.
   *
   * @param filter The filter to remove.
   * @param filterData Flag to indicate whether or not the data should be filtered after a filter is removed; by default true.
   */
  removeFilter(filter: TableFilterComponent, filterData: boolean = true): void {
    const index: number = filter ? this.appliedFilters.findIndex((f: TableFilterComponent) => f.uuid === filter.uuid) : -1;

    if (index > -1) {
      const matchingQuickFilter: TableFilterConfig = this.matchingQuickFilter(filter);

      if (matchingQuickFilter) {
        matchingQuickFilter.isApplied = false;
      }

      this.appliedFilters = this.appliedFilters.filter((f: TableFilterComponent) => f.uuid !== filter.uuid);

      if (filterData) {
        this.filterData();
      }
    }
  }

  /**
   * Loops through all of the (visible) applied filters and removes each one.
   */
  removeAllFilters(): void {
    this.appliedFilters
      .filter((filter: TableFilterComponent) => filter.isVisible)
      .forEach((filter: TableFilterComponent) => this.removeFilter(filter));
  }

  /**
   * Generates a filter based on the provided table filter configuration.
   *
   * @param config The filter config.
   * @param isViewFilter flag to indicate whether or not a filter was added by a view.
   * @returns The generated table filter component.
   */
  generateFilter(config: TableFilterConfig, isViewFilter?: boolean): TableFilterComponent {
    const filter: TableFilterComponent = new config.filter(new UntypedFormBuilder(), this.translationService, this.translateService);

    // Loops through all the config keys and sets the filter keys to the same values
    Object.keys(config).forEach((key: string) => (filter as any)[key] = (config as any)[key]);

    // Sets the filter uuid if it exists, otherwise, generates a new uuid
    filter.uuid = config.uuid || uuidv4();

    // Sets the filter isViewFilter flag to true if the config is true, otherwise, uses the provided isViewFilter param
    filter.isViewFilter = !!(config.isViewFilter || isViewFilter);

    // First checks to see if isVisible is set; if so, use it; if not, if view filter, set to false; otherwise, set to true
    filter.isVisible = config.isVisible !== undefined ? config.isVisible : !filter.isViewFilter;

    // First checks to see if isVisible is set; if so, use it; if not, if view filter, set to false; otherwise, set to true
    filter.isVisibleInSelector = config.isVisibleInSelector !== undefined
      ? config.isVisibleInSelector
      : filter.isViewFilter ? false : true;

    // First tries to use config filterName; if undefined, generate name using field (adds spacing and uppercase)
    filter.filterName = config.filterName || this.titleCasePipe.transform(config.field?.replace(/([A-Z])/g, ' $1').trim());

    // Finds the corresponding filter from the list of provided filters and sets the valueTransformFunction
    filter.valueTransformFunction =
      config.valueTransformFunction ||
      this.filters?.toArray().find((f: TableFilterComponent) => f.field === filter.field)?.valueTransformFunction ||
      filter.valueTransformFunction;

    // Sets the selected filter comparator based on the comparatorName from the config
    filter.selectedFilterComparator.next(
      filter.filterComparators.find((comparator: FilterComparator) => comparator.name === config.comparatorName)!
    );

    // Updates the filter form value based on the form values of the config
    filter.filterForm.patchValue(config.formValues);

    return filter;
  }

  /**
   * Custom logic to keep the menu component from closing if the remove filter (x) button is clicked.
   * This is needed because the (x) button is removed right after it is clicked; the menu component's logic to detect
   * whether or not the user clicked outside of the menu falsely thinks the (x) button was not a child of the menu dialog.
   *
   * @param target The clicked element (the (x) button).
   * @returns true if the target clicked is the (x) button of an applied filter, false otherwise.
   */
  menuLogic(target: HTMLElement): boolean {
    const classList: DOMTokenList = get(target, 'parentElement.parentElement.classList');
    const containsButtonClass: boolean = classList ? classList.contains('f-table__filter-selector-remove-filter-button') : false;
    const containsItemClass: boolean = classList ? classList.contains('f-table__filter-selector-filter-list-group-item') : false;
    return containsButtonClass || containsItemClass;
  }

  /**
   * Returns a quick filter table config if it matches with the provided filter.
   *
   * @param tableFilter The table filter to be compared to all the available quick filters.
   * @returns The matching quick filter table config (if it exists).
   */
  matchingQuickFilter(tableFilter: TableFilterComponent): TableFilterConfig {
    return this.quickFilters.find((qf: TableFilterConfig) =>
      tableFilter &&
      qf.uuid === tableFilter.uuid ||
      (
        qf.comparatorName === tableFilter.selectedFilterComparator.value?.name &&
        qf.field === tableFilter.field &&
        isEqual(qf.formValues, tableFilter.filterForm.value)
      )
    )!;
  }
}
