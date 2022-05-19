import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NotificationDemoComponent } from './notification-demo.component';


const routes: Route[] = [
  { path: '', component: NotificationDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationDemoRoutingModule {}
