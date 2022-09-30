import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'fusion-demo-forms-switch',
  templateUrl: './forms-switch-demo.component.html',
  styleUrls: ['../forms-demo-shared.scss'],
})
export class FormsSwitchDemoComponent implements OnInit {
  switchDemoForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
  ) {}

  ngOnInit(): void {
    this.buildSwitchDemoForm();
  }

  buildSwitchDemoForm(): void {
    this.switchDemoForm = this.fb.group({
      switch: [false],
    });
  }

  readonly switchExamples: string[] = [
// CHECKED, DEFAULT
`<div class="f-form__fieldset">
  <span class="f-form__switch">
    <label class="f-form__switch-label" for="f-form-switch">
      <input
        class="f-form__switch-input"
        id="f-switch"
        name="f-switch"
        type="checkbox"
        checked="true" />
      <span class="f-form__switch-visual" aria-hidden="true"></span>
      <span class="f-form__switch-label-text">Default (On)</span>
    </label>
  </span>
</div>`,

// CHECKED, HOVER
`<div class="f-form__fieldset">
  <span class="f-form__switch">
    <label class="f-form__switch-label" for="f-form-switch">
      <input
        class="f-form__switch-input f-form__switch-input--hover"
        id="f-switch"
        name="f-switch"
        type="checkbox"
        checked="true" />
      <span class="f-form__switch-visual" aria-hidden="true"></span>
      <span class="f-form__switch-label-text">Hover (On)</span>
    </label>
  </span>
</div>`,

// CHECKED, FOCUSED
`<div class="f-form__fieldset">
  <span class="f-form__switch">
    <label class="f-form__switch-label" for="f-form-switch">
      <input
        class="f-form__switch-input f-form__switch-input--focus"
        id="f-switch"
        name="f-switch"
        type="checkbox"
        checked="true" />
      <span class="f-form__switch-visual" aria-hidden="true"></span>
      <span class="f-form__switch-label-text">Focus (On)</span>
    </label>
  </span>
</div>`,

// CHECKED, DISABLED
`<div class="f-form__fieldset">
  <span class="f-form__switch">
    <label class="f-form__switch-label" for="f-form-switch">
      <input
        class="f-form__switch-input"
        id="f-switch"
        name="f-switch"
        type="checkbox"
        disabled="true"
        checked="true" />
      <span class="f-form__switch-visual" aria-hidden="true"></span>
      <span class="f-form__switch-label-text">Disabled (On)</span>
    </label>
  </span>
</div>`,

// UNCHECKED, DEFAULT
`<div class="f-form__fieldset">
  <span class="f-form__switch">
    <label class="f-form__switch-label" for="f-form-switch">
      <input
        class="f-form__switch-input"
        id="f-switch"
        name="f-switch"
        type="checkbox" />
      <span class="f-form__switch-visual" aria-hidden="true"></span>
      <span class="f-form__switch-label-text">Default (Off)</span>
    </label>
  </span>
</div>`,

// UNCHECKED, HOVER
`<div class="f-form__fieldset">
  <span class="f-form__switch">
    <label class="f-form__switch-label" for="f-form-switch">
      <input
        class="f-form__switch-input f-form__switch-input--hover"
        id="f-switch"
        name="f-switch"
        type="checkbox" />
      <span class="f-form__switch-visual" aria-hidden="true"></span>
      <span class="f-form__switch-label-text">Hover (Off)</span>
    </label>
  </span>
</div>`,

// UNCHECKED, FOCUSED
`<div class="f-form__fieldset">
  <span class="f-form__switch">
    <label class="f-form__switch-label" for="f-form-switch">
      <input
        class="f-form__switch-input f-form__switch-input--focus"
        id="f-switch"
        name="f-switch"
        type="checkbox" />
      <span class="f-form__switch-visual" aria-hidden="true"></span>
      <span class="f-form__switch-label-text">Focus (Off)</span>
    </label>
  </span>
</div>`,

// UNCHECKED, DISABLED
`<div class="f-form__fieldset">
  <span class="f-form__switch">
    <label class="f-form__switch-label" for="f-form-switch">
      <input
        class="f-form__switch-input"
        id="f-switch"
        name="f-switch"
        type="checkbox"
        disabled="true" />
      <span class="f-form__switch-visual" aria-hidden="true"></span>
      <span class="f-form__switch-label-text">Disabled (Off)</span>
    </label>
  </span>
</div>`,

// CHECKED, DEFAULT, SMALL
`<div class="f-form__fieldset">
  <span class="f-form__switch f-form__switch--small">
    <label class="f-form__switch-label" for="f-form-switch">
      <input
        class="f-form__switch-input"
        id="f-switch"
        name="f-switch"
        type="checkbox"
        checked="true" />
      <span class="f-form__switch-visual" aria-hidden="true"></span>
      <span class="f-form__switch-label-text">Default (On)</span>
    </label>
  </span>
</div>`,

// UNCHECKED, DEFAULT, SMALL
`<div class="f-form__fieldset">
  <span class="f-form__switch f-form__switch--small">
    <label class="f-form__switch-label" for="f-form-switch">
      <input
        class="f-form__switch-input"
        id="f-switch"
        name="f-switch"
        type="checkbox" />
      <span class="f-form__switch-visual" aria-hidden="true"></span>
      <span class="f-form__switch-label-text">Default (On)</span>
    </label>
  </span>
</div>`,
  ];

}
