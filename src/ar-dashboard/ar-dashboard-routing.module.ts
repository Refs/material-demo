import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    component: fromContainers.DashboardComponent,
  },
  {
    path: 'analysis',
    component: fromContainers.AnalysisComponent,
  },
  {
    path: 'monitor',
    component: fromContainers.MonitorComponent,
  },
  {
    path: 'workplace',
    component: fromContainers.WorkplaceComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArDashboardRoutingModule {}
