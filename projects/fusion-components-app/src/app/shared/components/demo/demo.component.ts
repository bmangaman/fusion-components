import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'fusion-demo',
    templateUrl: './demo.component.html',
    imports: [NgClass]
})
export class DemoComponent {
  @Input() titleText: string;
  @Input() isResultCentered: boolean;
}
