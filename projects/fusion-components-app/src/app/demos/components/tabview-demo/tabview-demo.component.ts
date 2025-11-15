import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabviewType } from '@fusion-components';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { TabviewModule } from '../../../../../../fusion-components/src/lib/components/tabview/tabview.module';
import { TemplateModule } from '../../../../../../fusion-components/src/lib/directives/template/template.module';

@Component({
    selector: 'fusion-demo-tabview',
    templateUrl: './tabview-demo.component.html',
    styleUrls: ['./tabview-demo.component.scss'],
    imports: [DemoComponent, FormsModule, ReactiveFormsModule, TabviewModule, TemplateModule]
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
