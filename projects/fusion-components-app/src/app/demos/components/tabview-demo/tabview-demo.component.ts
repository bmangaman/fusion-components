import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { TabviewType } from '@fusion-components';

@Component({
    selector: 'fusion-demo-tabview',
    templateUrl: './tabview-demo.component.html',
    styleUrls: ['./tabview-demo.component.scss'],
    standalone: false
})
export class TabviewDemoComponent implements OnInit {
  readonly TabviewType = TabviewType;

  tabviewForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
  ) {}

  ngOnInit(): void {
    this.buildTabviewForm();
  }

  buildTabviewForm(): void {
    this.tabviewForm = this.fb.group({
      type: [TabviewType.CONTENT],
    });
  }

}
