import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { PipeItem } from '@fusion-ui/fusion-components/lib/pipes';
import { FusionUiStatusLevel } from '@fusion-ui/fusion-components/lib/shared';
import { DEFAULT_LINEAR_GAUGE_TRANSLATIONS, LinearGaugeState, LinearGaugeThreshold, LinearGaugeTranslations } from './linear-gauge.interface';

/**
 * LINEAR GAUGE COMPONENT
 *
 * The Linear Gauge component provides a consistent way to display the relationship between data and the state
 * of something.
 */
@Component({
  selector: 'fusion-ui-linear-gauge',
  templateUrl: './linear-gauge.component.html',
})
export class LinearGaugeComponent implements OnChanges {
  readonly FusionUiStatusLevel = FusionUiStatusLevel;

  private _level: FusionUiStatusLevel = FusionUiStatusLevel.BASE;
  get level(): FusionUiStatusLevel {
    return this._level;
  }

  /**
   * Allows the addition of custom CSS classes to the inner linear-gauge element.
   */
  @Input() classes: string[];

  /**
   * Determines the current value of the linear gauge.
   * This value SHOULD be greater than the minValue and less than the maxValue.
   */
  @Input() value: number;

  /**
   * Determines the lowest/ minimum value of the linear gauge.
   */
  @Input() minValue: number = 0;

  /**
   * Determines the highest/ maximum value of the linear gauge.
   * If the value surpases this maximum value, the bar turns red.
   */
  @Input() maxValue: number;

  /**
   * Determines the "static" text to be displayed:
   *  - for each of the threshold levels
   *  - for the linear gauge header/ title
   */
  @Input() translations: LinearGaugeTranslations = DEFAULT_LINEAR_GAUGE_TRANSLATIONS;

  /**
   * Determines the thresholds of the gauge. These determine the level/ color/ styling based on the value.
   * Recommendation is to only use WARNING, ERROR, and CRITICAL levels (BASE and NORMAL not fully supported).
   */
  @Input() thresholds: LinearGaugeThreshold[] = [];

  /**
   * Determines the pipe to be used to format the data.
   */
  @Input() dataFormatPipeItem: PipeItem;

  /**
   * Determines the pipe to be used to format the value.
   */
  @Input() valueFormatPipeItem: PipeItem;

  /**
   * Emits the current state fo the linear gauge (values, thresholds, etc).
   */
  @Output() linearGaugeChanged: EventEmitter<LinearGaugeState> = new EventEmitter<LinearGaugeState>();

  /**
   * When any inputs change, recalculate the level and emit an event.
   */
  ngOnChanges(): void {
    this._level = this.calculateLevel();
    this.linearGaugeChanged.emit(this.generateLinearGaugeState());
  }

  /**
   * Calculates the current level of the gauge based on what threshold(s) the value has passed.
   * If there are no thresholds, the level is BASE (blue).
   * If the the current value is greater than the max value, the level is CRITICAL (red).
   * Otherwise, use the last passed (greatest threshold value below the current value) to calculate the level.
   */
  calculateLevel(): number {
    if (!this.thresholds || !this.thresholds.length) {
      return FusionUiStatusLevel.BASE;
    }

    if (this.value >= this.maxValue) {
      return FusionUiStatusLevel.CRITICAL;
    }

    const crossedThresholds: FusionUiStatusLevel[] = this.thresholds
      .filter((threshold: LinearGaugeThreshold) => threshold.passed = threshold.value <= this.value)
      .sort((threshold: LinearGaugeThreshold) => threshold.level)
      .map((threshold: LinearGaugeThreshold) => threshold.level);
    const largestThresholdLevelPassed: FusionUiStatusLevel = Math.max.apply(Math, crossedThresholds);

    return largestThresholdLevelPassed >= 0 ? largestThresholdLevelPassed : FusionUiStatusLevel.NORMAL;
  }

  /**
   * Generates and returns the current state of the linear gauge.
   *
   * @returns The current state of the linear gauge.
   */
  generateLinearGaugeState(): LinearGaugeState {
    return {
      value: this.value,
      maxValue: this.maxValue,
      minValue: this.minValue,
      thresholds: this.thresholds,
      translations: this.translations,
    };
  }
}
