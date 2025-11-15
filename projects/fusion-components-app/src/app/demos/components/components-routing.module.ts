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
    loadComponent: () => import('./accordion-demo/accordion-demo.component').then(m => m.AccordionDemoComponent),
  },
  {
    path: 'badge',
    loadComponent: () => import('./badge-demo/badge-demo.component').then(m => m.BadgeDemoComponent),
  },
  {
    path: 'button',
    loadComponent: () => import('./button-demo/button-demo.component').then(m => m.ButtonDemoComponent),
  },
  {
    path: 'card',
    loadComponent: () => import('./card-demo/card-demo.component').then(m => m.CardDemoComponent),
  },
  {
    path: 'checkbox',
    loadComponent: () => import('./checkbox-demo/checkbox-demo.component').then(m => m.CheckboxDemoComponent),
  },
  {
    path: 'error-message',
    loadComponent: () => import('./error-message-demo/error-message-demo.component').then(m => m.ErrorMessageDemoComponent),
  },
  {
    path: 'key-value-table',
    loadComponent: () => import('./key-value-table-demo/key-value-table-demo.component').then(m => m.KeyValueTableDemoComponent),
  },
  {
    path: 'linear-gauge',
    loadComponent: () => import('./linear-gauge-demo/linear-gauge-demo.component').then(m => m.LinearGaugeDemoComponent),
  },
  {
    path: 'loading-spinner',
    loadComponent: () => import('./loading-spinner-demo/loading-spinner-demo.component').then(m => m.LoadingSpinnerDemoComponent),
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu-demo/menu-demo.component').then(m => m.MenuDemoComponent),
  },
  {
    path: 'modal',
    loadComponent: () => import('./modal-demo/modal-demo.component').then(m => m.ModalDemoComponent),
  },
  {
    path: 'note',
    loadComponent: () => import('./note-demo/note-demo.component').then(m => m.NoteDemoComponent),
  },
  {
    path: 'notification',
    loadComponent: () => import('./notification-demo/notification-demo.component').then(m => m.NotificationDemoComponent),
  },
  {
    path: 'progress-bar',
    loadComponent: () => import('./progress-bar-demo/progress-bar-demo.component').then(m => m.ProgressBarDemoComponent),
  },
  {
    path: 'select',
    loadComponent: () => import('./select-demo/select-demo.component').then(m => m.SelectDemoComponent),
  },
  {
    path: 'sidenav',
    loadComponent: () => import('./sidenav-demo/sidenav-demo.component').then(m => m.SidenavDemoComponent),
  },
  {
    path: 'table',
    loadComponent: () => import('./table-demo/table-demo.component').then(m => m.TableDemoComponent),
  },
  {
    path: 'tabview',
    loadComponent: () => import('./tabview-demo/tabview-demo.component').then(m => m.TabviewDemoComponent),
  },
  {
    path: 'tooltip',
    loadComponent: () => import('./tooltip-demo/tooltip-demo.component').then(m => m.TooltipDemoComponent),
  },
  {
    path: 'upload',
    loadComponent: () => import('./upload-demo/upload-demo.component').then(m => m.UploadDemoComponent),
  },
  {
    path: 'widget',
    loadComponent: () => import('./widget-demo/widget-demo.component').then(m => m.WidgetDemoComponent),
  },
  {
    path: 'wizard',
    loadComponent: () => import('./wizard-demo/wizard-demo.component').then(m => m.WizardDemoComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}

