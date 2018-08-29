import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: '../ar-dashboard/ar-dashboard.module#ArDashboardModule',
  },
  {
    path: 'maps',
    loadChildren: '../ar-maps/ar-maps.module#ArMapsModule',
  },
  {
    path: 'charts',
    loadChildren: '../ar-charts/ar-charts.module#ArChartsModule',
  },
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
