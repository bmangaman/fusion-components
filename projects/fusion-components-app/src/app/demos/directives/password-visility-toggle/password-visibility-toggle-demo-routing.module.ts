import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { PasswordVisibilitytoggleDemoComponent } from './password-visibility-toggle-demo.component';

const routes: Route[] = [
  { path: '', component: PasswordVisibilitytoggleDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordVisibilityToggleDemoRoutingModule {}
