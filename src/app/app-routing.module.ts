import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'device-manage' },
  {
    path: 'device-manage',
    loadChildren: '../ar-devmanage/ar-devmanage.module#ArDevmanageModule',
  },
  {
    path: 'performance-monitor',
    loadChildren: '../ar-permonitor/ar-permonitor.module#ArPermonitorModule',
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
