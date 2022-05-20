import { Component } from '@angular/core';

@Component({
  selector: 'fusion-demo-forms-radio',
  templateUrl: './forms-radio-demo.component.html',
  styleUrls: ['../forms-demo-shared.scss'],
})
export class FormsRadioDemoComponent {

  readonly radioExamples: string[] = [

// DEFAULT
`<div class="f-form__fieldset">
  <span class="f-form__radio">
    <label for="f-radio-1" class="f-form__radio-label">
      <input
        class="f-form__radio-input"
        type="radio"
        name="f-radio-1"
        id="f-radio-1">
      <span class="f-form__radio-button"></span>
      <span class="f-form__radio-label-text">Default</span>
    </label>
  </span>
</div>`,

// SELECTED
`<div class="f-form__fieldset">
  <span class="f-form__radio">
    <label for="f-radio-2" class="f-form__radio-label">
      <input
        checked="true"
        class="f-form__radio-input f-form__radio-input--selected"
        type="radio"
        name="f-radio-2"
        id="f-radio-2">
      <span class="f-form__radio-button"></span>
      <span class="f-form__radio-label-text">Selected</span>
    </label>
  </span>
</div>`,

// HOVER
`<div class="f-form__fieldset">
  <span class="f-form__radio">
    <label for="f-radio-3" class="f-form__radio-label">
      <input
        class="f-form__radio-input f-form__radio-input--hover"
        type="radio"
        name="f-radio-3"
        id="f-radio-3">
      <span class="f-form__radio-button"></span>
      <span class="f-form__radio-label-text">Hover</span>
    </label>
  </span>
</div>`,

// FOCUS
`<div class="f-form__fieldset">
  <span class="f-form__radio">
    <label for="f-radio-4" class="f-form__radio-label">
      <input
        class="f-form__radio-input f-form__radio-input--focus"
        type="radio"
        name="f-radio-4"
        id="f-radio-4">
      <span class="f-form__radio-button"></span>
      <span class="f-form__radio-label-text">Focus</span>
    </label>
  </span>
</div>`,

// READONLY (UNSELECTED)
`<div class="f-form__fieldset">
  <span class="f-form__radio">
    <label for="f-radio-6-a" class="f-form__radio-label">
      <input
        class="f-form__radio-input f-form__radio-input--readonly"
        readonly
        (click)="false"
        type="radio"
        name="f-radio-6-a"
        id="f-radio-6-a">
      <span class="f-form__radio-button"></span>
      <span class="f-form__radio-label-text">Readonly (Unselected)</span>
    </label>
  </span>
</div>`,

// READONLY (SELECTED)
`<div class="f-form__fieldset">
  <span class="f-form__radio">
    <label for="f-radio-6-b" class="f-form__radio-label">
      <input
        class="f-form__radio-input f-form__radio-input--selected f-form__radio-input--readonly"
        checked="true"
        readonly
        (click)="false"
        type="radio"
        name="f-radio-6-b"
        id="f-radio-6-b">
      <span class="f-form__radio-button"></span>
      <span class="f-form__radio-label-text">Readonly (Selected)</span>
    </label>
  </span>
</div>`,

// DISABLED
`<div class="f-form__fieldset">
  <span class="f-form__radio">
    <label for="f-radio-7" class="f-form__radio-label">
      <input
        class="f-form__radio-input f-form__radio-input--disabled"
        disabled="true"
        aria-disabled="true"
        type="radio"
        name="f-radio-7"
        id="f-radio-7">
      <span class="f-form__radio-button"></span>
      <span class="f-form__radio-label-text">Disabled</span>
    </label>
  </span>
</div>`,

  ];

}
