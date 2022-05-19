import { Component } from '@angular/core';

@Component({
  selector: 'fusion-demo-forms-radio',
  templateUrl: './forms-radio-demo.component.html',
  styleUrls: ['../forms-demo-shared.scss'],
})
export class FormsRadioDemoComponent {

  readonly radioExamples: string[] = [

// DEFAULT
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__radio">
    <label for="fusion-ui-radio-1" class="fusion-ui-form__radio-label">
      <input
        class="fusion-ui-form__radio-input"
        type="radio"
        name="fusion-ui-radio-1"
        id="fusion-ui-radio-1">
      <span class="fusion-ui-form__radio-button"></span>
      <span class="fusion-ui-form__radio-label-text">Default</span>
    </label>
  </span>
</div>`,

// SELECTED
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__radio">
    <label for="fusion-ui-radio-2" class="fusion-ui-form__radio-label">
      <input
        checked="true"
        class="fusion-ui-form__radio-input fusion-ui-form__radio-input--selected"
        type="radio"
        name="fusion-ui-radio-2"
        id="fusion-ui-radio-2">
      <span class="fusion-ui-form__radio-button"></span>
      <span class="fusion-ui-form__radio-label-text">Selected</span>
    </label>
  </span>
</div>`,

// HOVER
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__radio">
    <label for="fusion-ui-radio-3" class="fusion-ui-form__radio-label">
      <input
        class="fusion-ui-form__radio-input fusion-ui-form__radio-input--hover"
        type="radio"
        name="fusion-ui-radio-3"
        id="fusion-ui-radio-3">
      <span class="fusion-ui-form__radio-button"></span>
      <span class="fusion-ui-form__radio-label-text">Hover</span>
    </label>
  </span>
</div>`,

// FOCUS
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__radio">
    <label for="fusion-ui-radio-4" class="fusion-ui-form__radio-label">
      <input
        class="fusion-ui-form__radio-input fusion-ui-form__radio-input--focus"
        type="radio"
        name="fusion-ui-radio-4"
        id="fusion-ui-radio-4">
      <span class="fusion-ui-form__radio-button"></span>
      <span class="fusion-ui-form__radio-label-text">Focus</span>
    </label>
  </span>
</div>`,

// READONLY (UNSELECTED)
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__radio">
    <label for="fusion-ui-radio-6-a" class="fusion-ui-form__radio-label">
      <input
        class="fusion-ui-form__radio-input fusion-ui-form__radio-input--readonly"
        readonly
        (click)="false"
        type="radio"
        name="fusion-ui-radio-6-a"
        id="fusion-ui-radio-6-a">
      <span class="fusion-ui-form__radio-button"></span>
      <span class="fusion-ui-form__radio-label-text">Readonly (Unselected)</span>
    </label>
  </span>
</div>`,

// READONLY (SELECTED)
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__radio">
    <label for="fusion-ui-radio-6-b" class="fusion-ui-form__radio-label">
      <input
        class="fusion-ui-form__radio-input fusion-ui-form__radio-input--selected fusion-ui-form__radio-input--readonly"
        checked="true"
        readonly
        (click)="false"
        type="radio"
        name="fusion-ui-radio-6-b"
        id="fusion-ui-radio-6-b">
      <span class="fusion-ui-form__radio-button"></span>
      <span class="fusion-ui-form__radio-label-text">Readonly (Selected)</span>
    </label>
  </span>
</div>`,

// DISABLED
`<div class="fusion-ui-form__fieldset">
  <span class="fusion-ui-form__radio">
    <label for="fusion-ui-radio-7" class="fusion-ui-form__radio-label">
      <input
        class="fusion-ui-form__radio-input fusion-ui-form__radio-input--disabled"
        disabled="true"
        aria-disabled="true"
        type="radio"
        name="fusion-ui-radio-7"
        id="fusion-ui-radio-7">
      <span class="fusion-ui-form__radio-button"></span>
      <span class="fusion-ui-form__radio-label-text">Disabled</span>
    </label>
  </span>
</div>`,

  ];

}
