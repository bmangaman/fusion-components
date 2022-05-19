import { Component } from '@angular/core';

@Component({
  selector: 'fusion-demo-forms-button-group',
  templateUrl: './forms-button-group-demo.component.html',
  styleUrls: ['../forms-demo-shared.scss'],
})
export class FormsButtonGroupDemoComponent {

  readonly buttonGroupExamples: string[] = [

// RADIO, STANDARD, TEXT
`<div class="fusion-ui-button-group">
  <label class="fusion-ui-button__radio" for="button-group-example-1-button-1" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-1-button-1" type="radio" name="button-group-example-1" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__radio-inner-text">Left</span>
    </span>
  </label>

  <label class="fusion-ui-button__radio" for="button-group-example-1-button-2" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-1-button-2" type="radio" name="button-group-example-1" checked="true" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__--text">Center</span>
    </span>
  </label>

  <label class="fusion-ui-button__radio" for="button-group-example-1-button-3" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-1-button-3" type="radio" name="button-group-example-1" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__radio-inner-text">Right</span>
    </span>
  </label>
</div>
`,

// RADIO, SMALL, TEXT
`<div class="fusion-ui-button-group">
  <label class="fusion-ui-button__radio" for="button-group-example-2-button-1" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-2-button-1" type="radio" name="button-group-example-2" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--small fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__radio-inner-text">Left</span>
    </span>
  </label>

  <label class="fusion-ui-button__radio" for="button-group-example-2-button-2" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-2-button-2" type="radio" name="button-group-example-2" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--small fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__--text">Center</span>
    </span>
  </label>

  <label class="fusion-ui-button__radio" for="button-group-example-2-button-3" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-2-button-3" type="radio" name="button-group-example-2" checked="true" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--small fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__radio-inner-text">Right</span>
    </span>
  </label>
</div>
`,


// RADIO, SMALL, TEXT
`<div class="fusion-ui-button-group">
  <label class="fusion-ui-button__radio" for="button-group-example-3-button-1" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-3-button-1" type="radio" name="button-group-example-3" checked="true" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--large fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__radio-inner-text">Left</span>
    </span>
  </label>

  <label class="fusion-ui-button__radio" for="button-group-example-3-button-2" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-3-button-2" type="radio" name="button-group-example-3" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--large fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__--text">Center</span>
    </span>
  </label>

  <label class="fusion-ui-button__radio" for="button-group-example-3-button-3" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-3-button-3" type="radio" name="button-group-example-3" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button--large fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__radio-inner-text">Right</span>
    </span>
  </label>
</div>
`,

// RADIO, STANDARD, TEXT & ICON
`<div class="fusion-ui-button-group">
  <label class="fusion-ui-button__radio" for="button-group-example-4-button-1" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-4-button-1" type="radio" name="button-group-example-4" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button__radio-inner">
      <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
      <span class="fusion-ui-button__radio-inner-text">Left</span>
    </span>
  </label>

  <label class="fusion-ui-button__radio" for="button-group-example-4-button-2" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-4-button-2" type="radio" name="button-group-example-4" checked="true" />
    <span class="fusion-ui-button fusion-ui-button--secondary  fusion-ui-button__radio-inner">
      <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
      <span class="fusion-ui-button__--text">Center</span>
    </span>
  </label>

  <label class="fusion-ui-button__radio" for="button-group-example-4-button-3" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-4-button-3" type="radio" name="button-group-example-4" />
    <span class="fusion-ui-button fusion-ui-button--secondary  fusion-ui-button__radio-inner">
      <i class="mdi mdi-content-copy fusion-ui-button__icon"></i>
      <span class="fusion-ui-button__radio-inner-text">Right</span>
    </span>
  </label>
</div>
`,

// RADIO, STANDARD, TEXT, FIVE ITEMS
`<div class="fusion-ui-button-group">
  <label class="fusion-ui-button__radio" for="button-group-example-5-button-1" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-5-button-1" type="radio" name="button-group-example-5" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__radio-inner-text">Left</span>
    </span>
  </label>

  <label class="fusion-ui-button__radio" for="button-group-example-5-button-2" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-5-button-2" type="radio" name="button-group-example-5" checked="true" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__--text">Center 1</span>
    </span>
  </label>

  <label class="fusion-ui-button__radio" for="button-group-example-5-button-3" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-5-button-3" type="radio" name="button-group-example-5" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__radio-inner-text">Center 2</span>
    </span>
  </label>

  <label class="fusion-ui-button__radio" for="button-group-example-5-button-4" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-5-button-4" type="radio" name="button-group-example-5" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__radio-inner-text">Center 3</span>
    </span>
  </label>

  <label class="fusion-ui-button__radio" for="button-group-example-5-button-5" role="button">
    <input class="fusion-ui-button__radio-input" id="button-group-example-5-button-5" type="radio" name="button-group-example-5" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button__radio-inner">
      <span class="fusion-ui-button__radio-inner-text">Right</span>
    </span>
  </label>
</div>
`,

// CHECKBOX, STANDARD, TEXT, FIVE ITEMS
`<div class="fusion-ui-button-group">
  <label class="fusion-ui-button__checkbox" for="button-group-example-6-button-1" role="button">
    <input class="fusion-ui-button__checkbox-input" id="button-group-example-6-button-1" type="checkbox" name="button-group-example-6" checked="true" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button__checkbox-inner">
      <span class="fusion-ui-button__checkbox-inner-text">Left</span>
    </span>
  </label>

  <label class="fusion-ui-button__checkbox" for="button-group-example-6-button-2" role="button">
    <input class="fusion-ui-button__checkbox-input" id="button-group-example-6-button-2" type="checkbox" name="button-group-example-6" checked="true" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button__checkbox-inner">
      <span class="fusion-ui-button__checkbox-inner-text">Center</span>
    </span>
  </label>

  <label class="fusion-ui-button__checkbox" for="button-group-example-6-button-3" role="button">
    <input class="fusion-ui-button__checkbox-input" id="button-group-example-6-button-3" type="checkbox" name="button-group-example-6" />
    <span class="fusion-ui-button fusion-ui-button--secondary fusion-ui-button__checkbox-inner">
      <span class="fusion-ui-button__checkbox-inner-text">Right</span>
    </span>
  </label>
</div>
`
  ];

}
