import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InfoBoxDetail, WidgetTemplate, StatusLevel } from '@fusion-components';

@Component({
  selector: 'fusion-demo-widget',
  templateUrl: './widget-demo.component.html',
  styleUrls: ['./widget-demo.component.scss'],
})
export class WidgetDemoComponent {
  readonly WidgetTemplate = WidgetTemplate;

  isComponentRendered: boolean = true;

  infoBoxesDetails: InfoBoxDetail[] = [
    {
      header: 'Movies Released This Year',
      content: '15,739',
    },
    {
      header: 'Highest Grossing Movie',
      content: '$3.4B',
      footer: 'Gone with the Wind',
    },
    {
      header: 'Movies Below 20% Rating',
      badges: [
        {
          text: 1807,
          type: StatusLevel.WARNING,
        },
      ],
    },
    {
      header: 'Recommend Home Alone',
      badges: [
        {
          text: 44,
          subText: 'Yes',
          type: StatusLevel.SUCCESS,
        },
        {
          text: 93,
          subText: 'No',
          type: StatusLevel.CRITICAL,
        },
      ],
    },
  ];

  infoDetailsData: { [key: string] : any } = {
    key: 'value',
    key2: 2,
    key3: WidgetTemplate.HEADER,
    key4: 'value4',
    key5: 5,
    key6: WidgetTemplate.INFO_BOX,
  }

  widgetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildWidgetdForm();
  }

  buildWidgetdForm(): void {
    this.widgetForm = this.fb.group({
      isTimestampDisplayed: [true],
      isRefreshButtonDisplayed: [true],
      isCustomHeader: [false],
      isCustomInfoBoxes: [false],
      isCustomInfoDetails: [false],
    });

    this.widgetForm.get('isCustomHeader').valueChanges.subscribe(() => this.resetComponent());
    this.widgetForm.get('isCustomInfoBoxes').valueChanges.subscribe(() => this.resetComponent());
    this.widgetForm.get('isCustomInfoDetails').valueChanges.subscribe(() => this.resetComponent());
  }

  resetComponent(): void {
    this.isComponentRendered = false;
    setTimeout(() => this.isComponentRendered = true);
  }
}
