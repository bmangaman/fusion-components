import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NgControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { v4 as uuidv4 } from 'uuid';

import { DocumentClickService } from '../../services/document-click';

import { DEFAULT_SELECT_TRANSLATIONS, SelectOption, SelectTranslations } from './select.interface';

/**
 * SELECT COMPONENT
 */
@Component({
  selector: 'f-select',
  templateUrl: './select.component.html',
})
export class SelectComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private onChange: (...args: unknown[]) => void;
  private onTouched: () => void;

  private readonly _optionHeight = 36;
  get optionHeight(): number {
    return this._optionHeight;
  }

  private _unsubscribe$: Subject<void> = new Subject<void>();
  private _currentOptionIndex: number;

  selectClasses: string[] = [];
  isDropdownOpen: boolean;
  menuMinHeight: number = 36;

  searchInputControl: UntypedFormControl;
  filteredOptions: SelectOption[] = [];

  /**
   * Keeps track of the disabled state of the select input.
   * Affects the styling of and available interactions with the component.
   */
  private _isDisabled: boolean;
  set isDisabled(isDisabled: boolean) {
    this._isDisabled = isDisabled;
    this.isDisabled ? this.searchInputControl.disable() : this.searchInputControl.enable();
  } 
  get isDisabled(): boolean {
    return this._isDisabled;
  }

  /**
   * Holds the current value of the select input.
   */
  private _value: SelectOption | undefined;
  set value(value: SelectOption | undefined) {
    this.setValue(value);
  }
  get value(): SelectOption | undefined {
    return this._value;
  }

  get control(): NgControl | undefined {
    return this._control;
  }

  /**
   * Determines the uuid for the component. Is applied to the label and button elements.
   */
  private _uuid: string = uuidv4();
  @Input()
  set uuid(id: string) {
    this._uuid = id || this._uuid;
  }
  get uuid(): string {
    return this._uuid;
  }

  /**
   * Determines the list of available options that can be displayed in the dropdown.
   * Updates the min height of the dropdown menu.
   */
  private _options: SelectOption[] = [];
  @Input()
  set options(options: SelectOption[]) {
    this._options = [ { label: this.defaultLabel, value: null }, ...options ];
    if (this.isSearchable) {
      this.filterOptions();
    }
    this.setDropdownMinHeight();
  }
  get options(): SelectOption[] {
    return this._options;
  }

  /**
   * Allows the addition of custom CSS classes to the select element.
   */
  private _cssClasses: string[] = [];
  @Input()
  set cssClasses(classes: string[]) {
    this._cssClasses = classes;
    this.generateSelectClasses();
  }
  get cssClasses(): string[] {
    return this._cssClasses;
  }

  /**
   * Determines whether or not the select input has a search input.
   * Sets the input value to the label of the selected 
   */
  private _isSearchable: boolean = false;
  @Input()
  set isSearchable(isSearchable: boolean) {
    this._isSearchable = isSearchable;
    this.searchInputControl?.setValue(this.value?.label);
    this.filterOptions(this.value?.label);
  }
  get isSearchable(): boolean {
    return this._isSearchable;
  }

  /**
   * Determines the label to display above the select input.
   */
  @Input()
  label: string | Observable<string>;

  /**
   * Determines the "static" text used in the select component.
   */
  @Input()
  translations: SelectTranslations = DEFAULT_SELECT_TRANSLATIONS;

  /**
   * Determines the default label for an empty/ null selection.
   */
  @Input()
  defaultLabel: string = this.translations.defaultLabel;

  /**
   * Emits the complete list of filtered options.
   */
  @Output()
  currentOptions: EventEmitter<SelectOption[]> = new EventEmitter<SelectOption[]>();

  /**
   * If the escape key is pressed while the dropdown menu is open, close it.
   */
  @HostListener('document:keydown.escape', ['$event']) onEscapeKeydown(): void {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  /**
   * The outermost wrapping div of the component.
   * Used to verify if the a click is outside of the component (to close the dropdown).
   */
  @ViewChild('selectInput', { static: true }) selectInput: ElementRef;

  /**
   * The cdk virtual scroll viewport for the dropdown menu.
   * Used to automatically scroll to the selected option.
   */
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

  constructor(
    private _control: NgControl,
    private _documentClickService: DocumentClickService,
  ) {
    this._control.valueAccessor = this;
    this.searchInputControl = new UntypedFormControl();
  }

  /**
   * On component initialization:
   *  - generate the select classes
   *  - set the dropdown min height
   *  - create a subscription to close the dropdown when anything other than component is clicked
   *  - filter options for searchable select input
   *  - create a subscription to filter the options whenever the search input value is updated
   */
  ngOnInit(): void {
    this.generateSelectClasses();
    this.setDropdownMinHeight();
    this.createCloseSelectSubscription();

    this.filterOptions();
    this.searchInputControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this._unsubscribe$))
      .subscribe((value: string) => this.filterOptions(value));
  }

  /**
   * On component teardown:
   *  - next and complete the unsubscribe Subject co clean up any active subscriptions
   */
  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  /**
   * Filters the provided options based on the provided search term.
   * If isSearchable is false or no search term, set filteredOptions to the provided options.
   * Otherwise:
   *  1. Filter the select options based by both their value and label.
   *  2. If there are no results, set the value to false.
   *  3. Make sure the menu of options is open.
   * After everything, make sure to update the dropdown min height based on the number of results.
   *
   * @param searchTerm The value of the input; used to filter the options.
   */
  filterOptions(searchTerm?: string): void {
    if (this.isSearchable && searchTerm) {
      this.filteredOptions = this.options?.filter((option: SelectOption) => {
        const isInLabel: boolean = option.label.includes(searchTerm);
        const isInValue: boolean = typeof option.value === 'string' ? option.value.includes(searchTerm) : searchTerm === option.value;
        return isInLabel || isInValue;
      }) || [];

      if (!this.filteredOptions.length) {
        this.setValue(undefined!, false);
      }
    } else {
      this.filteredOptions = this.options;
    }

    this.currentOptions.emit(this.filteredOptions);
    this.setDropdownMinHeight();
  }

  /**
   * Sets the value based on the provided value.
   * If onChange and onTouched functions are defined, call them.
   * Close the dropdown and set the search input value if the provided boolean is true.
   *
   * @param value The new value.
   * @param setSearchInputControlValue By default true. If set to false, do NOT update the search input value.
   */
  setValue(value: SelectOption | undefined, setSearchInputControlValue: boolean = true): void {
    this._value = value;

    if (this.onChange) {
      this.onChange(this.value);
      
      if (setSearchInputControlValue) {
        this.isDropdownOpen = false;
        this.searchInputControl?.setValue(this.value?.label);
      }
    }

    if (this.onTouched) {
      setTimeout(() => this.onTouched());
    }
  }

  /**
   * Wrapper around the setValue function to be used in the template to prevent the mouse click, enter, and space event's default behavior.
   *
   * @param event The mouse event (enter or space).
   * @param value The new value.
   */
  templateSetValueWrapper(event: Event, value: SelectOption, index: number): void {
    event.preventDefault();
    this._currentOptionIndex = index;
    this.setValue(value);
  }

  /**
   * Function required to implement the ControlValueAccessor interface.
   *
   * Writes a new value to the element.
   * This method is called by the forms API to write to the view when programmatic
   * changes from model to view are requested.
   *
   * @param value The new value for the element.
   */
  writeValue(value: SelectOption): void {
    this.value = value;
  }

  /**
   * Function required to implement the ControlValueAccessor interface.
   *
   * Registers a callback function that is called when the control's value
   * changes in the UI.
   * This method is called by the forms API on initialization to update the form
   * model when values propagate from the view to the model.
   */
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  /**
   * Function required to implement the ControlValueAccessor interface.
   *
   * Registers a callback function is called by the forms API on initialization
   * to update the form model on blur.
   * When implementing `registerOnTouched` in your own value accessor, save the given
   * function so your class calls it when the control should be considered
   * blurred or "touched".
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Function from the ControlValueAccessor interface.
   *
   * Function that is called by the forms API when the control status changes to
   * or from 'DISABLED'. Depending on the status, it enables or disables the
   * appropriate DOM element.
   * 
   * @param isDisabled The new isDisabled flag value.
   */
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.generateSelectClasses();
  }

  /**
   * Sets the min height of the dropdown based on the number of provided options.
   * The max height is eight (8) options (36 * 8 = 288), the min height is 36px.
   */
  setDropdownMinHeight(): void {
    const minNumberOfElements: number = Math.min(this.isSearchable ? this.filteredOptions.length : this.options.length, 8);
    this.menuMinHeight = Math.max(minNumberOfElements * this._optionHeight, this._optionHeight);
  }

  /**
   * Toggles the dropdown visibility by updating the isDropdownOpen flag based on the current
   * state of the dropdown.
   * If the dropdown is open, scroll to the selected option index.
   */
  toggleDropdown(): void {
    this.isDropdownOpen = this.isDisabled ? false : !this.isDropdownOpen;

    if (this.isDropdownOpen) {
      // setTimeout is used to make sure the dropdown menu (and thus the viewPort) is in the DOM
      setTimeout(() => this.viewPort?.scrollToIndex(this._currentOptionIndex, 'smooth'));
    }
  }

  /**
   * Sets the input to touched when it is blurred/ touched.
   */
  onBlur(): void {
    setTimeout(() => this.onTouched());
  }

  /**
   * On (search) input enter, filters the options and auto selects the first option.
   */
  onEnter(): void {
    this.filterOptions(this.searchInputControl.value);
    const notDisabledOptions: SelectOption[] = this.filteredOptions.filter((option: SelectOption) => !option.isDisabled);

    if (!!notDisabledOptions.length) {
      this.setValue(notDisabledOptions[0]);
    }
  }

  /**
   * When the dropdown is open and an option is focused, when the down or up arrows are pressed,
   * focus on either the next or previous next non-disabled option.
   *
   * @param event The up or down keyboard event.
   */
  onArrowPress(event: Event, arrow: 'UP' | 'DOWN'): void {
    if (event) {
      event.preventDefault();

      if (event.target) {
        let stopWhileLoop = false;
        let sibling: any = event.target;
    
        while (!stopWhileLoop && sibling) {
          sibling = arrow === 'UP' ? sibling.previousSibling : sibling.nextSibling;
  
          if (!sibling || !sibling.getAttribute) {
            stopWhileLoop = true;
          } else if (!sibling.getAttribute('disabled')) {
            stopWhileLoop = true;
            sibling.focus();
          }
        }
      }
    }
  }

  /**
   * Creates a subscription to the documentClickService to check if the user 'clicks' outside of the menu component.
   * If the click is NOT a child of the menu component, close the menu dialog.
   */
  createCloseSelectSubscription(): void {
    this._documentClickService.documentClickedTarget$.pipe(takeUntil(this._unsubscribe$)).subscribe((target: HTMLElement) => {
      if (!this.selectInput?.nativeElement.contains(target)) {
        this.isDropdownOpen = false;
        this.searchInputControl.setValue(this.value?.label);
      }
    })
  }

  /**
   * Generates button CSS classes based on the provided inputs and sets selectClasses.
   */
  generateSelectClasses(): void {
    const classes: string[] = ['f-select__classes-wrapper', 'f-form__input-wrapper', 'f-form__select-wrapper'];

    if (!!this.isDisabled) {
      classes.push('f-form__input--disabled');
    }

    classes.push(...this.cssClasses);

    this.selectClasses = classes;
  }

  /**
   * Function to help make the loop to display all the options more performant.
   *
   * @param index The index of the option.
   * @returns The index of the option.
   */
  trackByFn(index: number): number {
    return index;
  }
}
