import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { cloneDeep } from 'lodash';

import { BytesPipe, BytesPipeBase } from '../../pipes/bytes';
import { PipeItem } from '../../pipes/meta';
import { DomService } from '../../services/dom';
import { StatusLevel } from '../../shared';
import { LinearGaugeComponentPageObject } from './linear-gauge.component.spec.po';
import { LinearGaugeThreshold } from './linear-gauge.interface';
import { LinearGaugeModule } from './linear-gauge.module';

@Component({
  selector: 'f-test-component',
  template: `
    <body>
      <f-linear-gauge
        [value]="value"
        [maxValue]="maxValue"
        [minValue]="minValue"
        [dataFormatPipeItem]="useDataFormatPipe ? dataFormatPipe : null"
        [valueFormatPipeItem]="useValueFormatPipe ? valueFormatPipe : null"
        [thresholds]="thresholds">
      </f-linear-gauge>
    </body>
  `,
})
export class LinearGaugeTestComponent {
  readonly bytesPipe: BytesPipe = new BytesPipe();
  dataFormatPipe: PipeItem = { pipe: this.bytesPipe, values: [true, BytesPipeBase.TWO, 3] };
  valueFormatPipe: PipeItem = { pipe: this.bytesPipe, values: [true, BytesPipeBase.TWO, 2] };

  value: number;
  maxValue: number;
  minValue: number;
  useDataFormatPipe: boolean;
  useValueFormatPipe: boolean;
  thresholds: LinearGaugeThreshold[] = [];
}

describe('LinearGaugeComponent', () => {
  let component: LinearGaugeTestComponent;
  let fixture: ComponentFixture<LinearGaugeTestComponent>;
  let page: LinearGaugeComponentPageObject;

  const thresholds: LinearGaugeThreshold[] = [
    {
      title: 'Warning Title',
      value: 5,
      level: StatusLevel.WARNING,
    },
    {
      title: 'Error Title',
      value: 8,
      level: StatusLevel.ERROR,
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LinearGaugeTestComponent,
      ],
      imports: [
        LinearGaugeModule,
        NoopAnimationsModule,
      ],
      providers: [
        DomService,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(LinearGaugeTestComponent);
    component = fixture.componentInstance;
    page = new LinearGaugeComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(page.linearGauge).toBeTruthy();
  });

  describe('the bar', () => {
    it('should be the correct width % based on the min, max, and total values', () => {
      component.maxValue = 10;
      component.minValue = 0;
      for (let i = 0; i < 10; i++) {
        component.value = i;
        fixture.detectChanges();
        expect(page.linearGauge.valueBar.style.width).toEqual(`${i * 10}%`);
      }
    });

    it('should be the correct color based on level of the passed thresholds', () => {
      component.maxValue = 10;
      component.minValue = 0;

      component.thresholds = [];
      component.value = 3;
      fixture.detectChanges();
      expect(page.linearGauge.valueBar.classList).toContain('f-linear-gauge__value-bar--base');

      component.thresholds = cloneDeep(thresholds);
      component.value = 3;
      fixture.detectChanges();
      expect(page.linearGauge.valueBar.classList).toContain('f-linear-gauge__value-bar--normal');

      component.thresholds = cloneDeep(thresholds);
      component.value = 5;
      fixture.detectChanges();
      expect(page.linearGauge.valueBar.classList).toContain('f-linear-gauge__value-bar--warning');

      component.thresholds = cloneDeep(thresholds);
      component.value = 7;
      fixture.detectChanges();
      expect(page.linearGauge.valueBar.classList).toContain('f-linear-gauge__value-bar--warning');

      component.thresholds = cloneDeep(thresholds);
      component.value = 10;
      fixture.detectChanges();
      expect(page.linearGauge.valueBar.classList).toContain('f-linear-gauge__value-bar--critical');
    });
  });

  describe('the text', () => {
    it('should display the correct total and percentage values when NO pipes are provided', () => {
      component.maxValue = 10;
      component.minValue = 0;
      for (let i = 0; i < 10; i++) {
        component.value = i;
        fixture.detectChanges();
        expect(page.linearGauge.total).toEqual(`${component.maxValue}\nTotal`);
        expect(page.linearGauge.percentage).toEqual(`${component.value} (${component.value * 10}%) Used`);
      }
    });

    it('should display the correct total and percentage values when pipes are provided', () => {
      component.useDataFormatPipe = true;
      component.useValueFormatPipe = true;

      component.maxValue = 10;
      component.minValue = 0;
      for (let i = 0; i < 10; i++) {
        component.value = i;
        fixture.detectChanges();
        expect(page.linearGauge.total).toEqual(`${component.maxValue} B\nTotal`);
        expect(page.linearGauge.percentage).toEqual(`${component.value} B (${component.value * 10}%) Used`);
      }
    });
  });

  describe('thresholds', () => {
    it('should be displayed if provided', () => {
      let pageThresholds: NodeListOf<HTMLButtonElement>;

      component.maxValue = 10;
      component.minValue = 0;
      component.value = 3;

      component.thresholds = [];
      fixture.detectChanges();
      pageThresholds = page.linearGauge.thresholds;
      expect(pageThresholds).toBeTruthy();
      expect(pageThresholds.length).toEqual(0);

      component.thresholds = cloneDeep(thresholds);
      fixture.detectChanges();
      pageThresholds = page.linearGauge.thresholds;
      expect(pageThresholds).toBeTruthy();
      expect(pageThresholds.length).toEqual(2);
    });

    xit('should display tooltips when hovered over', () => {
      // TODO: Having trouble figuring trigger the hover/mouseover/mouseenter event for the tooltip to appear.
      // HCI-15575 - Need to create DOM unit tests for tooltip directive and then use findings to create this test.
    });

    xit('should display tooltips when focused', () => {
      // TODO: Having trouble figuring trigger the focus event for the tooltip to appear.
      // HCI-15575 - Need to create DOM unit tests for tooltip directive and then use findings to create this test.
    });
  });
});
