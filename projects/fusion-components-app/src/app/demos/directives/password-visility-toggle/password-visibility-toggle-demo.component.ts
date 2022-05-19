import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'fusion-demo-password-visibility-toggle-demo',
  templateUrl: './password-visibility-toggle-demo.component.html',
  styleUrls: ['./password-visibility-toggle-demo.component.scss']
})
export class PasswordVisibilitytoggleDemoComponent {
  passwordVisibilityToggleFormControl: FormControl = new FormControl('', [Validators.required]);
}
