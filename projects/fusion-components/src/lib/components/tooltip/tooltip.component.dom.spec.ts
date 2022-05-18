import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FusionUiLocation, FusionUiPosition, FusionUiPositionConfig } from '../../shared';
import * as Utilities from '../../shared/utilities';
import { TooltipComponent } from './tooltip.component';
import { TooltipComponentPageObject } from './tooltip.component.spec.po';

@Component({
  selector: 'fusion-ui-test-component',
  template: `
  <fusion-ui-tooltip
    [id]="id"
    [text]="text"
    [template]="useTemplate ? template : null"
    [element]="element"
    [position]="position"
    [classes]="classes"
  ></fusion-ui-tooltip>

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
  position: FusionUiPosition | FusionUiLocation;
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
      const position: FusionUiPositionConfig = {
        left: '10px',
        right: '10px',
        top: '10px',
        bottom: '10px',
        transform: 'translate(-50%, -50%)',
      };

      const spy = jasmine.createSpy('getElementAbsolutePositioning').and.returnValue(position);
      spyOnProperty(Utilities, 'getElementAbsolutePositioning').and.returnValue(spy);
      component.position = FusionUiPosition.LEFT;
      fixture.detectChanges();
      await fixture.whenStable();
      expect(page.tooltip.position).toEqual(position);
    });
  });

  describe('styling', () => {
    it('should apply the correct CSS classes based on the provided position', () => {
      component.position = null;
      fixture.detectChanges();
      expect(page.tooltip.classes.length).toEqual(1);
      expect(page.tooltip.classes).toContain('fusion-ui-tooltip');

      component.position = FusionUiPosition.LEFT;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('fusion-ui-tooltip--left');

      component.position = FusionUiPosition.RIGHT;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('fusion-ui-tooltip--right');

      component.position = FusionUiPosition.TOP;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('fusion-ui-tooltip--top');

      component.position = FusionUiPosition.BOTTOM;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('fusion-ui-tooltip--bottom');

      component.position = FusionUiPosition.CENTER;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('fusion-ui-tooltip--center');

      component.position = FusionUiLocation.BOTTOM_LEFT;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('fusion-ui-tooltip--bottomLeft');

      component.position = FusionUiLocation.BOTTOM_RIGHT;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('fusion-ui-tooltip--bottomRight');

      component.position = FusionUiLocation.TOP_RIGHT;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('fusion-ui-tooltip--topRight');

      component.position = FusionUiLocation.TOP_LEFT;
      fixture.detectChanges();
      expect(page.tooltip.classes).toContain('fusion-ui-tooltip--topLeft');
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
      expect(page.tooltip.tooltip.getAttribute('id')).toEqual('tooltip-id');
      expect(page.tooltip.tooltip.getAttribute('tabindex')).toEqual('0');
      expect(page.tooltip.tooltip.getAttribute('role')).toEqual('tooltip');
    });
  });
});
