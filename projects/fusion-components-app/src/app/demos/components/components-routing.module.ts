import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'accordion',
    pathMatch: 'full',
  },
  {
    path: 'accordion',
    loadChildren: () => import('./accordion-demo/accordion-demo.module').then(m => m.AccordionDemoModule),
  },
  {
    path: 'badge',
    loadChildren: () => import('./badge-demo/badge-demo.module').then(m => m.BadgeDemoModule),
  },
  {
    path: 'button',
    loadChildren: () => import('./button-demo/button-demo.module').then(m => m.ButtonDemoModule),
  },
  {
    path: 'card',
    loadChildren: () => import('./card-demo/card-demo.module').then(m => m.CardDemoModule),
  },
  {
    path: 'checkbox',
    loadChildren: () => import('./checkbox-demo/checkbox-demo.module').then(m => m.CheckboxDemoModule),
  },
  {
    path: 'error-message',
    loadChildren: () => import('./error-message-demo/error-message-demo.module').then(m => m.ErrorMessageDemoModule),
  },
  {
    path: 'key-value-table',
    loadChildren: () => import('./key-value-table-demo/key-value-table-demo.module').then(m => m.KeyValueTableDemoModule),
  },
  {
    path: 'linear-gauge',
    loadChildren: () => import('./linear-gauge-demo/linear-gauge-demo.module').then(m => m.LinearGaugeDemoModule),
  },
  {
    path: 'loading-spinner',
    loadChildren: () => import('./loading-spinner-demo/loading-spinner-demo.module').then(m => m.LoadingSpinnerDemoModule),
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu-demo/menu-demo.module').then(m => m.MenuDemoModule),
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal-demo/modal-demo.module').then(m => m.ModalDemoModule),
  },
  {
    path: 'note',
    loadChildren: () => import('./note-demo/note-demo.module').then(m => m.NoteDemoModule),
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification-demo/notification-demo.module').then(m => m.NotificationDemoModule),
  },
  {
    path: 'progress-bar',
    loadChildren: () => import('./progress-bar-demo/progress-bar-demo.module').then(m => m.ProgressBarDemoModule),
  },
  {
    path: 'select',
    loadChildren: () => import('./select-demo/select-demo.module').then(m => m.SelectDemoModule),
  },
  {
    path: 'sidenav',
    loadChildren: () => import('./sidenav-demo/sidenav-demo.module').then(m => m.SidenavDemoModule),
  },
  {
    path: 'table',
    loadChildren: () => import('./table-demo/table-demo.module').then(m => m.TableDemoModule),
  },
  {
    path: 'tabview',
    loadChildren: () => import('./tabview-demo/tabview-demo.module').then(m => m.TabviewDemoModule),
  },
  {
    path: 'tooltip',
    loadChildren: () => import('./tooltip-demo/tooltip-demo.module').then(m => m.TooltipDemoModule),
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload-demo/upload-demo.module').then(m => m.UploadDemoModule),
  },
  {
    path: 'widget',
    loadChildren: () => import('./widget-demo/widget-demo.module').then(m => m.WidgetdDemoModule),
  },
  {
    path: 'wizard',
    loadChildren: () => import('./wizard-demo/wizard-demo.module').then(m => m.WizardDemoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}

