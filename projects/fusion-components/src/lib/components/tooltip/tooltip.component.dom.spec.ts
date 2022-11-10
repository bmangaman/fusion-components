import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Location, Position, PositionConfig } from '../../shared';
import { Utilities } from '../../shared/utilities';
import { TooltipComponent } from './tooltip.component';
import { TooltipComponentPageObject } from './tooltip.component.spec.po';

@Component({
  selector: 'f-test-component',
  template: `
  <f-tooltip
    [id]="id"
    [text]="text"
    [template]="useTemplate ? template : null"
    [element]="element"
    [position]="position"
    [classes]="classes"
  ></f-tooltip>

  <div #element></div>

  <ng-template #template>Custom Template Text</ng-template>
  `,
})
export class TooltipTestComponent {
  @ViewChild('element', { read: ElementRef }) element !: ElementRef;
  @ViewChild('template') template !: TemplateRef<any>;

  id: string;
  text: string;
  useTemplate: boolean;
  position: Position | Location;
  classes: string[];
}

describe('TooltipComponent', () => {
  let component: TooltipTestComponent;
  let fixture: ComponentFixture<TooltipTestComponent>;
  let page: TooltipComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TooltipComponent,
        TooltipTestComponent,
      ],
      imports: [
        NoopAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipTestComponent);
    component = fixture.componentInstance;
    page = new TooltipComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(page.tooltip.tooltip).toBeTruthy();
  });

  describe('content', () => {
    it('should display plain text if no template is provided', () => {
      component.text = 'Tooltip Text';
      fixture.detectChanges();
      expect(page.tooltip.contentContainer).toBeTruthy();
      expect(page.tooltip.text).toEqual('Tooltip Text');
    });

    it('should display the custom template if provided', () => {
      component.text = 'Tooltip Text';
      component.useTemplate = true;
      fixture.detectChanges();
      expect(page.tooltip.contentContainer).toBeTruthy();
      expect(page.tooltip.text).toEqual('Custom Template Text');
    });
  });

  describe('positioning', () => {
    it('should update the left, right, top, bottom, and transform CSS styles when the position @Input changes', async () => {
      const position: PositionConfig = {
        left: '10px',
        right: '10px',
        top: '10px',
        bottom: '10px',
        transform: 'translate(-50%, -50%)',
      };

      spyOn(Utilities, 'getElementAbsolutePositioning').and.returnValue(position);
      component.position = Position.LEFT;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(page.tooltip.position).toEqual(position);
    });
  });

  describe('styling', () => {
    it('should apply the correct CSS classes based on the provided position', () => {
      component.position = null as any;
      fixture.detectChanges();
      expect(page.tooltip.classes?.length).toEqual(1);
      expect(page.tooltip.classes).toContain('f-tooltip');

      component.position = Position.LEFT;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('f-tooltip--left');

      component.position = Position.RIGHT;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('f-tooltip--right');

      component.position = Position.TOP;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('f-tooltip--top');

      component.position = Position.BOTTOM;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('f-tooltip--bottom');

      component.position = Position.CENTER;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('f-tooltip--center');

      component.position = Location.BOTTOM_LEFT;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('f-tooltip--bottomLeft');

      component.position = Location.BOTTOM_RIGHT;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('f-tooltip--bottomRight');

      component.position = Location.TOP_RIGHT;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('f-tooltip--topRight');

      component.position = Location.TOP_LEFT;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('f-tooltip--topLeft');
    });

    it('should apply the correct CSS classes based on the provided custom classes', () => {
      component.classes = ['custom-class-1', 'custom-class-2'];
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('custom-class-1');
      expect(page.tooltip.classes).toContain('custom-class-2');
    });
  });

  describe('accessibility', () => {
    it('should append the role, id, and tabindex attributes', () => {
      component.id = 'tooltip-id';
      fixture.detectChanges();
      expect(page.tooltip.tooltip?.getAttribute('id')).toEqual('tooltip-id');
      expect(page.tooltip.tooltip?.getAttribute('tabindex')).toEqual('0');
      expect(page.tooltip.tooltip?.getAttribute('role')).toEqual('tooltip');
    });
  });
});
