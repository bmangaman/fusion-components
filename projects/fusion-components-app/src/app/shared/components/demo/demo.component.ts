import { Component, Input } from '@angular/core';

@Component({
  selector: 'fusion-demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  @Input() titleText: string;
  @Input() isResultCentered: boolean;
}
