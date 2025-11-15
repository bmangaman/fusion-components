import { Component } from '@angular/core';
import { UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoComponent } from '../../../shared/components/demo/demo.component';
import { PasswordVisibilityToggleModule } from '../../../../../../fusion-components/src/lib/directives/password-visibility-toggle/password-visibility-toggle.module';

@Component({
    selector: 'fusion-demo-password-visibility-toggle-demo',
    templateUrl: './password-visibility-toggle-demo.component.html',
    styleUrls: ['./password-visibility-toggle-demo.component.scss'],
    standalone: true,
    imports: [DemoComponent, FormsModule, PasswordVisibilityToggleModule, ReactiveFormsModule]
})
export class PasswordVisibilitytoggleDemoComponent {
  passwordVisibilityToggleFormControl: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
}
