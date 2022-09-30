import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { TranslatedComponent } from '@fusion-components/lib/shared';

import { FilterComparator, FilterComparatorTranslations } from './table-filter-comparator.interface';

/**
 * TABLE FILTER COMPARATOR COMPONENT
 *
 * The table filter input comparator component is to be used with any table filters to simplify the logic
 * select and use the correct comparator for a given filter.
 */
@Component({
  selector: 'f-table-filter-comparator',
  templateUrl: './table-filter-comparator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterComparatorComponent extends TranslatedComponent implements OnInit {
  readonly Observable = Observable;

  selectedComparator: UntypedFormControl = new UntypedFormControl(null, Validators.required);

  /**
   * Determines the comparators to use with a filter.
   * By default will select the first one (if it exists).
   */
  private _comparators: FilterComparator[] = [];
  @Input()
  set comparators(comparators: FilterComparator[]) {
    this._comparators = comparators || this._comparators;
    if (this.comparators && !!this.comparators.length) {
      this.selectedComparator.setValue(this.comparators[0]);
      this.comparatorChange.emit(this.selectedComparator.value);
    }
  }
  get comparators(): FilterComparator[] {
    return this._comparators;
  }

  /**
   * Determines the translations used for any static text.
   */
  @Input() translations: FilterComparatorTranslations | undefined;

  /**
   * When the comparator changes, emit which comparator was selected.
   */
  @Output() comparatorChange: EventEmitter<FilterComparator> = new EventEmitter<FilterComparator>();

  /**
   * On component initialization, create a subscription that listens to when the selected comparator changes.
   * When the selected comparator changes, emit an event with the selected comparator as the value.
   */
  ngOnInit(): void {
    this.selectedComparator.valueChanges.subscribe((comparator: FilterComparator) => this.comparatorChange.emit(comparator));
  }
}
