import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
    selector: 'fusion-demo-password-visibility-toggle-demo',
    templateUrl: './password-visibility-toggle-demo.component.html',
    styleUrls: ['./password-visibility-toggle-demo.component.scss'],
    standalone: false
})
export class PasswordVisibilitytoggleDemoComponent {
  passwordVisibilityToggleFormControl: UntypedFormControl = new UntypedFormControl('', [Validators.required]);
}
