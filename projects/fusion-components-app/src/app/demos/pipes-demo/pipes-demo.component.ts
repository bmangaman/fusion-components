import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BytesPipeBase, BytesPipe } from '@fusion-components';
import { DemoComponent } from '../../shared/components/demo/demo.component';
import { TabviewModule } from '../../../../../fusion-components/src/lib/components/tabview/tabview.module';
import { TemplateModule } from '../../../../../fusion-components/src/lib/directives/template/template.module';

@Component({
    selector: 'fusion-demo-pipes',
    templateUrl: './pipes-demo.component.html',
    styleUrls: ['./pipes-demo.component.scss'],
    standalone: true,
    imports: [DemoComponent, TabviewModule, TemplateModule, FormsModule, ReactiveFormsModule]
})
export class PipesDemoComponent {
  readonly BytesPipeBase = BytesPipeBase;
  readonly bytesPipe: BytesPipe = new BytesPipe();
  bytesPipeResult: string | number;
  bytesPipeForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.buildAndSubscribeToBytesPipeForm();
  }

  buildAndSubscribeToBytesPipeForm(): void {
    const setPipeResults = () => {
      this.bytesPipeResult = this.bytesPipe.transform(
        this.bytesPipeForm.get('bytes')?.value,
        this.bytesPipeForm.get('base')?.value,
        this.bytesPipeForm.get('includeUnit')?.value,
        this.bytesPipeForm.get('precision')?.value,
      );
    }

    this.bytesPipeForm = this.fb.group({
      bytes: [1000, [Validators.required]],
      includeUnit: [true],
      base: [BytesPipeBase.TEN, [Validators.required]],
      precision: [2, [Validators.required]],
    })

    setPipeResults();
    this.bytesPipeForm.valueChanges.subscribe(() => setPipeResults());
  }
}
