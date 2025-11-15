import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BytesPipeBase, BytesPipe } from '@fusion-components';

@Component({
    selector: 'fusion-demo-pipes',
    templateUrl: './pipes-demo.component.html',
    styleUrls: ['./pipes-demo.component.scss'],
    standalone: false
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
