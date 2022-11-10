import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { PercentMapPipe } from '../../pipes/percent-map';
import { Size } from '../../shared';
import { ProgressBarStatus } from './progress-bar.interface';

/**
 * PROGRESS BAR COMPONENT
 *
 * The progress bar component creates a progress bar that represents the progress of a an event. Takes in a value, min value,
 * and max value to be used with the PercentMapPipe to map the value to a percentage value (0 - 100). It automatically generates
 * some simple statuses based on the calculated progress. Otherwise the provided status is used.
 */
@Component({
  selector: 'f-progress-bar',
  template: `
<div
  class="f-progress-bar"
  role="progressbar"
  [attr.aria-valuenow]="resultingValue$.value"
  [attr.aria-valuemin]="0"
  [attr.aria-valuetext]="ariaValueText || (resultingValue$.value + '% : ' + resultingStatus$.value)"
  [attr.aria-valuemax]="100">
  <div
    [ngStyle]="{ width: resultingValue$.value + '%' }"
    [ngClass]="generatedClasses">
    <div
      class="f-progress-bar__value"
      *ngIf="isValueDisplayed && ((resultingValue$ | async) > minDisplayedPercent)">
      {{ displayText || (resultingValue$.value ? resultingValue$.value + '%' : '-') }}
    </div>
  </div>
</div>`,
})

export class ProgressBarComponent implements OnInit, OnChanges {
  readonly percentMapPipe: PercentMapPipe = new PercentMapPipe();

  resultingValue$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  resultingStatus$: BehaviorSubject<ProgressBarStatus> = new BehaviorSubject<ProgressBarStatus>(undefined as unknown as ProgressBarStatus);
  generatedClasses: string[] = [];

  /**
   * Determines the value to be used to calculate the value to be displayed in the progress bar.
   * Used in the PercentMapPipe.
   **/
  @Input() value: number;

  /**
   * Determines the minimum value to be used to calculate the value to be displayed in the progress bar.
   * Used as the minValue in the PercentMapPipe.
   * By default set to 0.
   **/
  @Input() minValue: number = 0;

  /**
   * Determines the maximum value to be used to calculate the value to be displayed in the progress bar.
   * Used as the maxValue in the PercentMapPipe.
   * By default set to 100.
   **/
  @Input() maxValue: number = 100;

  /**
   * Determines whether or not resultingValue or displayText is displayed in the progress bar.
   * By default set to true.
   **/
  @Input() isValueDisplayed: boolean = true;

  /**
   * Determines the minimum value needed for the resultingValue value is displayed.
   * By default set to true.
   **/
  @Input() minDisplayedPercent: number = 5;

  /**
   * Determines the progress bar size. By default set to MEDIUM. Does NOT support X_SMALL.
   **/
  @Input() size: Size = Size.MEDIUM;

  /**
   * Determines the state of the progress bar, which affects the styling.
   * By default set to IN PROGRESS.
   **/
  @Input() status: ProgressBarStatus;

  /**
   * Determines the the text to display inside the progress bar.
   * If set, hides the resultingValue and displays this value in its stead.
   **/
  @Input() displayText: string | number | undefined;

  /**
   * Determines the custom CSS classes to append the 'f-progress-bar__bar' div element.
   */
  @Input() classes: string[] = [];

  /**
   * Determines the 'aria-value-text' value.
   */
  @Input() ariaValueText: string | number | undefined;

  /**
   * On component initialization, subscribe to the resulting value so that when it changes,
   * calculate the resultingStatus based on the new resultingValue.
   */
  ngOnInit(): void {
    this.resultingValue$.subscribe(() => this.calculateResultingStatus());
  }

  /**
   * When provided inputs change, either update the resultingValue or resultingStatus based on the
   * newly updated input(s).
   *
   * @param c the changed input{}
   */
  ngOnChanges(c: SimpleChanges): void {
    if (c['size'] || c['classes']) {
      this.generateClasses();
    }

    if (c['value'] || c['minValue'] || c['maxValue']) {
      this.calculateResultingValue();
    }

    if (c['status']) {
      this.calculateResultingStatus();
    }
  }

  /**
   * Update the resultingValue based on the output of the percentMapPipe.
   */
  calculateResultingValue(): void {
    this.resultingValue$.next(this.percentMapPipe.transform(this.value, this.maxValue, this.minValue));
  }

  /**
   * Update the resultingStatus based on the provided status and resultingValue.
   */
  calculateResultingStatus(): void {
    if (this.status) {
      this.resultingStatus$.next(this.status);
    } else {
      const resultingValue: number = this.resultingValue$.value;
      if (resultingValue === 0) {
        this.resultingStatus$.next(ProgressBarStatus.NOT_STARTED);
      } else if (resultingValue < 100) {
        this.resultingStatus$.next(ProgressBarStatus.IN_PROGRESS);
      } else {
        this.resultingStatus$.next(ProgressBarStatus.SUCCESS);
      }
    }

    this.generateClasses();
  }

  /**
   * Generates the CSS classes to be appended to the 'f-progress-bar__bar' element.
   */
  generateClasses(): void {
    const classes: string[] = ['f-progress-bar__bar'];

    if (!!this.size) {
      classes.push(`f-progress-bar__bar--${this.size}`);
    }

    if (!!this.resultingStatus$.value) {
      classes.push(`f-progress-bar__bar--${this.resultingStatus$.value}`);
    }

    classes.push(...this.classes);

    this.generatedClasses = classes;
  }
}
