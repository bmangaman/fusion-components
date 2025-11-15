import { Component, Input } from '@angular/core';

@Component({
    selector: 'fusion-demo',
    templateUrl: './demo.component.html',
    standalone: false
})
export class DemoComponent {
  @Input() titleText: string;
  @Input() isResultCentered: boolean;
}
