import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Size, State } from '@fusion-components/lib/shared';

import { ButtonComponentPageObject } from './button.component.spec.po';
import { ButtonAria, ButtonInputType, ButtonType } from './button.interface';
import { ButtonModule } from './button.module';

@Component({
  selector: 'f-test-component',
  template: `
    <f-button
      [type]="type"
      [inputType]="inputType"
      [size]="size"
      [icon]="icon"
      [state]="state"
      [isDisabled]="isDisabled"
      [isAutofocused]="isAutofocused"
      [isSelected]="isSelected"
      [opensMenu]="opensMenu"
      [classes]="classes"
      [aria]="aria"
      [noBorder]="noBorder"
      [fullWidth]="fullWidth"
      [text]="text"
      (buttonClick)="buttonClick()">
    </f-button>
  `,
})
export class ButtonTestComponent {
  type: ButtonType;
  inputType: ButtonInputType;
  size: Size;
  icon: string;
  state: State;
  isDisabled: boolean;
  isAutofocused: boolean;
  isSelected: boolean;
  opensMenu: boolean;
  classes: string[];
  aria: ButtonAria;
  noBorder: boolean;
  fullWidth: boolean;
  text: string;

  buttonClick(): void {}
}

describe('ButtonComponent', () => {
  const fusionUiPrefix = 'f-button';

  let component: ButtonTestComponent;
  let fixture: ComponentFixture<ButtonTestComponent>;
  let page: ButtonComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ButtonTestComponent,
      ],
      imports: [
        ButtonModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ButtonTestComponent);
    component = fixture.componentInstance;
    page = new ButtonComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(page.button).toBeTruthy();
  });

  describe('classes and styling', () => {
    it('should have a default class', () => {
      expect(page.button.classes).toContain(fusionUiPrefix);
    });

    it('should append classes based on the provided type', () => {
      component.size = null!;
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--primary`);
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--secondary`);

      component.type = ButtonType.PRIMARY;
      fixture.detectChanges();
      expect(page.button.classes).toContain(`${fusionUiPrefix}--primary`);

      component.type = ButtonType.SECONDARY;
      fixture.detectChanges();
      expect(page.button.classes).toContain(`${fusionUiPrefix}--secondary`);
    });

    it('should append classes based on the provided size', () => {
      component.size = null!;
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--xSmall`);
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--small`);
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--large`);

      component.size = Size.X_SMALL;
      fixture.detectChanges();
      expect(page.button.classes).toContain(`${fusionUiPrefix}--xSmall`);

      component.size = Size.SMALL;
      fixture.detectChanges();
      expect(page.button.classes).toContain(`${fusionUiPrefix}--small`);

      component.size = Size.LARGE;
      fixture.detectChanges();
      expect(page.button.classes).toContain(`${fusionUiPrefix}--large`);

      component.size = Size.MEDIUM;
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--xSmll`);
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--small`);
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--large`);
    });

    it('should append classes based on the provided state', () => {
      component.state = null!;
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--loaded`);
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--loading`);

      component.state = State.LOADED;
      fixture.detectChanges();
      expect(page.button.classes).toContain(`${fusionUiPrefix}--loaded`);

      component.state = State.LOADING;
      fixture.detectChanges();
      expect(page.button.classes).toContain(`${fusionUiPrefix}--loading`);
      expect(page.button.classes).toContain(`${fusionUiPrefix}--disabled`);
    });

    it('should append classes if the button isSelected', () => {
      component.isSelected = null!;
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--selected`);

      component.isSelected = false;
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--selected`);

      component.isSelected = true;
      fixture.detectChanges();
      expect(page.button.classes).toContain(`${fusionUiPrefix}--selected`);
    });

    it('should append classes if the button isDisabled', () => {
      component.isDisabled = null!;
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--disabled`);

      component.isDisabled = false;
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--disabled`);

      component.isDisabled = true;
      fixture.detectChanges();
      expect(page.button.classes).toContain(`${fusionUiPrefix}--disabled`);
    });

    it('should append classes if the button has noBorder', () => {
      component.noBorder = null!;
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--noBorder`);

      component.noBorder = false;
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--noBorder`);

      component.noBorder = true;
      fixture.detectChanges();
      expect(page.button.classes).toContain(`${fusionUiPrefix}--noBorder`);
    });

    it('should append classes if the button has fullWidth', () => {
      component.fullWidth = null!;
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--full-width`);

      component.fullWidth = false;
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--full-width`);

      component.fullWidth = true;
      fixture.detectChanges();
      expect(page.button.classes).toContain(`${fusionUiPrefix}--full-width`);
    });

    it('should append classes if text or icon is provided', () => {
      component.icon = null!;
      component.text = null!;
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--icon`);
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--text`);

      component.icon = 'mdi-content-copy';
      component.text = null!;
      fixture.detectChanges();
      expect(page.button.classes).toContain(`${fusionUiPrefix}--icon`);
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--text`);

      component.icon = 'mdi-content-copy';
      component.text = 'button text';
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--icon`);
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--text`);

      component.icon = null!;
      component.text = 'button text';
      fixture.detectChanges();
      expect(page.button.classes).not.toContain(`${fusionUiPrefix}--icon`);
      expect(page.button.classes).toContain(`${fusionUiPrefix}--text`);
    });

    it('should append all classes provided', () => {
      component.classes = null!;
      fixture.detectChanges();
      expect(page.button.classes.length).toEqual(1);

      component.classes = ['custom-class-1'];
      fixture.detectChanges();
      expect(page.button.classes.length).toEqual(2);
      expect(page.button.classes).toContain('custom-class-1');

      component.classes = ['custom-class-1', 'custom-class-2'];
      fixture.detectChanges();
      expect(page.button.classes.length).toEqual(3);
      expect(page.button.classes).toContain('custom-class-1', 'custom-class-2');
    });
  });

  describe('button state', () => {
    it('should be disabled if isDisabled is true', () => {
      component.isDisabled = null!;
      fixture.detectChanges();
      expect(page.button.button.disabled).toBeFalsy();
      expect(page.button.button.getAttribute('aria-disabled')).toEqual('false');

      component.isDisabled = false;
      fixture.detectChanges();
      expect(page.button.button.disabled).toBeFalsy();
      expect(page.button.button.getAttribute('aria-disabled')).toEqual('false');

      component.isDisabled = true;
      fixture.detectChanges();
      expect(page.button.button.disabled).toBeTruthy();
      expect(page.button.button.getAttribute('aria-disabled')).toEqual('true');
    });

    it('should display the button content if state === LOADED', () => {
      component.text = 'button text';
      component.icon = 'mdi-content-copy';
      component.state = State.LOADED;
      fixture.detectChanges();
      expect(page.button.textContainer).toBeTruthy();
      expect(page.button.text).toBeTruthy();
      expect(page.button.icon).toBeTruthy();
      expect(page.button.loadingSpinner).toBeFalsy();
      expect(page.button.button.disabled).toBeFalsy();
    });

    it('should display a loading spinner and disable the button if state === LOADING', () => {
      component.text = 'button text';
      component.icon = 'mdi-content-copy';
      component.state = State.LOADING;
      fixture.detectChanges();
      expect(page.button.textContainer).toBeFalsy();
      expect(page.button.text).toBeFalsy();
      expect(page.button.icon).toBeFalsy();
      expect(page.button.loadingSpinner).toBeTruthy();
      expect(page.button.button.disabled).toBeTruthy();
    });
  });

  describe('events', () => {
    it('should call button click when the button is clicked', () => {
      spyOn(component, 'buttonClick');
      page.button.button.click();
      fixture.detectChanges();
      expect(component.buttonClick).toHaveBeenCalled();
    });
  });

  describe('other attributes', () => {
    it('should be focused upon if isAutofocused is set to true', async () => {
      component.isAutofocused = false;
      fixture.detectChanges();
      expect(document.activeElement).not.toEqual(page.button.button);

      component.isAutofocused = true;
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(document.activeElement).toEqual(page.button.button);
    });

    it('should append aria attibutes if provided', () => {
      component.aria = null!;
      fixture.detectChanges();
      expect(page.button.button.getAttribute('aria-label')).toBeFalsy();
      expect(page.button.button.getAttribute('aria-controls')).toBeFalsy();
      expect(page.button.button.getAttribute('aria-haspopup')).toBeFalsy();
      expect(page.button.button.getAttribute('aria-expanded')).toBeFalsy();

      component.aria = { label: 'label' };
      fixture.detectChanges();
      expect(page.button.button.getAttribute('aria-label')).toEqual('label');

      component.aria = { controls: 'controls' };
      fixture.detectChanges();
      expect(page.button.button.getAttribute('aria-controls')).toEqual('controls');

      component.aria = { haspopup: true };
      fixture.detectChanges();
      expect(page.button.button.getAttribute('aria-haspopup')).toEqual('true');

      component.aria = { haspopup: false };
      fixture.detectChanges();
      expect(page.button.button.getAttribute('aria-haspopup')).toEqual('false');

      component.aria = { expanded: true };
      fixture.detectChanges();
      expect(page.button.button.getAttribute('aria-expanded')).toEqual('true');

      component.aria = { expanded: false };
      fixture.detectChanges();
      expect(page.button.button.getAttribute('aria-expanded')).toEqual('false');
    });

    it('should add a down-chevron icon if opensMenu is true', () => {
      component.state = State.LOADED;

      component.opensMenu = false;
      fixture.detectChanges();
      expect(page.button.opensMenuIcon).toBeFalsy();

      component.opensMenu = true;
      fixture.detectChanges();
      expect(page.button.opensMenuIcon).toBeTruthy();
    });
  });
});
