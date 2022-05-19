import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TabviewType } from '@fusion-ui/fusion-components';

@Component({
  selector: 'fusion-demo-tabview',
  templateUrl: './tabview-demo.component.html',
  styleUrls: ['./tabview-demo.component.scss']
})
export class TabviewDemoComponent implements OnInit {
  readonly TabviewType = TabviewType;

  tabviewForm: FormGroup;

  constructor(
    private fb: FormBuilder,
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
