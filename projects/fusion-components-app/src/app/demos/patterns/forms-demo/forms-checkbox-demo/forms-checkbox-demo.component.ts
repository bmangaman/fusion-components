import { Component } from '@angular/core';
import { EscapeHtmlPipe } from '../../../../shared/pipes/escape-html/escape-html.pipe';

@Component({
    selector: 'fusion-demo-forms-checkbox',
    templateUrl: './forms-checkbox-demo.component.html',
    styleUrls: ['../forms-demo-shared.scss'],
    imports: [EscapeHtmlPipe]
})
export class FormsCheckboxDemoComponent {

  readonly checkboxExamples: string[] = [

// DEFAULT
`<div class="f-form__fieldset">
  <span class="f-form__checkbox">
    <label for="f-checkbox-1" class="f-form__checkbox-label">
      <input
        class="f-form__checkbox-input"
        type="checkbox"
        name="f-checkbox-1"
        id="f-checkbox-1">
      <span class="f-form__checkbox-button"></span>
      <span class="f-form__checkbox-label-text">Default</span>
    </label>
  </span>
</div>`,

// SELECTED
`<div class="f-form__fieldset">
  <span class="f-form__checkbox">
    <label for="f-checkbox-2" class="f-form__checkbox-label">
      <input
        checked="true"
        class="f-form__checkbox-input f-form__checkbox-input--selected"
        type="checkbox"
        name="f-checkbox-2"
        id="f-checkbox-2">
      <span class="f-form__checkbox-button"></span>
      <span class="f-form__checkbox-label-text">Selected</span>
    </label>
  </span>
</div>`,

// HOVER
`<div class="f-form__fieldset">
  <span class="f-form__checkbox">
    <label for="f-checkbox-3" class="f-form__checkbox-label">
      <input
        class="f-form__checkbox-input f-form__checkbox-input--hover"
        type="checkbox"
        name="f-checkbox-3"
        id="f-checkbox-3">
      <span class="f-form__checkbox-button"></span>
      <span class="f-form__checkbox-label-text">Hover</span>
    </label>
  </span>
</div>`,

// FOCUS
`<div class="f-form__fieldset">
  <span class="f-form__checkbox">
    <label for="f-checkbox-4" class="f-form__checkbox-label">
      <input
        class="f-form__checkbox-input f-form__checkbox-input--focus"
        type="checkbox"
        name="f-checkbox-4"
        id="f-checkbox-4">
      <span class="f-form__checkbox-button"></span>
      <span class="f-form__checkbox-label-text">Focus</span>
    </label>
  </span>
</div>`,

// INDETERMINATE
`<div class="f-form__fieldset">
  <span class="f-form__checkbox">
    <label for="f-checkbox-5" class="f-form__checkbox--label">
      <input
        [indeterminate]="true"
        class="f-form__checkbox-input f-form__checkbox-input--indeterminate"
        type="checkbox"
        name="f-checkbox-5"
        id="f-checkbox-5">
      <span class="f-form__checkbox-button"></span>
      <span class="f-form__checkbox-label-text">Indeterminate</span>
    </label>
  </span>
</div>`,

// READONLY (UNSELECTED)
`<div class="f-form__fieldset">
  <span class="f-form__checkbox">
    <label for="f-checkbox-6-a" class="f-form__checkbox-label">
      <input
        class="f-form__checkbox-input f-form__checkbox-input--readonly"
        readonly
        (click)="false"
        type="checkbox"
        name="f-checkbox-6-a"
        id="f-checkbox-6-a">
      <span class="f-form__checkbox-button"></span>
      <span class="f-form__checkbox-label-text">Readonly (Unselected)</span>
    </label>
  </span>
</div>`,

// READONLY (SELECTED)
`<div class="f-form__fieldset">
  <span class="f-form__checkbox">
    <label for="f-checkbox-6-b" class="f-form__checkbox-label">
      <input
        class="f-form__checkbox-input f-form__checkbox-input--selected f-form__checkbox-input--readonly"
        checked="true"
        readonly
        (click)="false"
        type="checkbox"
        name="f-checkbox-6-b"
        id="f-checkbox-6-b">
      <span class="f-form__checkbox-button"></span>
      <span class="f-form__checkbox-label-text">Readonly (Selected)</span>
    </label>
  </span>
</div>`,

// DISABLED
`<div class="f-form__fieldset">
  <span class="f-form__checkbox">
    <label for="f-checkbox-7" class="f-form__checkbox-label">
      <input
        class="f-form__checkbox-input f-form__checkbox-input--disabled"
        disabled="true"
        aria-disabled="true"
        type="checkbox"
        name="f-checkbox-7"
        id="f-checkbox-7">
      <span class="f-form__checkbox-button"></span>
      <span class="f-form__checkbox-label-text">Disabled</span>
    </label>
  </span>
</div>`,

  ];

}
