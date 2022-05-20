import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnumToArrayPipe } from '../../pipes/enum-to-array';
import { GetStatusLevelTextPipe } from '../../pipes/get-status-level-text';
import { Size, StatusLevel } from '../../shared/interfaces';
import { BadgeComponentPageObject } from './badge.component.spec.po';
import { BadgeModule } from './badge.module';

@Component({
  selector: 'f-test-component',
  template: `
  <f-badge
    [fillContainer]="fillContainer"
    [type]="type"
    [size]="size"
    [text]="text"
    [subText]="subText">
  </f-badge>
  `,
})
export class BadgeTestComponent {
  type: StatusLevel;
  size: Size;
  text: string;
  subText: string;
  fillContainer: boolean;
}

describe('BadgeComponent', () => {
  const getStatusLevelTextPipe: GetStatusLevelTextPipe = new GetStatusLevelTextPipe();
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
      component.size = Size.MEDIUM;
      component.type = StatusLevel.BASE;

      component.text = null!;
      component.subText = null!;
      fixture.detectChanges();
      expect(page.badge.badgeText).toEqual('-');
      expect(page.badge.badgeSubtext).toBeFalsy();

      component.text = 'text';
      component.subText = null!;
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
      const baseClass = 'f-badge';

      component.type = null!;
      component.size = null!;
      fixture.detectChanges();
      expect(page.badge.badge.classList).toContain(baseClass);
      expect(page.badge.badge.classList).toContain(`${baseClass}--`);

      enumToArrayPipe.transform(StatusLevel).forEach((value: string | number) => {
        const levelString: string = getStatusLevelTextPipe.transform(Number(value), undefined, true);
        component.type = Number(value);
        component.size = null!;
        fixture.detectChanges();
        expect(page.badge.badge.classList).toContain(baseClass);
        expect(page.badge.badge.classList).toContain(`${baseClass}--${levelString}`);
        expect(page.badge.badge.classList).toContain(`${baseClass}--`);
      });

      enumToArrayPipe.transform(Size).forEach((value: string | number) => {
        component.type = null!;
        component.size = value as Size;
        fixture.detectChanges();
        expect(page.badge.badge.classList).toContain(baseClass);
        expect(page.badge.badge.classList).toContain(`${baseClass}--${value}`);
        expect(page.badge.badge.classList).toContain(`${baseClass}--`);
      });

      component.type = StatusLevel.BASE;
      component.size = Size.SMALL;
      fixture.detectChanges();
      expect(page.badge.badge.classList).toContain(baseClass);
      expect(page.badge.badge.classList).toContain(`${baseClass}--base`);
      expect(page.badge.badge.classList).toContain(`${baseClass}--small`);
    });

    it('should append f-badge__wrapper classes to the host element', () => {
      const baseClass = 'f-badge__wrapper';

      component.fillContainer = null!;
      fixture.detectChanges();
      expect(page.badge.host.classList).toContain(baseClass);
      expect(page.badge.host.classList).not.toContain(`${baseClass}-fill-container`);
    });
  });
});
