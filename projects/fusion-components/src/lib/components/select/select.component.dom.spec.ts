import { Component } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';

import { TranslatedComponentSpecModule } from '@fusion-components/unit-test-helpers/translated-component.module.spec';
import { SelectComponentPageObject } from './select.component.spec.po';
import { SelectOption } from './select.interface';
import { SelectModule } from './select.module';

@Component({
  selector: 'f-test-component',
  template: `
    <f-select
      [formControl]="control"
      [label]="label"
      [options]="options"
      [isSearchable]="isSearchable"
      [cssClasses]="cssClasses">
    </f-select>
    <button class="outside-element">Outside Element</button>
  `,
})
export class SelectTestComponent {
  control: UntypedFormControl = new UntypedFormControl();
  label: string;
  options: SelectOption[] = [];
  isSearchable: boolean;
  cssClasses: string[];
}

describe('SelectComponent', () => {
  let component: SelectTestComponent;
  let fixture: ComponentFixture<SelectTestComponent>;
  let page: SelectComponentPageObject;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectTestComponent,
      ],
      imports: [
        SelectModule,
        TranslatedComponentSpecModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(SelectTestComponent);
    component = fixture.componentInstance;
    page = new SelectComponentPageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(page.select).toBeTruthy();
  });

  describe('the static elements and styling', () => {
    it('should display the provided label', () => {
      expect(page.select.label).toBeFalsy();
      component.label = 'Custom Label';
      fixture.detectChanges();
      expect(page.select.label).toBeTruthy();
      expect(page.select.label.innerText).toEqual('Custom Label');
    });

    it('should append the css classes based on the isDisabled and cssClass inputs', () => {
      let expectedResult: string[];
      const defaultClasses: string[] = ['f-select__classes-wrapper', 'f-form__input-wrapper', 'f-form__select-wrapper'];

      expectedResult = defaultClasses;
      expectedResult.forEach((cssClass: string) => expect(page.select.classes).toContain(cssClass));

      component.cssClasses = ['custom1', 'custom2'];
      expectedResult = [...defaultClasses, 'custom1', 'custom2'];
      fixture.detectChanges();
      expectedResult.forEach((cssClass: string) => expect(page.select.classes).toContain(cssClass));

      component.control.disable();
      expectedResult = [...defaultClasses, 'f-form__input--disabled', 'custom1', 'custom2'];
      fixture.detectChanges();
      expectedResult.forEach((cssClass: string) => expect(page.select.classes).toContain(cssClass));
    });
  });

  describe('the search input', () => {
    beforeEach(() => {
      component.isSearchable = true;
      fixture.detectChanges();
    });

    it('should open dropdown menu when clicked', () => {
      expect(page.select.inputSearch.disabled).toBeFalsy();
      page.select.inputSearch.click();
      fixture.detectChanges();
      expect(page.select.dropdownMenu).toBeTruthy();
      page.select.inputSearch.click();
      fixture.detectChanges();
      expect(page.select.dropdownMenu).toBeTruthy();
    });

    it('should filter the displayed options', fakeAsync(() => {
      const options: SelectOption[] = [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2', isDisabled: true },
        { label: 'label3', value: 'value3' },
        { label: 'label4', value: 'value4' },
        { label: 'label5', value: 'value5' },
        { label: 'label6', value: 'value6' },
      ];
      component.options = options;
      fixture.autoDetectChanges();
      tick(1000);

      expect(page.select.inputSearch.disabled).toBeFalsy();
      page.select.inputSearch.click();
      fixture.detectChanges();
      tick(1000);
      expect(page.select.dropdownMenu).toBeTruthy();
      expect(page.select.options.length).toEqual(7);

      page.select.inputSearch.value = 'label5';
      page.select.inputSearch.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick(1000);
      expect(page.select.options.length).toEqual(1);
      expect(page.select.getOptionAtIndex(0).innerText).toEqual('label5');

      page.select.inputSearch.value = 'bad-search';
      page.select.inputSearch.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick(1000);
      expect(page.select.options.length).toEqual(0);
      expect(page.select.dropdownMenu.innerText).toEqual('.select.noResults'); // 'No Results'
    }));
  });

  describe('the input button', () => {
    it('should not do anything if disabled', () => {
      expect(page.select.inputButton.disabled).toBeFalsy();

      component.control.disable();
      fixture.detectChanges();
      expect(page.select.inputButton.disabled).toBeTruthy();
      page.select.inputButton.click();
      fixture.detectChanges();
      expect(page.select.dropdownMenu).toBeFalsy();
    });

    it('should toggle the visibility of the dropdown menu when clicked', () => {
      expect(page.select.inputButton.disabled).toBeFalsy();
      page.select.inputButton.click();
      fixture.detectChanges();
      expect(page.select.dropdownMenu).toBeTruthy();
      page.select.inputButton.click();
      fixture.detectChanges();
      expect(page.select.dropdownMenu).toBeFalsy();
    });
  });

  describe('the dropdown menu', () => {
    let options: SelectOption[] = [];

    beforeEach(fakeAsync(() => {
      options = [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2', isDisabled: true },
        { label: 'label3', value: 'value3' },
        { label: 'label4', value: 'value4' },
        { label: 'label5', value: 'value5' },
        { label: 'label6', value: 'value6' },
      ];
      component.options = options;
      fixture.autoDetectChanges();
      tick(1000);

      expect(page.select.inputButton.disabled).toBeFalsy();
      page.select.inputButton.click();
      fixture.autoDetectChanges();
      tick(1000);
      expect(page.select.dropdownMenu).toBeTruthy();
      discardPeriodicTasks();
    }));

    it('should display the list of options', () => {
      expect(page.select.options.length).toEqual(7);
    });

    it('should close the menu when one of the non-disabled options is clicked', fakeAsync(() => {
      page.select.getOptionAtIndex(0).click();
      fixture.detectChanges();
      tick(1000);
      expect(page.select.dropdownMenu).toBeFalsy();
      discardPeriodicTasks();
    }));

    it('should close the menu when the enter key is pressed when one of the non-disabled options', fakeAsync(() => {
      const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });

      page.select.getOptionAtIndex(0).dispatchEvent(event);
      fixture.detectChanges();
      tick(1000);
      expect(page.select.dropdownMenu).toBeFalsy();
      discardPeriodicTasks();
    }));

    it('should close the menu when the space key is pressed when one of the non-disabled options', fakeAsync(() => {
      const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Space' });

      page.select.getOptionAtIndex(0).dispatchEvent(event);
      fixture.detectChanges();
      tick(1000);
      expect(page.select.dropdownMenu).toBeFalsy();
      discardPeriodicTasks();
    }));

    // TODO: cannot get the document/ options to detect the down and up Tab events
    xit('should allow the tab and shift+tab to navigate through the options', fakeAsync(() => {
      const downEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      const upEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
      let option: HTMLLIElement;
      
      // Focus on the first element
      option = page.select.getOptionAtIndex(0); // default null option
      option.focus();
      expect(document.activeElement).toEqual(option);

      // Should focus on the next option
      option.dispatchEvent(downEvent);
      fixture.detectChanges();
      tick(1000);
      option = page.select.getOptionAtIndex(1); // label1
      expect(document.activeElement).toEqual(option);

      // Should skip over disabled options
      option.dispatchEvent(downEvent);
      fixture.detectChanges();
      tick(1000);
      option = page.select.getOptionAtIndex(2); // label2
      expect(document.activeElement).not.toEqual(option);

      option.dispatchEvent(downEvent);
      fixture.detectChanges();
      tick(1000);
      option = page.select.getOptionAtIndex(3); // label3
      expect(document.activeElement).toEqual(option);

      // Should skip over disabled options
      option.dispatchEvent(upEvent);
      fixture.detectChanges();
      tick(1000);
      option = page.select.getOptionAtIndex(2); // label2
      expect(document.activeElement).not.toEqual(option);

      option.dispatchEvent(upEvent);
      fixture.detectChanges();
      tick(1000);
      option = page.select.getOptionAtIndex(1); // label1
      expect(document.activeElement).toEqual(option);

      // Should focus on the previous option
      option.dispatchEvent(upEvent);
      fixture.detectChanges();
      tick(1000);
      option = page.select.getOptionAtIndex(0); // label1
      expect(document.activeElement).toEqual(option);
      
      discardPeriodicTasks();
    }));

    it('should allow the up and down arrow keys to navigate through the options', fakeAsync(() => {
      const downEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const upEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      let option: HTMLLIElement;
      
      // Focus on the first element
      option = page.select.getOptionAtIndex(0); // default null option
      option.focus();
      expect(document.activeElement).toEqual(option);

      // Should focus on the next option
      option.dispatchEvent(downEvent);
      fixture.detectChanges();
      tick(1000);
      option = page.select.getOptionAtIndex(1); // label1
      expect(document.activeElement).toEqual(option);

      // Should skip over disabled options
      option.dispatchEvent(downEvent);
      fixture.detectChanges();
      tick(1000);
      option = page.select.getOptionAtIndex(2); // label2
      expect(document.activeElement).not.toEqual(option);

      option.dispatchEvent(downEvent);
      fixture.detectChanges();
      tick(1000);
      option = page.select.getOptionAtIndex(3); // label3
      expect(document.activeElement).toEqual(option);

      // Should skip over disabled options
      option.dispatchEvent(upEvent);
      fixture.detectChanges();
      tick(1000);
      option = page.select.getOptionAtIndex(2); // label2
      expect(document.activeElement).not.toEqual(option);

      option.dispatchEvent(upEvent);
      fixture.detectChanges();
      tick(1000);
      option = page.select.getOptionAtIndex(1); // label1
      expect(document.activeElement).toEqual(option);

      // Should focus on the previous option
      option.dispatchEvent(upEvent);
      fixture.detectChanges();
      tick(1000);
      option = page.select.getOptionAtIndex(0); // label1
      expect(document.activeElement).toEqual(option);
      
      discardPeriodicTasks();
    }));

    it('should close if the escape key is pressed', fakeAsync(() => {
      const event: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      fixture.detectChanges();
      tick(1000);
      expect(page.select.dropdownMenu).toBeFalsy();
      discardPeriodicTasks();
    }));

    it('should close if something besides the select is clicked', fakeAsync(() => {
      page.select.dropdownMenu.click();
      fixture.detectChanges();
      tick(1000);
      expect(page.select.dropdownMenu).toBeTruthy();

      const outsideElement: HTMLButtonElement = fixture.nativeElement.querySelector('.outside-element');
      outsideElement.click();
      fixture.detectChanges();
      tick(1000);
      expect(page.select.dropdownMenu).toBeFalsy();
      discardPeriodicTasks();
    }));
  });
});
