import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnumToArrayPipe } from '../../pipes/enum-to-array';
import { GetFusionUiStatusLevelTextPipe } from '../../pipes/get-fusion-ui-status-level-text';
import { FusionUiSize, FusionUiStatusLevel } from '../../shared/interfaces';
import { BadgeComponentPageObject } from './badge.component.spec.po';
import { BadgeModule } from './badge.module';

@Component({
  selector: 'fusion-ui-test-component',
  template: `
  <fusion-ui-badge
    [fillContainer]="fillContainer"
    [type]="type"
    [size]="size"
    [text]="text"
    [subText]="subText">
  </fusion-ui-badge>
  `,
})
export class BadgeTestComponent {
  type: FusionUiStatusLevel;
  size: FusionUiSize;
  text: string;
  subText: string;
  fillContainer: boolean;
}

describe('BadgeComponent', () => {
  const getFusionUiStatusLevelTextPipe: GetFusionUiStatusLevelTextPipe = new GetFusionUiStatusLevelTextPipe();
  const enumToArrayPipe: EnumToArrayPipe = new EnumToArrayPipe();

  let component: BadgeTestComponent;
  let fixture: ComponentFixture<BadgeTestComponent>;
  let page: BadgeComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BadgeTestComponent,
      ],
      imports: [
        BadgeModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeTestComponent);
    component = fixture.componentInstance;
    page = new BadgeComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(page.badge).toBeTruthy();
  });

  describe('the badge text and subtext', () => {
    it('should be displayed if provided', () => {
      component.size = FusionUiSize.MEDIUM;
      component.type = FusionUiStatusLevel.BASE;

      component.text = null;
      component.subText = null;
      fixture.detectChanges();
      expect(page.badge.badgeText).toEqual('-');
      expect(page.badge.badgeSubtext).toBeFalsy();

      component.text = 'text';
      component.subText = null;
      fixture.detectChanges();
      expect(page.badge.badgeText).toEqual('text');
      expect(page.badge.badgeSubtext).toBeFalsy();

      component.text = 'text';
      component.subText = 'subtext';
      fixture.detectChanges();
      expect(page.badge.badgeText).toEqual('text');
      expect(page.badge.badgeSubtext).toEqual('subtext');
    });
  });

  describe('the badge styling (size and type)', () => {
    it('should update the badge styling based on the provided type and size inputs', () => {
      const baseClass = 'fusion-ui-badge';

      component.type = null;
      component.size = null;
      fixture.detectChanges();
      expect(page.badge.badge.classList).toContain(baseClass);
      expect(page.badge.badge.classList).toContain(`${baseClass}--`);

      enumToArrayPipe.transform(FusionUiStatusLevel).forEach((value: number) => {
        const levelString: string = getFusionUiStatusLevelTextPipe.transform(value, null, true);
        component.type = value;
        component.size = null;
        fixture.detectChanges();
        expect(page.badge.badge.classList).toContain(baseClass);
        expect(page.badge.badge.classList).toContain(`${baseClass}--${levelString}`);
        expect(page.badge.badge.classList).toContain(`${baseClass}--`);
      });

      enumToArrayPipe.transform(FusionUiSize).forEach((value: string) => {
        component.type = null;
        component.size = value as FusionUiSize;
        fixture.detectChanges();
        expect(page.badge.badge.classList).toContain(baseClass);
        expect(page.badge.badge.classList).toContain(`${baseClass}--${value}`);
        expect(page.badge.badge.classList).toContain(`${baseClass}--`);
      });

      component.type = FusionUiStatusLevel.BASE;
      component.size = FusionUiSize.SMALL;
      fixture.detectChanges();
      expect(page.badge.badge.classList).toContain(baseClass);
      expect(page.badge.badge.classList).toContain(`${baseClass}--base`);
      expect(page.badge.badge.classList).toContain(`${baseClass}--small`);
    });

    it('should append fusion-ui-badge__wrapper classes to the host element', () => {
      const baseClass = 'fusion-ui-badge__wrapper';

      component.fillContainer = null;
      fixture.detectChanges();
      expect(page.badge.host.classList).toContain(baseClass);
      expect(page.badge.host.classList).not.toContain(`${baseClass}-fill-container`);
    });
  });
});
