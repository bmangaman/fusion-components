import { Component } from '@angular/core';

@Component({
  selector: 'fusion-demo-forms-checkbox',
  templateUrl: './forms-checkbox-demo.component.html',
  styleUrls: ['../forms-demo-shared.scss'],
})
export class FormsCheckboxDemoComponent {

  readonly checkboxExamples: string[] = [

// DEFAULT
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__checkbox">
    <label for="fusion-ui-checkbox-1" class="fusion-ui-form__checkbox-label">
      <input
        class="fusion-ui-form__checkbox-input"
        type="checkbox"
        name="fusion-ui-checkbox-1"
        id="fusion-ui-checkbox-1">
      <span class="fusion-ui-form__checkbox-button"></span>
      <span class="fusion-ui-form__checkbox-label-text">Default</span>
    </label>
  </span>
</div>`,

// SELECTED
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__checkbox">
    <label for="fusion-ui-checkbox-2" class="fusion-ui-form__checkbox-label">
      <input
        checked="true"
        class="fusion-ui-form__checkbox-input fusion-ui-form__checkbox-input--selected"
        type="checkbox"
        name="fusion-ui-checkbox-2"
        id="fusion-ui-checkbox-2">
      <span class="fusion-ui-form__checkbox-button"></span>
      <span class="fusion-ui-form__checkbox-label-text">Selected</span>
    </label>
  </span>
</div>`,

// HOVER
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__checkbox">
    <label for="fusion-ui-checkbox-3" class="fusion-ui-form__checkbox-label">
      <input
        class="fusion-ui-form__checkbox-input fusion-ui-form__checkbox-input--hover"
        type="checkbox"
        name="fusion-ui-checkbox-3"
        id="fusion-ui-checkbox-3">
      <span class="fusion-ui-form__checkbox-button"></span>
      <span class="fusion-ui-form__checkbox-label-text">Hover</span>
    </label>
  </span>
</div>`,

// FOCUS
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__checkbox">
    <label for="fusion-ui-checkbox-4" class="fusion-ui-form__checkbox-label">
      <input
        class="fusion-ui-form__checkbox-input fusion-ui-form__checkbox-input--focus"
        type="checkbox"
        name="fusion-ui-checkbox-4"
        id="fusion-ui-checkbox-4">
      <span class="fusion-ui-form__checkbox-button"></span>
      <span class="fusion-ui-form__checkbox-label-text">Focus</span>
    </label>
  </span>
</div>`,

// INDETERMINATE
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__checkbox">
    <label for="fusion-ui-checkbox-5" class="fusion-ui-form__checkbox--label">
      <input
        [indeterminate]="true"
        class="fusion-ui-form__checkbox-input fusion-ui-form__checkbox-input--indeterminate"
        type="checkbox"
        name="fusion-ui-checkbox-5"
        id="fusion-ui-checkbox-5">
      <span class="fusion-ui-form__checkbox-button"></span>
      <span class="fusion-ui-form__checkbox-label-text">Indeterminate</span>
    </label>
  </span>
</div>`,

// READONLY (UNSELECTED)
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__checkbox">
    <label for="fusion-ui-checkbox-6-a" class="fusion-ui-form__checkbox-label">
      <input
        class="fusion-ui-form__checkbox-input fusion-ui-form__checkbox-input--readonly"
        readonly
        (click)="false"
        type="checkbox"
        name="fusion-ui-checkbox-6-a"
        id="fusion-ui-checkbox-6-a">
      <span class="fusion-ui-form__checkbox-button"></span>
      <span class="fusion-ui-form__checkbox-label-text">Readonly (Unselected)</span>
    </label>
  </span>
</div>`,

// READONLY (SELECTED)
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__checkbox">
    <label for="fusion-ui-checkbox-6-b" class="fusion-ui-form__checkbox-label">
      <input
        class="fusion-ui-form__checkbox-input fusion-ui-form__checkbox-input--selected fusion-ui-form__checkbox-input--readonly"
        checked="true"
        readonly
        (click)="false"
        type="checkbox"
        name="fusion-ui-checkbox-6-b"
        id="fusion-ui-checkbox-6-b">
      <span class="fusion-ui-form__checkbox-button"></span>
      <span class="fusion-ui-form__checkbox-label-text">Readonly (Selected)</span>
    </label>
  </span>
</div>`,

// DISABLED
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__checkbox">
    <label for="fusion-ui-checkbox-7" class="fusion-ui-form__checkbox-label">
      <input
        class="fusion-ui-form__checkbox-input fusion-ui-form__checkbox-input--disabled"
        disabled="true"
        aria-disabled="true"
        type="checkbox"
        name="fusion-ui-checkbox-7"
        id="fusion-ui-checkbox-7">
      <span class="fusion-ui-form__checkbox-button"></span>
      <span class="fusion-ui-form__checkbox-label-text">Disabled</span>
    </label>
  </span>
</div>`,

  ];

}
